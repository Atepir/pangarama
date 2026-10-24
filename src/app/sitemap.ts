import type { MetadataRoute } from "next";

import { getExpertiseSlugs } from "@/content/expertises";
import { INSIGHTS } from "@/content/insights";
import { ALL_REALISATIONS } from "@/content/realisations";
import { absoluteUrl } from "@/lib/seo";

/**
 * Pages fixes du site.
 * L'ordre suit la navigation principale ; la page 404 n'est jamais listée.
 */
const STATIC_ROUTES: readonly {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/expertises", priority: 0.9, changeFrequency: "monthly" },
  { path: "/realisations-insights", priority: 0.9, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Sitemap généré à partir des mêmes sources de contenu que les pages : toute
 * entrée ajoutée à `EXPERTISES`, `INSIGHTS` ou `ALL_REALISATIONS` y apparaît
 * automatiquement, sans liste d'URL à maintenir à la main.
 *
 * Le fichier est figé au build (`output: "export"`), comme `robots.ts`.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const expertiseEntries: MetadataRoute.Sitemap = getExpertiseSlugs().map((slug) => ({
    url: absoluteUrl(`/expertises/${slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = INSIGHTS.map((insight) => ({
    url: absoluteUrl(`/insights/${insight.slug}`),
    lastModified: insight.updatedAt ?? insight.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const realisationEntries: MetadataRoute.Sitemap = ALL_REALISATIONS.map((realisation) => ({
    url: absoluteUrl(`/realisations/${realisation.slug}`),
    lastModified: realisation.publishedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...expertiseEntries, ...insightEntries, ...realisationEntries];
}
