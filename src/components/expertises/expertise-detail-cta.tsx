import { CtaBand } from "@/components/ui/cta-band";
import type { Expertise } from "@/content/expertises";
import { asHref } from "@/lib/routes";

/** Appel à l'action de la page détail. */
export function ExpertiseDetailCta({ expertise }: { expertise: Expertise }) {
  return (
    <CtaBand
      title={expertise.cta.title}
      cta={{ label: expertise.cta.label, href: asHref(expertise.cta.href) }}
    />
  );
}
