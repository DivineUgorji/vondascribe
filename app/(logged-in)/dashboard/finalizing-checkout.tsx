"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const POLL_INTERVAL_MS = 1500;
const MAX_WAIT_MS = 12000;

export default function FinalizingCheckout() {
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    async function poll() {
      if (cancelled) return;

      try {
        const res = await fetch("/api/checkout-status", { cache: "no-store" });
        const data = await res.json();
        if (data.status === "active") {
          router.replace("/dashboard");
          return;
        }
      } catch {
        // transient network error - just try again on the next tick
      }

      if (Date.now() - startedAt >= MAX_WAIT_MS) {
        setTimedOut(true);
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">
        Finalizing your subscription…
      </p>
      {timedOut && (
        <div className="mt-2 space-y-2">
          <p className="text-[13px] text-muted-foreground">
            This is taking longer than expected. Your payment went through — it
            should reflect shortly.
          </p>
          <button
            onClick={() => router.replace("/dashboard")}
            className="text-sm font-medium text-primary underline"
          >
            Continue to dashboard anyway
          </button>
        </div>
      )}
    </div>
  );
}
