import { InsightToc } from "@/components/insights/insight-toc";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import type { Insight, InsightBlock } from "@/content/insights";

/**
 * Corps de l'article : sommaire latéral de 260 px et colonne de lecture de 760 px,
 * titres de section à 28 px et alinéas à 16 px.
 */
export function InsightBody({ insight }: { insight: Insight }) {
  return (
    <section className="bg-ivory">
      <Container className="section-y">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[68px]">
          <InsightToc sections={insight.sections} />

          <div className="flex min-w-px flex-1 flex-col gap-10 lg:gap-12">
            {insight.sections.map((section, index) => (
              <Reveal
                key={section.id}
                as="section"
                delay={index * 60}
                className="flex flex-col gap-4 lg:gap-6"
              >
                <h2
                  id={section.id}
                  className="text-[22px] font-bold leading-[1.18] tracking-[-0.44px] text-navy [text-wrap:wrap] lg:max-w-[760px] lg:text-[28px] lg:tracking-[-0.56px]"
                >
                  {section.title}
                </h2>

                {section.blocks.map((block, blockIndex) => (
                  <InsightBlockView key={`${section.id}-${blockIndex}`} block={block} />
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function InsightBlockView({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-body-md leading-[1.7] text-body lg:max-w-[760px]">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ol className="flex flex-col gap-4">
          {block.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-2 text-body-md leading-[1.6] text-body lg:max-w-[740px]"
            >
              {/* La maquette ouvre chaque item par un numéro doré suivi d'un intitulé
                  court : nos listes sont des phrases complètes, le numéro les porte seul. */}
              <span aria-hidden="true" className="font-bold whitespace-pre text-gold-ink">
                {`${String(index + 1).padStart(2, "0")}  `}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <figure className="flex flex-col gap-3 bg-on-dark-warm px-[22px] py-[20px] lg:max-w-[734px]">
          <blockquote className="text-[18px] font-bold leading-[1.18] tracking-[-0.36px] text-navy lg:max-w-[690px] lg:text-[24px] lg:tracking-[-0.48px]">
            {`« ${block.text} »`}
          </blockquote>
          {block.attribution ? (
            <figcaption className="text-[13px] leading-[1.5] text-body">
              {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );

    case "stat":
      return (
        <div className="flex flex-col gap-1 rounded-card bg-card-cream px-6 py-6 lg:max-w-[412px]">
          <p className="text-[28px] font-bold leading-[1.18] tracking-[-0.56px] text-navy">
            {block.value}
          </p>
          <p className="text-body-sm text-body">{block.label}</p>
        </div>
      );
  }
}
