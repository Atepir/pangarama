import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightBody } from "@/components/insights/insight-body";
import { InsightFurther } from "@/components/insights/insight-further";
import { InsightHero } from "@/components/insights/insight-hero";
import { InsightTakeaways } from "@/components/insights/insight-takeaways";
import { JsonLd } from "@/components/ui/json-ld";
import { ShareBar } from "@/components/ui/share-bar";
import { getInsightBySlug, INSIGHTS, INSIGHT_CATEGORIES } from "@/content/insights";
import { ARTICLE_LABELS, INSIGHTS_SECTION } from "@/content/pages";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return {};
  }

  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    keywords: [...insight.keywords],
    type: "article",
    publishedTime: insight.publishedAt,
    modifiedTime: insight.updatedAt,
    authors: [insight.author],
    section: INSIGHT_CATEGORIES[insight.category].label,
  });
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const path = `/insights/${insight.slug}`;
  const category = INSIGHT_CATEGORIES[insight.category];

  return (
    <>
      <InsightHero insight={insight} />
      <InsightBody insight={insight} />
      <InsightTakeaways points={insight.keyPoints ?? []} />
      <InsightFurther />
      <ShareBar
        path={path}
        shareLabel={ARTICLE_LABELS.shareLinkedIn}
        more={{
          label: ARTICLE_LABELS.moreAnalyses,
          href: `/realisations-insights#${INSIGHTS_SECTION.id}`,
        }}
      />

      <JsonLd
        data={articleJsonLd({
          headline: insight.title,
          description: insight.excerpt,
          path,
          publishedAt: insight.publishedAt,
          updatedAt: insight.updatedAt,
          section: category.label,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Réalisations & Insights", path: "/realisations-insights" },
          { name: insight.title, path },
        ])}
      />
    </>
  );
}
