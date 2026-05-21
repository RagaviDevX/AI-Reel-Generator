export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  // Reject placeholder / typo URLs
  if (url.includes("xxxxx") || !url.includes(".supabase.co")) {
    return null;
  }

  return { url, anonKey };
}
