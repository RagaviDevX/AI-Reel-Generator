"use client";

import { cn } from "@/utils/cn";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Skip animation for instant paint (e.g. dashboard stats) */
  instant?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  instant = false,
}: FadeInProps) {
  if (instant) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn("animate-fade-in-up", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}
