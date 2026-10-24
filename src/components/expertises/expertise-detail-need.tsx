import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import type { Expertise } from "@/content/expertises";
import { EXPERTISE_DETAIL_LABELS } from "@/content/pages";

/** Besoin client : intitulé à gauche, situations de déclenchement à droite. */
export function ExpertiseDetailNeed({ expertise }: { expertise: Expertise }) {
  return (
    <section className="bg-paper">
      <Container className="section-y">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionEyebrow>{EXPERTISE_DETAIL_LABELS.needEyebrow}</SectionEyebrow>

            <h2 className="max-w-[620px] text-display-2">{expertise.need.title}</h2>

            <p className="max-w-[600px] text-body-lg text-body">{expertise.need.text}</p>
          </div>

          <div className="flex flex-col gap-4 rounded-card bg-ivory p-6 lg:p-7">
            <ul className="flex flex-col divide-y divide-line">
              {expertise.need.items.map((item) => (
                <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="w-5 shrink-0 text-[12px] font-bold leading-[1.6] text-gold-ink"
                  >
                    {String(item.order).padStart(2, "0")}
                  </span>
                  <p className="text-body-sm font-medium leading-[1.5] text-ink">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
