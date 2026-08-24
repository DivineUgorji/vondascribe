import { pricingPlanMap } from "@/lib/constants";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="relative px-6 py-9 md:py-18" id="pricing">
      <div className="relative max-w-5xl mx-auto">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground bg-muted border border-border px-3 py-1.5 rounded-full tracking-[0.06em] uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Pricing
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground">
            Simple, transparent pricing
          </h2>

          <p className="mt-3 text-[15px] text-muted-foreground leading-[1.7]">
            Start free. Scale when you need to. No surprises.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {pricingPlanMap.map((plan) => {
            const isPopular = plan.tag === "Most popular";

            return (
              <li
                key={plan.id}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between min-h-130 transition-all duration-300
                  ${
                    isPopular
                      ? "bg-card border-primary/40 shadow-[0_0_0_1px_rgba(255,60,60,0.12)]"
                      : "bg-card border-border hover:border-border-faint"
                  }`}
              >
                <div>
                  {plan.tag && (
                    <span
                      className={`inline-block text-[11px] px-3 py-1 rounded-full font-medium mb-5 tracking-wide
                        ${
                          isPopular
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                    >
                      {plan.tag}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>

                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-3xl font-bold text-foreground tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground mb-0.5">
                      /month
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>

                  <ul className="mt-6 space-y-3.5">
                    {plan.features.map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <div
                          className={`mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0
                            ${isPopular ? "bg-primary/15" : "bg-muted"}`}
                        >
                          <Check
                            className={`size-3.5 ${
                              isPopular
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                            strokeWidth={2.5}
                          />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={plan.paymentLink} className="mt-8 block">
                  <button
                    className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors duration-200
                      ${
                        isPopular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border bg-transparent text-foreground hover:bg-muted"
                      }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
