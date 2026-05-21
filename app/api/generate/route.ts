import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReelSchema } from "@/lib/validations";
import { generateReelContent } from "@/services/groq";
import { saveReelGeneration } from "@/services/reels";

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
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 503 }
      );
    }

    const output = await generateReelContent(parsed.data);

    const reel = await saveReelGeneration(
      supabase,
      user.id,
      parsed.data,
      output
    );

    return NextResponse.json({
      success: true,
      data: output,
      reelId: reel.id,
    });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
