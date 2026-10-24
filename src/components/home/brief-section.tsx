import { Illustration } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { ActionLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { HOME_BRIEF } from "@/content/pages";

/** Section « Pangarama en bref » : présentation courte et renvoi vers À propos. */
export function BriefSection() {
  return (
    <section className="bg-paper">
      <Container className="section-y">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionEyebrow>{HOME_BRIEF.eyebrow}</SectionEyebrow>
            <h2 className="max-w-[620px] text-display-2">{HOME_BRIEF.title}</h2>
            <p className="max-w-[600px] text-body-lg text-body">{HOME_BRIEF.text}</p>
            <div className="pt-1">
              <ActionLink href={HOME_BRIEF.cta.href} variant="outline">
                {HOME_BRIEF.cta.label}
              </ActionLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-cover bg-mist lg:rounded-frame">
            <Illustration name="market-report" alt="" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
