import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export { isNavItemActive } from "@/config/navigation";

/** Construit une URL absolue à partir d'un chemin interne. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Image sociale unique du site, servie par la route statique `/og.png`.
 * Elle est déclarée ici pour que toutes les pages la référencent de la même
 * façon : une page qui définit son propre `openGraph` remplace celui du
 * layout, l'image doit donc être reprise explicitement à chaque fois.
 *
 * L'extension fait partie de l'URL : un hébergeur de fichiers statiques
 * déduit le type MIME du nom de fichier, et l'image doit être servie en
 * `image/png` pour que les aperçus sociaux s'affichent.
 */
export const SOCIAL_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
} as const;

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /**
   * Titre complet fourni par l'appelant : aucun suffixe de marque n'est ajouté
   * et le gabarit de titre du layout racine est ignoré (accueil).
   */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
};

/**
 * Helper central de métadonnées : titre, description, canonical, Open Graph,
 * Twitter cards et image sociale.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const image = {
    url: absoluteUrl(SOCIAL_IMAGE.path),
    width: SOCIAL_IMAGE.width,
    height: SOCIAL_IMAGE.height,
    alt: SOCIAL_IMAGE.alt,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: type === "article" ? "article" : "website",
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "fr_FR",
      images: [image],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  const candidates: (string | null)[] = [
    siteConfig.socials.youtube,
    siteConfig.socials.linkedin,
    siteConfig.socials.facebook,
  ];
  const sameAs = candidates.filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ouagadougou",
      addressCountry: "BF",
    },
    areaServed: siteConfig.activityArea,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

type ArticleJsonLdInput = {
  headline: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  section?: string;
};

export function articleJsonLd({
  headline,
  description,
  path,
  publishedAt,
  updatedAt,
  author = siteConfig.name,
  section,
}: ArticleJsonLdInput): JsonLdObject {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: publishedAt,
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    ...(section ? { articleSection: section } : {}),
    author: { "@type": "Organization", name: author, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    inLanguage: "fr-FR",
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
