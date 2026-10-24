import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import type { LegalFact } from "@/content/legal";

/**
 * Cartes d'informations juridiques : chaque bloc de contenu de la maquette est
 * une carte encadrée de 111 px de haut (filet 1 px, marges 24/28, titres 20 px).
 */
export function LegalFacts({ facts }: { facts: readonly LegalFact[] }) {
  return (
    <section className="bg-paper">
      <Container className="section-y-tight">
        <dl className="flex max-w-[960px] flex-col gap-4 lg:gap-5">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.id}
              delay={index * 80}
              className="flex flex-col gap-2 rounded-card border border-line bg-ivory px-6 py-6 lg:gap-3 lg:px-7 lg:py-7"
            >
              <dt className="text-[16px] font-semibold leading-[1.4] text-navy lg:text-[20px] lg:leading-[27px]">
                {fact.title}
              </dt>
              <dd className="text-[15px] leading-[1.6] text-navy">
                {fact.body}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
