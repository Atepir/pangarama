import { describe, expect, it } from "vitest";

import {
  ALL_REALISATIONS,
  DEMO_REALISATIONS,
  REALISATIONS,
  formatRealisationDate,
  getExampleRealisations,
  getPublishedRealisations,
  getRealisationBySlug,
} from "@/content/realisations";

describe("realisations", () => {
  it("laisse la liste publiée vide tant qu’aucune mission n’est disponible", () => {
    expect(REALISATIONS).toHaveLength(0);
    expect(getPublishedRealisations()).toHaveLength(0);
  });

  it("n’expose qu’un exemple de démonstration, sans client ni métrique inventés", () => {
    expect(DEMO_REALISATIONS).toHaveLength(1);

    const demo = DEMO_REALISATIONS[0]!;

    expect(demo.isExample).toBe(true);
    expect(demo.client).toBeNull();
    expect(demo.metrics).toHaveLength(0);
    expect(demo.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(demo.title.length).toBeGreaterThan(20);
    expect(demo.need.length).toBeGreaterThan(20);
  });

  it("compose la liste complète à partir des publiées et des exemples", () => {
    expect(ALL_REALISATIONS).toEqual([...REALISATIONS, ...DEMO_REALISATIONS]);
    expect(getExampleRealisations()).toEqual(DEMO_REALISATIONS);
  });

  it("résout une réalisation par son slug et ignore les autres", () => {
    expect(getRealisationBySlug("exemple-etude-de-marche")?.isExample).toBe(true);
    expect(getRealisationBySlug("mission-inconnue")).toBeUndefined();
  });

  it("décrit la démarche en quatre étapes et les points de l’objectif", () => {
    const demo = DEMO_REALISATIONS[0]!;

    expect(demo.approach).toHaveLength(4);
    for (const step of demo.approach) {
      expect(step.title.length).toBeGreaterThan(2);
      expect(step.description.length).toBeGreaterThan(10);
    }

    expect(demo.deliverables.length).toBeGreaterThanOrEqual(2);
    expect(demo.resultPoints.length).toBeGreaterThanOrEqual(3);
    expect(demo.challenge.length).toBeGreaterThan(10);
    expect(demo.challengeText.length).toBeGreaterThan(40);
    expect(demo.resultText.length).toBeGreaterThan(40);
  });

  it("affiche la date de la réalisation en mois et année", () => {
    expect(formatRealisationDate("2026-06-01")).toBe("juin 2026");
    expect(formatRealisationDate("2025-01-15")).toBe("janvier 2025");
  });
});
