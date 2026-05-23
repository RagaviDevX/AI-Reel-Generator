"use client";

import Link from "next/link";
import { TrendingUp, Sparkles } from "lucide-react";
import { TRENDING_IDEAS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/utils/format";

export default function TrendingPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-violet-400" />
          Trending Ideas
        </h1>
        <p className="text-muted-foreground mt-1">
          Hot formats and hooks trending across platforms
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRENDING_IDEAS.map((idea) => (
          <Card key={idea.id} className="glass glass-hover h-full gpu-layer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="neon">{idea.engagement_score}% trending</Badge>
                <Badge variant="outline">{capitalize(idea.platform)}</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{idea.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {idea.description}
              </p>
              <Badge variant="outline" className="mb-4">
                {idea.niche}
              </Badge>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link
                  href={`/generate?topic=${encodeURIComponent(idea.title)}&niche=${encodeURIComponent(idea.niche)}&platform=${idea.platform}`}
                >
                  <Sparkles className="h-4 w-4" />
                  Use this idea
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
