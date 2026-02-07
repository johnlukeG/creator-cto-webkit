"use client";

import { Profile } from "@/lib/admin";

type AdminHeaderProps = {
  admin: Profile;
};

export function AdminHeader({ admin }: AdminHeaderProps) {
  const initials = admin.email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 hidden border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 lg:block">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
              Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications placeholder */}
          <button className="relative rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white">
            <BellIcon className="h-5 w-5" />
          </button>

          {/* Admin profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {admin.full_name || admin.email.split("@")[0]}
              </p>
              <p className="text-xs text-neutral-500">Administrator</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  );
}
