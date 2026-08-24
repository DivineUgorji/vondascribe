"use client";

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from "react";
import { useRouter } from "next/navigation";
import NextLink, { type LinkProps } from "next/link";

type Ctx = { isPending: boolean; startTransition: TransitionStartFunction };
const NavigationProgressContext = createContext<Ctx | null>(null);

export function NavigationProgressProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <NavigationProgressContext.Provider value={{ isPending, startTransition }}>
      {isPending && (
        <div className="fixed left-0 top-0 z-[100] h-0.5 w-full overflow-hidden bg-primary/20">
          <div className="h-full w-1/3 animate-[progress-slide_1s_ease-in-out_infinite] bg-primary" />
        </div>
      )}
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  const ctx = useContext(NavigationProgressContext);
  if (!ctx)
    throw new Error(
      "useNavigationProgress must be used within NavigationProgressProvider",
    );
  return ctx;
}

export function TransitionLink({
  href,
  onClick,
  ...props
}: LinkProps & { children: ReactNode; className?: string }) {
  const router = useRouter();
  const { startTransition } = useNavigationProgress();

  return (
    <NextLink
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        startTransition(() => router.push(href.toString()));
      }}
      {...props}
    />
  );
}
