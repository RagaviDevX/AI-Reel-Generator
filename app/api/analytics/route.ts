import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAnalytics } from "@/services/reels";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const analytics = await getAnalytics(supabase, user.id);

    return NextResponse.json({ success: true, data: analytics });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
