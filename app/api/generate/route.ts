import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReelSchema } from "@/lib/validations";
import { generateReelContent } from "@/services/groq";
import { saveReelGeneration } from "@/services/reels";

// Vercel: allow up to 60s for Groq API (default 10s causes "Connection error")
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = generateReelSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input. Check topic, niche, tone, and platform." },
        { status: 400 }
      );
    }

    const groqKey = process.env.GROQ_API_KEY?.trim();
    if (!groqKey) {
      return NextResponse.json(
        {
          error:
            "GROQ_API_KEY is missing in Vercel. Add it under Settings → Environment Variables, then redeploy.",
        },
        { status: 503 }
      );
    }

    const output = await generateReelContent(parsed.data);

    let reelId: string | null = null;
    let warning: string | undefined;

    try {
      const reel = await saveReelGeneration(
        supabase,
        user.id,
        parsed.data,
        output
      );
      reelId = reel.id;
    } catch (dbError) {
      console.error("DB save failed (AI output still returned):", dbError);
      warning =
        "Reel generated but not saved to database. Run supabase/schema.sql in Supabase SQL Editor.";
    }

    return NextResponse.json({
      success: true,
      data: output,
      reelId,
      warning,
    });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
