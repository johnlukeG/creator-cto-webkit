import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import siteConfig from "../../../site.config";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="mt-2 text-foreground/70">
          Manage your {siteConfig.name} account
        </p>

        {/* Account Info Card */}
        <div className="mt-8 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
          <h2 className="text-lg font-semibold">Account Information</h2>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground/70">Email</label>
              <p className="mt-1 text-base">{user.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/70">Account ID</label>
              <p className="mt-1 font-mono text-sm text-foreground/60">{user.id}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/70">Member since</label>
              <p className="mt-1 text-base">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
          <h2 className="text-lg font-semibold">Quick Actions</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/forgot-password"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-foreground/20 px-4 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Change Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
