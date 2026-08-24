"use client";

import { useState } from "react";
import { Menu, Mic } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { TransitionLink } from "../navigation-progress";

export type PlanType = "starter" | "basic" | "pro";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/billing", label: "Billing" },
];

export default function AppHeader({ planType }: { planType: PlanType }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border-faint">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <Mic className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-mono text-sm font-medium tracking-tight">
            VondaScribe
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground sm:inline">
            {planType} plan
          </span>
          <UserButton />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left font-mono text-sm font-medium tracking-tight">
                  VondaScribe
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive(item.href)
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
