"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ReelGeneration } from "@/types";
import { formatRelativeTime, truncate } from "@/utils/format";
import { capitalize } from "@/utils/format";

interface ReelCardProps {
  reel: ReelGeneration;
  index?: number;
}

export function ReelCard({ reel, index = 0 }: ReelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="glass glass-hover group">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate group-hover:text-violet-300 transition-colors">
                {reel.topic}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {formatRelativeTime(reel.created_at)}
              </p>
            </div>
            {reel.is_saved && (
              <Bookmark className="h-4 w-4 text-violet-400 fill-violet-400 shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {truncate(reel.viral_hook, 100)}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{reel.niche}</Badge>
            <Badge variant="neon">{capitalize(reel.platform)}</Badge>
          </div>
          <Link
            href={`/generate?reel=${reel.id}`}
            className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
          >
            View details
            <ExternalLink className="h-3 w-3" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
