import { AlertTriangle } from "lucide-react";

export function SetupBanner() {
  return (
    <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex gap-3">
      <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="text-sm">
        <p className="font-medium text-amber-200">Database not fully set up</p>
        <p className="text-muted-foreground mt-1">
          Run <code className="text-amber-300">supabase/setup-complete.sql</code> in
          Supabase SQL Editor to enable saved reels and analytics. You can still use{" "}
          <strong>Generate</strong> if GROQ_API_KEY is configured.
        </p>
      </div>
    </div>
  );
}
