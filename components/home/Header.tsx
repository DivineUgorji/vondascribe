"use client";

import { useState } from "react";
import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import EchonoteDot from "../icons/VondaScribeDot";
import { ModeToggleButton } from "../ModeToggleButton";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LoadingLink } from "../LoadingLink";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <EchonoteDot />
          <span className="text-lg font-semibold">VondaScribe</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Show when="signed-out">
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="/sign-in">Sign in</NavLink>
            <NavLink href="#pricing">
              <Button className="bg-foreground hover:bg-foreground/90 text-background font-medium gap-2 transition-colors duration-200">
                Get started
              </Button>
            </NavLink>
          </Show>

          <Show when="signed-in">
            <LoadingLink href="/dashboard">Go to dashboard</LoadingLink>
            <UserButton />
          </Show>

          <ModeToggleButton />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggleButton />
          <Sheet open={open} onOpenChange={setOpen} modal={false}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72"
              onInteractOutside={(event) => {
                const target = event.target as HTMLElement | null;
                if (target?.closest('[class*="cl-"]')) {
                  event.preventDefault();
                }
              }}
            >
              <SheetHeader className="pr-8">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <span className="h-6 w-6 shrink-0 overflow-hidden [&>svg]:h-full [&>svg]:w-full">
                    <EchonoteDot />
                  </span>
                  VondaScribe
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-6 px-4">
                <Show when="signed-out">
                  <NavLink href="#pricing" onClick={() => setOpen(false)}>
                    Pricing
                  </NavLink>
                  <NavLink href="/sign-in" onClick={() => setOpen(false)}>
                    Sign in
                  </NavLink>
                  <NavLink href="#pricing" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium gap-2 transition-colors duration-200">
                      Get started
                    </Button>
                  </NavLink>
                </Show>

                <Show when="signed-in">
                  <NavLink href="/dashboard" onClick={() => setOpen(false)}>
                    Go to dashboard
                  </NavLink>
                  <UserButton />
                </Show>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
