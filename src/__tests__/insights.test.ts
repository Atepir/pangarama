import { describe, expect, it } from "vitest";

import {
  INSIGHTS,
  INSIGHT_CATEGORIES,
  INSIGHT_CATEGORY_ORDER,
  formatInsightDate,
  formatReadingTime,
  getExampleInsights,
  getInsightBySlug,
  getInsightsByCategory,
  getPublishedInsights,
  getRelatedInsights,
} from "@/content/insights";

const BLOCK_TYPES = ["paragraph", "list", "quote", "stat"];

describe("insights", () => {
  it("déclare des contenus identifiables et correctement typés", () => {
    expect(INSIGHTS.length).toBeGreaterThanOrEqual(3);

    const slugs = INSIGHTS.map((insight) => insight.slug);

    expect(new Set(slugs).size).toBe(slugs.length);

    for (const insight of INSIGHTS) {
      expect(insight.title.length).toBeGreaterThan(10);
      expect(insight.excerpt.length).toBeGreaterThan(60);
      expect(INSIGHT_CATEGORY_ORDER).toContain(insight.category);
      expect(insight.author.length).toBeGreaterThan(0);
      expect(insight.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(insight.publishedAt))).toBe(false);
      expect(insight.readingTime).toBeGreaterThan(0);
      expect(insight.keywords.length).toBeGreaterThanOrEqual(2);
      expect(typeof insight.isExample).toBe("boolean");
      if (insight.updatedAt) {
        expect(insight.updatedAt >= insight.publishedAt).toBe(true);
      }

      // Trois points clés attendus par le gabarit « À retenir ».
      if (insight.keyPoints) {
        expect(insight.keyPoints).toHaveLength(3);
      }
    }
  });

  it("structure chaque article en sections identifiées et non vides", () => {
    for (const insight of INSIGHTS) {
      expect(insight.sections.length).toBeGreaterThanOrEqual(2);

      const ids = insight.sections.map((section) => section.id);

      expect(new Set(ids).size).toBe(ids.length);

      for (const section of insight.sections) {
        expect(section.title.length).toBeGreaterThan(3);
        expect(section.blocks.length).toBeGreaterThan(0);

        for (const block of section.blocks) {
          expect(BLOCK_TYPES).toContain(block.type);

          switch (block.type) {
            case "paragraph":
              expect(block.text.length).toBeGreaterThan(60);
              break;
            case "list":
              expect(block.items.length).toBeGreaterThanOrEqual(2);
              break;
            case "quote":
              expect(block.text.length).toBeGreaterThan(20);
              break;
            case "stat":
              expect(block.value.length).toBeGreaterThan(0);
              expect(block.label.length).toBeGreaterThan(0);
              break;
          }
        }
      }
    }
  });

  it("libelle chaque famille éditoriale", () => {
    expect(INSIGHT_CATEGORY_ORDER).toEqual(["insight", "decryptage", "chiffre"]);

    for (const category of INSIGHT_CATEGORY_ORDER) {
      const meta = INSIGHT_CATEGORIES[category];

      expect(meta.label.length).toBeGreaterThan(5);
      expect(meta.shortLabel.length).toBeGreaterThan(2);
      expect(meta.description.length).toBeGreaterThan(40);
    }
  });

  it("résout un article par son slug", () => {
    expect(
      getInsightBySlug("structurer-un-rapport-annuel-qui-eclaire-la-decision")?.category,
    ).toBe("insight");
    expect(getInsightBySlug("slug-inexistant")).toBeUndefined();
  });

  it("partitionne les contenus publiés et les exemples", () => {
    const published = getPublishedInsights();
    const examples = getExampleInsights();

    expect(published.length + examples.length).toBe(INSIGHTS.length);
    expect(published.every((insight) => !insight.isExample)).toBe(true);
    expect(examples.every((insight) => insight.isExample)).toBe(true);
    // Aucun contenu éditorial réel n’est encore fourni : tout est un exemple.
    expect(published).toHaveLength(0);
  });

  it("filtre les articles par famille", () => {
    const total = INSIGHT_CATEGORY_ORDER.reduce(
      (count, category) => count + getInsightsByCategory(category).length,
      0,
    );

    expect(total).toBe(INSIGHTS.length);
    for (const category of INSIGHT_CATEGORY_ORDER) {
      expect(
        getInsightsByCategory(category).every(
          (insight) => insight.category === category,
        ),
      ).toBe(true);
    }
  });

  it("propose des analyses liées sans jamais répéter l’article courant", () => {
    const current = INSIGHTS[0]!;
    const related = getRelatedInsights(current.slug);

    expect(related.length).toBe(Math.min(3, INSIGHTS.length - 1));
    expect(related.some((insight) => insight.slug === current.slug)).toBe(false);

    // Même famille d’abord.
    const sameCategory = getInsightsByCategory(current.category).filter(
      (insight) => insight.slug !== current.slug,
    );
    const relatedSlugs = related.map((insight) => insight.slug);

    for (const insight of sameCategory) {
      expect(relatedSlugs).toContain(insight.slug);
    }

    expect(getRelatedInsights(current.slug, 1)).toHaveLength(1);
  });

  it("formate les dates de publication en français", () => {
    expect(formatInsightDate("2026-06-12")).toBe("12 juin 2026");
    expect(formatInsightDate("2026-04-08")).toBe("8 avril 2026");
  });

  it("formate le temps de lecture", () => {
    expect(formatReadingTime(7)).toBe("7 min de lecture");
    expect(formatReadingTime(1)).toBe("1 min de lecture");
  });
});
