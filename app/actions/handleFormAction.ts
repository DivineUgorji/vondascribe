"use server";

import { uploadFileSchema } from "@/lib/schemas/upload-schema";

export type TranscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function handleTranscribe(
  _prevState: TranscribeState,
  formData: FormData,
): Promise<TranscribeState> {
  const file = formData.get("file");

  const validatedFields = uploadFileSchema.safeParse({ file });

  if (!validatedFields.success) {
    const firstError = Object.values(
      validatedFields.error.flatten().fieldErrors,
    )[0]?.[0];

    return {
      status: "error",
      message: firstError ?? "Something went wrong validating your file.",
    };
  }

  // TODO: upload/transcription to be handled here

  return {
    status: "success",
    message: "File uploaded — transcription started.",
  };
}
