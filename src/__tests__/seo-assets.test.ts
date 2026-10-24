import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { EXPERTISES } from "@/content/expertises";
import { INSIGHTS } from "@/content/insights";
import { ALL_REALISATIONS } from "@/content/realisations";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

const base = siteConfig.url.replace(/\/+$/, "");

describe("sitemap", () => {
  it("liste les pages fixes, les expertises, les analyses et les réalisations", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toHaveLength(
      7 + EXPERTISES.length + INSIGHTS.length + ALL_REALISATIONS.length,
    );
    expect(new Set(urls).size).toBe(urls.length);

    for (const path of [
      "/",
      "/expertises",
      "/realisations-insights",
      "/a-propos",
      "/contact",
      "/mentions-legales",
      "/politique-de-confidentialite",
    ]) {
      expect(urls).toContain(path === "/" ? `${base}/` : `${base}${path}`);
    }

    for (const expertise of EXPERTISES) {
      expect(urls).toContain(`${base}/expertises/${expertise.slug}`);
    }

    for (const insight of INSIGHTS) {
      expect(urls).toContain(`${base}/insights/${insight.slug}`);
    }

    for (const realisation of ALL_REALISATIONS) {
      expect(urls).toContain(`${base}/realisations/${realisation.slug}`);
    }
  });

  it("donne la priorité maximale à l’accueil et date les contenus", () => {
    const entries = sitemap();

    expect(entries[0]).toMatchObject({ url: `${base}/`, priority: 1 });

    const insightEntry = entries.find(
      (entry) => entry.url === `${base}/insights/${INSIGHTS[0]!.slug}`,
    );

    expect(insightEntry?.lastModified).toBe(
      INSIGHTS[0]!.updatedAt ?? INSIGHTS[0]!.publishedAt,
    );

    const realisationEntry = entries.find(
      (entry) => entry.url === `${base}/realisations/${ALL_REALISATIONS[0]!.slug}`,
    );

    expect(realisationEntry?.lastModified).toBe(ALL_REALISATIONS[0]!.publishedAt);
  });

  it("ne liste que des pages publiques, jamais la 404", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.some((url) => url.includes("404"))).toBe(false);
  });
});

describe("robots", () => {
  it("autorise l’indexation de tout le site public", () => {
    const { rules } = robots();

    expect(rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });

  it("pointe le sitemap et déclare l’hôte canonique", () => {
    const { sitemap: sitemapUrl, host } = robots();

    expect(sitemapUrl).toBe(`${base}/sitemap.xml`);
    expect(host).toBe(base);
    expect(host).not.toMatch(/\/$/);
  });
});
