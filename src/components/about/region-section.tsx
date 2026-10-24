import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { ABOUT_REGION } from "@/content/about";

/** Ancrage local et ambition régionale, sur fond navy. */
export function RegionSection() {
  return (
    <section className="bg-navy">
      <Container className="section-y">
        <Reveal className="flex max-w-[760px] flex-col gap-5">
          <SectionEyebrow tone="goldLight">{ABOUT_REGION.eyebrow}</SectionEyebrow>

          <h2 className="text-display-2 text-on-dark-strong">
            {ABOUT_REGION.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="max-w-[560px] text-body-lg text-on-dark-body">{ABOUT_REGION.text}</p>
        </Reveal>
      </Container>
    </section>
  );
}
