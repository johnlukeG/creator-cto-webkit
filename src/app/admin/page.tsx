import { getAdminStats, getSignupAnalytics, getAllUsers } from "@/lib/admin";
import { StatCard } from "@/components/admin/StatCard";
import { SignupChart } from "@/components/admin/SignupChart";

export default async function AdminDashboard() {
  const [stats, signupData, recentUsers] = await Promise.all([
    getAdminStats(),
    getSignupAnalytics(30),
    getAllUsers(),
  ]);

  // Get the 5 most recent users
  const latestUsers = recentUsers.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-neutral-500">
          Welcome back. Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.total_users}
          icon={<UsersIcon className="h-6 w-6" />}
          color="primary"
        />
        <StatCard
          title="New Today"
          value={stats.users_today}
          icon={<UserPlusIcon className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="This Week"
          value={stats.users_this_week}
          icon={<CalendarIcon className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="This Month"
          value={stats.users_this_month}
          icon={<ChartIcon className="h-6 w-6" />}
          color="amber"
        />
      </div>

      {/* Chart and Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart - takes 2 columns */}
        <div className="lg:col-span-2">
          <SignupChart data={signupData} />
        </div>

        {/* Recent Users */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Recent Users
            </h3>
            <a
              href="/admin/users"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </a>
          </div>

          {latestUsers.length === 0 ? (
            <p className="text-sm text-neutral-500">No users yet</p>
          ) : (
            <div className="space-y-4">
              {latestUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {user.email.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                      {user.email}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {user.is_admin && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Admin
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-6 sm:grid-cols-3">
        <QuickStat
          label="Admin Users"
          value={stats.admin_users}
          icon={<ShieldIcon className="h-5 w-5" />}
        />
        <QuickStat
          label="Banned Users"
          value={stats.banned_users}
          icon={<BanIcon className="h-5 w-5" />}
          variant={stats.banned_users > 0 ? "warning" : "default"}
        />
        <QuickStat
          label="Active Rate"
          value={
            stats.total_users > 0
              ? `${Math.round((stats.users_this_week / stats.total_users) * 100)}%`
              : "0%"
          }
          icon={<ActivityIcon className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}

// Quick Stat Component
function QuickStat({
  label,
  value,
  icon,
  variant = "default",
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "warning";
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div
        className={`rounded-lg p-2 ${
          variant === "warning"
            ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
            : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
    </div>
  );
}

// Icons
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function BanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}
