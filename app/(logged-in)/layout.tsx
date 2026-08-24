import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { AlertTriangle } from "lucide-react";
import getDbConnection from "@/lib/database";
import {
  doesUserExist,
  hasCancelledSubscription,
  getPlanType,
} from "@/lib/user-helpers";
import AppHeader, { type PlanType } from "@/components/nav/app-header";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const sql = await getDbConnection();

  let planType: PlanType = "starter";
  const user = await doesUserExist(sql, email);
  if (user) {
    planType = getPlanType(user[0].price_id) as PlanType;
  }
  const hasCancelled = await hasCancelledSubscription(sql, email);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader planType={planType} />

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
        {children}
      </main>
    </div>
  );
}
