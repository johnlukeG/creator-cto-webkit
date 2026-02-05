import Link from "next/link";
import { Suspense } from "react";
import { signup } from "./actions";
import siteConfig from "../../../../site.config";
import AuthMessage from "@/components/AuthMessage";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Join {siteConfig.name} today
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <Suspense fallback={null}>
            <AuthMessage />
          </Suspense>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-lg border border-foreground/20 bg-background px-4 py-2.5 text-sm placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Confirm your password"
            />
          </div>

          <button
            formAction={signup}
            className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:opacity-80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
