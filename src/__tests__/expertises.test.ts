import { describe, expect, it } from "vitest";

import { EXPERTISES, getExpertise, getExpertiseSlugs } from "@/content/expertises";

const EXPECTED = [
  { slug: "communication-financiere-corporate", number: "01", title: "Communication financière & corporate" },
  { slug: "etudes-intelligence-strategique", number: "02", title: "Études & Intelligence stratégique" },
  { slug: "evenementiel-engagement", number: "03", title: "Événementiel & Engagement" },
  { slug: "developpement-accompagnement", number: "04", title: "Développement & Accompagnement" },
];

describe("expertises", () => {
  it("déclare exactement les quatre expertises, numérotées 01 → 04", () => {
    expect(EXPERTISES).toHaveLength(4);
    expect(EXPERTISES.map((expertise) => expertise.number)).toEqual([
      "01",
      "02",
      "03",
      "04",
    ]);
    expect(EXPERTISES.map((expertise) => expertise.slug)).toEqual(
      EXPECTED.map((entry) => entry.slug),
    );
    expect(EXPERTISES.map((expertise) => expertise.title)).toEqual(
      EXPECTED.map((entry) => entry.title),
    );
  });

  it("expose des slugs uniques et réutilisables en URL", () => {
    const slugs = getExpertiseSlugs();

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("résout une expertise par son slug", () => {
    expect(getExpertise("evenementiel-engagement")?.number).toBe("03");
    expect(getExpertise("inexistante")).toBeUndefined();
  });

  it.each(EXPERTISES.map((expertise) => [expertise.slug, expertise] as const))(
    "décrit complètement l’expertise %s (hub, besoin, méthode, livrables)",
    (_slug, expertise) => {
      expect(expertise.hubLabel.length).toBeGreaterThan(0);
      expect(expertise.emblem).toMatch(/^[A-Z]{2}$/);
      expect(expertise.tagline.length).toBeGreaterThan(10);
      expect(expertise.shortDescription.length).toBeGreaterThan(40);
      expect(expertise.cardSummaryMobile.length).toBeGreaterThan(20);
      expect(expertise.introduction.length).toBeGreaterThan(100);

      // Bloc condensé de la page Expertises : quatre lignes « Nous intervenons sur ».
      expect(expertise.hub.summary.length).toBeGreaterThan(20);
      expect(expertise.hub.interventions.length).toBeGreaterThanOrEqual(4);
      expect(expertise.hub.deliverables.length).toBeGreaterThan(20);
      expect(["mist", "haze", "navy-raised", "navy"]).toContain(
        expertise.hub.illustrationPlate,
      );

      // Page détail : besoin, méthode et prestations.
      expect(expertise.need.title.length).toBeGreaterThan(0);
      expect(expertise.need.text.length).toBeGreaterThan(40);
      expect(expertise.need.items.length).toBeGreaterThanOrEqual(3);
      expect(expertise.method.title.length).toBeGreaterThan(0);
      expect(expertise.method.steps.length).toBeGreaterThanOrEqual(3);

      expect(expertise.interventions.length).toBeGreaterThanOrEqual(4);
      expect(expertise.deliverables.length).toBeGreaterThanOrEqual(4);

      expect(expertise.cta.href).toBe("/contact");
      expect(expertise.cta.label.length).toBeGreaterThan(0);
      expect(expertise.cta.title.length).toBeGreaterThan(0);
    },
  );

  it("numérote les items de besoin et les étapes de méthode de façon croissante", () => {
    for (const expertise of EXPERTISES) {
      const needOrders = expertise.need.items.map((item) => item.order);

      expect(needOrders).toEqual(needOrders.map((_, index) => index + 1));

      const stepOrders = expertise.method.steps.map((step) => step.order);

      expect(stepOrders).toEqual(stepOrders.map((_, index) => index + 1));

      // Identifiants d’ancrage uniques, utilisés par les liens de section.
      const ids = [
        ...expertise.need.items.map((item) => item.id),
        ...expertise.method.steps.map((step) => step.id),
      ];

      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("découpe le titre du hero desktop uniquement en lignes exactes", () => {
    for (const expertise of EXPERTISES) {
      if (!expertise.heroTitleLines) {
        continue;
      }

      expect(expertise.heroTitleLines.length).toBeGreaterThan(1);
      expect(expertise.heroTitleLines.join(" ")).toBe(expertise.title);
    }
  });
});
