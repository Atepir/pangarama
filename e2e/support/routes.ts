import { getExpertiseSlugs } from "@/content/expertises";
import { INSIGHTS } from "@/content/insights";
import { ALL_REALISATIONS } from "@/content/realisations";

/**
 * Toutes les pages publiques du site : navigation principale, fiches
 * d'expertise, missions, analyses et pages légales. Source unique partagée par
 * les audits de mise en page et les parcours de navigation.
 */
export const PUBLIC_ROUTES: readonly string[] = [
  "/",
  "/a-propos",
  "/expertises",
  ...getExpertiseSlugs().map((slug) => `/expertises/${slug}`),
  "/realisations-insights",
  ...ALL_REALISATIONS.map((realisation) => `/realisations/${realisation.slug}`),
  ...INSIGHTS.map((insight) => `/insights/${insight.slug}`),
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
];
