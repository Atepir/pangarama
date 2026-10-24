import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Rapport largeur / hauteur du wordmark fourni dans la charte. */
const WORDMARK_RATIO = 287.96 / 70.02;

/** Hauteurs du wordmark par emplacement, en pixels. */
const WORDMARK_HEIGHT = {
  header: 20,
  menu: 15,
  footer: 22,
} as const;

/** Côté du monogramme carré par emplacement, en pixels. */
const MARK_SIZE = {
  header: 38,
  menu: 27,
  footer: 52,
} as const;

/** Hauteur du wordmark en classes utilitaires : `height: auto` du reset CSS
 *  écrase l'attribut HTML, il faut donc la fixer explicitement. */
const WORDMARK_CLASS = {
  header: "h-[20px] w-auto shrink-0",
  menu: "h-[15px] w-auto shrink-0",
  footer: "h-[22px] w-auto shrink-0",
} as const;

/**
 * Logotype PANGARAMA : monogramme et wordmark officiels, déclinés en deux
 * versions (couleur sur fond clair, inversée sur fond navy).
 *
 * Le pied de page empile les deux éléments, comme le fichier de la charte ;
 * l'en-tête les aligne sur une même ligne et masque la signature sur mobile.
 */
export function Wordmark({
  tone = "navy",
  variant = "footer",
  className,
}: {
  tone?: "navy" | "onDark" | "onDarkWarm";
  variant?: "header" | "footer" | "menu";
  className?: string;
}) {
  const suffix = tone === "navy" ? "" : "-light";
  const stacked = variant === "footer";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Accueil`}
      className={cn(
        "inline-flex shrink-0",
        stacked ? "flex-col items-start gap-[7px]" : "items-center gap-[9px]",
        className,
      )}
    >
      <Image
        src={`/brand/pangarama-mark${suffix}.svg`}
        alt=""
        width={MARK_SIZE[variant]}
        height={MARK_SIZE[variant]}
        className="shrink-0"
        unoptimized
        priority={variant === "header"}
      />
      <Image
        src={`/brand/pangarama-wordmark${suffix}.svg`}
        alt=""
        width={Math.round(WORDMARK_RATIO * WORDMARK_HEIGHT[variant])}
        height={WORDMARK_HEIGHT[variant]}
        className={WORDMARK_CLASS[variant]}
        unoptimized
        priority={variant === "header"}
      />
      {stacked ? (
        <span
          className={cn(
            "hidden text-[13px] leading-[1.4] font-medium xl:inline",
            tone === "navy" ? "text-gold-ink" : "text-on-dark-faint",
          )}
        >
          {siteConfig.tagline}
        </span>
      ) : null}
    </Link>
  );
}
