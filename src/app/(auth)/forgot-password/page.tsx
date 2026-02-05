import Link from "next/link";
import { Suspense } from "react";
import { resetPassword } from "./actions";
import AuthMessage from "@/components/AuthMessage";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Enter your email and we&apos;ll send you a link to reset your password
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

          <button
            formAction={resetPassword}
            className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Send reset link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-primary hover:opacity-80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
