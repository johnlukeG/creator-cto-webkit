"use client";

import { useState, useTransition } from "react";
import { SiteSetting } from "@/lib/admin";
import { updateSetting } from "@/app/admin/settings/actions";

type SettingsFormProps = {
  settings: SiteSetting[];
};

// Setting metadata for better UI
const settingMeta: Record<
  string,
  {
    label: string;
    description: string;
    type: "text" | "boolean" | "textarea";
  }
> = {
  site_name: {
    label: "Site Name",
    description: "The name displayed across the site",
    type: "text",
  },
  tagline: {
    label: "Tagline",
    description: "The main tagline shown on the homepage",
    type: "textarea",
  },
  maintenance_mode: {
    label: "Maintenance Mode",
    description: "When enabled, only admins can access the site",
    type: "boolean",
  },
  allow_signups: {
    label: "Allow Signups",
    description: "Whether new user signups are allowed",
    type: "boolean",
  },
  require_email_verification: {
    label: "Require Email Verification",
    description: "Whether users must verify their email before accessing the site",
    type: "boolean",
  },
};

export function SettingsForm({ settings }: SettingsFormProps) {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <SettingsSection title="General" description="Basic site configuration">
        {settings
          .filter((s) => ["site_name", "tagline"].includes(s.key))
          .map((setting) => (
            <SettingRow key={setting.key} setting={setting} />
          ))}
      </SettingsSection>

      {/* Access Settings */}
      <SettingsSection
        title="Access Control"
        description="Manage who can access your site"
      >
        {settings
          .filter((s) =>
            ["maintenance_mode", "allow_signups", "require_email_verification"].includes(
              s.key
            )
          )
          .map((setting) => (
            <SettingRow key={setting.key} setting={setting} />
          ))}
      </SettingsSection>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="border-b border-neutral-100 px-6 py-4 dark:border-neutral-800">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {children}
      </div>
    </div>
  );
}

function SettingRow({ setting }: { setting: SiteSetting }) {
  const meta = settingMeta[setting.key] || {
    label: setting.key,
    description: setting.description || "",
    type: "text" as const,
  };

  const [isPending, startTransition] = useTransition();
  const [localValue, setLocalValue] = useState(() => {
    // Parse the stored value
    const val = setting.value;
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
    return val;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (newValue: unknown) => {
    startTransition(async () => {
      const result = await updateSetting(setting.key, newValue);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  };

  if (meta.type === "boolean") {
    return (
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="font-medium text-neutral-900 dark:text-white">
            {meta.label}
          </p>
          <p className="text-sm text-neutral-500">{meta.description}</p>
        </div>
        <button
          onClick={() => {
            const newValue = !localValue;
            setLocalValue(newValue);
            handleSave(newValue);
          }}
          disabled={isPending}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            localValue
              ? "bg-primary"
              : "bg-neutral-200 dark:bg-neutral-700"
          } ${isPending ? "opacity-50" : ""}`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              localValue ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="mb-2">
        <p className="font-medium text-neutral-900 dark:text-white">
          {meta.label}
        </p>
        <p className="text-sm text-neutral-500">{meta.description}</p>
      </div>
      <div className="flex gap-3">
        {meta.type === "textarea" ? (
          <textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            disabled={isPending}
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            rows={2}
          />
        ) : (
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            disabled={isPending}
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        )}
        <button
          onClick={() => handleSave(localValue)}
          disabled={isPending}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            saved
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-primary text-white hover:bg-primary/90"
          } ${isPending ? "opacity-50" : ""}`}
        >
          {saved ? "Saved!" : isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
