"use client";

import type { ReelGenerationOutput } from "@/types";

export interface GenerationState {
  output: ReelGenerationOutput | null;
  reelId: string | null;
  topic: string;
  niche: string;
  tone: string;
  platform: string;
  isLoading: boolean;
  error: string | null;
}

let state: GenerationState = {
  output: null,
  reelId: null,
  topic: "",
  niche: "",
  tone: "energetic",
  platform: "instagram",
  isLoading: false,
  error: null,
};

type Listener = (s: GenerationState) => void;
const listeners = new Set<Listener>();

export function getGenerationState(): GenerationState {
  return state;
}

export function setGenerationState(partial: Partial<GenerationState>) {
  state = { ...state, ...partial };
  listeners.forEach((l) => l(state));
}

export function subscribeGeneration(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetGeneration() {
  state = {
    output: null,
    reelId: null,
    topic: "",
    niche: "",
    tone: "energetic",
    platform: "instagram",
    isLoading: false,
    error: null,
  };
  listeners.forEach((l) => l(state));
}
