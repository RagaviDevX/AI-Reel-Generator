import { createClient } from "@/lib/supabase/server";
import { getAnalytics } from "@/services/reels";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  BarChart3,
  Bookmark,
  Heart,
  Calendar,
  Target,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalize } from "@/utils/format";

export const metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  let analytics = {
    totalGenerations: 0,
    savedReels: 0,
    favorites: 0,
    thisWeekGenerations: 0,
    topNiche: "—",
    topPlatform: "—",
  };

  try {
    analytics = await getAnalytics(supabase, user.id);
  } catch {
    // DB not configured
  }

  const saveRate =
    analytics.totalGenerations > 0
      ? Math.round(
          (analytics.savedReels / analytics.totalGenerations) * 100
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your content creation performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatsCard
          title="Total Generations"
          value={analytics.totalGenerations}
          icon={BarChart3}
          index={0}
        />
        <StatsCard
          title="This Week"
          value={analytics.thisWeekGenerations}
          icon={Calendar}
          index={1}
        />
        <StatsCard
          title="Saved Reels"
          value={analytics.savedReels}
          icon={Bookmark}
          trend={`${saveRate}% save rate`}
          index={2}
        />
        <StatsCard
          title="Favorites"
          value={analytics.favorites}
          icon={Heart}
          index={3}
        />
        <StatsCard
          title="Top Niche"
          value={analytics.topNiche}
          icon={Target}
          index={4}
        />
        <StatsCard
          title="Top Platform"
          value={capitalize(analytics.topPlatform)}
          icon={Share2}
          index={5}
        />
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            {analytics.totalGenerations === 0
              ? "Start generating reels to see detailed analytics and trends."
              : `You've created ${analytics.totalGenerations} reel packages. Your most active niche is ${analytics.topNiche} and you primarily create for ${capitalize(analytics.topPlatform)}.`}
          </p>
          {analytics.thisWeekGenerations > 0 && (
            <p className="text-violet-400">
              Great momentum — {analytics.thisWeekGenerations} generations this
              week!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
