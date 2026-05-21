import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function ensureUserProfile(
  supabase: SupabaseClient,
  user: User
): Promise<{ full_name: string | null; avatar_url: string | null } | null> {
  const { data: existing, error: selectError } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (selectError) {
    // Table missing or RLS — don't crash the dashboard
    console.error("Profile fetch error:", selectError.message);
    return null;
  }

  if (existing) {
    return existing;
  }

  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    email: user.email ?? "",
    full_name:
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      null,
    avatar_url: (user.user_metadata?.avatar_url as string | undefined) || null,
  });

  if (insertError) {
    console.error("Profile create error:", insertError.message);
    return null;
  }

  return {
    full_name:
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      null,
    avatar_url: (user.user_metadata?.avatar_url as string | undefined) || null,
  };
}
