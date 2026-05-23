"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Bookmark, BarChart3, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ReelCard } from "@/components/dashboard/reel-card";
import { SetupBanner } from "@/components/dashboard/setup-banner";
import { Button } from "@/components/ui/button";
import { TRENDING_IDEAS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import type { ReelGeneration } from "@/types";

interface DashboardData {
  name: string;
  dbReady: boolean;
  recent: ReelGeneration[];
  analytics: {
    totalGenerations: number;
    savedReels: number;
    favorites: number;
    thisWeekGenerations: number;
    topNiche: string;
    topPlatform: string;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to load dashboard");
        }
        setData(json);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <LoadingSpinner size="lg" label="Loading dashboard..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-2xl p-8 text-center max-w-lg mx-auto">
        <p className="text-red-400 font-medium mb-2">Could not load dashboard</p>
        <p className="text-sm text-muted-foreground mb-4">
          {error ?? "Unknown error"}
        </p>
        <p className="text-xs text-muted-foreground mb-6">
          Run <strong>setup-complete.sql</strong> in Supabase SQL Editor. Check
          Vercel env: NEXT_PUBLIC_SUPABASE_URL must be{" "}
          <code className="text-violet-300">https://zerzxlujdfsjeudeclui.supabase.co</code>
        </p>
        <Button variant="neon" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  const { name, dbReady, recent, analytics } = data;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {!dbReady && <SetupBanner />}
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
        />
        <StatsCard
          title="Saved Reels"
          value={analytics.savedReels}
          icon={Bookmark}
        />
        <StatsCard
          title="Favorites"
          value={analytics.favorites}
          icon={TrendingUp}
        />
        <StatsCard
          title="Top Niche"
          value={analytics.topNiche}
          icon={Sparkles}
          trend={analytics.topPlatform}
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
              {recent.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
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
                className="rounded-xl bg-white/5 p-3 border border-white/5"
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
