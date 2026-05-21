export type Platform = "instagram" | "tiktok" | "youtube" | "linkedin";
export type Tone =
  | "energetic"
  | "professional"
  | "humorous"
  | "inspirational"
  | "educational"
  | "controversial";

export interface GenerateReelInput {
  topic: string;
  niche: string;
  tone: Tone;
  platform: Platform;
}

export interface SceneBreakdown {
  scene: number;
  duration: string;
  visual: string;
  audio: string;
  textOverlay?: string;
}

export interface ReelGeneration {
  id: string;
  user_id: string;
  topic: string;
  niche: string;
  tone: string;
  platform: string;
  viral_hook: string;
  reel_script: string;
  scene_breakdown: SceneBreakdown[];
  captions: string[];
  hashtags: string[];
  cta: string;
  camera_angles: string[];
  editing_suggestions: string[];
  broll_ideas: string[];
  is_saved: boolean;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReelGenerationOutput {
  viralHook: string;
  reelScript: string;
  sceneBreakdown: SceneBreakdown[];
  captions: string[];
  hashtags: string[];
  cta: string;
  cameraAngles: string[];
  editingSuggestions: string[];
  brollIdeas: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro" | "enterprise";
  generations_count: number;
  created_at: string;
}

export interface AnalyticsData {
  totalGenerations: number;
  savedReels: number;
  favorites: number;
  thisWeekGenerations: number;
  topNiche: string;
  topPlatform: string;
}

export interface TrendingIdea {
  id: string;
  title: string;
  niche: string;
  platform: Platform;
  engagement_score: number;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}
