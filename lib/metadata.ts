import type { Metadata } from "next";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "ReelForge AI";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://reelforge.ai";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${appName} — AI Reel Generator for Creators`,
    template: `%s | ${appName}`,
  },
  description:
    "Generate viral reel hooks, scripts, captions, hashtags, scene breakdowns, and production notes with AI. Built for Instagram, TikTok, YouTube Shorts & LinkedIn.",
  keywords: [
    "AI reel generator",
    "viral hooks",
    "reel script",
    "TikTok content",
    "Instagram reels",
    "content creator tools",
  ],
  authors: [{ name: appName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appUrl,
    siteName: appName,
    title: `${appName} — AI Reel Generator`,
    description:
      "Create viral short-form content in seconds with AI-powered hooks, scripts, and production notes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: appName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} — AI Reel Generator`,
    description:
      "Create viral short-form content in seconds with AI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
