import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { CONTACT_STEPS } from "@/content/pages";

/** Déroulé d'une mission en trois étapes. */
export function ContactSteps() {
  return (
    <section className="bg-navy">
      <Container className="pt-10 pb-12 lg:pt-24 lg:pb-14">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <SectionEyebrow tone="goldLight">{CONTACT_STEPS.eyebrow}</SectionEyebrow>

            <h2 className="max-w-[620px] text-display-2 text-on-dark-strong">
              {CONTACT_STEPS.title}
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
            {CONTACT_STEPS.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 80}
                className="flex flex-col gap-2.5 border-t border-line-dark pt-5"
              >
                <p className="text-[12px] font-bold tracking-[0.08em] text-gold-soft">
                  {String(step.order).padStart(2, "0")}
                </p>
                <h3 className="text-display-4 text-on-dark-strong">{step.title}</h3>
                <p className="max-w-[340px] text-body-sm text-on-dark-body">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
