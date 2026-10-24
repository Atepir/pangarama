import Link from "next/link";

import { Emblem, emblemKey } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow, SectionHeading } from "@/components/ui/section-heading";
import { EXPERTISES } from "@/content/expertises";
import { HOME_EXPERTISES } from "@/content/pages";
import { expertiseHref } from "@/lib/routes";

/**
 * Les quatre expertises : cartes empilées sur mobile, lignes numérotées à
 * partir du desktop (emblème, intitulé, description, flèche de navigation).
 * Dans les deux cas, l'intitulé mène à la page dédiée.
 */
export function ExpertisesSection() {
  return (
    <section id="expertises" className="bg-mist">
      <Container className="section-y">
        <Reveal className="flex flex-col gap-8 lg:gap-10">
          <SectionEyebrow className="lg:hidden">{HOME_EXPERTISES.eyebrow}</SectionEyebrow>

          <div className="hidden lg:block">
            <SectionHeading title={HOME_EXPERTISES.title} label={HOME_EXPERTISES.label} />
          </div>

          <ul className="flex flex-col gap-3 lg:gap-0">
            {EXPERTISES.map((expertise, index) => {
              const emblem = emblemKey(expertise.emblem);

              return (
                <Reveal
                  as="li"
                  key={expertise.slug}
                  delay={index * 60}
                  className="lg:border-t lg:border-rule lg:last:border-b"
                >
                  <Link
                    href={expertiseHref(expertise.slug)}
                    className="group flex w-full flex-col gap-3 rounded-card bg-paper p-5 transition-colors duration-300 ease-editorial hover:bg-white lg:flex-row lg:items-center lg:gap-8 lg:rounded-none lg:bg-transparent lg:px-2 lg:py-7 lg:hover:bg-paper"
                  >
                    <div className="flex items-center gap-4 lg:w-[168px] lg:shrink-0">
                      <p className="text-[12px] font-bold tracking-[0.08em] text-gold-ink">
                        {expertise.number}
                      </p>
                      {emblem ? <Emblem name={emblem} className="rounded-card" /> : null}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:flex-row lg:items-baseline lg:gap-8">
                      <h3 className="max-w-[420px] text-display-3 text-navy transition-colors duration-300 ease-editorial group-hover:text-gold-ink lg:w-[300px] lg:shrink-0 xl:w-[400px]">
                        {expertise.title}
                      </h3>
                      <p className="max-w-[560px] text-body-md text-body">
                        {expertise.shortDescription}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="hidden text-[22px] text-navy transition-transform duration-300 ease-editorial group-hover:translate-x-1 lg:block"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
