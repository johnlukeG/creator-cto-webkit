import Link from "next/link";
import siteConfig from "../../site.config";
import { createClient } from "@/lib/supabase/server";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {user ? (
            <UserDropdown email={user.email || ""} />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
