import type { Metadata } from "next";

import { AnalysesFeature } from "@/components/realisations-insights/analyses-feature";
import { HubHero } from "@/components/realisations-insights/hub-hero";
import { InsightsHub } from "@/components/realisations-insights/insights-hub";
import { RealisationsSection } from "@/components/realisations-insights/realisations-section";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { HOME_FINAL_CTA } from "@/content/pages";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations & Insights",
  description:
    "Les expertises PANGARAMA en action : missions menées aux côtés de nos clients et analyses, notes et études sur les entreprises, les marchés et les transformations économiques.",
  path: "/realisations-insights",
  keywords: [
    "PANGARAMA",
    "réalisations conseil",
    "insights économiques",
    "analyses marchés",
    "notes de conjoncture",
    "études sectorielles",
  ],
});

export default function RealisationsInsightsPage() {
  return (
    <>
      <HubHero />
      <AnalysesFeature />
      <InsightsHub />
      <RealisationsSection />
      <CtaBand title={HOME_FINAL_CTA.title} cta={HOME_FINAL_CTA.cta} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Réalisations & Insights", path: "/realisations-insights" },
        ])}
      />
    </>
  );
}
