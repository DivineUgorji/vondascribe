"use server";

import getDbConnection from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePostAction(data: {
  postId: string;
  content: string;
}) {
  const { postId, content } = data;
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  try {
    const sql = await getDbConnection();
    const [rawTitle, ...contentParts] = content?.split("\n\n") || [];
    const updatedTitle =
      rawTitle?.replace(/^#+\s*/, "").trim() || "Untitled post";
    await sql`UPDATE posts SET content = 
  ${content}, title = ${updatedTitle} where id = ${postId}`;
  } catch (error) {
    console.error("Error occured while updating the post", postId);
    return {
      success: false,
    };
  }

  revalidatePath(`/transcripts/${postId}`);
  return {
    success: true,
  };
}
