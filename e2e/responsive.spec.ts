import { expect, test, type Page } from "@playwright/test";

import {
  AUDIT_WIDTHS,
  auditLayout,
  describeFinding,
  prepareForAudit,
} from "./support/layout-audit";
import { PUBLIC_ROUTES } from "./support/routes";

/**
 * §49 — garde-fous de mise en page.
 *
 * Pour chaque page publique et chaque largeur clé, on vérifie qu'aucun des
 * quatre défauts interdits n'apparaît : débordement horizontal du document,
 * élément sortant du viewport, texte rogné, chevauchement texte/texte ou
 * composant plus large que son parent.
 */

/** Identifiant du panneau de navigation mobile, défini par `site-header.tsx`. */
const MOBILE_MENU_ID = "site-mobile-menu";

async function auditPage(page: Page, route: string): Promise<string[]> {
  const problems: string[] = [];

  for (const width of AUDIT_WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route, { waitUntil: "load" });
    await prepareForAudit(page);

    const findings = await auditLayout(page);
    problems.push(...findings.map((finding) => `@${width}px ${describeFinding(finding)}`));
  }

  return problems;
}

test.describe("mise en page responsive", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`aucun débordement ni chevauchement sur ${route}`, async ({ page }) => {
      const problems = await auditPage(page, route);
      expect(problems, `Défauts de mise en page sur ${route}`).toEqual([]);
    });
  }

  test("le menu mobile ouvert ne déborde pas", async ({ page }) => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/", { waitUntil: "load" });
      await prepareForAudit(page);
      await page.getByRole("button", { name: "Ouvrir le menu" }).click();
      await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeVisible();

      /*
       * Le panneau recouvre la page : on n'audite que lui (cf. `LayoutAuditOptions`)
       * et les éléments de la page qu'il masque ne sont pas des collisions.
       */
      const problems = (await auditLayout(page, { scope: `#${MOBILE_MENU_ID}` })).map(
        (finding) => describeFinding(finding),
      );
      expect(problems, `Menu mobile ouvert à ${width}px`).toEqual([]);
    }
  });

  test("la liste « Type de besoin » ouverte ne déborde pas", async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/contact", { waitUntil: "load" });
      await prepareForAudit(page);
      await page.getByRole("combobox", { name: /Type de besoin/ }).click();
      await expect(page.getByRole("listbox")).toBeVisible();

      const problems = (await auditLayout(page)).map((finding) => describeFinding(finding));
      expect(problems, `Liste de besoins ouverte à ${width}px`).toEqual([]);
    }
  });
});
