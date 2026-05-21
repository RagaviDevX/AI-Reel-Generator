import Groq from "groq-sdk";
import type { GenerateReelInput, ReelGenerationOutput } from "@/types";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }
  return new Groq({ apiKey });
}

const SYSTEM_PROMPT = `You are an elite short-form video strategist who has created viral content for top creators.
You understand hooks, retention, platform algorithms, and production workflows.
Always respond with valid JSON only — no markdown, no code fences, no extra text.`;

function buildUserPrompt(input: GenerateReelInput): string {
  return `Create a complete viral reel package for:
Topic: ${input.topic}
Niche: ${input.niche}
Tone: ${input.tone}
Platform: ${input.platform}

Return JSON with this exact structure:
{
  "viralHook": "string - scroll-stopping opener under 15 words",
  "reelScript": "string - full script with [VISUAL] and [AUDIO] cues, 30-60 sec",
  "sceneBreakdown": [
    {
      "scene": 1,
      "duration": "0-3s",
      "visual": "description",
      "audio": "voiceover or sound",
      "textOverlay": "optional on-screen text"
    }
  ],
  "captions": ["array of 2-3 caption options"],
  "hashtags": ["15-20 relevant hashtags without # symbol"],
  "cta": "string - clear call to action",
  "cameraAngles": ["5 specific camera angle suggestions"],
  "editingSuggestions": ["5 editing style tips for this platform"],
  "brollIdeas": ["6 B-roll clip ideas"]
}

Make content specific to the topic and niche. Optimize for ${input.platform} algorithm and ${input.tone} tone.`;
}

export async function generateReelContent(
  input: GenerateReelInput
): Promise<ReelGenerationOutput> {
  const groq = getGroqClient();
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.85,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  const parsed = JSON.parse(content) as ReelGenerationOutput;

  if (!parsed.viralHook || !parsed.reelScript) {
    throw new Error("Invalid AI response structure");
  }

  return {
    viralHook: parsed.viralHook,
    reelScript: parsed.reelScript,
    sceneBreakdown: parsed.sceneBreakdown || [],
    captions: parsed.captions || [],
    hashtags: parsed.hashtags || [],
    cta: parsed.cta || "",
    cameraAngles: parsed.cameraAngles || [],
    editingSuggestions: parsed.editingSuggestions || [],
    brollIdeas: parsed.brollIdeas || [],
  };
}
