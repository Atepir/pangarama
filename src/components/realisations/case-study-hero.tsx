import { Illustration } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDY_LABELS } from "@/content/pages";
import { formatRealisationDate, type Realisation } from "@/content/realisations";

/**
 * Héros du gabarit réalisation : aplat sable, carte blanche du titre, visuel
 * de 500 × 330 px et pastilles de métadonnées.
 */
export function CaseStudyHero({ realisation }: { realisation: Realisation }) {
  // Un contenu de démonstration annonce sa nature avant celle de la mission.
  const eyebrow = realisation.isExample
    ? `${CASE_STUDY_LABELS.exampleEyebrow} · ${realisation.eyebrow}`
    : realisation.eyebrow;
  // Un contenu de démonstration n’est pas daté : la maquette affiche « À définir ».
  const published = realisation.isExample
    ? CASE_STUDY_LABELS.undefinedValue
    : formatRealisationDate(realisation.publishedAt);
  const readingTime = realisation.readingTime
    ? `${realisation.readingTime} min`
    : CASE_STUDY_LABELS.undefinedValue;

  const meta = [
    `${CASE_STUDY_LABELS.publishedPrefix} · ${published}`,
    `${CASE_STUDY_LABELS.authorPrefix} · ${CASE_STUDY_LABELS.author}`,
    `${CASE_STUDY_LABELS.readingPrefix} · ${readingTime}`,
  ];

  return (
    <section className="bg-mist">
      <Container className="pt-10 pb-12 lg:pt-16 lg:pb-20">
        <Reveal className="flex flex-col items-start gap-5 lg:gap-[26px]">
          {/* Surtitre à 11 px : la maquette ne lui applique pas l’interlettrage des surtitres de section. */}
          <p className="text-[12px] leading-[1.35] font-bold uppercase tracking-[0.08em] text-gold-ink">{eyebrow}</p>

          <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-center lg:gap-[56px]">
            {/* Carte du titre : la maquette pose le titre et l’introduction sur blanc. */}
            <div className="flex w-full flex-col gap-3 bg-white px-[16px] py-[10px] lg:min-w-0 lg:flex-1 lg:gap-[18px]">
              <h1 className="text-[30px] leading-[1.22] font-bold tracking-[-0.6px] text-navy [text-wrap:wrap] lg:w-[700px] lg:max-w-full lg:text-[40px] lg:leading-[1.18] lg:tracking-[-0.8px]">
                {realisation.title}
              </h1>

              <p className="text-[15px] leading-[1.55] text-body-mobile lg:w-[620px] lg:max-w-full lg:text-[17px]">
                {realisation.need}
              </p>
            </div>

            <div className="w-full overflow-clip rounded-frame bg-mist lg:w-[500px] lg:max-w-[45%] lg:shrink-0">
              <Illustration name={realisation.cover} priority />
            </div>
          </div>

          <ul className="flex w-full flex-wrap items-start gap-3">
            {meta.map((label) => (
              <li
                key={label}
                className="rounded-full bg-pill-cream px-3.5 py-2 text-[12px] font-semibold leading-[1.45] whitespace-nowrap text-body"
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
