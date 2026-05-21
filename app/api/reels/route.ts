import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getRecentGenerations,
  getSavedReels,
} from "@/services/reels";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const saved = searchParams.get("saved") === "true";
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const reels = saved
      ? await getSavedReels(supabase, user.id)
      : await getRecentGenerations(supabase, user.id, limit);

    return NextResponse.json({ success: true, data: reels });
  } catch (error) {
    console.error("Reels fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reels" },
      { status: 500 }
    );
  }
}
