import { z } from "zod";

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export const uploadFileSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .superRefine((file: File, ctx) => {
      if (file.size === 0) {
        ctx.addIssue({
          code: "custom",
          message: "No file was received — please reselect it",
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        ctx.addIssue({
          code: "custom",
          message: `"${file.name}" is ${formatBytes(file.size)} — max upload size is ${formatBytes(
            MAX_FILE_SIZE_BYTES,
          )}.`,
        });
      }

      if (!file.type.startsWith("audio/") && !file.type.startsWith("video/")) {
        ctx.addIssue({
          code: "custom",
          message: "File must be audio or video",
        });
      }
    }),
});
