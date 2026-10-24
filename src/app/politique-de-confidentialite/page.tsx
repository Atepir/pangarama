import type { Metadata } from "next";

import { LegalFacts } from "@/components/legal/legal-facts";
import { LegalHero } from "@/components/legal/legal-hero";
import { JsonLd } from "@/components/ui/json-ld";
import { POLITIQUE_CONFIDENTIALITE } from "@/content/legal";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: POLITIQUE_CONFIDENTIALITE.metadata.title,
  description: POLITIQUE_CONFIDENTIALITE.metadata.description,
  path: POLITIQUE_CONFIDENTIALITE.path,
  keywords: [...POLITIQUE_CONFIDENTIALITE.metadata.keywords],
});

export default function PolitiqueDeConfidentialitePage() {
  return (
    <>
      <LegalHero page={POLITIQUE_CONFIDENTIALITE} />
      <LegalFacts facts={POLITIQUE_CONFIDENTIALITE.facts} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: POLITIQUE_CONFIDENTIALITE.title, path: POLITIQUE_CONFIDENTIALITE.path },
        ])}
      />
    </>
  );
}
