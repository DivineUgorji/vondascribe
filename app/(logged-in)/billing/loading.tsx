import { Skeleton } from "@/components/ui/skeleton";

export default function BillingLoading() {
  return (
    <>
      <div className="mb-10">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-3 h-8 w-64" />
        <Skeleton className="mt-3 h-4 w-80" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <div className="mt-6 space-y-2 border-t border-border-faint pt-5">
            <Skeleton className="h-9 w-40 rounded-md" />
            <Skeleton className="h-3 w-72" />
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-border-faint bg-transparent p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-full max-w-sm" />
        </div>

        <div className="rounded-2xl border border-border-faint bg-transparent p-6">
          <Skeleton className="mb-4 h-4 w-32" />
          <div className="divide-y divide-border-faint">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
