import { CtaBand } from "@/components/ui/cta-band";
import { EXPERTISE_HUB_LABELS } from "@/content/pages";

/** Bandeau d'appel à l'action de la page Expertises. */
export function ExpertiseCta() {
  return (
    <CtaBand
      title={EXPERTISE_HUB_LABELS.ctaTitle}
      cta={{ label: EXPERTISE_HUB_LABELS.ctaLabel, href: "/contact" }}
    />
  );
}
