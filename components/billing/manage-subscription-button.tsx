"use client";
import { useTransition } from "react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createBillingPortalSession } from "@/app/actions/billingActions";

export default function ManageSubscriptionButton({
  customerId,
}: {
  customerId: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!customerId) {
      toast.error("No billing account on file yet — make a purchase first.");
      return;
    }

    startTransition(async () => {
      try {
        await createBillingPortalSession(customerId);
      } catch (err) {
        if (isRedirectError(err)) throw err;
        toast.error("Couldn't open the billing portal. Please try again.");
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      {isPending ? "Opening…" : "Manage subscription"}
    </Button>
  );
}
