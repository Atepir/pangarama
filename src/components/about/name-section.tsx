import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { ABOUT_NAME } from "@/content/about";

/** Signification du nom : lecture PANGA / RAMA, sans « + ». */
export function NameSection() {
  return (
    <section className="bg-paper">
      <Container className="section-y">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionEyebrow>{ABOUT_NAME.eyebrow}</SectionEyebrow>

            <h2 className="max-w-[560px] text-display-2">{ABOUT_NAME.title}</h2>

            <p className="max-w-[600px] text-body-lg text-body">{ABOUT_NAME.text}</p>
          </div>

          <div className="rounded-frame bg-navy p-7 lg:p-9">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-soft">
              Étymologie
            </p>

            <dl className="mt-4 flex flex-col">
              {ABOUT_NAME.parts.map((part) => {
                const [word, meaning] = part.text.split(" = ");

                return (
                  <div
                    key={part.id}
                    className="flex flex-col gap-1.5 border-t border-line-dark py-5 last:pb-0"
                  >
                    <dt
                      className={
                        part.tone === "navy"
                          ? "text-[26px] font-bold tracking-[-0.02em] text-cream"
                          : "text-[26px] font-bold tracking-[-0.02em] text-gold-soft"
                      }
                    >
                      {word}
                    </dt>
                    <dd className="text-body-sm text-on-dark-body">{meaning}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
