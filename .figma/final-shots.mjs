import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

/*
 * Captures finales du §52 : toutes les pages publiques en desktop (1440) et en
 * mobile (390), à comparer avec les frames Figma. Les fichiers sont écrits dans
 * `.figma/final/`. Le serveur de production doit déjà écouter sur `BASE_URL`.
 * Le menu mobile ouvert est capturé en plus, au format exact du mock (390x599,
 * sans `fullPage`) car la frame Figma `41:2` est une vue d'écran, pas une page.
 *
 *   npx next start -p 3210
 *   $env:BASE_URL="http://127.0.0.1:3210"; node .figma/final-shots.mjs
 *   $env:MENU_ONLY="1"; node .figma/final-shots.mjs   # menu mobile uniquement
 */

const routes = [
  "/",
  "/a-propos",
  "/expertises",
  "/expertises/communication-financiere-corporate",
  "/expertises/etudes-intelligence-strategique",
  "/expertises/evenementiel-engagement",
  "/expertises/developpement-accompagnement",
  "/realisations-insights",
  "/realisations/exemple-etude-de-marche",
  "/insights/structurer-un-rapport-annuel-qui-eclaire-la-decision",
  "/insights/dialogue-investisseurs-se-prepare-en-amont",
  "/insights/un-chiffre-une-mise-en-perspective",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
];

const widths = [1440, 390];

const base = process.env.BASE_URL ?? "http://127.0.0.1:3210";
const out = ".figma/final";

const name = (route) => (route === "/" ? "accueil" : route.slice(1).replace(/\//g, "-"));

/** Menu mobile ouvert : frame Figma `41:2`, 390x599, donc une vue d'écran. */
async function captureOpenMenu() {
  const context = await browser.newContext({
    viewport: { width: 390, height: 599 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const response = await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 45_000 });
  await page.addStyleTag({
    content: "*{animation:none!important;transition:none!important}nextjs-portal{display:none!important}",
  });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/menu-mobile-390.png`, fullPage: false });
  console.log(`menu mobile @390: status=${response?.status() ?? 0} (vue 390x599)`);
  await context.close();
}

await mkdir(out, { recursive: true });

const browser = await chromium.launch();

if (process.env.MENU_ONLY) {
  await captureOpenMenu();
} else {
  for (const route of routes) {
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const response = await page.goto(`${base}${route}`, {
        waitUntil: "networkidle",
        timeout: 45_000,
      });
      const status = response?.status() ?? 0;

      // Les apparitions au défilement sont neutralisées pour que chaque capture
      // montre la page complète, jamais un état intermédiaire.
      await page.addStyleTag({
        content: "*{animation:none!important;transition:none!important}nextjs-portal{display:none!important}",
      });
      await page.evaluate(() => {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
        return new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
      });
      await page.waitForTimeout(120);

      await page.screenshot({ path: `${out}/${name(route)}-${width}.png`, fullPage: true });

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      console.log(`${route} @${width}: status=${status} overflowX=${overflow}`);

      await context.close();
    }
  }
}

await browser.close();
