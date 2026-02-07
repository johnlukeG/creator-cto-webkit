import { getSiteSettings } from "@/lib/admin";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-neutral-500">
          Configure your site settings and preferences
        </p>
      </div>

      {/* Settings Form */}
      <SettingsForm settings={settings} />

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="border-b border-red-200 px-6 py-4 dark:border-red-900/50">
          <h2 className="text-lg font-semibold text-red-900 dark:text-red-400">
            Danger Zone
          </h2>
          <p className="text-sm text-red-700 dark:text-red-400/70">
            Irreversible and destructive actions
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-900 dark:text-red-400">
                Export All Data
              </p>
              <p className="text-sm text-red-700 dark:text-red-400/70">
                Download a copy of all user data
              </p>
            </div>
            <button className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-950">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
