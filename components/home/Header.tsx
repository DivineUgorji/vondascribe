import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import EchonoteDot from "../icons/EchonoteDot";
import { ModeToggleButton } from "../ModeToggleButton";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="border-b border-stone-faint">
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 lg:flex-1">
          <EchonoteDot />
          <span className="text-lg font-semibold">EchoNote</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Signed out */}
          <Show when="signed-out">
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="/sign-in">Sign in</NavLink>
          </Show>

          {/* Signed in */}
          <Show when="signed-in">
            <NavLink href="/posts">Your posts</NavLink>
            <NavLink href="/dashboard">Upload file</NavLink>
            {/* <SignOutButton>
              <button
                type="button"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </SignOutButton> */}
            <UserButton />
          </Show>

          {/* Always visible */}
          <ModeToggleButton />
        </div>
      </nav>
    </header>
  );
}
