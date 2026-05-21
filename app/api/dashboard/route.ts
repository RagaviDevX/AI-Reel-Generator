import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRecentGenerations, getAnalytics } from "@/services/reels";
import { ensureUserProfile } from "@/lib/supabase/profile";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserProfile(supabase, user);

    let recent: Awaited<ReturnType<typeof getRecentGenerations>> = [];
    let analytics = {
      totalGenerations: 0,
      savedReels: 0,
      favorites: 0,
      thisWeekGenerations: 0,
      topNiche: "—",
      topPlatform: "—",
    };
    let dbReady = true;

    try {
      const { error: tableCheck } = await supabase
        .from("reel_generations")
        .select("id")
        .limit(1);
      if (tableCheck) dbReady = false;

      recent = await getRecentGenerations(supabase, user.id, 6);
      analytics = await getAnalytics(supabase, user.id);
    } catch {
      dbReady = false;
    }

    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Creator";

    return NextResponse.json({
      success: true,
      dbReady,
      name,
      recent,
      analytics,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    const message =
      error instanceof Error ? error.message : "Dashboard load failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
