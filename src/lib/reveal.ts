import type { CSSProperties } from "react";

/** Délai d’apparition transmis aux éléments `.reveal` via une variable CSS. */
export function revealDelay(milliseconds: number): CSSProperties {
  return { "--reveal-delay": `${milliseconds}ms` } as CSSProperties;
}
