import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { ABOUT_METHOD } from "@/content/about";
import { METHOD_STEPS } from "@/content/method";

/** Méthode d'intervention : quatre étapes numérotées et décrites. */
export function MethodSection() {
  return (
    <section id={ABOUT_METHOD.id} className="bg-navy">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <SectionEyebrow tone="goldLight">{ABOUT_METHOD.eyebrow}</SectionEyebrow>

            <h2 className="max-w-[620px] text-display-2 text-on-dark-strong">
              {ABOUT_METHOD.title}
            </h2>

            <p className="max-w-[680px] text-body-lg text-on-dark-body">{ABOUT_METHOD.intro}</p>
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {METHOD_STEPS.map((step, index) => (
              <li
                key={step.id}
                className={
                  index > 0
                    ? "flex flex-col gap-2.5 border-t border-line-dark pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
                    : "flex flex-col gap-2.5 border-t border-line-dark pt-5 lg:border-t-0 lg:pt-0"
                }
              >
                <span
                  aria-hidden="true"
                  className="text-[12px] font-bold tracking-[0.08em] text-gold-soft"
                >
                  {String(step.order).padStart(2, "0")}
                </span>

                <h3 className="text-display-4 text-on-dark-strong">{step.title}</h3>

                <p className="max-w-[260px] text-body-sm text-on-dark-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
