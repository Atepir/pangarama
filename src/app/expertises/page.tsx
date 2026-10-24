import type { Metadata } from "next";

import { ExpertiseCta } from "@/components/expertises/expertise-cta";
import { ExpertiseMoments } from "@/components/expertises/expertise-moments";
import { ExpertiseSection } from "@/components/expertises/expertise-section";
import { ExpertisesHero } from "@/components/expertises/expertises-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { EXPERTISES } from "@/content/expertises";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Expertises",
  description:
    "Quatre expertises complémentaires au service des organisations : communication financière et corporate, intelligence stratégique, engagement des parties prenantes et développement territorial.",
  path: "/expertises",
  keywords: [
    "PANGARAMA",
    "expertises conseil",
    "communication financière",
    "intelligence stratégique",
    "engagement des parties prenantes",
    "développement territorial",
  ],
});

export default function ExpertisesPage() {
  return (
    <>
      <ExpertisesHero />
      {EXPERTISES.map((expertise, index) => (
        <ExpertiseSection key={expertise.slug} index={index} />
      ))}
      <ExpertiseMoments />
      <ExpertiseCta />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Expertises", path: "/expertises" },
        ])}
      />
    </>
  );
}
