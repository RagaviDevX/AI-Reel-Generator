"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GenerateForm } from "@/components/generate/generate-form";
import { OutputGrid } from "@/components/generate/output-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { Sparkles } from "lucide-react";
import type { GenerateReelInput, ReelGenerationOutput } from "@/types";
import { toast } from "@/hooks/use-toast";

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<ReelGenerationOutput | null>(null);
  const [reelId, setReelId] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [lastInput, setLastInput] = useState<GenerateReelInput | null>(null);

  const handleGenerate = useCallback(async (input: GenerateReelInput) => {
    setIsLoading(true);
    setTopic(input.topic);
    setLastInput(input);
    setOutput(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof json.error === "string"
            ? json.error
            : "Generation failed. Check your API keys."
        );
      }

      setOutput(json.data);
      setReelId(json.reelId);
      setIsSaved(false);
      toast({
        title: "Reel generated!",
        description: "Your viral content package is ready.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Generation failed",
        description: err instanceof Error ? err.message : "Try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSave = async () => {
    if (!reelId) return;
    try {
      const res = await fetch(`/api/reels/${reelId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_saved: true }),
      });
      if (res.ok) {
        setIsSaved(true);
        toast({ title: "Saved to library!", variant: "success" });
      }
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    }
  };

  const handleRegenerate = () => {
    if (lastInput) handleGenerate(lastInput);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Generate Reel</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered hooks, scripts, and production notes
        </p>
      </div>

      <GenerateForm onGenerate={handleGenerate} isLoading={isLoading} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="h-12 w-12 rounded-full border-2 border-violet-500/30 border-t-violet-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-muted-foreground">
                Crafting your viral reel package...
              </p>
            </div>
          </motion.div>
        )}

        {output && !isLoading && (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <OutputGrid
              output={output}
              topic={topic}
              reelId={reelId}
              onRegenerate={handleRegenerate}
              onSave={handleSave}
              isSaved={isSaved}
            />
          </motion.div>
        )}

        {!output && !isLoading && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EmptyState
              icon={Sparkles}
              title="Ready to create?"
              description="Enter a topic above and let AI generate your complete reel package."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
