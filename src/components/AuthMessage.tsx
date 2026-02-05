"use client";

import { useSearchParams } from "next/navigation";

export default function AuthMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  if (!error && !message) return null;

  return (
    <div
      className={`mb-4 rounded-lg px-4 py-3 text-sm ${
        error
          ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      }`}
    >
      {error || message}
    </div>
  );
}
