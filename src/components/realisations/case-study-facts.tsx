import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDY_LABELS } from "@/content/pages";
import type { Realisation } from "@/content/realisations";

/** Bande des faits : contexte, mission, durée et livrables en quatre cartes égales. */
export function CaseStudyFacts({ realisation }: { realisation: Realisation }) {
  const facts = [
    { label: CASE_STUDY_LABELS.fields.context, value: realisation.context },
    { label: CASE_STUDY_LABELS.fields.mission, value: realisation.mission },
    { label: CASE_STUDY_LABELS.fields.duration, value: realisation.duration },
    {
      label: CASE_STUDY_LABELS.fields.deliverables,
      value: realisation.deliverables.join(", "),
    },
  ];

  return (
    <section className="bg-ivory">
      <Container className="section-y">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[28px]">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 80}
              /* La première carte se détache sur un ton chaud, les suivantes restent claires. */
              className={`flex flex-col gap-2 rounded-card p-5 ${
                index === 0 ? "bg-on-dark-warm" : "bg-card-mist"
              }`}
            >
              <dt className="text-[12px] leading-[1.35] font-bold uppercase tracking-[0.08em] text-gold-ink">
                {fact.label}
              </dt>
              <dd className="text-[16px] leading-[1.4] font-semibold text-navy lg:w-[270px] lg:max-w-full">
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
