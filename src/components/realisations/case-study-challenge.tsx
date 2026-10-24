import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDY_LABELS } from "@/content/pages";
import type { Realisation } from "@/content/realisations";

/** Bande du défi : aplat navy, intitulé à gauche et développement à droite. */
export function CaseStudyChallenge({ realisation }: { realisation: Realisation }) {
  return (
    <section className="bg-navy">
      <Container className="section-y">
        <Reveal className="flex flex-col items-start gap-5 lg:gap-[26px]">
          <p className="text-[12px] leading-[1.35] font-bold uppercase tracking-[0.08em] text-gold">
            {CASE_STUDY_LABELS.challengeEyebrow}
          </p>

          {/* Deux colonnes seulement quand la largeur du design (610 + 64 + 520) tient dans le conteneur. */}
          <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-start xl:gap-[64px]">
            <h2 className="text-[26px] leading-[1.22] font-bold tracking-[-0.5px] text-on-dark-warm [text-wrap:wrap] lg:text-[40px] lg:leading-[1.18] lg:tracking-[-0.8px] xl:w-[610px] xl:max-w-full xl:min-w-0">
              {realisation.challenge}
            </h2>

            <p className="text-[15px] leading-[1.6] text-on-dark-mobile xl:w-[520px] xl:max-w-full xl:shrink-0">
              {realisation.challengeText}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
