import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerPadding = "default" | "wide" | "none";

const PADDING: Record<ContainerPadding, string> = {
  default: "px-5 sm:px-8 lg:px-12 xl:px-16",
  wide: "px-5 sm:px-8 lg:px-12 xl:px-16",
  none: "",
};

type ContainerProps = {
  as?: ElementType;
  id?: string;
  padding?: ContainerPadding;
  className?: string;
  children: ReactNode;
};

/** Même axe d'alignement pour l'en-tête, les héros et le contenu. */
export function Container({
  as: Tag = "div",
  id,
  padding = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[1440px]", PADDING[padding], className)}>
      {children}
    </Tag>
  );
}
