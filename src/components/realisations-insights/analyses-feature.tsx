import { Illustration } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { RI_ANALYSES_SECTION } from "@/content/pages";

/** Argumentaire de la rubrique « PANGARAMA Insights ». */
export function AnalysesFeature() {
  const section = RI_ANALYSES_SECTION;

  return (
    <section id={section.id} className="bg-paper">
      <Container className="section-y">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,52%)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-cover bg-mist lg:rounded-frame">
            <Illustration name="insight-system" alt="" />
          </div>

          <div className="flex flex-col gap-4">
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>

            <h2 className="max-w-[540px] text-display-compact">{section.title}</h2>

            <p className="max-w-[520px] text-body-lg text-body">{section.text}</p>

            <div className="pt-1">
              <ArrowLink href={section.cta.href}>{section.cta.label}</ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
