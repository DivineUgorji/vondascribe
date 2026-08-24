import { Skeleton } from "@/components/ui/skeleton";

export default function TranscriptsLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Skeleton className="h-4 w-32" />

        <div className="mb-10 mt-12">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-8 w-56" />
          <Skeleton className="mt-3 h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <Skeleton className="h-5 w-3/4" />
              <div className="mt-2 flex-1 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div className="mt-5 border-t border-border-faint pt-4">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
