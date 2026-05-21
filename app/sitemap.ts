import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://reelforge.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/login",
    "/signup",
    "/dashboard",
    "/generate",
    "/saved",
    "/trending",
    "/analytics",
    "/settings",
    "/profile",
    "/billing",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/generate" ? 0.9 : 0.7,
  }));
}
