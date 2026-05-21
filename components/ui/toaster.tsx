"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-xl animate-in slide-in-from-bottom-5",
            t.variant === "destructive"
              ? "border-red-500/30 bg-red-950/90"
              : t.variant === "success"
                ? "border-green-500/30 bg-green-950/90"
                : "border-white/10 bg-zinc-950/90 glass"
          )}
        >
          <div className="flex-1">
            {t.title && <p className="text-sm font-semibold">{t.title}</p>}
            {t.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {t.description}
              </p>
            )}
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
