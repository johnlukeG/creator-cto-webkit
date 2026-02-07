import { getAllUsers, requireAdmin } from "@/lib/admin";
import { UserTable } from "@/components/admin/UserTable";

export default async function UsersPage() {
  const admin = await requireAdmin();
  const users = await getAllUsers();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Users
          </h1>
          <p className="mt-1 text-neutral-500">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 dark:bg-neutral-800">
          <span className="text-2xl font-bold text-neutral-900 dark:text-white">
            {users.length}
          </span>
          <span className="text-sm text-neutral-500">total users</span>
        </div>
      </div>

      {/* User Table */}
      <UserTable users={users} currentUserId={admin.id} />
    </div>
  );
}
