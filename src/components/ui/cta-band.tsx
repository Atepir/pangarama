import type { ComponentPropsWithoutRef } from "react";
import type Link from "next/link";

import { Container } from "@/components/layout/container";
import { ActionLink } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

type CtaBandProps = {
  id?: string;
  title: string;
  cta: { label: string; href: ComponentPropsWithoutRef<typeof Link>["href"] };
  className?: string;
};

/** Bandeau de conversion navy posé en fin de page. */
export function CtaBand({ id, title, cta, className }: CtaBandProps) {
  return (
    <section id={id} className={cn("bg-navy", className)}>
      <Container className="section-y-tight">
        <Reveal className="flex flex-col items-center gap-7 text-center">
          <h2 className="max-w-[900px] text-display-2 text-white">{title}</h2>
          <ActionLink href={cta.href} size="lg" variant="light">
            {cta.label}
          </ActionLink>
        </Reveal>
      </Container>
    </section>
  );
}
