import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/supabase/profile";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { MobileBottomNav } from "@/components/dashboard/mobile-nav";
import { DashboardConfigError } from "@/components/dashboard/config-error";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const env = getSupabaseEnv();
  if (!env) {
    return (
      <DashboardConfigError
        title="Supabase not configured"
        message="NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing in Vercel. Add them under Settings → Environment Variables, then Redeploy."
        showSchemaSteps={false}
      />
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Auth error in dashboard layout:", authError.message);
  }

  if (!user) {
    redirect("/login");
  }

  try {
    const profile = await ensureUserProfile(supabase, user);

    const userName =
      profile?.full_name ||
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      null;
    const avatarUrl =
      profile?.avatar_url ||
      (user.user_metadata?.avatar_url as string | undefined) ||
      null;

    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          <DashboardHeader
            userEmail={user.email ?? ""}
            userName={userName ?? undefined}
            avatarUrl={avatarUrl ?? undefined}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
        <MobileBottomNav />
      </div>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown dashboard error";
    console.error("Dashboard layout error:", error);

    return (
      <DashboardConfigError
        message={`${message}. Run supabase/schema.sql in Supabase SQL Editor, verify Vercel env vars, then redeploy.`}
      />
    );
  }
}
