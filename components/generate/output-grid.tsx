"use client";

import {
  Zap,
  FileText,
  Clapperboard,
  MessageSquare,
  Hash,
  Megaphone,
  Camera,
  Scissors,
  Film,
} from "lucide-react";
import { OutputCard } from "@/components/shared/output-card";
import type { ReelGenerationOutput } from "@/types";
import { downloadReelAsJson, downloadReelAsText } from "@/utils/download";
import { toast } from "@/hooks/use-toast";

interface OutputGridProps {
  output: ReelGenerationOutput;
  topic: string;
  reelId?: string | null;
  onRegenerate?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export function OutputGrid({
  output,
  topic,
  reelId,
  onRegenerate,
  onSave,
  isSaved,
}: OutputGridProps) {
  const handleDownload = () => {
    downloadReelAsText(output, topic);
    toast({ title: "Downloaded as .txt", variant: "success" });
  };

  const handleCopyAll = () => {
    toast({ title: "Section copied!", variant: "success" });
  };

  const sections = [
    { title: "Viral Hook", icon: Zap, content: output.viralHook },
    { title: "Full Reel Script", icon: FileText, content: output.reelScript },
    {
      title: "Scene Breakdown",
      icon: Clapperboard,
      content: output.sceneBreakdown,
    },
    { title: "Captions", icon: MessageSquare, content: output.captions },
    {
      title: "Hashtags",
      icon: Hash,
      content: output.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)),
    },
    { title: "Call to Action", icon: Megaphone, content: output.cta },
    { title: "Camera Angles", icon: Camera, content: output.cameraAngles },
    {
      title: "Editing Suggestions",
      icon: Scissors,
      content: output.editingSuggestions,
    },
    { title: "B-Roll Ideas", icon: Film, content: output.brollIdeas },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-end">
        <button
          onClick={() => {
            downloadReelAsJson(output, topic);
            toast({ title: "Downloaded JSON", variant: "success" });
          }}
          className="text-sm text-violet-400 hover:text-violet-300"
        >
          Export JSON
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section, i) => (
          <OutputCard
            key={section.title}
            title={section.title}
            icon={section.icon}
            content={section.content as string | string[]}
            index={i}
            onCopy={handleCopyAll}
            onDownload={i === 0 ? handleDownload : undefined}
            onRegenerate={i === 0 ? onRegenerate : undefined}
            onSave={i === 0 && reelId ? onSave : undefined}
            isSaved={isSaved}
          />
        ))}
      </div>
    </div>
  );
}
