import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowTone = "gold" | "goldLight" | "navy" | "light";

const EYEBROW_TONE: Record<EyebrowTone, string> = {
  gold: "text-gold-ink",
  goldLight: "text-gold-soft",
  navy: "text-navy",
  /** Surtitre posé sur un aplat navy. */
  light: "text-white",
};

type EyebrowSize = "default" | "compact" | "hero";

const EYEBROW_SIZE: Record<EyebrowSize, string> = {
  default: "text-eyebrow",
  /** Surtitre secondaire : jamais sous 11 px. */
  compact: "text-[11px] leading-[1.4] tracking-[0.08em] lg:text-[12px]",
  /** Surtitre du hero : 12 px sur toutes les tailles d'écran. */
  hero: "text-[11px] leading-[1.5] tracking-[0.08em] lg:text-[12px]",
};

export function SectionEyebrow({
  children,
  tone = "gold",
  size = "default",
  className,
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  size?: EyebrowSize;
  className?: string;
}) {
  return (
    <p className={cn("font-bold uppercase", EYEBROW_SIZE[size], EYEBROW_TONE[tone], className)}>
      {children}
    </p>
  );
}

type HeadingSize = "default" | "compact";

const HEADING_SIZE: Record<HeadingSize, string> = {
  default: "text-display-2",
  compact: "text-display-compact",
};

type SectionHeadingProps = {
  title: string;
  label?: string;
  as?: "h2" | "h3";
  /** `compact` reprend l'intitulé à 36 px de la maquette « Insights ». */
  size?: HeadingSize;
  className?: string;
  titleClassName?: string;
  labelClassName?: string;
};

/**
 * Titre de section : titre à gauche, filet souple, libellé en capitales aligné
 * à droite. Le filet et le libellé s'alignent sur la dernière ligne du titre.
 */
export function SectionHeading({
  title,
  label,
  as: Heading = "h2",
  size = "default",
  className,
  titleClassName,
  labelClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-end md:gap-8", className)}>
      <Heading className={cn(HEADING_SIZE[size], "text-navy", titleClassName)}>{title}</Heading>
      <span className="mb-1.5 hidden h-px flex-1 bg-rule md:block" aria-hidden="true" />
      {label ? (
        <p
          className={cn(
            "text-section-label text-gold-ink md:mb-1 md:max-w-[280px] md:text-right",
            labelClassName,
          )}
        >
          {label}
        </p>
      ) : null}
    </div>
  );
}
