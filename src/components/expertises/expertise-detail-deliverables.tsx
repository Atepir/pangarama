import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import type { Expertise } from "@/content/expertises";
import { EXPERTISE_DETAIL_LABELS } from "@/content/pages";

/** Livrables types : une carte par livrable. */
export function ExpertiseDetailDeliverables({ expertise }: { expertise: Expertise }) {
  return (
    <section className="bg-ivory">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-8">
          <SectionEyebrow>{EXPERTISE_DETAIL_LABELS.deliverablesEyebrow}</SectionEyebrow>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.deliverables.map((deliverable, index) => (
              <li
                key={deliverable}
                className="flex min-h-[160px] flex-col gap-6 rounded-card border border-line bg-paper p-6"
              >
                <span
                  aria-hidden="true"
                  className="text-[12px] font-bold tracking-[0.08em] text-gold-ink"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-display-4 text-navy">{deliverable}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
