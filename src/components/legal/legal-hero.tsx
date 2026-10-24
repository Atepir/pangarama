import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { LegalPageContent } from "@/content/legal";

/**
 * Bandeau d'introduction des pages juridiques : surtitre, titre 56 px et chapô.
 * La maquette n'existe qu'en desktop ; sous 1024 px, le gabarit reprend les
 * mesures mobiles des autres heros de page.
 */
export function LegalHero({ page }: { page: LegalPageContent }) {
  return (
    <section className="bg-mist">
      <Container className="pt-12 pb-10 lg:pt-20 lg:pb-14">
        <Reveal className="flex flex-col gap-4 lg:gap-[20px]">
          <SectionEyebrow size="compact">{page.eyebrow}</SectionEyebrow>

          <h1 className="text-display-1 text-navy">{page.title}</h1>

          <p className="text-body-md text-body lg:max-w-[900px] lg:text-lead">
            {page.intro}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
