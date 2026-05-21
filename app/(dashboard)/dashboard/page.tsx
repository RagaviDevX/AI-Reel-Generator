import Link from "next/link";
import { Sparkles, Bookmark, BarChart3, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getRecentGenerations, getAnalytics } from "@/services/reels";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ReelCard } from "@/components/dashboard/reel-card";
import { Button } from "@/components/ui/button";
import { TRENDING_IDEAS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  let recent: Awaited<ReturnType<typeof getRecentGenerations>> = [];
  let analytics = {
    totalGenerations: 0,
    savedReels: 0,
    favorites: 0,
    thisWeekGenerations: 0,
    topNiche: "—",
    topPlatform: "—",
  };

  try {
    recent = await getRecentGenerations(supabase, user.id, 6);
    analytics = await getAnalytics(supabase, user.id);
  } catch {
    // DB may not be set up yet
  }

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Creator";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, <span className="neon-text">{name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your content
          </p>
        </div>
        <Button variant="neon" asChild>
          <Link href="/generate">
            <Sparkles className="h-4 w-4" />
            New Reel
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Generations"
          value={analytics.totalGenerations}
          icon={BarChart3}
          trend={`${analytics.thisWeekGenerations} this week`}
          index={0}
        />
        <StatsCard
          title="Saved Reels"
          value={analytics.savedReels}
          icon={Bookmark}
          index={1}
        />
        <StatsCard
          title="Favorites"
          value={analytics.favorites}
          icon={TrendingUp}
          index={2}
        />
        <StatsCard
          title="Top Niche"
          value={analytics.topNiche}
          icon={Sparkles}
          trend={analytics.topPlatform}
          index={3}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Generations</h2>
            <Link
              href="/saved"
              className="text-sm text-violet-400 hover:text-violet-300"
            >
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <Card className="glass">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No reels yet. Generate your first viral script!
                </p>
                <Button variant="neon" asChild>
                  <Link href="/generate">Generate Reel</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {recent.map((reel, i) => (
                <ReelCard key={reel.id} reel={reel} index={i} />
              ))}
            </div>
          )}
        </div>

        <Card className="glass h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-violet-400" />
              Trending Ideas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {TRENDING_IDEAS.slice(0, 4).map((idea) => (
              <div
                key={idea.id}
                className="rounded-xl bg-white/5 p-3 border border-white/5 hover:border-violet-500/30 transition-colors"
              >
                <p className="font-medium text-sm">{idea.title}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {idea.niche}
                  </Badge>
                  <Badge variant="neon" className="text-xs">
                    {idea.engagement_score}% hot
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/trending">Explore trending</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
