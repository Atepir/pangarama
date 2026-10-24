import { Illustration } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { HOME_APPROACH } from "@/content/pages";

const PILLARS = [
  {
    id: "comprendre",
    order: "01",
    title: "Comprendre",
    text: "Lire l’environnement, les marchés et les parties prenantes avant d’agir.",
  },
  {
    id: "valoriser",
    order: "02",
    title: "Valoriser",
    text: "Donner du relief à l’information, aux performances et aux projets.",
  },
  {
    id: "developper",
    order: "03",
    title: "Développer",
    text: "Transformer les opportunités en décisions, en actions et en résultats.",
  },
] as const;

/** Section « Notre approche » sur fond navy : les trois temps de la méthode. */
export function ApproachSection() {
  return (
    <section className="bg-navy">
      <Container className="section-y">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <Reveal className="order-2 overflow-hidden rounded-cover bg-navy-raised lg:order-1 lg:rounded-frame">
            <Illustration name="field-notes" alt="" />
          </Reveal>

          <Reveal className="order-1 flex flex-col gap-6 lg:order-2">
            <SectionEyebrow tone="goldLight">{HOME_APPROACH.eyebrow}</SectionEyebrow>
            <h2 className="max-w-[520px] text-display-2 text-on-dark-strong">
              {HOME_APPROACH.title}
            </h2>

            <ol className="flex flex-col gap-5 border-t border-line-dark pt-6">
              {PILLARS.map((pillar) => (
                <li key={pillar.id} className="flex gap-4">
                  <span className="text-[12px] font-bold tracking-[0.08em] text-gold-soft">
                    {pillar.order}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-display-4 text-on-dark-strong">{pillar.title}</h3>
                    <p className="max-w-[420px] text-body-sm text-on-dark-body">{pillar.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ArrowLink href={HOME_APPROACH.cta.href} tone="onDark">
              {HOME_APPROACH.cta.label}
            </ArrowLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
