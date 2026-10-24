import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { formatInsightDate, formatReadingTime, INSIGHT_CATEGORIES, type Insight } from "@/content/insights";
import { ARTICLE_LABELS } from "@/content/pages";

/**
 * Héros du gabarit article : aplat navy, surtitre, titre 58 px, introduction et
 * pastilles d'identification (lecture, auteur, date).
 */
export function InsightHero({ insight }: { insight: Insight }) {
  const category = INSIGHT_CATEGORIES[insight.category];
  const eyebrow = insight.isExample ? ARTICLE_LABELS.demoEyebrow : category.label;
  // Un contenu de démonstration n'est pas daté : la maquette affiche « À définir ».
  const published = insight.isExample
    ? ARTICLE_LABELS.publishedUndefined
    : formatInsightDate(insight.publishedAt);

  const meta = [
    formatReadingTime(insight.readingTime),
    `${ARTICLE_LABELS.authorPrefix} · ${insight.author}`,
    `${ARTICLE_LABELS.publishedPrefix} · ${published}`,
  ];

  return (
    <section className="bg-navy">
      <Container className="pt-10 pb-12 lg:pt-16 lg:pb-20">
        <Reveal className="flex flex-col items-start gap-5 lg:gap-[26px]">
          {/* Surtitre à 11 px : la maquette ne lui applique pas l'interlettrage des surtitres de section. */}
          <p className="text-eyebrow font-bold uppercase text-gold-soft">{eyebrow}</p>

          {/* La maquette de ce gabarit ne force pas de retour à la ligne : les titres réels
              coulent naturellement dans la mesure de 980 px. */}
          <h1 className="w-full text-[30px] font-bold leading-[1.18] tracking-[-0.6px] text-on-dark-warm [text-wrap:wrap] lg:max-w-[980px] lg:text-[58px] lg:tracking-[-1.16px]">
            {insight.title}
          </h1>

          <p className="w-full text-body-md text-on-dark-intro lg:max-w-[760px] lg:text-lead">
            {insight.excerpt}
          </p>

          <ul className="flex w-full flex-wrap items-start gap-3 lg:gap-5">
            {meta.map((label) => (
              <li
                key={label}
                className="rounded-full bg-navy-inset px-3.5 py-2 text-[12px] font-semibold leading-[1.35] whitespace-nowrap text-on-dark-warm"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
