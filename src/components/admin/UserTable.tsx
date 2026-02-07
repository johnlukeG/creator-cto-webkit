"use client";

import { useState, useTransition } from "react";
import { Profile } from "@/lib/admin";
import { toggleAdminStatus, toggleBanStatus } from "@/app/admin/users/actions";

type UserTableProps = {
  users: Profile[];
  currentUserId: string;
};

export function UserTable({ users, currentUserId }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "admin" | "banned">("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "admin" && user.is_admin) ||
      (filter === "banned" && user.is_banned);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "admin", "banned"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-neutral-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    isCurrentUser={user.id === currentUserId}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-500">
        Showing {filteredUsers.length} of {users.length} users
      </p>
    </div>
  );
}

function UserRow({
  user,
  isCurrentUser,
}: {
  user: Profile;
  isCurrentUser: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");

  const handleToggleAdmin = () => {
    startTransition(async () => {
      await toggleAdminStatus(user.id, !user.is_admin);
    });
  };

  const handleToggleBan = () => {
    if (!user.is_banned) {
      setShowBanModal(true);
    } else {
      startTransition(async () => {
        await toggleBanStatus(user.id, false);
      });
    }
  };

  const confirmBan = () => {
    startTransition(async () => {
      await toggleBanStatus(user.id, true, banReason);
      setShowBanModal(false);
      setBanReason("");
    });
  };

  return (
    <>
      <tr className={`${isPending ? "opacity-50" : ""} transition-opacity`}>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {user.email.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">
                {user.email}
              </p>
              <p className="text-xs font-mono text-neutral-400">
                {user.id.slice(0, 8)}...
              </p>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4">
          <div className="flex flex-wrap gap-1.5">
            {user.is_admin && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Admin
              </span>
            )}
            {user.is_banned && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Banned
              </span>
            )}
            {!user.is_admin && !user.is_banned && (
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                User
              </span>
            )}
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
          {new Date(user.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">
          {user.last_sign_in_at
            ? new Date(user.last_sign_in_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Never"}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-right">
          {isCurrentUser ? (
            <span className="text-sm text-neutral-400">You</span>
          ) : (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleToggleAdmin}
                disabled={isPending}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  user.is_admin
                    ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {user.is_admin ? "Remove Admin" : "Make Admin"}
              </button>
              <button
                onClick={handleToggleBan}
                disabled={isPending}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  user.is_banned
                    ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                    : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                }`}
              >
                {user.is_banned ? "Unban" : "Ban"}
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Ban Modal */}
      {showBanModal && (
        <tr>
          <td colSpan={5} className="p-0">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Ban User
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Are you sure you want to ban {user.email}?
                </p>
                <textarea
                  placeholder="Reason for ban (optional)"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  className="mt-4 w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  rows={3}
                />
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowBanModal(false);
                      setBanReason("");
                    }}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBan}
                    disabled={isPending}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Ban User
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}
