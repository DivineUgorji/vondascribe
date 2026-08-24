import getDbConnection from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

export default async function TranscriptsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const sql = await getDbConnection();

  const posts = await sql`
    SELECT * FROM posts
    WHERE user_id = ${user.id}
    ORDER BY created_at DESC
  `;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </div>
        </Link>
        <div className="mb-10 mt-12">
          <span className="eyebrow">Transcripts</span>
          <h1 className="mt-2">Your recordings</h1>
          <p className="lead mt-3 max-w-md">
            Browse and open the transcripts EchoNote has generated for you.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border-faint bg-card p-10 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <h5 className="mb-1">No transcripts yet</h5>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Upload a recording from the dashboard and it will show up here.
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-flex text-sm font-medium text-primary transition hover:opacity-80"
            >
              <div className="flex items-center gap-2">
                Go to dashboard
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/30"
              >
                <h2 className="truncate text-base font-medium text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {post.content?.split("\n").slice(1).join("\n") ||
                    "No preview available."}
                </p>
                <div className="mt-5 border-t border-border-faint pt-4">
                  <Link
                    href={`/transcripts/${post.id}`}
                    className="text-sm font-medium text-primary transition hover:opacity-80"
                  >
                    <div className="flex items-center gap-2">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
