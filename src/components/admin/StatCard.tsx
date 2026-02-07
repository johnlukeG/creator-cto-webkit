type StatCardProps = {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  icon: React.ReactNode;
  color?: "primary" | "green" | "blue" | "amber" | "red";
};

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

export function StatCard({ title, value, change, icon, color = "primary" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {change.type === "increase" && (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              )}
              {change.type === "decrease" && (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  change.type === "increase"
                    ? "text-green-600 dark:text-green-400"
                    : change.type === "decrease"
                    ? "text-red-600 dark:text-red-400"
                    : "text-neutral-500"
                }`}
              >
                {change.value > 0 ? "+" : ""}
                {change.value}%
              </span>
              <span className="text-sm text-neutral-500">vs last period</span>
            </div>
          )}
        </div>
        <div className={`rounded-xl p-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
