import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { ABOUT_MISSION } from "@/content/about";

/** Mission et piliers d'intervention. */
export function MissionSection() {
  return (
    <section className="bg-mist">
      <Container className="section-y">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionEyebrow>{ABOUT_MISSION.eyebrow}</SectionEyebrow>

            <p className="max-w-[720px] text-display-compact text-navy">
              {ABOUT_MISSION.title}
            </p>
          </div>

          <div className="flex flex-col gap-6 border-line-warm lg:border-l lg:pl-10">
            {ABOUT_MISSION.pillars.map((pillar) => (
              <div key={pillar.id} className="flex flex-col gap-2">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-ink">
                  {pillar.title}
                </h3>
                <p className="text-body-md text-body">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
