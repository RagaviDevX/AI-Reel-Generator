import { getSupabaseEnv } from "@/lib/supabase/env";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { MobileBottomNav } from "@/components/dashboard/mobile-nav";
import { DashboardConfigError } from "@/components/dashboard/config-error";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const env = getSupabaseEnv();

  if (!env) {
    return (
      <DashboardConfigError
        title="Supabase not configured"
        message="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel, then Redeploy. URL must be: https://zerzxlujdfsjeudeclui.supabase.co"
        showSchemaSteps
      />
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
