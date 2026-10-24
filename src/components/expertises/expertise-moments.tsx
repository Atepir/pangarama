import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { EXPERTISE_HUB_LABELS, EXPERTISE_MOMENTS } from "@/content/pages";
import { cn } from "@/lib/cn";

/** Moments de mobilisation : les quatre situations où PANGARAMA est appelé. */
export function ExpertiseMoments() {
  return (
    <section className="bg-paper">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-8">
          <SectionEyebrow>{EXPERTISE_HUB_LABELS.momentsEyebrow}</SectionEyebrow>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE_MOMENTS.map((moment, index) => (
              <li
                key={moment.id}
                className={cn(
                  "flex flex-col gap-2 rounded-card p-5 lg:p-6",
                  index === 0 ? "bg-haze" : "bg-ivory",
                )}
              >
                <p className="text-[12px] font-bold tracking-[0.08em] text-gold-ink">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-display-4 text-navy">{moment.title}</p>
                <p className="text-body-sm text-body">{moment.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
