"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "header";
  delay?: number;
  className?: string;
};

/**
 * Accent d'apparition au scroll, sans état masqué avant l'intersection.
 * Le CSS respecte `prefers-reduced-motion` et reste lisible sans JavaScript.
 */
export function Reveal({ children, as = "div", delay = 0, className }: RevealProps) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={revealDelay(delay)}
    >
      {children}
    </Tag>
  );
}
