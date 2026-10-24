import Link from "next/link";

import { Illustration } from "@/components/art/illustration";
import { Container } from "@/components/layout/container";
import { ActionLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { EXPERTISES, type Expertise, type ExpertiseHub } from "@/content/expertises";
import { EXPERTISE_HUB_LABELS } from "@/content/pages";
import { cn } from "@/lib/cn";
import { expertiseHref } from "@/lib/routes";

type SectionTheme = {
  surface: string;
  accent: "gold" | "goldLight";
  number: string;
  title: string;
  description: string;
  listItem: string;
  label: string;
  deliverables: string;
  link: string;
};

/** Une ligne par expertise, dans l'ordre de `EXPERTISES` : clair, navy, clair, navy. */
const THEMES: readonly SectionTheme[] = [
  {
    surface: "bg-paper",
    accent: "gold",
    number: "text-gold-ink",
    title: "text-navy",
    description: "text-body",
    listItem: "text-ink",
    label: "text-gold-ink",
    deliverables: "text-body",
    link: "text-navy",
  },
  {
    surface: "bg-navy",
    accent: "goldLight",
    number: "text-gold-soft",
    title: "text-on-dark-strong",
    description: "text-on-dark-copy",
    listItem: "text-on-dark-strong",
    label: "text-gold-label",
    deliverables: "text-on-dark-copy",
    link: "text-white",
  },
  {
    surface: "bg-mist",
    accent: "gold",
    number: "text-gold-ink",
    title: "text-navy",
    description: "text-body",
    listItem: "text-ink",
    label: "text-gold-ink",
    deliverables: "text-body",
    link: "text-navy",
  },
  {
    surface: "bg-navy",
    accent: "goldLight",
    number: "text-gold-soft",
    title: "text-on-dark-strong",
    description: "text-on-dark-copy",
    listItem: "text-on-dark-strong",
    label: "text-gold-label",
    deliverables: "text-on-dark-copy",
    link: "text-white",
  },
];

const ACCENT_TEXT: Record<SectionTheme["accent"], string> = {
  gold: "text-gold-ink",
  goldLight: "text-gold-soft",
};

const PLATE_SURFACE: Record<ExpertiseHub["illustrationPlate"], string> = {
  mist: "bg-mist",
  haze: "bg-haze",
  "navy-raised": "bg-navy-raised",
  navy: "bg-navy",
};

/**
 * Une expertise de la page Expertises : colonne éditoriale d'un côté,
 * illustration de l'autre. L'image change de côté à chaque expertise pour
 * éviter la répétition d'une même trame sur quatre sections.
 */
export function ExpertiseSection({ index }: { index: number }) {
  const expertise: Expertise = EXPERTISES[index];
  const theme = THEMES[index];
  const hub = expertise.hub;

  return (
    <section className={theme.surface}>
      <Container className="section-y">
        <Reveal
          className={cn(
            "flex flex-col gap-8 lg:items-center lg:gap-16",
            index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row",
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className={cn("text-[12px] font-bold tracking-[0.08em]", theme.number)}>
                {expertise.number}
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-rule" />
              <span className={cn("text-[12px] font-bold uppercase tracking-[0.08em]", theme.number)}>
                {expertise.hubLabel}
              </span>
            </div>

            <h2 className={cn("max-w-[560px] text-display-2", theme.title)}>
              <Link
                href={expertiseHref(expertise.slug)}
                className="transition-opacity duration-300 ease-editorial hover:opacity-80"
              >
                {expertise.title}
              </Link>
            </h2>

            <p className={cn("max-w-[560px] text-body-md", theme.description)}>{hub.summary}</p>

            <div className="flex flex-col gap-2.5 pt-1">
              <p className={cn("text-[12px] font-bold uppercase tracking-[0.08em]", theme.label)}>
                {EXPERTISE_HUB_LABELS.interventions}
              </p>
              <ul className="flex flex-col gap-2">
                {hub.interventions.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className={cn("text-body-sm", ACCENT_TEXT[theme.accent])}>
                      —
                    </span>
                    <p className={cn("text-body-sm leading-[1.5]", theme.listItem)}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 border-t border-rule pt-4">
              <p className={cn("text-[12px] font-bold uppercase tracking-[0.08em]", theme.label)}>
                {EXPERTISE_HUB_LABELS.deliverables}
              </p>
              <p className={cn("max-w-[560px] text-body-sm leading-[1.6]", theme.deliverables)}>
                {hub.deliverables}
              </p>
            </div>

            <ActionLink
              href="/contact"
              variant={index % 2 === 1 ? "outlineLight" : "outline"}
              className="mt-1 self-start"
            >
              {EXPERTISE_HUB_LABELS.detailCta}
            </ActionLink>
          </div>

          <div
            className={cn(
              "shrink-0 overflow-hidden rounded-frame lg:w-[44%] lg:max-w-[520px]",
              PLATE_SURFACE[hub.illustrationPlate],
            )}
          >
            <Illustration name={expertise.hubIllustration} alt="" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
