"use client";

import { useEffect } from "react";
import { DashboardConfigError } from "@/components/dashboard/config-error";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error.message, error.digest);
  }, [error]);

  const message =
    error.message && error.message !== "NEXT_REDIRECT"
      ? error.message
      : "The dashboard could not load. Run supabase/schema.sql in Supabase, check Vercel environment variables, then redeploy.";

  return (
    <div>
      <DashboardConfigError message={message} />
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => reset()}
          className="text-sm text-violet-400 hover:text-violet-300 underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
