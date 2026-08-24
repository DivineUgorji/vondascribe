"use client";
import { useTheme } from "next-themes";
import InitializedMDXEditor from "@/components/content/forward-ref-editor";
import { useCallback, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updatePostAction } from "@/app/actions/editActions";
import { Button } from "../ui/button";
import { Download, Edit2, Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="bg-foreground hover:bg-foreground/90 text-background font-medium rounded-md px-7 py-5 text-[15px] gap-2 transition-colors duration-200"
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Updating...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <Edit2 className="w-5 h-5 mr-2" />
          Update post
        </span>
      )}
    </Button>
  );
};

const initialState = {
  success: false,
};

type UploadState = {
  success: boolean;
};

type UploadAction = (
  state: UploadState,
  formData: FormData,
) => Promise<UploadState>;

export default function ContentEditor({
  transcripts,
}: {
  transcripts: Array<{ content: string; title: string; id: string }>;
}) {
  const { resolvedTheme } = useTheme();

  const editorThemeClass =
    resolvedTheme === "dark" ? "dark-theme dark-editor-theme" : "";

  const [content, setContent] = useState(transcripts[0].content);
  const [isChanged, setIsChanged] = useState(false);

  const updatePostActionWithId = updatePostAction.bind(null, {
    postId: transcripts[0].id,
    content,
  });

  const [state, formAction] = useFormState<UploadState, FormData>(
    updatePostActionWithId as unknown as UploadAction,
    initialState,
  );

  const handlecontentChange = (value: string) => {
    setContent(value);
    console.log({ value });
  };

  const handleExport = useCallback(() => {
    const fileName = `${transcripts[0].title || "blog-post"}.md`;

    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [content, transcripts]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between border-b border-border/50 pb-5">
        <div>
          <span className="eyebrow">Editor</span>
          <h2 className="mt-1.5">Edit your generated post</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            Start editing your post below
          </p>
        </div>
      </div>

      <form action={formAction}>
        <div>
          <SubmitButton></SubmitButton>
          <Button
            size="lg"
            variant="outline"
            className="rounded-md px-7 py-5 text-[15px] font-medium border-border text-foreground hover:bg-accent hover:border-border transition-colors duration-200 gap-2"
            onClick={handleExport}
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
          <InitializedMDXEditor
            className={`markdown-content mt-6 ${editorThemeClass} border-dotted rounded-md animate-in ease-in-out duration-75`}
            editorRef={null}
            markdown={transcripts[0].content}
            onChange={handlecontentChange}
          />
        </div>
      </form>
    </div>
  );
}
