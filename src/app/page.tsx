import type { Metadata } from "next";

import { ActivityStrip } from "@/components/home/activity-strip";
import { ApproachSection } from "@/components/home/approach-section";
import { BriefSection } from "@/components/home/brief-section";
import { ExpertisesSection } from "@/components/home/expertises-section";
import { HomeHero } from "@/components/home/home-hero";
import { InsightsSection } from "@/components/home/insights-section";
import { CtaBand } from "@/components/ui/cta-band";
import { siteConfig } from "@/config/site";
import { HOME_FINAL_CTA } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";

const HOME_TITLE = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = buildMetadata({
  title: HOME_TITLE,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "PANGARAMA",
    "communication financière Burkina Faso",
    "intelligence stratégique",
    "études de marché Ouagadougou",
    "événementiel institutionnel",
    "conseil développement Afrique de l’Ouest",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ActivityStrip />
      <BriefSection />
      <ExpertisesSection />
      <ApproachSection />
      <InsightsSection />
      <CtaBand title={HOME_FINAL_CTA.title} cta={HOME_FINAL_CTA.cta} />
    </>
  );
}
