"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { capitalize } from "@/utils/format";

export default function ProfilePage() {
  const [profile, setProfile] = useState<{
    full_name: string | null;
    email: string;
    avatar_url: string | null;
    plan: string;
    generations_count: number;
    created_at?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((json) => setProfile(json.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <LoadingSpinner label="Loading profile..." />
      </div>
    );
  }

  const initials =
    profile?.full_name?.slice(0, 2).toUpperCase() ||
    profile?.email?.slice(0, 2).toUpperCase() ||
    "U";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Your creator account</p>
      </div>

      <Card className="glass">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            {profile?.avatar_url && (
              <AvatarImage src={profile.avatar_url} alt={profile.full_name || ""} />
            )}
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">
            {profile?.full_name || "Creator"}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">{profile?.email}</p>
          <Badge variant="neon" className="mt-4">
            {capitalize(profile?.plan || "free")} Plan
          </Badge>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-violet-400">
              {profile?.generations_count ?? 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Total Generations</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">
              {capitalize(profile?.plan || "free")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Current Plan</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
