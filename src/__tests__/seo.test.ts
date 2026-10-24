import type { Metadata } from "next";
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import {
  SOCIAL_IMAGE,
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  organizationJsonLd,
} from "@/lib/seo";

const base = siteConfig.url.replace(/\/+$/, "");

// `twitter.card` n’existe que sur la variante « carte » du type Twitter de Next.
function twitterCard(metadata: Metadata) {
  const twitter = metadata.twitter;
  return twitter && "card" in twitter ? twitter.card : undefined;
}

describe("absoluteUrl", () => {
  it("construit une URL absolue à partir d’un chemin interne", () => {
    expect(absoluteUrl()).toBe(`${base}/`);
    expect(absoluteUrl("/")).toBe(`${base}/`);
    expect(absoluteUrl("/expertises")).toBe(`${base}/expertises`);
    expect(absoluteUrl("expertises")).toBe(`${base}/expertises`);
  });

  it("ne double jamais la barre oblique", () => {
    expect(absoluteUrl("/insights/mon-article/")).toBe(`${base}/insights/mon-article/`);
  });
});

describe("SOCIAL_IMAGE", () => {
  it("décrit l’image sociale aux dimensions attendues par Open Graph", () => {
    expect(SOCIAL_IMAGE.path).toBe("/og.png");
    expect(SOCIAL_IMAGE.width).toBe(1200);
    expect(SOCIAL_IMAGE.height).toBe(630);
    expect(SOCIAL_IMAGE.alt).toContain(siteConfig.name);
    expect(SOCIAL_IMAGE.alt).toContain(siteConfig.tagline);
  });
});

describe("buildMetadata", () => {
  it("compose titre, canonical, Open Graph et Twitter pour une page", () => {
    const metadata = buildMetadata({
      title: "Expertises",
      description: "Quatre familles d’intervention.",
      path: "/expertises",
    });

    expect(metadata.title).toBe("Expertises");
    expect(metadata.description).toBe("Quatre familles d’intervention.");
    expect(metadata.alternates?.canonical).toBe(`${base}/expertises`);
    expect(metadata.openGraph?.title).toBe("Expertises | PANGARAMA");
    expect(metadata.openGraph?.url).toBe(`${base}/expertises`);
    expect(metadata.openGraph?.siteName).toBe("PANGARAMA");
    expect(metadata.openGraph?.locale).toBe("fr_FR");
    expect(twitterCard(metadata)).toBe("summary_large_image");
  });

  it("joint toujours l’image sociale, en Open Graph comme sur Twitter", () => {
    const metadata = buildMetadata({
      title: "Contact",
      description: "Parlons de votre projet.",
      path: "/contact",
    });

    const openGraphImage = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images[0]
      : metadata.openGraph?.images;

    expect(openGraphImage).toMatchObject({
      url: `${base}/og.png`,
      width: 1200,
      height: 630,
    });

    const twitterImage = metadata.twitter?.images;
    const firstTwitterImage = Array.isArray(twitterImage) ? twitterImage[0] : twitterImage;

    expect(firstTwitterImage).toMatchObject({ url: `${base}/og.png` });
  });

  it("respecte le titre absolu de l’accueil, sans suffixe de marque", () => {
    const metadata = buildMetadata({
      title: "PANGARAMA — Comprendre. Valoriser. Développer.",
      description: siteConfig.description,
      path: "/",
      absoluteTitle: true,
    });

    expect(metadata.title).toEqual({
      absolute: "PANGARAMA — Comprendre. Valoriser. Développer.",
    });
    expect(metadata.openGraph?.title).toBe(
      "PANGARAMA — Comprendre. Valoriser. Développer.",
    );
  });

  it("ajoute les champs d’article uniquement pour le type article", () => {
    const article = buildMetadata({
      title: "Structurer un rapport annuel",
      description: "Un rapport annuel n’est pas un exercice de forme.",
      path: "/insights/structurer-un-rapport-annuel-qui-eclaire-la-decision",
      type: "article",
      publishedTime: "2026-06-12",
      modifiedTime: "2026-06-20",
      authors: ["PANGARAMA"],
      section: "PANGARAMA Insights",
    });

    expect(article.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-06-12",
      modifiedTime: "2026-06-20",
      authors: ["PANGARAMA"],
      section: "PANGARAMA Insights",
    });

    const page = buildMetadata({
      title: "Expertises",
      description: "Quatre familles d’intervention.",
      path: "/expertises",
    });

    expect(page.openGraph).toMatchObject({ type: "website" });
    expect(page.openGraph).not.toHaveProperty("publishedTime");
  });

  it("transmet les mots-clés quand ils sont fournis", () => {
    const metadata = buildMetadata({
      title: "Expertises",
      description: "Quatre familles d’intervention.",
      path: "/expertises",
      keywords: ["communication financière", "intelligence stratégique"],
    });

    expect(metadata.keywords).toEqual([
      "communication financière",
      "intelligence stratégique",
    ]);
  });
});

describe("organizationJsonLd", () => {
  it("décrit l’organisation et n’expose que les réseaux confirmés", () => {
    const jsonLd = organizationJsonLd();

    expect(jsonLd["@type"]).toBe("Organization");
    expect(jsonLd.name).toBe("PANGARAMA");
    expect(jsonLd.url).toBe(`${base}/`);
    expect(jsonLd.telephone).toBe(siteConfig.phoneHref);
    expect(jsonLd.email).toBe(siteConfig.email);
    expect(jsonLd.sameAs).toEqual([siteConfig.socials.youtube]);
    expect(JSON.stringify(jsonLd)).not.toContain("linkedin");
    expect(JSON.stringify(jsonLd)).not.toContain("facebook");
  });
});

describe("articleJsonLd", () => {
  it("décrit l’article, son éditeur et sa langue", () => {
    const jsonLd = articleJsonLd({
      headline: "Structurer un rapport annuel",
      description: "Un rapport annuel n’est pas un exercice de forme.",
      path: "/insights/structurer-un-rapport-annuel-qui-eclaire-la-decision",
      publishedAt: "2026-06-12",
      updatedAt: "2026-06-20",
      section: "PANGARAMA Insights",
    });

    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.datePublished).toBe("2026-06-12");
    expect(jsonLd.dateModified).toBe("2026-06-20");
    expect(jsonLd.articleSection).toBe("PANGARAMA Insights");
    expect(jsonLd.inLanguage).toBe("fr-FR");
    expect(jsonLd.author).toMatchObject({ name: "PANGARAMA" });
    expect(jsonLd.publisher).toMatchObject({ name: "PANGARAMA" });
  });

  it("omet la date de mise à jour quand elle n’est pas connue", () => {
    const jsonLd = articleJsonLd({
      headline: "Note",
      description: "Description.",
      path: "/insights/note",
      publishedAt: "2026-06-12",
    });

    expect(jsonLd).not.toHaveProperty("dateModified");
    expect(jsonLd.author).toMatchObject({ name: siteConfig.name });
  });
});

describe("breadcrumbJsonLd", () => {
  it("numérote le fil d’Ariane à partir de 1", () => {
    const jsonLd = breadcrumbJsonLd([
      { name: "Expertises", path: "/expertises" },
      { name: "Études & Intelligence stratégique", path: "/expertises/etudes-intelligence-strategique" },
    ]);

    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Expertises",
        item: `${base}/expertises`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Études & Intelligence stratégique",
        item: `${base}/expertises/etudes-intelligence-strategique`,
      },
    ]);
  });
});
