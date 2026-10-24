import { expect, test, type Page, type Response } from "@playwright/test";

import { siteConfig } from "@/config/site";
import { INSIGHTS } from "@/content/insights";
import { DEMO_REALISATIONS } from "@/content/realisations";
import { insightHref } from "@/lib/routes";
import { SOCIAL_IMAGE, absoluteUrl } from "@/lib/seo";

import { PUBLIC_ROUTES } from "./support/routes";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const SOCIAL_IMAGE_URL = absoluteUrl(SOCIAL_IMAGE.path);
const HOME_TITLE = `${siteConfig.name} — ${siteConfig.tagline}`;

const CANONICAL = 'link[rel="canonical"]';
const DESCRIPTION = 'meta[name="description"]';

type JsonLdNode = Record<string, unknown>;

/** Aplatit les blocs `application/ld+json` de la page (`@graph` inclus). */
async function readJsonLd(page: Page): Promise<JsonLdNode[]> {
  const contents = await page.locator('script[type="application/ld+json"]').allTextContents();

  return contents.flatMap((text) => {
    const parsed: unknown = JSON.parse(text);

    if (Array.isArray(parsed)) {
      return parsed as JsonLdNode[];
    }

    const node = parsed as JsonLdNode;
    const graph = node["@graph"];

    return Array.isArray(graph) ? (graph as JsonLdNode[]) : [node];
  });
}

/**
 * URL telle que Next.js la rend dans le document. `buildMetadata` produit
 * `absoluteUrl(path)`, mais le résolveur de métadonnées ramène toute URL de
 * chemin « / » à son origine, sans barre oblique finale
 * (`resolveAbsoluteUrlWithPathname`) : le canonical et `og:url` de l'accueil
 * valent donc l'origine, alors que le JSON-LD et le sitemap gardent la barre.
 */
function renderedUrl(path: string): string {
  const url = new URL(absoluteUrl(path));

  return url.pathname === "/" ? url.origin : url.href;
}

function requireOk(response: Response | null): Response {
  expect(response, "aucune réponse HTTP").not.toBeNull();
  const resolved = response as Response;
  expect(resolved.status()).toBe(200);
  return resolved;
}

test("l'image sociale est un PNG 1200 × 630 servi par le site", async ({ request }) => {
  const response = await request.get(SOCIAL_IMAGE.path);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");

  const body = await response.body();
  expect(body.subarray(0, 8).equals(PNG_SIGNATURE)).toBe(true);
  // En-tête IHDR : les dimensions déclarées doivent correspondre aux métadonnées.
  expect(body.readUInt32BE(16)).toBe(SOCIAL_IMAGE.width);
  expect(body.readUInt32BE(20)).toBe(SOCIAL_IMAGE.height);
});

test("robots.txt autorise l’indexation et déclare le sitemap et l’hôte", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");

  const lines = (await response.text())
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  expect(lines).toEqual([
    "User-Agent: *",
    "Allow: /",
    `Host: ${siteConfig.url.replace(/\/+$/, "")}`,
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
  ]);
});

test("le sitemap couvre exactement les routes publiques", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");

  const xml = await response.text();
  expect(xml).toContain("<urlset");

  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  expect(locations).toHaveLength(PUBLIC_ROUTES.length);
  expect(locations.slice().sort()).toEqual(PUBLIC_ROUTES.map(absoluteUrl).sort());
});

test("l'accueil porte les métadonnées complètes et le JSON-LD d'organisation", async ({
  page,
}) => {
  await requireOk(await page.goto("/"));

  await expect(page).toHaveTitle(HOME_TITLE);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#16243d");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    siteConfig.description,
  );
  await expect(page.locator(CANONICAL)).toHaveAttribute("href", renderedUrl("/"));

  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
    "content",
    siteConfig.name,
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "fr_FR");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", HOME_TITLE);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    renderedUrl("/"),
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    SOCIAL_IMAGE_URL,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    String(SOCIAL_IMAGE.width),
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content",
    String(SOCIAL_IMAGE.height),
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    SOCIAL_IMAGE_URL,
  );

  const nodes = await readJsonLd(page);
  const organization = nodes.find((node) => node["@type"] === "Organization");

  expect(organization, "JSON-LD Organization absent").toBeDefined();
  expect(organization).toMatchObject({
    name: siteConfig.name,
    url: absoluteUrl("/"),
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phoneHref,
  });

  // Seuls les profils réellement connus sont déclarés.
  expect(organization?.sameAs).toEqual([siteConfig.socials.youtube]);
});

test("chaque page publique expose canonical, description, image sociale et liens réels", async ({
  page,
}) => {
  for (const route of PUBLIC_ROUTES) {
    await test.step(route, async () => {
      await requireOk(await page.goto(route));

      const canonical = page.locator(CANONICAL);
      await expect(canonical).toHaveCount(1);
      await expect(canonical).toHaveAttribute("href", renderedUrl(route));

      const description = page.locator(DESCRIPTION);
      await expect(description).toHaveAttribute("content", /.{40,}/);

      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        SOCIAL_IMAGE_URL,
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        SOCIAL_IMAGE_URL,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );

      // Le titre de la page et son titre social sont alignés.
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);

      /*
       * Aucun réseau social inventé : les profils non fournis ne sont pas liés.
       * Les gabarits éditoriaux portent en revanche un lien de partage LinkedIn
       * (`share-bar.tsx`), qui n'est pas un profil.
       */
      await expect(
        page.locator('a[href*="linkedin.com"]:not([href*="/sharing/"]), a[href*="facebook.com"]'),
      ).toHaveCount(0);
      await expect(page.locator(`a[href="${siteConfig.socials.youtube}"]`)).toHaveCount(1);
    });
  }
});

test("les modèles d'article déclarent leurs métadonnées éditoriales", async ({ page }) => {
  const insight = INSIGHTS[0];
  const realisation = DEMO_REALISATIONS[0];
  const insightRoute = String(insightHref(insight.slug));

  await requireOk(await page.goto(insightRoute));

  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
    "content",
    /^\d{4}-\d{2}-\d{2}/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const insightNodes = await readJsonLd(page);
  const article = insightNodes.find((node) => node["@type"] === "Article");

  expect(article, "JSON-LD Article absent").toBeDefined();
  expect(article).toMatchObject({
    headline: insight.title,
    description: insight.excerpt,
    mainEntityOfPage: { "@id": absoluteUrl(insightRoute) },
    inLanguage: "fr-FR",
  });

  const breadcrumb = insightNodes.find((node) => node["@type"] === "BreadcrumbList");
  expect(breadcrumb, "JSON-LD BreadcrumbList absent").toBeDefined();
  expect(breadcrumb?.itemListElement).toBeInstanceOf(Array);

  await requireOk(await page.goto(`/realisations/${realisation.slug}`));

  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator(CANONICAL)).toHaveAttribute(
    "href",
    renderedUrl(`/realisations/${realisation.slug}`),
  );

  const realisationNodes = await readJsonLd(page);
  expect(
    realisationNodes.some((node) => node["@type"] === "BreadcrumbList"),
    "JSON-LD BreadcrumbList absent sur le modèle mission",
  ).toBe(true);
});
