import { expect, test } from "@playwright/test";

import { EXPERTISES } from "@/content/expertises";
import { INSIGHTS } from "@/content/insights";
import {
  ARTICLE_LABELS,
  CASE_STUDY_LABELS,
  EXPERTISES_PAGE,
  EXPERTISE_DETAIL_LABELS,
  INSIGHTS_SECTION,
  REALISATIONS_SECTION,
} from "@/content/pages";
import { DEMO_REALISATIONS } from "@/content/realisations";
import { insightHref } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

const MAIN = "main#contenu";
const DEMO_REALISATION = DEMO_REALISATIONS[0];

test.describe("Page Expertises", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("le titre, l'accroche et les quatre expertises sont présents", async ({ page }) => {
    const response = await page.goto("/expertises");
    expect(response?.status()).toBe(200);

    const main = page.locator(MAIN);
    const title = page.getByRole("heading", { level: 1 });

    await expect(title).toHaveCount(1);
    // Le titre desktop est la réunion des lignes de la maquette : le texte
    // complet n'apparaît donc que sur une seule des deux variantes.
    await expect(title).toContainText(EXPERTISES_PAGE.titleLines.join(" "));
    await expect(main).toContainText(EXPERTISES_PAGE.intro);

    for (const card of EXPERTISES_PAGE.cards) {
      await expect(main).toContainText(card.label);
    }

    await expect(main.locator('a[href^="/expertises/"]')).toHaveCount(EXPERTISES.length);

    for (const expertise of EXPERTISES) {
      const link = main.locator(`a[href="/expertises/${expertise.slug}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toContainText(expertise.title);
    }
  });
});

for (const expertise of EXPERTISES) {
  const route = `/expertises/${expertise.slug}`;

  test(`Expertise — « ${expertise.title} » expose sa définition complète`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const main = page.locator(MAIN);
    const title = page.getByRole("heading", { level: 1 });

    await expect(title).toHaveCount(1);
    await expect(title).toContainText(expertise.title);
    await expect(main).toContainText(
      `${EXPERTISE_DETAIL_LABELS.eyebrowPrefix} ${expertise.number}`,
    );
    await expect(main).toContainText(expertise.introduction);

    for (const eyebrow of [
      EXPERTISE_DETAIL_LABELS.needEyebrow,
      EXPERTISE_DETAIL_LABELS.methodEyebrow,
      EXPERTISE_DETAIL_LABELS.deliverablesEyebrow,
    ]) {
      await expect(main).toContainText(eyebrow);
    }

    await expect(main).toContainText(expertise.cta.title);

    const cta = main.getByRole("link", { name: expertise.cta.label });
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveAttribute("href", expertise.cta.href);
  });
}

for (const insight of INSIGHTS) {
  const route = String(insightHref(insight.slug));

  test(`Article — « ${insight.title} » expose héros, sommaire, sections et partage`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const main = page.locator(MAIN);
    const title = page.getByRole("heading", { level: 1 });

    await expect(title).toHaveCount(1);
    await expect(title).toHaveText(insight.title);
    await expect(main).toContainText(insight.excerpt);
    await expect(main).toContainText(ARTICLE_LABELS.demoEyebrow);
    await expect(main).toContainText(ARTICLE_LABELS.tocTitle);

    const toc = page.locator('nav[aria-labelledby="sommaire-article"]');
    await expect(toc).toBeVisible();

    const anchors = toc.locator("ol > li > a");
    await expect(anchors).toHaveCount(insight.sections.length);

    for (let index = 0; index < insight.sections.length; index += 1) {
      const section = insight.sections[index];
      const anchor = anchors.nth(index);

      await expect(anchor).toHaveAttribute("href", `#${section.id}`);
      await expect(anchor).toContainText(String(index + 1).padStart(2, "0"));
      await expect(anchor).toContainText(section.title);
      // Chaque entrée du sommaire doit pointer une section réellement rendue.
      await expect(page.locator(`h2#${section.id}`)).toHaveText(section.title);
    }

    await anchors.first().click();
    await expect(page).toHaveURL(new RegExp(`#${insight.sections[0].id}$`));

    const share = page.getByRole("link", { name: ARTICLE_LABELS.shareLinkedIn });
    await expect(share).toHaveCount(1);
    await expect(share).toHaveAttribute("target", "_blank");
    await expect(share).toHaveAttribute(
      "href",
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl(route))}`,
    );

    const more = page.getByRole("link", { name: ARTICLE_LABELS.moreAnalyses });
    await expect(more).toHaveCount(1);
    await expect(more).toHaveAttribute("href", /^\/realisations-insights/);
  });
}

test.describe("Hub Réalisations & Insights", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("la rubrique Réalisations affiche son état vide, sans lien de mission", async ({
    page,
  }) => {
    await page.goto("/realisations-insights");

    const section = page.locator(`#${REALISATIONS_SECTION.id}`);
    await expect(section).toBeVisible();
    await expect(section).toContainText(REALISATIONS_SECTION.eyebrow);
    await expect(page.getByRole("heading", { name: REALISATIONS_SECTION.title })).toBeVisible();
    await expect(section).toContainText(REALISATIONS_SECTION.emptyState.badge);
    await expect(section).toContainText(REALISATIONS_SECTION.emptyState.title);
    await expect(section).toContainText(REALISATIONS_SECTION.emptyState.note);
    await expect(section).toContainText(REALISATIONS_SECTION.emptyState.text);
    await expect(section).toContainText(REALISATIONS_SECTION.emptyState.chip);

    // Aucune mission publiée : les contenus de démonstration ne sont jamais listés.
    await expect(section.locator('a[href^="/realisations/"]')).toHaveCount(0);
  });

  test("la rubrique Insights annonce les prochaines publications", async ({ page }) => {
    await page.goto("/realisations-insights");

    const hub = page.locator(`#${INSIGHTS_SECTION.id}`);
    await expect(hub).toBeVisible();
    await expect(hub).toContainText(INSIGHTS_SECTION.emptyAnnouncement.badge);
    await expect(hub).toContainText(INSIGHTS_SECTION.emptyAnnouncement.text);

    // Aucune analyse publiée : les contenus de démonstration ne sont jamais listés.
    await expect(hub.locator("ul li a[href^='/insights/']")).toHaveCount(0);
    await expect(
      page.getByRole("group", { name: INSIGHTS_SECTION.filtersLabel }),
    ).toHaveCount(0);
  });
});

test.describe("Réalisation de démonstration", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("le gabarit mission affiche son surtitre, ses métadonnées et sa bande de conversion", async ({
    page,
  }) => {
    const route = `/realisations/${DEMO_REALISATION.slug}`;
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const main = page.locator(MAIN);
    const title = page.getByRole("heading", { level: 1 });

    await expect(title).toHaveCount(1);
    await expect(title).toHaveText(DEMO_REALISATION.title);
    await expect(main).toContainText(
      `${CASE_STUDY_LABELS.exampleEyebrow} · ${DEMO_REALISATION.eyebrow}`,
    );
    await expect(main).toContainText(DEMO_REALISATION.need);

    for (const pill of [
      `${CASE_STUDY_LABELS.publishedPrefix} · ${CASE_STUDY_LABELS.undefinedValue}`,
      `${CASE_STUDY_LABELS.authorPrefix} · ${CASE_STUDY_LABELS.author}`,
      `${CASE_STUDY_LABELS.readingPrefix} · ${CASE_STUDY_LABELS.undefinedValue}`,
    ]) {
      await expect(main).toContainText(pill);
    }

    for (const eyebrow of [
      CASE_STUDY_LABELS.challengeEyebrow,
      CASE_STUDY_LABELS.approachEyebrow,
      CASE_STUDY_LABELS.objectiveEyebrow,
    ]) {
      await expect(main).toContainText(eyebrow);
    }

    await expect(main).toContainText(CASE_STUDY_LABELS.cta.title);

    const cta = main.getByRole("link", { name: CASE_STUDY_LABELS.cta.label });
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveAttribute("href", CASE_STUDY_LABELS.cta.href);

    const share = page.getByRole("link", { name: CASE_STUDY_LABELS.shareLinkedIn });
    await expect(share).toHaveAttribute(
      "href",
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl(route))}`,
    );

    // Le bandeau de démonstration est réservé aux rubriques du hub.
    await expect(main).not.toContainText(INSIGHTS_SECTION.emptyAnnouncement.text);
  });
});

test.describe("Accueil", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("l'accueil annonce les prochaines publications et renvoie vers ses rubriques", async ({
    page,
  }) => {
    await page.goto("/");

    const main = page.locator(MAIN);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(main).toContainText(INSIGHTS_SECTION.emptyAnnouncement.text);

    for (const slug of EXPERTISES.map((expertise) => expertise.slug)) {
      await expect(main.locator(`a[href="/expertises/${slug}"]`).first()).toBeAttached();
    }
  });
});
