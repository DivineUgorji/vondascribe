"use client";

import { useTransition, type ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type LoadingLinkProps = ComponentProps<typeof Button> & {
  href: string;
};

export function LoadingLink({
  href,
  children,
  disabled,
  onClick,
  ...props
}: LoadingLinkProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      {...props}
      disabled={disabled || isPending}
      onClick={(e) => {
        onClick?.(e);
        startTransition(() => router.push(href));
      }}
      className="bg-foreground text-background hover:border-none hover:bg-foreground/90"
    >
      {isPending && <Loader2 className="h-4 w-4 animate-spin ease-out" />}
      {children}
    </Button>
  );
}
