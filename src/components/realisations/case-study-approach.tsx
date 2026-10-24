import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDY_LABELS } from "@/content/pages";
import type { Realisation } from "@/content/realisations";

/**
 * Bande de la démarche : quatre étapes numérotées, séparées par un filet
 * vertical sur desktop et horizontal sur mobile.
 */
export function CaseStudyApproach({ realisation }: { realisation: Realisation }) {
  return (
    <section className="bg-ivory">
      <Container className="section-y">
        <Reveal className="flex flex-col items-start gap-5 lg:gap-[26px]">
          <p className="text-[12px] leading-[1.35] font-bold uppercase tracking-[0.08em] text-gold-ink">
            {CASE_STUDY_LABELS.approachEyebrow}
          </p>

          <ol className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-0">
            {realisation.approach.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 80}
                /* Première colonne sans filet : la maquette n’en dessine qu’entre les étapes. */
                className={`flex flex-col gap-[10px] border-t border-line-warm pt-5 lg:min-h-[162px] lg:border-t-0 lg:py-[20px] ${
                  index === 0 ? "lg:pr-[22px]" : "lg:border-l lg:px-[22px]"
                }`}
              >
                <span className="text-[12px] leading-[1.35] font-bold text-gold-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[19px] leading-[1.2] font-bold tracking-[-0.38px] text-navy lg:text-[21px] lg:leading-[1.18] lg:tracking-[-0.42px]">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[1.55] text-body lg:w-[280px] lg:max-w-full">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
