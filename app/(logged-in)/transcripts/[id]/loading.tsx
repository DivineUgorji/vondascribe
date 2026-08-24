import { Skeleton } from "@/components/ui/skeleton";

export default function TranscriptLoading() {
  return (
    <div className="mx-auto mb-12 mt-28 w-full max-w-6xl px-2.5 lg:px-0">
      <Skeleton className="mb-12 h-4 w-40" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
