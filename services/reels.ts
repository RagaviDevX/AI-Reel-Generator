import type { ReelGeneration, ReelGenerationOutput } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function saveReelGeneration(
  supabase: SupabaseClient,
  userId: string,
  input: {
    topic: string;
    niche: string;
    tone: string;
    platform: string;
  },
  output: ReelGenerationOutput,
  options?: { isSaved?: boolean; isFavorite?: boolean }
): Promise<ReelGeneration> {
  const { data, error } = await supabase
    .from("reel_generations")
    .insert({
      user_id: userId,
      topic: input.topic,
      niche: input.niche,
      tone: input.tone,
      platform: input.platform,
      viral_hook: output.viralHook,
      reel_script: output.reelScript,
      scene_breakdown: output.sceneBreakdown,
      captions: output.captions,
      hashtags: output.hashtags,
      cta: output.cta,
      camera_angles: output.cameraAngles,
      editing_suggestions: output.editingSuggestions,
      broll_ideas: output.brollIdeas,
      is_saved: options?.isSaved ?? false,
      is_favorite: options?.isFavorite ?? false,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ReelGeneration;
}

export async function getRecentGenerations(
  supabase: SupabaseClient,
  userId: string,
  limit = 10
): Promise<ReelGeneration[]> {
  const { data, error } = await supabase
    .from("reel_generations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as ReelGeneration[]) || [];
}

export async function getSavedReels(
  supabase: SupabaseClient,
  userId: string
): Promise<ReelGeneration[]> {
  const { data, error } = await supabase
    .from("reel_generations")
    .select("*")
    .eq("user_id", userId)
    .eq("is_saved", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as ReelGeneration[]) || [];
}

export async function toggleSaveReel(
  supabase: SupabaseClient,
  reelId: string,
  userId: string,
  isSaved: boolean
): Promise<void> {
  const { error } = await supabase
    .from("reel_generations")
    .update({ is_saved: isSaved, updated_at: new Date().toISOString() })
    .eq("id", reelId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function toggleFavoriteReel(
  supabase: SupabaseClient,
  reelId: string,
  userId: string,
  isFavorite: boolean
): Promise<void> {
  const { error } = await supabase
    .from("reel_generations")
    .update({ is_favorite: isFavorite, updated_at: new Date().toISOString() })
    .eq("id", reelId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function getAnalytics(
  supabase: SupabaseClient,
  userId: string
): Promise<{
  totalGenerations: number;
  savedReels: number;
  favorites: number;
  thisWeekGenerations: number;
  topNiche: string;
  topPlatform: string;
}> {
  const { data: all, error } = await supabase
    .from("reel_generations")
    .select("niche, platform, is_saved, is_favorite, created_at")
    .eq("user_id", userId);

  if (error) throw error;

  const rows = all || [];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const nicheCounts: Record<string, number> = {};
  const platformCounts: Record<string, number> = {};

  rows.forEach((r) => {
    nicheCounts[r.niche] = (nicheCounts[r.niche] || 0) + 1;
    platformCounts[r.platform] = (platformCounts[r.platform] || 0) + 1;
  });

  const topNiche =
    Object.entries(nicheCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  const topPlatform =
    Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "—";

  return {
    totalGenerations: rows.length,
    savedReels: rows.filter((r) => r.is_saved).length,
    favorites: rows.filter((r) => r.is_favorite).length,
    thisWeekGenerations: rows.filter(
      (r) => new Date(r.created_at) >= weekAgo
    ).length,
    topNiche,
    topPlatform,
  };
}

export function reelToOutput(reel: ReelGeneration): ReelGenerationOutput {
  return {
    viralHook: reel.viral_hook,
    reelScript: reel.reel_script,
    sceneBreakdown: reel.scene_breakdown,
    captions: reel.captions,
    hashtags: reel.hashtags,
    cta: reel.cta,
    cameraAngles: reel.camera_angles,
    editingSuggestions: reel.editing_suggestions,
    brollIdeas: reel.broll_ideas,
  };
}
