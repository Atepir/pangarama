import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { SectionEyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

type EditorialHeroProps = {
  id?: string;
  eyebrow?: string;
  titleLines: readonly string[];
  intro?: string;
  /** Rangée de CTA placée sous l'introduction. */
  children?: ReactNode;
  /** Visuel de droite : active la mise en page scindée. */
  aside?: ReactNode;
  /** Contenu libre placé sous l'introduction, avant les CTA. */
  footNote?: ReactNode;
  /** `dark` : variante posée sur un aplat navy. */
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  introClassName?: string;
};

/**
 * Introduction de page éditoriale.
 *
 * Le titre occupe toute la largeur du conteneur : à 1440 px, chaque phrase
 * tient sur une ligne et le bloc garde trois lignes nettes. L'introduction et
 * les CTA se placent ensuite à gauche, centrés verticalement par rapport au
 * visuel de droite.
 */
export function EditorialHero({
  id,
  eyebrow,
  titleLines,
  intro,
  children,
  aside,
  footNote,
  tone = "light",
  className,
  titleClassName,
  introClassName,
}: EditorialHeroProps) {
  const split = Boolean(aside);
  const dark = tone === "dark";

  return (
    <section id={id} className={cn(dark ? "bg-navy" : "bg-mist lg:bg-ivory", className)}>
      <Container padding="wide" className="pt-9 pb-12 sm:pt-12 lg:pt-14 lg:pb-16">
        <div className="flex flex-col gap-5 lg:gap-7">
          {eyebrow ? (
            <SectionEyebrow size="hero" tone={dark ? "goldLight" : "gold"}>
              {eyebrow}
            </SectionEyebrow>
          ) : null}

          <h1 className={cn("text-display-1", dark ? "text-on-dark-strong" : "text-navy", titleClassName)}>
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}{" "}
              </span>
            ))}
          </h1>

          {intro || children || aside ? (
            <div
              className={cn(
                "flex flex-col gap-7",
                split
                  ? "lg:flex-row lg:items-center lg:justify-between lg:gap-12"
                  : "lg:flex-row lg:items-end lg:gap-12",
              )}
            >
              <div className="flex min-w-0 flex-col gap-6 lg:max-w-[560px] lg:flex-1">
                {intro ? (
                  <p
                    className={cn(
                      "max-w-[560px] text-body-md lg:text-lead",
                      dark ? "text-on-dark-copy" : "text-body",
                      introClassName,
                    )}
                  >
                    {intro}
                  </p>
                ) : null}

                {footNote}

                {children ? <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">{children}</div> : null}
              </div>

              {aside ? (
                <div className="w-full max-w-[500px] self-center lg:w-[40%] lg:shrink-0">{aside}</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
