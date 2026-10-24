export type NavItem = {
  label: string;
  href: string;
  /** Préfixes de routes considérés comme relevant de cette entrée. */
  match: readonly string[];
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "À propos", href: "/a-propos", match: ["/a-propos"] },
  { label: "Expertises", href: "/expertises", match: ["/expertises"] },
  {
    label: "Réalisations & Insights",
    href: "/realisations-insights",
    match: ["/realisations-insights", "/realisations", "/insights"],
  },
  { label: "Contact", href: "/contact", match: ["/contact"] },
];

/**
 * Entrées du menu mobile : les mêmes que la barre d'en-tête, précédées
 * d'« Accueil » (la signature joue ce rôle sur desktop) — maquette 14.
 */
export const MENU_ITEMS: readonly NavItem[] = [
  { label: "Accueil", href: "/", match: ["/"] },
  ...NAV_ITEMS,
];

/** Routes secondaires proposées dans le 404 et le footer. */export const SECONDARY_NAV_ITEMS: readonly NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales", match: ["/mentions-legales"] },
  {
    label: "Politique de confidentialité",
    href: "/politique-de-confidentialite",
    match: ["/politique-de-confidentialite"],
  },
];

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }

  return item.match.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
