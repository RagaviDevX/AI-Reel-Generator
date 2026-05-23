"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLATFORMS, TONES, NICHES } from "@/lib/constants";
import type { GenerateReelInput, Tone, Platform } from "@/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface GenerateFormProps {
  onGenerate: (input: GenerateReelInput) => Promise<void>;
  isLoading: boolean;
  defaultValues?: Partial<GenerateReelInput>;
}

export function GenerateForm({
  onGenerate,
  isLoading,
  defaultValues,
}: GenerateFormProps) {
  const [topic, setTopic] = useState(defaultValues?.topic || "");
  const [niche, setNiche] = useState(defaultValues?.niche || NICHES[0]);
  const [tone, setTone] = useState<Tone>(defaultValues?.tone || "energetic");
  const [platform, setPlatform] = useState<Platform>(
    defaultValues?.platform || "instagram"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    await onGenerate({ topic: topic.trim(), niche, tone, platform });
  };

  return (
      <Card className="glass border-white/10 gpu-layer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            Generate Reel Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="topic">Reel Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g. 3 morning habits that changed my life"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Niche</Label>
                <Select value={niche} onValueChange={setNiche} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NICHES.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select
                  value={tone}
                  onValueChange={(v) => setTone(v as Tone)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={platform}
                onValueChange={(v) => setPlatform(v as Platform)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              variant="neon"
              size="lg"
              className="w-full"
              disabled={isLoading || !topic.trim()}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Reel Package
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}
