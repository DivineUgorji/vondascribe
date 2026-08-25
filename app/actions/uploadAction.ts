"use server";
import OpenAI, { toFile } from "openai";
import getDbConnection from "@/lib/database";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeUploadedFile({
  fileUrl,
  fileName,
  userId,
}: {
  fileUrl: string;
  fileName: string;
  userId: string;
}) {
  if (!userId || !fileUrl) {
    return {
      success: false,
      message: "Missing userId or fileUrl",
      data: null,
    };
  }

  try {
    // 1. Download the file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return {
        success: false,
        message: `Failed to fetch uploaded file (${response.status})`,
        data: null,
      };
    }

    const blob = await response.blob();
    const contentType = response.headers.get("content-type") ?? blob.type;
    const safeName = fileName?.trim() || "recording.mp3";
    const file = await toFile(blob, safeName, {
      type: contentType || undefined,
    });

    const transcription = await openai.audio.transcriptions.create({
      model: "gpt-4o-mini-transcribe",
      file,
    });

    return {
      success: true,
      message: "Transcription completed",
      data: {
        text: transcription.text,
        userId,
      },
    };
  } catch (error) {
    console.error("Transcription error:", error);
    if (error instanceof OpenAI.APIError && error.status === 413) {
      return {
        success: false,
        message: "File size exceeds the max limit of 25MB",
        data: null,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error processing file",
      data: null,
    };
  }
}

async function saveBlogPost(userId: string, title: string, content: string) {
  try {
    const sql = await getDbConnection();
    const [insertedPost] = await sql`
    INSERT INTO posts (user_id, title, content)
    VALUES (${userId}, ${title}, ${content})
    RETURNING id
    `;
    return insertedPost.id;
  } catch (error) {
    console.error("Error saving blog post", error);
    throw error;
  }
}

async function getUserBlogPosts(userId: string) {
  try {
    const sql = await getDbConnection();
    const posts = await sql`
    SELECT content FROM posts 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC 
    LIMIT 3
  `;
    return posts.map((post) => post.content).join("\n\n");
  } catch (error) {
    console.error("Error getting user blog posts", error);
    throw error;
  }
}

async function generateBlogPost({
  transcriptions,
  userPosts,
}: {
  transcriptions: string;
  userPosts: string;
}) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a skilled content writer that converts audio transcriptions into well-structured, engaging blog posts in Markdown format. Create a comprehensive blog post with a catchy title, introduction, main body with multiple sections, and a conclusion. Analyze the user's writing style from their previous posts and emulate their tone and style in the new post. Keep the tone casual and professional.",
      },
      {
        role: "user",
        content: `Here are some of my previous blog posts for reference:

${userPosts}

Please convert the following transcription into a well-structured blog post using Markdown formatting. Follow this structure:

1. Start with a SEO friendly catchy title on the first line.
2. Add two newlines after the title.
3. Write an engaging introduction paragraph.
4. Create multiple sections for the main content, using appropriate headings (##, ###).
5. Include relevant subheadings within sections if needed.
6. Use bullet points or numbered lists where appropriate.
7. Add a conclusion paragraph at the end.
8. Ensure the content is informative, well-organized, and easy to read.
9. Emulate my writing style, tone, and any recurring patterns you notice from my previous posts.

Here's the transcription to convert: ${transcriptions}`,
      },
    ],
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
}

export async function generateBlogPostAction({
  transcriptions,
  userId,
}: {
  transcriptions: { text: string };
  userId: string;
}) {
  if (!transcriptions?.text) {
    return { success: false, message: "No transcription text to work from." };
  }

  const userPosts = await getUserBlogPosts(userId);

  const blogPost = await generateBlogPost({
    transcriptions: transcriptions.text,
    userPosts,
  });

  if (!blogPost) {
    return {
      success: false,
      message: "Blog post generation failed, please try again...",
    };
  }

  const [rawTitle] = blogPost.split("\n\n");
  const title = rawTitle.replace(/^#+\s*/, "").trim() || "Untitled post";
  const postId = await saveBlogPost(userId, title, blogPost);

  revalidatePath(`/transcripts/${postId}`);

  return {
    success: true,
    postId,
    message: "Post ready.",
  };
}
