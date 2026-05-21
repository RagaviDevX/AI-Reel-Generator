import type { ReelGenerationOutput } from "@/types";

export function downloadReelAsJson(
  output: ReelGenerationOutput,
  topic: string
): void {
  const content = JSON.stringify(
    {
      topic,
      generatedAt: new Date().toISOString(),
      ...output,
    },
    null,
    2
  );
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reel-${topic.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadReelAsText(
  output: ReelGenerationOutput,
  topic: string
): void {
  const lines = [
    `# Reel Script: ${topic}`,
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "## Viral Hook",
    output.viralHook,
    "",
    "## Full Script",
    output.reelScript,
    "",
    "## Scene Breakdown",
    ...output.sceneBreakdown.map(
      (s) =>
        `Scene ${s.scene} (${s.duration})\nVisual: ${s.visual}\nAudio: ${s.audio}${s.textOverlay ? `\nText: ${s.textOverlay}` : ""}`
    ),
    "",
    "## Captions",
    ...output.captions.map((c, i) => `${i + 1}. ${c}`),
    "",
    "## Hashtags",
    output.hashtags.join(" "),
    "",
    "## CTA",
    output.cta,
    "",
    "## Camera Angles",
    ...output.cameraAngles.map((a) => `- ${a}`),
    "",
    "## Editing Suggestions",
    ...output.editingSuggestions.map((e) => `- ${e}`),
    "",
    "## B-Roll Ideas",
    ...output.brollIdeas.map((b) => `- ${b}`),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reel-${topic.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
