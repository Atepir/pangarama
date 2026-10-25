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
                    className="group relative flex w-full flex-col gap-4 rounded-card bg-paper p-5 transition-colors duration-200 ease-editorial hover:bg-white focus-visible:bg-white lg:grid lg:grid-cols-[128px_minmax(0,1fr)_24px] lg:items-center lg:gap-6 lg:rounded-none lg:bg-transparent lg:px-2 lg:py-6 lg:hover:bg-paper lg:focus-visible:bg-paper"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-[12px] font-bold tracking-[0.08em] text-gold-ink">
                        {expertise.number}
                      </p>
                      {emblem ? <Emblem name={emblem} className="rounded-card" /> : null}
                    </div>

                    <div className="flex min-w-0 flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:items-start lg:gap-8">
                      <h3 className="max-w-[420px] text-display-3 text-navy transition-colors duration-200 ease-editorial group-hover:text-gold-ink group-focus-visible:text-gold-ink">
                        {expertise.title}
                      </h3>
                      <p className="max-w-[560px] text-body-md text-body">
                        {expertise.shortDescription}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute top-7 right-5 text-[22px] text-navy transition-transform duration-200 ease-editorial group-hover:translate-x-1 group-focus-visible:translate-x-1 lg:static"
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
