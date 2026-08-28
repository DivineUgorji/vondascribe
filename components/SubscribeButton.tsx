"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/checkoutActions";

export function SubscribeButton({
  priceId,
  children,
  className,
}: {
  priceId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={className}
      disabled={isPending}
      onClick={() => startTransition(() => createCheckoutSession(priceId))}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}
