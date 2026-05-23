"use client";

import { memo, useState } from "react";
import {
  Copy,
  Download,
  RefreshCw,
  Bookmark,
  Check,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import type { SceneBreakdown } from "@/types";

interface OutputCardProps {
  title: string;
  icon: LucideIcon;
  content: string | string[] | SceneBreakdown[];
  onCopy?: () => void;
  onDownload?: () => void;
  onRegenerate?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export const OutputCard = memo(function OutputCard({
  title,
  icon: Icon,
  content,
  onCopy,
  onDownload,
  onRegenerate,
  onSave,
  isSaved,
}: OutputCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const textContent = Array.isArray(content) ? content.join("\n\n") : content;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textContent);
    onCopy?.();
  };

  return (
      <Card className="glass glass-hover overflow-hidden group gpu-layer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Icon className="h-5 w-5 text-violet-400" />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopy}
              title="Copy"
            >
              <Copy className="h-4 w-4" />
            </Button>
            {onDownload && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onDownload}
                title="Download"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onSave && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  onSave();
                  setSaved(true);
                }}
                title="Save"
              >
                {saved ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            )}
            {onRegenerate && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRegenerate}
                title="Regenerate"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {Array.isArray(content) ? (
            <ul className="space-y-2">
              {content.map((item, i) => (
                <li
                  key={i}
                  className={cn(
                    "text-sm text-foreground/80 leading-relaxed",
                    typeof item === "string" && item.startsWith("#")
                      ? "text-violet-300"
                      : ""
                  )}
                >
                  {typeof item === "object" ? (
                    <div className="glass rounded-xl p-3 space-y-1">
                      <p className="font-medium text-violet-300">
                        Scene {(item as { scene: number }).scene} ·{" "}
                        {(item as { duration: string }).duration}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Visual: </span>
                        {(item as { visual: string }).visual}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Audio: </span>
                        {(item as { audio: string }).audio}
                      </p>
                      {(item as { textOverlay?: string }).textOverlay && (
                        <p>
                          <span className="text-muted-foreground">Text: </span>
                          {(item as { textOverlay: string }).textOverlay}
                        </p>
                      )}
                    </div>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          )}
        </CardContent>
      </Card>
  );
});
