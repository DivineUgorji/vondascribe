"use client";
import React, {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileVideo, X } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  handleTranscribe,
  type TranscribeState,
} from "@/app/actions/handleFormAction";
import { uploadFileSchema, formatBytes } from "@/lib/schemas/upload-schema";

const ACCEPTED_TYPES = "video/*, audio/*";

const initialTranscribeState: TranscribeState = {
  status: "idle",
  message: "",
};

async function transcribeAction(
  prevState: TranscribeState,
  formData: FormData,
): Promise<TranscribeState> {
  const file = formData.get("file");
  const result = uploadFileSchema.safeParse({ file });

  if (!result.success) {
    return {
      status: "error",
      message:
        result.error.issues[0]?.message ?? "That file can't be uploaded.",
    };
  }

  return handleTranscribe(prevState, formData);
}

export default function UploadForm() {
  const [state, formAction, isPending] = useActionState(
    transcribeAction,
    initialTranscribeState,
  );

  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState<{
    file: File | null;
    title: string;
    notes: string;
  }>({ file: null, title: "", notes: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(active);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(dropped);
        inputRef.current.files = dataTransfer.files;
      }
      setForm((prev) => ({
        ...prev,
        file: dropped,
        title: prev.title || dropped.name.replace(/\.[^/.]+$/, ""),
      }));
    }
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setForm((prev) => ({
        ...prev,
        file: selected,
        title: prev.title || selected.name.replace(/\.[^/.]+$/, ""),
      }));
    }
  };

  const [prevStatus, setPrevStatus] = useState(state.status);
  if (prevStatus !== state.status) {
    setPrevStatus(state.status);
    if (state.status === "success") {
      setForm({ file: null, title: "", notes: "" });
    }
  }

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      if (inputRef.current) inputRef.current.value = "";
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  const { file, title, notes } = form;

  return (
    <form
      className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
      action={formAction}
    >
      <h4 className="mb-4">Recording details</h4>

      {/* Drop zone */}
      <label
        htmlFor="file-upload"
        onDragEnter={(e) => handleDrag(e, true)}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-colors ${
          dragActive
            ? "border-primary bg-accent"
            : "border-border hover:border-muted-foreground"
        }`}
      >
        <Input
          ref={inputRef}
          name="file"
          id="file-upload"
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={handleSelect}
          className="sr-only"
          //   required
        />

        {!file ? (
          <>
            <UploadCloud
              className="mb-3 h-6 w-6 text-muted-foreground"
              strokeWidth={1.5}
            />
            <p className="text-sm font-medium text-foreground">
              Drop your file here, or{" "}
              <span className="text-primary">browse</span>
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              MP4, MOV, WEBM, MP3, WAV · up to 5 min
            </p>
          </>
        ) : (
          <div
            className="flex w-full items-center justify-between rounded-lg border border-border-faint bg-muted px-4 py-3 text-left"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <FileVideo className="h-4 w-4 shrink-0 text-primary" />
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setForm((prev) => ({ ...prev, file: null, title: "" }));
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="ml-3 shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Remove file"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </label>

      {/* Title */}
      <div className="mt-6">
        <label
          htmlFor="title"
          className="mb-1.5 block text-[13px] font-medium text-foreground"
        >
          Title
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Weekly standup — Aug 12"
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label
          htmlFor="notes"
          className="mb-1.5 block text-[13px] font-medium text-foreground"
        >
          Notes{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, notes: e.target.value }))
          }
          rows={3}
          placeholder="Anything EchoNote should know about this recording"
          className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border-faint pt-5">
        <p className="font-mono text-[11px] text-muted-foreground">
          {isPending
            ? "Uploading…"
            : file
              ? "Ready to transcribe"
              : "No file selected"}
        </p>
        <Button type="submit" disabled={!file || !title || isPending}>
          {isPending ? "Uploading..." : "Upload & transcribe"}
        </Button>
      </div>
    </form>
  );
}
