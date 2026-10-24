import { describe, expect, it } from "vitest";

import {
  MENU_ITEMS,
  NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  isNavItemActive,
  type NavItem,
} from "@/config/navigation";

const item = (href: string, match: readonly string[] = [href]): NavItem => ({
  label: href,
  href,
  match,
});

describe("navigation", () => {
  it("expose les quatre entrées de la barre d’en-tête dans l’ordre", () => {
    expect(NAV_ITEMS.map((navItem) => navItem.label)).toEqual([
      "À propos",
      "Expertises",
      "Réalisations & Insights",
      "Contact",
    ]);
    expect(NAV_ITEMS.map((navItem) => navItem.href)).toEqual([
      "/a-propos",
      "/expertises",
      "/realisations-insights",
      "/contact",
    ]);
  });

  it("préfixe le menu mobile par « Accueil »", () => {
    expect(MENU_ITEMS).toHaveLength(NAV_ITEMS.length + 1);
    expect(MENU_ITEMS[0]).toMatchObject({ label: "Accueil", href: "/" });
    expect(MENU_ITEMS.slice(1)).toEqual(NAV_ITEMS);
  });

  it("propose les pages légales en navigation secondaire", () => {
    expect(SECONDARY_NAV_ITEMS.map((navItem) => navItem.href)).toEqual([
      "/mentions-legales",
      "/politique-de-confidentialite",
    ]);
  });

  it("n’active « Accueil » que sur la racine exacte", () => {
    const home = item("/");

    expect(isNavItemActive(home, "/")).toBe(true);
    expect(isNavItemActive(home, "/a-propos")).toBe(false);
    expect(isNavItemActive(home, "/expertises/communication-financiere-corporate")).toBe(
      false,
    );
  });

  it("active chaque entrée sur sa route et ses sous-routes", () => {
    for (const navItem of NAV_ITEMS) {
      expect(isNavItemActive(navItem, navItem.href)).toBe(true);
      expect(isNavItemActive(navItem, `${navItem.href}/detail`)).toBe(true);
    }
  });

  it("active « Réalisations & Insights » sur les trois familles de routes", () => {
    const hub = NAV_ITEMS[2];

    expect(isNavItemActive(hub, "/realisations-insights")).toBe(true);
    expect(isNavItemActive(hub, "/realisations/exemple-etude-de-marche")).toBe(true);
    expect(isNavItemActive(hub, "/insights/un-slug")).toBe(true);
    expect(isNavItemActive(hub, "/expertises")).toBe(false);
  });

  it("n’active rien sur une route inconnue et ne confond pas les préfixes partiels", () => {
    for (const navItem of NAV_ITEMS) {
      expect(isNavItemActive(navItem, "/route-inconnue")).toBe(false);
    }

    expect(isNavItemActive(item("/contact", ["/contact"]), "/contactez-nous")).toBe(false);
  });
});
