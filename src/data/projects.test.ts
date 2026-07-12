import { describe, expect, it } from "vitest";
import { archiveProjects, projects } from "@/data/projects";
import { getSiteUrl, navigation, siteConfig } from "@/data/site";

describe("portfolio content model", () => {
  it("has unique, URL-safe featured project slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it("keeps each case study complete and evidence-led", () => {
    for (const project of projects) {
      expect(project.featured).toBe(true);
      expect(project.summary.length).toBeGreaterThan(80);
      expect(project.responsibilities.length).toBeGreaterThanOrEqual(3);
      expect(project.decisions.length).toBeGreaterThanOrEqual(3);
      expect(project.limitations.length).toBeGreaterThanOrEqual(3);
      expect(project.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("does not contain the unsupported claims from the old portfolio", () => {
    const copy = JSON.stringify({ projects, archiveProjects, siteConfig }).toLowerCase();
    ["37+ projects", "100% satisfaction", "5-star rated", "five-star rated"].forEach((claim) => {
      expect(copy).not.toContain(claim);
    });
  });

  it("uses valid internal navigation and public links", () => {
    navigation.forEach((item) => expect(item.href).toMatch(/^\//));
    Object.values(siteConfig.socials).forEach((href) => expect(() => new URL(href)).not.toThrow());
    archiveProjects.forEach((project) => expect(() => new URL(project.href)).not.toThrow());
    projects.flatMap((project) => project.links).forEach((link) => {
      expect(() => new URL(link.href)).not.toThrow();
    });
  });

  it("exposes phone information only through the resume asset", () => {
    expect(JSON.stringify({ projects, archiveProjects, siteConfig })).not.toMatch(/\+234|0901|901 419/);
    expect(siteConfig.resumeUrl).toMatch(/\.pdf$/);
  });

  it("resolves canonical URLs across local and Vercel environments", () => {
    const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const previousProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const previousDeploymentUrl = process.env.VERCEL_URL;

    try {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      delete process.env.VERCEL_URL;
      expect(getSiteUrl()).toBe("http://localhost:3000");

      process.env.VERCEL_URL = "portfolio-preview.vercel.app";
      expect(getSiteUrl()).toBe("https://portfolio-preview.vercel.app");

      process.env.VERCEL_PROJECT_PRODUCTION_URL = "portfolio.vercel.app/";
      expect(getSiteUrl()).toBe("https://portfolio.vercel.app");

      process.env.NEXT_PUBLIC_SITE_URL = "https://joshuafijacks.dev/";
      expect(getSiteUrl()).toBe("https://joshuafijacks.dev");
    } finally {
      if (previousSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
      else process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
      if (previousProductionUrl === undefined) delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      else process.env.VERCEL_PROJECT_PRODUCTION_URL = previousProductionUrl;
      if (previousDeploymentUrl === undefined) delete process.env.VERCEL_URL;
      else process.env.VERCEL_URL = previousDeploymentUrl;
    }
  });
});
