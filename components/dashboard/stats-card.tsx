"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  index?: number;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  index = 0,
  className,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={cn("glass glass-hover", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className="text-2xl sm:text-3xl font-bold">{value}</p>
              {trend && (
                <p className="text-xs text-violet-400 mt-2">{trend}</p>
              )}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Icon className="h-6 w-6 text-violet-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
