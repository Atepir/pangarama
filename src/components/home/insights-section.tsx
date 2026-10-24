import { InsightCard } from "@/components/insights/insight-card";
import { InsightsAnnouncement } from "@/components/insights/insights-announcement";
import { Container } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublishedInsights } from "@/content/insights";
import { HOME_INSIGHTS, INSIGHT_FORMAT_CARDS } from "@/content/pages";

const HOME_INSIGHT_COUNT = 3;

/**
 * Aperçu des analyses. Tant qu'aucune analyse n'est publiée, la section annonce
 * les prochaines publications et présente les trois formats éditoriaux.
 */
export function InsightsSection() {
  const insights = getPublishedInsights();

  return (
    <section id="insights" className="bg-ivory">
      <Container className="section-y">
        <div className="flex flex-col gap-8 lg:gap-10">
          <SectionHeading
            title={HOME_INSIGHTS.title}
            label={HOME_INSIGHTS.label}
            size="compact"
          />

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

              <ArrowLink href="/realisations-insights#insights">
                Découvrir la rubrique
              </ArrowLink>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {insights.slice(0, HOME_INSIGHT_COUNT).map((insight, index) => (
                <Reveal as="li" key={insight.slug} delay={index * 80} className="h-full">
                  <InsightCard insight={insight} showMeta showExcerpt />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
