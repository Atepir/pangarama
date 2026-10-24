import type { LinkProps } from "next/link";

/**
 * Routes typées du site.
 *
 * Les routes statiques de `src/config/navigation.ts` sont réutilisées telles
 * quelles ; ce module ne sert qu'aux routes dynamiques, dont le `href` doit
 * rester compatible avec le typage des routes de Next.js.
 */
type Href = LinkProps["href"];

/**
 * Convertit un chemin interne ou une URL externe déjà validés en `href`
 * compatible avec les routes typées de Next.js.
 */
export function asHref(path: string): Href {
  return path as Href;
}

export function expertiseHref(slug: string): Href {
  return asHref(`/expertises/${slug}`);
}

export function insightHref(slug: string): Href {
  return asHref(`/insights/${slug}`);
}

export function realisationHref(slug: string): Href {
  return asHref(`/realisations/${slug}`);
}

/** Ancre interne d'une page existante (même contrôle de typage). */
export function anchorHref(path: string, anchor: string): Href {
  return asHref(`${path}#${anchor}`);
}
