"use client";
import { Mic } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export type PlanType = "starter" | "basic" | "pro";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/billing", label: "Billing" },
];

export default function AppHeader({ planType }: { planType: PlanType }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border-faint ">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <Mic className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-mono text-sm font-medium tracking-tight">
            VondaScribe
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground sm:inline">
            {planType} plan
          </span>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
