import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ActionSize = "sm" | "md" | "lg";
type ActionVariant = "navy" | "gold" | "outline" | "outlineLight" | "light";
type LinkTone = "navy" | "muted" | "onDark" | "gold" | "light";
type LinkWeight = "semibold" | "bold";

const SIZE: Record<ActionSize, string> = {
  sm: "px-[18px] py-[10px] text-[14px]",
  md: "px-[22px] py-[13px] text-[15px]",
  lg: "px-[26px] py-[15px] text-[15px]",
};

const VARIANT: Record<ActionVariant, string> = {
  navy: "bg-navy text-white hover:bg-navy-hover",
  gold: "bg-gold-ink text-white hover:bg-gold-ink-deep",
  outline: "border border-outline text-navy hover:bg-navy hover:text-on-dark-strong",
  /** Contour clair, pour les aplats navy. */
  outlineLight:
    "border border-white/45 text-white hover:border-white hover:bg-white hover:text-navy",
  /** Pastille crème des bandeaux navy : inversée par rapport au bouton principal. */
  light: "bg-cream text-clay hover:bg-white hover:text-clay",
};

const ACTION_BASE =
  "inline-flex items-center justify-center gap-[8px] rounded-full font-semibold leading-[1.2] transition-colors duration-300 ease-editorial";

const LINK_TONE: Record<LinkTone, string> = {
  navy: "text-navy hover:text-gold-ink",
  muted: "text-body-soft hover:text-navy",
  onDark: "text-on-dark-strong hover:text-gold-soft",
  gold: "text-gold-ink hover:text-gold-ink-deep",
  /** Lien posé sur un aplat navy : le bandeau l'y passe en blanc. */
  light: "text-white hover:text-gold-soft",
};

const LINK_WEIGHT: Record<LinkWeight, string> = {
  semibold: "font-semibold",
  bold: "font-bold",
};

type ActionBaseProps = {
  size?: ActionSize;
  variant?: ActionVariant;
  className?: string;
  /** Flèche interne. Absente des CTA du hero dans la maquette. */
  arrow?: boolean;
  children: ReactNode;
};

/** CTA en pastille (brique de base de tous les boutons de la maquette). */
export function ActionLink({
  href,
  size = "md",
  variant = "navy",
  className,
  arrow = true,
  children,
}: ActionBaseProps & { href: ComponentPropsWithoutRef<typeof Link>["href"] }) {
  return (
    <Link href={href} className={cn(ACTION_BASE, SIZE[size], VARIANT[variant], className)}>
      <span>{children}</span>
      {arrow ? <span aria-hidden="true">→</span> : null}
    </Link>
  );
}

export function ActionButton({
  size = "md",
  variant = "navy",
  className,
  arrow = true,
  children,
  type = "button",
  disabled,
  ...rest
}: ActionBaseProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        ACTION_BASE,
        SIZE[size],
        VARIANT[variant],
        "disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-navy",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {arrow ? <span aria-hidden="true">→</span> : null}
    </button>
  );
}

type MobileActionTone = "navy" | "light";
type MobileActionSize = "compact" | "emphasis";

/** Maquette mobile : pastilles resserrées, mais jamais sous 13 px de corps. */
const MOBILE_ACTION_SIZE: Record<MobileActionSize, string> = {
  compact: "px-[18px] py-[12px] text-[13px] font-semibold leading-[1.35]",
  emphasis: "px-[20px] py-[13px] text-[14px] font-bold leading-[1.4]",
};

const MOBILE_ACTION_TONE: Record<MobileActionTone, string> = {
  navy: "bg-navy text-white hover:bg-navy-hover",
  light: "bg-cream text-clay hover:bg-white hover:text-clay",
};

/**
 * CTA principal des sections d'accueil sur mobile : la maquette y resserre les
 * pastilles et les aligne à gauche, mesures que `ActionLink` ne couvre pas.
 */
export function MobileActionLink({
  href,
  tone = "navy",
  size = "compact",
  arrow = true,
  className,
  children,
}: {
  href: ComponentPropsWithoutRef<typeof Link>["href"];
  tone?: MobileActionTone;
  size?: MobileActionSize;
  /** Flèche interne. Absente du CTA du hero dans la maquette. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-[6px] rounded-full whitespace-nowrap transition-colors duration-300 ease-editorial",
        MOBILE_ACTION_SIZE[size],
        MOBILE_ACTION_TONE[tone],
        className,
      )}
    >
      <span>{children}</span>
      {arrow ? <span aria-hidden="true">→</span> : null}
    </Link>
  );
}

/** Lien éditorial « Libellé → » tel qu'utilisé dans les sections de contenu. */
export function ArrowLink({
  href,
  tone = "navy",
  weight = "semibold",
  className,
  children,
}: {
  href: ComponentPropsWithoutRef<typeof Link>["href"];
  tone?: LinkTone;
  /** Bandeau CTA final : le lien y passe en gras. */
  weight?: LinkWeight;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-[8px] text-[15px] leading-[1.4] transition-colors duration-300 ease-editorial",
        LINK_WEIGHT[weight],
        LINK_TONE[tone],
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
