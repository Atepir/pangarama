import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { EngagementsSection } from "@/components/about/engagements-section";
import { MethodSection } from "@/components/about/method-section";
import { MissionSection } from "@/components/about/mission-section";
import { NameSection } from "@/components/about/name-section";
import { RegionSection } from "@/components/about/region-section";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "À propos",
  description:
    "Mission, signification du nom, méthode et engagements de PANGARAMA : une expertise ancrée au Burkina Faso et ouverte sur l’Afrique de l’Ouest.",
  path: "/a-propos",
  keywords: [
    "PANGARAMA",
    "qui sommes-nous PANGARAMA",
    "structure de conseil Burkina Faso",
    "méthode d’intervention",
    "engagements de confidentialité",
  ],
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <NameSection />
      <MissionSection />
      <MethodSection />
      <EngagementsSection />
      <RegionSection />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "À propos", path: "/a-propos" },
        ])}
      />
    </>
  );
}
