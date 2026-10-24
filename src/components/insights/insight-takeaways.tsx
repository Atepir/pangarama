import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { ARTICLE_LABELS } from "@/content/pages";

/**
 * Section « À retenir » : fond sable, trois cartes ivoire de 412 × 88 px en ligne.
 */
export function InsightTakeaways({ points }: { points: readonly string[] }) {
  if (points.length === 0) {
    return null;
  }

  return (
    <section className="bg-mist">
      <Container className="section-y-tight flex flex-col gap-6">
        {/* Surtitre à 11 px, comme le reste du gabarit. */}
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-ink">
          {ARTICLE_LABELS.takeawaysEyebrow}
        </p>

        <ul className="flex flex-col gap-[18px] lg:flex-row lg:items-stretch">
          {points.map((point, index) => (
            <Reveal
              key={point}
              as="li"
              delay={index * 80}
              className="flex flex-1 flex-col gap-2 rounded-card bg-card-cream px-6 py-6"
            >
              <p aria-hidden="true" className="text-[12px] font-bold leading-[1.35] text-gold-ink">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="text-[20px] font-semibold leading-[1.3] text-navy lg:max-w-[320px]">
                {point}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
