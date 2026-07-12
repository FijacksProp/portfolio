import { describe, expect, it } from "vitest";
import { archiveProjects, projects } from "@/data/projects";
import { navigation, siteConfig } from "@/data/site";

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
});
