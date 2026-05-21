import { z } from "zod";

export const generateReelSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters").max(500),
  niche: z.string().min(1),
  tone: z.enum([
    "energetic",
    "professional",
    "humorous",
    "inspirational",
    "educational",
    "controversial",
  ]),
  platform: z.enum(["instagram", "tiktok", "youtube", "linkedin"]),
});

export const updateProfileSchema = z.object({
  full_name: z.string().min(1).max(100).optional(),
});
