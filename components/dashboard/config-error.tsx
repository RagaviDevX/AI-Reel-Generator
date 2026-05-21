import Link from "next/link";
import { AlertCircle, Database, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

interface ConfigErrorProps {
  title?: string;
  message: string;
  showSchemaSteps?: boolean;
}

export function DashboardConfigError({
  title = "Dashboard setup required",
  message,
  showSchemaSteps = true,
}: ConfigErrorProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Logo />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-8 max-w-lg w-full">
          <AlertCircle className="h-10 w-10 text-amber-400 mb-4" />
          <h1 className="text-xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-6">{message}</p>

          {showSchemaSteps && (
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
                <Key className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">1. Vercel environment variables</p>
                  <p className="text-muted-foreground mt-1">
                    Add{" "}
                    <code className="text-violet-300">NEXT_PUBLIC_SUPABASE_URL</code>
                    ,{" "}
                    <code className="text-violet-300">
                      NEXT_PUBLIC_SUPABASE_ANON_KEY
                    </code>
                    , and <code className="text-violet-300">GROQ_API_KEY</code>{" "}
                    → Redeploy.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
                <Database className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">2. Supabase database</p>
                  <p className="text-muted-foreground mt-1">
                    Supabase → SQL Editor → run{" "}
                    <code className="text-violet-300">supabase/schema.sql</code>{" "}
                    then{" "}
                    <code className="text-violet-300">
                      supabase/fix-profile-policy.sql
                    </code>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="neon" asChild className="flex-1">
              <Link href="/generate">Try Generate</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
