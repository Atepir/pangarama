"use client";

import { useState } from "react";

import { InsightCard } from "@/components/insights/insight-card";
import { InsightsAnnouncement } from "@/components/insights/insights-announcement";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  INSIGHT_CATEGORIES,
  INSIGHT_CATEGORY_ORDER,
  getPublishedInsights,
  type InsightCategory,
} from "@/content/insights";
import { INSIGHTS_SECTION, INSIGHT_FORMAT_CARDS } from "@/content/pages";
import { cn } from "@/lib/cn";

const ALL = "all";
type Filter = typeof ALL | InsightCategory;

const CHIP_BASE =
  "inline-flex shrink-0 items-center rounded-full px-4 py-2 text-[14px] font-semibold leading-[1.4] transition-colors duration-300 ease-editorial";
const CHIP_ACTIVE = "bg-navy text-on-dark-strong";
const CHIP_IDLE = "bg-paper text-ink hover:bg-line-soft";

const filters: { value: Filter; label: string }[] = [
  { value: ALL, label: INSIGHTS_SECTION.allLabel },
  ...INSIGHT_CATEGORY_ORDER.map((category) => ({
    value: category,
    label: INSIGHT_CATEGORIES[category].shortLabel,
  })),
];

/**
 * Grille éditoriale des analyses. Tant qu'aucune analyse n'est publiée, la
 * rubrique annonce les prochaines publications et présente les trois formats.
 */
export function InsightsHub() {
  const insights = getPublishedInsights();
  const [filter, setFilter] = useState<Filter>(ALL);

  const visible =
    filter === ALL ? insights : insights.filter((insight) => insight.category === filter);

  return (
    <section id={INSIGHTS_SECTION.id} className="bg-mist">
      <Container className="section-y">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading title={INSIGHTS_SECTION.title} size="compact" />

            {insights.length > 0 ? (
              <div
                role="group"
                aria-label={INSIGHTS_SECTION.filtersLabel}
                className="flex flex-wrap items-center gap-2"
              >
                {filters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={filter === item.value}
                    onClick={() => setFilter(item.value)}
                    className={cn(CHIP_BASE, filter === item.value ? CHIP_ACTIVE : CHIP_IDLE)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {insights.length === 0 ? (
            <div className="flex flex-col gap-6">
              <InsightsAnnouncement />

              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {INSIGHT_FORMAT_CARDS.map((format, index) => (
                  <Reveal
                    as="li"
                    key={format.category}
                    delay={index * 70}
                    className="flex flex-col gap-2 rounded-card border border-line bg-paper p-5 lg:p-6"
                  >
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-ink">
                      {format.label}
                    </p>
                    <p className="text-body-sm text-body">{format.description}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          ) : visible.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((insight, index) => (
                <Reveal as="li" key={insight.slug} delay={index * 80} className="h-full">
                  <InsightCard
                    insight={insight}
                    showMeta
                    metaFormat="category"
                    showExcerpt
                    linkLabel="Lire l’analyse"
                  />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="text-body-lg text-body">{INSIGHTS_SECTION.emptyLabel}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
