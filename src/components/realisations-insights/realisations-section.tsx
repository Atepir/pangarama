import { Container } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { REALISATIONS_SECTION } from "@/content/pages";
import { getPublishedRealisations } from "@/content/realisations";
import { realisationHref } from "@/lib/routes";

/**
 * Rubrique des missions. Tant qu'aucune mission n'est publiée, la section
 * affiche un état vide explicite plutôt que des contenus de démonstration.
 */
export function RealisationsSection() {
  const section = REALISATIONS_SECTION;
  const realisations = getPublishedRealisations();
  const empty = section.emptyState;

  return (
    <section id={section.id} className="bg-ivory">
      <Container className="section-y">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title={section.title}
            label={section.eyebrow}
            size="compact"
          />

          {realisations.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {realisations.map((realisation) => (
                <li key={realisation.slug}>
                  <article className="flex h-full flex-col gap-3 rounded-cover bg-navy p-6 lg:p-7">
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-soft">
                      {realisation.category}
                    </p>
                    <p className="text-display-3 text-on-dark-strong">{realisation.title}</p>
                    <p className="text-body-sm text-on-dark-copy">{realisation.mission}</p>
                    <div className="mt-auto pt-2">
                      <ArrowLink href={realisationHref(realisation.slug)} tone="onDark">
                        Voir la mission
                      </ArrowLink>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="flex flex-col gap-4 rounded-cover bg-navy p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-cream px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-clay">
                  {empty.badge}
                </span>
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-label">
                  {empty.note}
                </span>
              </div>

              <p className="max-w-[760px] text-display-3 text-on-dark-strong">{empty.title}</p>

              <p className="max-w-[680px] text-body-sm text-on-dark-copy">{empty.text}</p>

              <p className="text-body-sm font-semibold text-gold-soft">{empty.chip}</p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
