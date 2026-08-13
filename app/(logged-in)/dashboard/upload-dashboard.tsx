"use client";
import { Mic, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import UploadForm from "@/components/UploadForm";

type PlanType = "starter" | "basic" | "pro";

interface UploadDashboardProps {
  userName: string;
  userInitials: string;
  planType: PlanType;
  hasCancelled: boolean;
}

// function Waveform({ className }: { className?: string }) {
//   const bars = [10, 20, 32, 18, 28, 40, 22, 36, 14, 30, 42, 24, 16, 34, 26];
//   return (
//     <div className={`flex items-center gap-0.75 ${className}`}>
//       {bars.map((h, i) => (
//         <motion.span
//           key={i}
//           className="block w-0.75 rounded-full bg-foreground/70"
//           style={{ height: h }}
//           animate={{ scaleY: [1, 1.5, 0.7, 1.3, 1] }}
//           transition={{
//             duration: 1.6,
//             repeat: Infinity,
//             delay: i * 0.08,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

export default function UploadDashboard({
  userName,
  userInitials,
  planType,
  hasCancelled,
}: UploadDashboardProps) {
  // Static waveform motif — decorative, not tied to real audio data.
  //   const bars = [6, 14, 9, 20, 12, 24, 10, 17, 8, 15, 11, 6];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top nav */}
      <header className="border-b border-border-faint">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
              <Mic className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-mono text-sm font-medium tracking-tight">
              EchoNote
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium text-foreground">
              Dashboard
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Transcripts
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Billing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground sm:inline">
              {planType} plan
            </span>
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
              {userInitials}
            </div> */}
            <UserButton />
          </div>
        </div>
      </header>

      {/* ── Main */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {hasCancelled && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-primary/30 bg-accent px-4 py-3.5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-[13px] leading-relaxed text-foreground">
              Your subscription is cancelled. You can keep uploading until your
              current billing period ends, then you&apos;ll drop to the free
              plan.
            </p>
          </div>
        )}

        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1 className="mt-2">Welcome back, {userName}</h1>
            <p className="lead mt-3 max-w-md">
              Drop in a video or audio file and EchoNote will turn it into a
              clean, searchable transcript.
            </p>
          </div>

          {/* {Waveform} */}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Upload card */}
          <UploadForm />

          {/* ── Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h5 className="mb-3">Before you upload</h5>
              <ul className="space-y-2.5">
                {[
                  "Recordings are capped at 5 minutes",
                  "Clear audio gives the most accurate transcript",
                  "Processing usually takes under a minute",
                ].map((tip) => (
                  <li key={tip} className="flex gap-2.5">
                    <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="text-[13px] leading-relaxed text-muted-foreground">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border-faint bg-transparent p-6">
              <h5 className="mb-1 text-muted-foreground">Recent uploads</h5>
              <p className="text-[13px] leading-relaxed text-muted-foreground/70">
                Nothing here yet — your transcribed recordings will show up in
                this list.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
