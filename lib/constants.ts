import type { FAQItem, PricingPlan, Testimonial, TrendingIdea } from "@/types";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ReelForge AI";

export const PLATFORMS = [
  { value: "instagram", label: "Instagram Reels" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube Shorts" },
  { value: "linkedin", label: "LinkedIn" },
] as const;

export const TONES = [
  { value: "energetic", label: "Energetic" },
  { value: "professional", label: "Professional" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
  { value: "controversial", label: "Controversial" },
] as const;

export const NICHES = [
  "Fitness",
  "Tech",
  "Finance",
  "Beauty",
  "Food",
  "Travel",
  "Education",
  "Lifestyle",
  "Business",
  "Gaming",
  "Fashion",
  "Health",
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    interval: "month",
    features: [
      "5 reel generations / month",
      "Basic hooks & scripts",
      "Copy to clipboard",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Creator Pro",
    price: 19,
    interval: "month",
    popular: true,
    features: [
      "Unlimited generations",
      "Full scene breakdowns",
      "B-roll & camera ideas",
      "Save & export reels",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Agency",
    price: 79,
    interval: "month",
    features: [
      "Everything in Pro",
      "Team collaboration (5 seats)",
      "Brand voice training",
      "API access",
      "White-label exports",
      "Dedicated account manager",
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does ReelForge AI generate content?",
    answer:
      "We use advanced AI (Groq LLM) trained on viral short-form content patterns. Enter your topic, niche, tone, and platform — we generate hooks, scripts, captions, hashtags, and production notes in seconds.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "Instagram Reels, TikTok, YouTube Shorts, and LinkedIn. Each output is tailored to platform-specific best practices for length, style, and engagement.",
  },
  {
    question: "Can I save and export my reels?",
    answer:
      "Yes. Pro and Agency plans let you save reels to your dashboard, copy sections, and download as JSON or plain text for your editing workflow.",
  },
  {
    question: "Is my content private?",
    answer:
      "Your generations are stored securely in your Supabase account with row-level security. We never share your scripts with other users.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Cancel from the billing page — no contracts. You keep access until the end of your billing period.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Fitness Creator · 2.1M followers",
    avatar: "SC",
    content:
      "ReelForge cut my scripting time from 2 hours to 10 minutes. The hooks alone 3x'd my average watch time.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Tech YouTuber",
    avatar: "MJ",
    content:
      "Scene breakdowns and B-roll suggestions are game-changers. My editor loves the exports.",
    rating: 5,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Agency Owner",
    avatar: "ER",
    content:
      "We produce 50+ reels weekly for clients. ReelForge is now mandatory in our content pipeline.",
    rating: 5,
  },
];

export const TRUSTED_CREATORS = [
  "CreatorLab",
  "ViralVault",
  "ContentCo",
  "ReelMasters",
  "SocialSpark",
  "HookHouse",
];

export const TRENDING_IDEAS: TrendingIdea[] = [
  {
    id: "1",
    title: "3 mistakes killing your reach",
    niche: "Social Media",
    platform: "instagram",
    engagement_score: 98,
    description: "Contrarian hook + quick cuts format trending this week",
  },
  {
    id: "2",
    title: "POV: You finally fixed your morning routine",
    niche: "Lifestyle",
    platform: "tiktok",
    engagement_score: 95,
    description: "POV format with before/after structure",
  },
  {
    id: "3",
    title: "I tested every AI tool so you don't have to",
    niche: "Tech",
    platform: "youtube",
    engagement_score: 92,
    description: "Listicle + face cam + screen recording hybrid",
  },
  {
    id: "4",
    title: "The $0 marketing hack nobody talks about",
    niche: "Business",
    platform: "linkedin",
    engagement_score: 89,
    description: "Thought leadership + carousel companion",
  },
  {
    id: "5",
    title: "What I wish I knew at 25",
    niche: "Finance",
    platform: "instagram",
    engagement_score: 87,
    description: "Storytime + text overlay style",
  },
  {
    id: "6",
    title: "Rating viral food hacks",
    niche: "Food",
    platform: "tiktok",
    engagement_score: 94,
    description: "Reaction + rating format",
  },
];

export const FEATURES = [
  {
    title: "Viral Hooks",
    description:
      "Scroll-stopping openers optimized for your niche and platform.",
    icon: "Zap",
  },
  {
    title: "Full Scripts",
    description:
      "Complete reel scripts with pacing, transitions, and voiceover cues.",
    icon: "FileText",
  },
  {
    title: "Scene Breakdown",
    description:
      "Shot-by-shot plan with duration, visuals, audio, and overlays.",
    icon: "Clapperboard",
  },
  {
    title: "Captions & Hashtags",
    description: "Platform-ready captions and trending hashtag clusters.",
    icon: "Hash",
  },
  {
    title: "Production Notes",
    description:
      "Camera angles, editing style, and B-roll ideas for pro results.",
    icon: "Camera",
  },
  {
    title: "Save & Export",
    description: "Save to dashboard, copy sections, or download JSON/TXT.",
    icon: "Download",
  },
];

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/generate", label: "Generate", icon: "Sparkles" },
  { href: "/saved", label: "Saved", icon: "Bookmark" },
  { href: "/trending", label: "Trending", icon: "TrendingUp" },
  { href: "/analytics", label: "Analytics", icon: "BarChart3" },
];

export const SETTINGS_NAV = [
  { href: "/settings", label: "Settings", icon: "Settings" },
  { href: "/profile", label: "Profile", icon: "User" },
  { href: "/billing", label: "Billing", icon: "CreditCard" },
];
