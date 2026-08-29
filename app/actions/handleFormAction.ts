"use server";
import { generateBlogPostAction, transcribeUploadedFile } from "./uploadAction";

import { z } from "zod";

export type TranscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const metadataSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  notes: z.string().optional(),
  fileUrl: z.string().url(),
  fileName: z.string(),
  fileSize: z.number(),
  userId: z.string().min(1),
  email: z.string().email(),
});

export type TranscribeMetadata = z.infer<typeof metadataSchema>;

export async function saveTranscription(
  input: TranscribeMetadata,
): Promise<TranscribeState> {
  const validated = metadataSchema.safeParse(input);

  if (!validated.success) {
    return {
      status: "error",
      message: validated.error.issues[0]?.message ?? "Invalid submission.",
    };
  }

  const { fileUrl, fileName, userId, email } = validated.data;

  const result = await transcribeUploadedFile({
    userId,
    fileUrl,
    fileName,
    email,
  });
  const { data = null, message = null } = result;

  if (!data || !message) {
    return {
      status: "error",
      message:
        message ??
        "An unexpected error during transcription, please try again.",
    };
  }

  const blogResult = await generateBlogPostAction({
    transcriptions: { text: data.text },
    userId,
  });

  if (blogResult && blogResult.success === false) {
    return {
      status: "error",
      message:
        blogResult.message ??
        "Transcription succeeded, but the blog post couldn't be generated.",
    };
  }

  return {
    status: "success",
    message: "File uploaded — transcription started.",
  };
}
