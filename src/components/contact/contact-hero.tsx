import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { CONTACT_PAGE } from "@/content/pages";

/** Introduction de la page Contact : surtitre, titre et présentation. */
export function ContactHero() {
  return (
    <section className="bg-mist">
      <Container className="pt-10 pb-10 lg:pt-16 lg:pb-14">
        <Reveal className="flex flex-col gap-5">
          <SectionEyebrow size="hero">{CONTACT_PAGE.eyebrow}</SectionEyebrow>

          <h1 className="text-display-1 text-navy">{CONTACT_PAGE.title}</h1>

          <p className="max-w-[720px] text-body-md text-body lg:text-lead">
            <span className="lg:hidden">{CONTACT_PAGE.introMobile}</span>
            <span className="hidden lg:inline">{CONTACT_PAGE.intro}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
