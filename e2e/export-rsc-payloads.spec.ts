import { expect, test } from "@playwright/test";

import { getExpertiseSlugs } from "@/content/expertises";
import { INSIGHTS } from "@/content/insights";
import { ALL_REALISATIONS } from "@/content/realisations";

/**
 * Next.js publie la charge RSC d'une page sous un nom plat
 * (`<route>/__next.<motif>.__PAGE__.txt`) : c'est la forme que le client
 * demande pour précharger un lien. Sous Windows, l'export écrit ces fichiers
 * dans un dossier imbriqué ; `scripts/flatten-rsc-segment-files.mjs` rétablit
 * la forme plate après `next build`. Ces tests vérifient le contrat sur
 * l'artefact réellement servi (émulateur Firebase Hosting) — sans lui, chaque
 * préchargement de lien échoue en 404.
 */
const STATIC_PAGES = [
  "/a-propos",
  "/expertises",
  "/realisations-insights",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
] as const;

const DYNAMIC_PAGES = [
  ...getExpertiseSlugs().map((slug) => ({
    path: `/expertises/${slug}`,
    pattern: "expertises/$d$slug",
  })),
  ...ALL_REALISATIONS.map((realisation) => ({
    path: `/realisations/${realisation.slug}`,
    pattern: "realisations/$d$slug",
  })),
  ...INSIGHTS.map((insight) => ({
    path: `/insights/${insight.slug}`,
    pattern: "insights/$d$slug",
  })),
];

const PAGES = [
  ...STATIC_PAGES.map((path) => ({ path, pattern: path.slice(1) })),
  ...DYNAMIC_PAGES,
];

function payloadPath({ path, pattern }: { path: string; pattern: string }): string {
  return `${path}/__next.${pattern.split("/").join(".")}.__PAGE__.txt`;
}

test("chaque page expose sa charge RSC sous le nom plat demandé par le client", async ({
  request,
}) => {
  expect(PAGES.length).toBeGreaterThan(0);

  for (const page of PAGES) {
    const url = payloadPath(page);
    const response = await request.get(url);

    expect(response.status(), url).toBe(200);
    expect(response.headers()["content-type"], url).toContain("text/plain");
    expect((await response.text()).length, url).toBeGreaterThan(0);
  }
});

test("aucun dossier `__next.*` ne subsiste dans l'export", async ({ request }) => {
  // Une charge restée imbriquée serait servie ici (slash au lieu du point) et
  // signalerait que l'aplatissement post-build n'a pas eu lieu.
  const response = await request.get("/contact/__next.contact/__PAGE__.txt");

  expect(response.status()).toBe(404);
});
