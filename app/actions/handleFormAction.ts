"use server";

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

  // TODO: persist a record and kick off transcription using
  // validated.data.fileUrl

  return {
    status: "success",
    message: "File uploaded — transcription started.",
  };
}
