import getDbConnection from "@/lib/database";
import { getPlanType } from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import ManageSubscriptionButton from "@/components/billing/manage-subscription-button";

type UserRow = {
  email: string;
  full_name: string | null;
  customer_id: string | null;
  price_id: string | null;
  status: string | null;
};

type PaymentRow = {
  id: string;
  amount: number | null;
  status: string;
  stripe_payment_id: string;
  price_id: string;
  user_email: string;
  created_at: string;
};

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  basic: "Basic",
  pro: "Pro",
};

function formatCurrency(cents: number | null) {
  if (cents == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  }).format(cents / 100);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BillingPage() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
  const sql = await getDbConnection();

  const users = (await sql`
    SELECT email, full_name, customer_id, price_id, status
    FROM users
    WHERE email = ${email}
  `) as UserRow[];
  const user = users[0];

  const planType = user?.price_id ? getPlanType(user.price_id) : "starter";
  const isCancelled = user?.status === "cancelled";

  const payments = (await sql`
    SELECT * FROM payments
    WHERE user_email = ${email}
    ORDER BY created_at DESC
  `) as PaymentRow[];

  return (
    <>
      <div className="mb-10">
        <span className="eyebrow">Billing</span>
        <h1 className="mt-2">Billing &amp; subscription</h1>
        <p className="lead mt-3 max-w-md">
          Manage your plan, payment method, and view past invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Current plan */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h4>{PLAN_LABELS[planType] ?? "Starter"} plan</h4>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {isCancelled
                  ? "Cancelled — active until the end of your billing period"
                  : "Active subscription"}
              </p>
            </div>
            <span
              className={`rounded-md px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${
                isCancelled
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-foreground"
              }`}
            >
              {isCancelled ? "Cancelled" : "Active"}
            </span>
          </div>

          <div className="mt-6 border-t border-border-faint pt-5">
            <ManageSubscriptionButton customerId={user?.customer_id ?? null} />
            <p className="mt-2 text-[11px] text-muted-foreground">
              Update your payment method, change plans, or cancel — handled
              securely by Stripe.
            </p>
          </div>
        </div>

        {/* Need help */}
        <div className="rounded-2xl border border-border-faint bg-transparent p-6">
          <h5 className="mb-1 text-muted-foreground">Need help?</h5>
          <p className="text-[13px] leading-relaxed text-muted-foreground/70">
            Questions about your plan or a charge? Reach out and we&apos;ll sort
            it out.
          </p>
        </div>

        {/* Payment history */}
        <div className="rounded-2xl border border-border-faint bg-transparent p-6 lg:col-span-3">
          <h5 className="mb-4">Payment history</h5>
          {payments.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-muted-foreground/70">
              No payments yet — your invoices will show up here once you
              subscribe.
            </p>
          ) : (
            <ul className="divide-y divide-border-faint">
              {payments.map((payment) => (
                <li
                  key={payment.stripe_payment_id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {formatDate(payment.created_at)}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {payment.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
