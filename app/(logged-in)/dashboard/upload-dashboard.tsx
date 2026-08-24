import UploadForm from "@/components/UploadForm";

export default function UploadDashboard({ userName }: { userName: string }) {
  return (
    <>
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1 className="mt-2">Welcome back, {userName}</h1>
          <p className="lead mt-3 max-w-md">
            Drop in a video or audio file and EchoNote will turn it into a
            clean, searchable transcript.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UploadForm />

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
    </>
  );
}
