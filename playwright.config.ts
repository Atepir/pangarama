import { defineConfig, devices } from "@playwright/test";

/**
 * Configuration de la couche end-to-end.
 *
 * Le site étant exporté statiquement (`output: "export"`), `next start` n'existe
 * plus : les tests tournent contre l'émulateur Firebase Hosting, c'est-à-dire
 * exactement le serveur qui portera le site en production (mêmes `cleanUrls`,
 * `trailingSlash` et en-têtes de `firebase.json`). `npm run test:e2e` construit
 * le projet avant de lancer les tests.
 *
 * Définir `BASE_URL` pour viser un serveur déjà démarré (par exemple
 * `npm run preview`) sans que Playwright n'en démarre un.
 */
const PORT = 3210;
const BASE_URL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 90_000,
  expect: { timeout: 10_000 },
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    /**
     * Les apparitions au défilement (`Reveal`) et les transitions sont
     * neutralisées : les tests portent sur la structure et le contenu, pas sur
     * l'animation, et aucun état transitoire ne doit rendre un test instable.
     */
    reducedMotion: "reduce",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "firebase emulators:start --only hosting",
        url: BASE_URL,
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
