import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDY_LABELS } from "@/content/pages";
import type { Realisation } from "@/content/realisations";

/**
 * Bande de l’objectif : carte blanche de l’intitulé à gauche, points de
 * livraison numérotés à droite. Les métriques ne s’affichent que si la
 * mission en fournit : l’exemple de la maquette n’en porte pas.
 */
export function CaseStudyObjective({ realisation }: { realisation: Realisation }) {
  return (
    <section className="bg-mist">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-[56px]">
          <div className="flex w-full flex-col gap-[14px] bg-white px-5 py-5 lg:min-h-[230px] lg:min-w-0 lg:flex-1 lg:px-[25px] lg:py-[9px]">
            <p className="text-[12px] leading-[1.35] font-bold uppercase tracking-[0.08em] text-gold-ink lg:w-[150px]">
              {CASE_STUDY_LABELS.objectiveEyebrow}
            </p>
            <h2 className="text-[26px] leading-[1.22] font-bold tracking-[-0.5px] text-navy [text-wrap:wrap] lg:w-[620px] lg:max-w-full lg:text-[40px] lg:leading-[1.18] lg:tracking-[-0.8px]">
              {realisation.result}
            </h2>
            <p className="text-[15px] leading-[1.55] text-body-mobile lg:w-[600px] lg:max-w-full">
              {realisation.resultText}
            </p>
          </div>

          <ul className="flex w-full flex-col gap-4 lg:w-[410px] lg:shrink-0 lg:gap-[16px]">
            {realisation.resultPoints.map((point, index) => (
              <li key={point} className="flex items-center gap-4 lg:min-h-[66px]">
                <span className="text-[28px] leading-[1.18] font-bold tracking-[-0.56px] whitespace-nowrap text-gold-ink lg:w-[25px] lg:shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.45] font-medium text-body">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {realisation.metrics.length > 0 ? (
          <Reveal delay={80} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-[56px] lg:gap-[28px]">
            {realisation.metrics.map((metric) => (
              <div key={metric.label} className="rounded-card bg-white p-5">
                <p className="text-[12px] leading-[1.35] font-bold uppercase tracking-[0.08em] text-gold-ink">
                  {metric.label}
                </p>
                <p className="text-[24px] leading-[1.2] font-bold text-navy">{metric.value}</p>
              </div>
            ))}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
