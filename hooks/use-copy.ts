"use client";

import { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useCopy() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string, label = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: label, variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    }
  }, []);

  return { copy, copied };
}
