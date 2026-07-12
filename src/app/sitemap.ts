import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const pages = ["", "/work", "/about", "/contact"];

  return [
    ...pages.map((path, index) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: index === 0 ? ("monthly" as const) : ("yearly" as const),
      priority: index === 0 ? 1 : path === "/work" ? 0.9 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
