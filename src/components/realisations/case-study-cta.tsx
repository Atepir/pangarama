import { Container } from "@/components/layout/container";
import { ActionLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDY_LABELS } from "@/content/pages";
import { asHref } from "@/lib/routes";

/**
 * Bande de conversion du gabarit réalisation : aplat navy centré et pastille
 * crème, comme les autres bandeaux de fin de page.
 */
export function CaseStudyCta() {
  return (
    <section className="bg-navy text-white">
      <Container className="flex flex-col items-center gap-5 py-[40px] text-center lg:gap-[26px] lg:py-[68px]">
        <Reveal className="flex flex-col items-center gap-5 lg:gap-[26px]">
          <h2 className="text-[26px] leading-[1.22] font-bold tracking-[-0.5px] text-white [text-wrap:balance] lg:w-[900px] lg:max-w-full lg:text-left lg:text-[36px] lg:leading-[1.18] lg:tracking-[-0.7px]">
            {CASE_STUDY_LABELS.cta.title}
          </h2>

          <ActionLink href={asHref(CASE_STUDY_LABELS.cta.href)} size="lg" variant="light">
            {CASE_STUDY_LABELS.cta.label}
          </ActionLink>
        </Reveal>
      </Container>
    </section>
  );
}
