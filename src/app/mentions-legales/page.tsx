import type { Metadata } from "next";

import { LegalFacts } from "@/components/legal/legal-facts";
import { LegalHero } from "@/components/legal/legal-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { MENTIONS_LEGALES } from "@/content/legal";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: MENTIONS_LEGALES.metadata.title,
  description: MENTIONS_LEGALES.metadata.description,
  path: MENTIONS_LEGALES.path,
  keywords: [...MENTIONS_LEGALES.metadata.keywords],
});

export default function MentionsLegalesPage() {
  return (
    <>
      <LegalHero page={MENTIONS_LEGALES} />
      <LegalFacts facts={MENTIONS_LEGALES.facts} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: MENTIONS_LEGALES.title, path: MENTIONS_LEGALES.path },
        ])}
      />
    </>
  );
}
