import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import type { Expertise } from "@/content/expertises";
import { EXPERTISE_DETAIL_LABELS } from "@/content/pages";
import { cn } from "@/lib/cn";

/** Méthode d'intervention : quatre étapes en colonnes, séparées par un filet. */
export function ExpertiseDetailMethod({ expertise }: { expertise: Expertise }) {
  return (
    <section className="bg-navy">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <SectionEyebrow tone="goldLight">
              {EXPERTISE_DETAIL_LABELS.methodEyebrow}
            </SectionEyebrow>

            <h2 className="max-w-[560px] text-display-2 text-on-dark-strong">
              {expertise.method.title}
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {expertise.method.steps.map((step, index) => (
              <li
                key={step.id}
                className={cn(
                  "flex flex-col gap-2.5 border-t border-line-dark pt-5",
                  index > 0 && "lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="text-[12px] font-bold tracking-[0.08em] text-gold-soft"
                >
                  {String(step.order).padStart(2, "0")}
                </span>

                <h3 className="text-display-4 text-on-dark-strong">{step.title}</h3>

                <p className="max-w-[280px] text-body-sm text-on-dark-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
