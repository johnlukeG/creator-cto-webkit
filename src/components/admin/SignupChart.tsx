"use client";

import { SignupDataPoint } from "@/lib/admin";

type SignupChartProps = {
  data: SignupDataPoint[];
};

export function SignupChart({ data }: SignupChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-neutral-500">
        No signup data available
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Show only every nth label to avoid crowding
  const labelInterval = Math.ceil(data.length / 7);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            User Signups
          </h3>
          <p className="text-sm text-neutral-500">Last 30 days</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-1.5 dark:bg-neutral-800">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {data.reduce((sum, d) => sum + d.count, 0)} total
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48">
        {/* Y-axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-8 text-right text-xs text-neutral-400">
                {Math.round((maxCount / 4) * (4 - i))}
              </span>
              <div className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 ml-10 flex items-end gap-0.5 pb-6">
          {data.map((point, index) => {
            const height = maxCount > 0 ? (point.count / maxCount) * 100 : 0;
            return (
              <div
                key={point.date}
                className="group relative flex flex-1 flex-col items-center"
              >
                {/* Bar */}
                <div
                  className="w-full max-w-[24px] rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${Math.max(height, 2)}%` }}
                />

                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2 scale-0 rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100 dark:bg-white dark:text-neutral-900">
                  <p className="font-medium">{point.count} signups</p>
                  <p className="text-neutral-400 dark:text-neutral-500">
                    {formatDate(point.date)}
                  </p>
                </div>

                {/* X-axis label */}
                {index % labelInterval === 0 && (
                  <span className="absolute -bottom-5 text-xs text-neutral-400">
                    {formatDate(point.date)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
