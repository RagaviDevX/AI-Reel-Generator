import { createClient } from "@/lib/supabase/server";
import { getSavedReels } from "@/services/reels";
import { ReelCard } from "@/components/dashboard/reel-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Bookmark } from "lucide-react";

export const metadata = { title: "Saved Reels" };

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  let saved: Awaited<ReturnType<typeof getSavedReels>> = [];
  try {
    saved = await getSavedReels(supabase, user.id);
  } catch {
    // DB not configured
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Saved Reels</h1>
        <p className="text-muted-foreground mt-1">
          Your library of saved reel scripts
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="glass rounded-2xl">
          <EmptyState
            icon={Bookmark}
            title="No saved reels yet"
            description="Generate a reel and click Save to add it to your library."
            actionLabel="Generate Reel"
            actionHref="/generate"
          />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
