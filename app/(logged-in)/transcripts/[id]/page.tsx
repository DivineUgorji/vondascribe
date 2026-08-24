import ContentEditor from "@/components/content/content-editor";
import getDbConnection from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PostRow = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
};

export default async function TranscriptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const sql = await getDbConnection();

  const rows = await sql`
    SELECT * FROM posts
    WHERE user_id = ${user.id}
      AND id = ${id}
  `;
  const transcripts = rows as PostRow[];

  const transcript = transcripts[0];
  if (!transcript) {
    notFound();
  }

  return (
    <div
      className="mx-auto w-full max-w-6xl px-2.5
    lg:px-0 mb-12 mt-28"
    >
      <Link
        href="/transcripts"
        className="flex items-center gap-2 mb-12 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to transcripts
      </Link>
      <ContentEditor transcripts={transcripts} />
    </div>
  );
}
