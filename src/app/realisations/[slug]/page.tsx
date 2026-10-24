import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyApproach } from "@/components/realisations/case-study-approach";
import { CaseStudyChallenge } from "@/components/realisations/case-study-challenge";
import { CaseStudyCta } from "@/components/realisations/case-study-cta";
import { CaseStudyFacts } from "@/components/realisations/case-study-facts";
import { CaseStudyHero } from "@/components/realisations/case-study-hero";
import { CaseStudyObjective } from "@/components/realisations/case-study-objective";
import { JsonLd } from "@/components/ui/json-ld";
import { ShareBar } from "@/components/ui/share-bar";
import { CASE_STUDY_LABELS, INSIGHTS_SECTION } from "@/content/pages";
import { ALL_REALISATIONS, getRealisationBySlug } from "@/content/realisations";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_REALISATIONS.map((realisation) => ({ slug: realisation.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const realisation = getRealisationBySlug(slug);

  if (!realisation) {
    return {};
  }

  return buildMetadata({
    title: realisation.title,
    description: realisation.need,
    path: `/realisations/${realisation.slug}`,
    keywords: [realisation.category, realisation.eyebrow, "PANGARAMA", "Burkina Faso"],
    type: "article",
    publishedTime: realisation.publishedAt,
    authors: [CASE_STUDY_LABELS.author],
    section: realisation.category,
  });
}

export default async function RealisationPage({ params }: PageProps) {
  const { slug } = await params;
  const realisation = getRealisationBySlug(slug);

  if (!realisation) {
    notFound();
  }

  const path = `/realisations/${realisation.slug}`;

  return (
    <>
      <CaseStudyHero realisation={realisation} />
      <CaseStudyFacts realisation={realisation} />
      <CaseStudyChallenge realisation={realisation} />
      <CaseStudyApproach realisation={realisation} />
      <CaseStudyObjective realisation={realisation} />
      <CaseStudyCta />
      <ShareBar
        path={path}
        shareLabel={CASE_STUDY_LABELS.shareLinkedIn}
        more={{
          label: CASE_STUDY_LABELS.moreAnalyses,
          href: `/realisations-insights#${INSIGHTS_SECTION.id}`,
        }}
      />

      <JsonLd
        data={articleJsonLd({
          headline: realisation.title,
          description: realisation.need,
          path,
          publishedAt: realisation.publishedAt,
          author: CASE_STUDY_LABELS.author,
          section: realisation.category,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Réalisations & Insights", path: "/realisations-insights" },
          { name: realisation.title, path },
        ])}
      />
    </>
  );
}
