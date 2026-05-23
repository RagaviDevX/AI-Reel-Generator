"use client";

import { useState, useCallback } from "react";
import { GenerateForm } from "@/components/generate/generate-form";
import { OutputGrid } from "@/components/generate/output-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
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

      let json: {
        error?: string;
        data?: ReelGenerationOutput;
        reelId?: string | null;
        warning?: string;
      };

      try {
        json = await res.json();
      } catch {
        throw new Error(
          res.status === 504
            ? "Request timed out. Redeploy on Vercel after adding GROQ_API_KEY."
            : `Server error (${res.status}). Check Vercel logs.`
        );
      }

      if (!res.ok) {
        throw new Error(
          typeof json.error === "string"
            ? json.error
            : "Generation failed. Check GROQ_API_KEY in Vercel."
        );
      }

      if (!json.data) {
        throw new Error("No content returned from AI.");
      }

      setOutput(json.data);
      setReelId(json.reelId ?? null);
      setIsSaved(false);
      toast({
        title: "Reel generated!",
        description: json.warning ?? "Your viral content package is ready.",
        variant: json.warning ? "default" : "success",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Try again";
      const isNetwork =
        message.includes("fetch") || message.includes("Connection");
      toast({
        title: "Generation failed",
        description: isNetwork
          ? "Could not reach the server. Check GROQ_API_KEY in Vercel → Environment Variables, redeploy, then try again."
          : message,
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

      {isLoading && (
        <div className="glass rounded-2xl p-12 text-center">
          <LoadingSpinner label="Crafting your viral reel package..." />
        </div>
      )}

      {output && !isLoading && (
        <div className="animate-fade-in-up">
          <OutputGrid
            output={output}
            topic={topic}
            reelId={reelId}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
            isSaved={isSaved}
          />
        </div>
      )}

      {!output && !isLoading && (
        <EmptyState
          icon={Sparkles}
          title="Ready to create?"
          description="Enter a topic above and let AI generate your complete reel package."
        />
      )}
    </div>
  );
}
