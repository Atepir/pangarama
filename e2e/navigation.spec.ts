import { expect, test } from "@playwright/test";

import { MENU_ITEMS, NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/config/navigation";
import { getExpertiseSlugs } from "@/content/expertises";
import { getExampleInsights } from "@/content/insights";
import { NOT_FOUND_PAGE } from "@/content/pages";
import { ALL_REALISATIONS, DEMO_REALISATIONS } from "@/content/realisations";

import { PUBLIC_ROUTES } from "./support/routes";

const PRIMARY_NAV = 'nav[aria-label="Navigation principale"]';
const MOBILE_NAV = 'nav[aria-label="Navigation mobile"]';
const FOOTER_NAV = 'nav[aria-label="Liens de pied de page"]';

/**
 * Le bouton d'ouverture porte `invisible` tant que le panneau est déployé : un
 * sélecteur par attribut reste stable, alors que `getByRole` cesse de le voir.
 */
const TOGGLE = 'header button[aria-label="Ouvrir le menu"]';
const CLOSE = 'button[aria-label="Fermer le menu"]';

const PRIMARY_ITEMS = NAV_ITEMS.filter((item) => item.href !== "/contact");
const FOOTER_LINK_COUNT = NAV_ITEMS.length + SECONDARY_NAV_ITEMS.length;
const UNKNOWN_PATH = "/page-inexistante-pangarama";

/**
 * Entrée de navigation attendue à l'état actif, route par route. Table écrite à
 * la main — et non dérivée de `isNavItemActive` — pour que le test échoue si la
 * règle de correspondance change d'elle-même.
 */
const ACTIVE_EXPECTATIONS: readonly { path: string; label: string | null }[] = [
  { path: "/", label: null },
  { path: "/a-propos", label: "À propos" },
  { path: "/expertises", label: "Expertises" },
  ...getExpertiseSlugs().map((slug) => ({
    path: `/expertises/${slug}`,
    label: "Expertises",
  })),
  { path: "/realisations-insights", label: "Réalisations & Insights" },
  ...ALL_REALISATIONS.map((realisation) => ({
    path: `/realisations/${realisation.slug}`,
    label: "Réalisations & Insights",
  })),
  ...getExampleInsights().map((insight) => ({
    path: `/insights/${insight.slug}`,
    label: "Réalisations & Insights",
  })),
  { path: "/contact", label: null },
  { path: "/mentions-legales", label: null },
  { path: "/politique-de-confidentialite", label: null },
];

test("la table des états actifs couvre toutes les pages publiques", () => {
  expect(ACTIVE_EXPECTATIONS.map((entry) => entry.path).sort()).toEqual(
    [...PUBLIC_ROUTES].sort(),
  );
});

test.describe("Navigation principale — desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("la barre reprend les entrées principales, sans Contact", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator(PRIMARY_NAV);
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(PRIMARY_ITEMS.length);

    for (const item of PRIMARY_ITEMS) {
      await expect(nav.getByRole("link", { name: item.label, exact: true })).toBeVisible();
    }

    await expect(page.locator(`${PRIMARY_NAV} a[href="/contact"]`)).toHaveCount(0);

    // L'appel à l'action vit dans la barre, pas dans le contenu de la page.
    const headerCta = page.locator("header").getByRole("link", { name: "Nous contacter" });
    await expect(headerCta).toHaveCount(1);
    await expect(headerCta).toHaveAttribute("href", "/contact");
  });

  test("l'entrée correspondant à la page courante porte aria-current", async ({ page }) => {
    const hrefByLabel = new Map(NAV_ITEMS.map((item) => [item.label, item.href]));

    for (const { path, label } of ACTIVE_EXPECTATIONS) {
      await page.goto(path);

      const current = page.locator(`${PRIMARY_NAV} a[aria-current="page"]`);

      if (label === null) {
        await expect(current, `aucune entrée active attendue sur ${path}`).toHaveCount(0);
        continue;
      }

      await expect(current, `entrée active attendue sur ${path}`).toHaveCount(1);
      await expect(current).toHaveAttribute("href", hrefByLabel.get(label) ?? "");
      await expect(current).toHaveText(label);
    }
  });
});

test.describe("Menu mobile", () => {
  test.use({ viewport: { width: 390, height: 900 } });

  test("la barre desktop disparaît et le panneau s'ouvre sur les cinq entrées", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator(PRIMARY_NAV)).toBeHidden();
    await expect(page.locator(TOGGLE)).toBeVisible();
    await expect(page.locator(TOGGLE)).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#site-mobile-menu")).toHaveCount(0);

    await page.locator(TOGGLE).click();

    await expect(page.locator(TOGGLE)).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#site-mobile-menu")).toBeVisible();

    const nav = page.locator(MOBILE_NAV);
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(MENU_ITEMS.length);

    for (let index = 0; index < MENU_ITEMS.length; index += 1) {
      const link = nav.getByRole("link").nth(index);
      await expect(link).toHaveAttribute("href", MENU_ITEMS[index].href);
      await expect(link).toContainText(String(index + 1).padStart(2, "0"));
      await expect(link).toContainText(MENU_ITEMS[index].label);
    }

    await expect(nav.getByRole("link").first()).toHaveAttribute("aria-current", "page");

    // Le panneau reprend l'appel à l'action de l'en-tête.
    await expect(page.locator("#site-mobile-menu").getByRole("link", { name: /^Nous contacter/ }))
      .toBeVisible();

    // Le focus est déplacé sur la croix à l'ouverture.
    await expect(page.locator(CLOSE)).toBeFocused();
  });

  test("Échap referme le panneau et rend le focus au bouton d'ouverture", async ({ page }) => {
    await page.goto("/");
    await page.locator(TOGGLE).click();
    await expect(page.locator("#site-mobile-menu")).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.locator("#site-mobile-menu")).toHaveCount(0);
    await expect(page.locator(TOGGLE)).toHaveAttribute("aria-expanded", "false");
    // Le bouton n'est focalisable qu'une fois `invisible` retiré : le focus ne
    // peut donc être rendu qu'après le rendu suivant.
    await expect(page.locator(TOGGLE)).toBeFocused();
  });

  test("une entrée du panneau navigue puis referme le menu", async ({ page }) => {
    await page.goto("/");
    await page.locator(TOGGLE).click();

    const target = MENU_ITEMS.findIndex((item) => item.href === "/expertises");
    expect(target).toBeGreaterThan(-1);

    await page.locator(MOBILE_NAV).getByRole("link").nth(target).click();

    await expect(page).toHaveURL(/\/expertises$/);
    await expect(page.locator("#site-mobile-menu")).toHaveCount(0);
    await expect(page.locator(TOGGLE)).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Repères de page", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("le lien d'évitement mène au contenu principal", async ({ page }) => {
    await page.goto("/");

    const skip = page.locator('a[href="#contenu"]');
    await expect(skip).toBeAttached();

    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/#contenu$/);
    await expect(page.locator("main#contenu")).toBeVisible();
  });

  test("le pied de page porte les six liens de navigation sur chaque page", async ({
    page,
  }) => {
    expect(FOOTER_LINK_COUNT).toBe(6);

    for (const route of PUBLIC_ROUTES) {
      await page.goto(route);

      const nav = page.locator(FOOTER_NAV);
      await expect(nav, `pied de page absent sur ${route}`).toBeVisible();
      await expect(nav.getByRole("link"), `liens de pied de page sur ${route}`).toHaveCount(
        FOOTER_LINK_COUNT,
      );
    }

    const hrefs = [...NAV_ITEMS, ...SECONDARY_NAV_ITEMS].map((item) => item.href);
    for (const href of hrefs) {
      await expect(page.locator(`${FOOTER_NAV} a[href="${href}"]`)).toHaveCount(1);
    }
  });

  test("le pied de page expose les coordonnées et les réseaux", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toHaveCount(1);
    await expect(footer.getByRole("heading", { name: "Coordonnées" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "Suivez Pangarama" })).toBeVisible();
    await expect(footer.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(footer.locator('a[href^="tel:"]')).toHaveCount(1);

    const social = footer.getByRole("list").last();
    await expect(social.getByRole("listitem")).toHaveCount(3);
  });
});

test.describe("Page 404", () => {
  test("une URL inconnue répond 404 avec une issue de retour", async ({ page }) => {
    const response = await page.goto(UNKNOWN_PATH);

    expect(response?.status()).toBe(404);

    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(NOT_FOUND_PAGE.title);
    await expect(page.getByText(NOT_FOUND_PAGE.code, { exact: true })).toBeVisible();
    await expect(page.getByText(NOT_FOUND_PAGE.text)).toBeVisible();

    await page.getByRole("link", { name: NOT_FOUND_PAGE.cta.label }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("Maillage interne", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("aucun lien interne du site ne casse", async ({ page, request }) => {
    const paths = new Set<string>();

    for (const route of PUBLIC_ROUTES) {
      await page.goto(route);

      const hrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href") ?? ""));

      for (const href of hrefs) {
        const path = href.split("#")[0].split("?")[0];
        if (path) {
          paths.add(path);
        }
      }
    }

    /*
     * Les gabarits de démonstration restent accessibles — route au sitemap
     * incluse — mais sont volontairement absents du maillage : les rubriques
     * n'exposent que les contenus réellement publiés. On vérifie donc leur
     * réponse à part.
     */
    const unlinked = [
      ...DEMO_REALISATIONS.map((realisation) => `/realisations/${realisation.slug}`),
      ...getExampleInsights().map((insight) => `/insights/${insight.slug}`),
    ];

    for (const route of unlinked) {
      expect(paths.has(route), `contenu de démonstration lié depuis le site : ${route}`).toBe(
        false,
      );
    }

    const expected = PUBLIC_ROUTES.filter((route) => !unlinked.includes(route));
    expect(expected.filter((route) => !paths.has(route))).toEqual([]);

    for (const path of [...paths, ...unlinked].sort()) {
      const response = await request.get(path);
      expect(response.status(), `lien cassé : ${path}`).toBeLessThan(400);
    }
  });
});
