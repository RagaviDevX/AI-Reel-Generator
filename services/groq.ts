import Groq from "groq-sdk";
import type { GenerateReelInput, ReelGenerationOutput } from "@/types";

const MODELS = [
  process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not set. Add it in Vercel → Settings → Environment Variables, then redeploy."
    );
  }
  return new Groq({
    apiKey,
    timeout: 55_000,
    maxRetries: 2,
  });
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

function mapGroqError(error: unknown): Error {
  if (error instanceof Groq.APIConnectionError) {
    return new Error(
      "Could not connect to Groq AI. Check GROQ_API_KEY in Vercel env vars, redeploy, and verify your key at console.groq.com."
    );
  }
  if (error instanceof Groq.AuthenticationError) {
    return new Error(
      "Invalid Groq API key. Create a new key at console.groq.com and update GROQ_API_KEY in Vercel."
    );
  }
  if (error instanceof Groq.RateLimitError) {
    return new Error("Groq rate limit reached. Wait a minute and try again.");
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error("AI generation failed. Please try again.");
}

function parseOutput(content: string): ReelGenerationOutput {
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

async function callModel(
  model: string,
  input: GenerateReelInput
): Promise<ReelGenerationOutput> {
  const groq = getGroqClient();
  const completion = await groq.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.85,
    max_tokens: 2048,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  return parseOutput(content);
}

export async function generateReelContent(
  input: GenerateReelInput
): Promise<ReelGenerationOutput> {
  const models = [...new Set(MODELS)];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      return await callModel(model, input);
    } catch (error) {
      lastError = mapGroqError(error);
      console.error(`Groq model ${model} failed:`, error);
      // Try fallback model on connection or server errors
      if (model !== models[models.length - 1]) {
        continue;
      }
    }
  }

  throw lastError ?? new Error("AI generation failed");
}
