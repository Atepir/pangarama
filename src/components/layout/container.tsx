import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerPadding = "default" | "wide" | "none";

const PADDING: Record<ContainerPadding, string> = {
  default: "px-5 sm:px-8 lg:px-12 xl:px-[84px]",
  wide: "px-5 sm:px-8 lg:px-10 xl:px-[72px]",
  none: "",
};

type ContainerProps = {
  as?: ElementType;
  id?: string;
  padding?: ContainerPadding;
  className?: string;
  children: ReactNode;
};

/** Largeur maximale 1440 px et gouttières progressives (84 px sur grand écran). */
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
