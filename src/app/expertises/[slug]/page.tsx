import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExpertiseDetailCta } from "@/components/expertises/expertise-detail-cta";
import { ExpertiseDetailDeliverables } from "@/components/expertises/expertise-detail-deliverables";
import { ExpertiseDetailHero } from "@/components/expertises/expertise-detail-hero";
import { ExpertiseDetailMethod } from "@/components/expertises/expertise-detail-method";
import { ExpertiseDetailNeed } from "@/components/expertises/expertise-detail-need";
import { JsonLd } from "@/components/ui/json-ld";
import { getExpertise, getExpertiseSlugs } from "@/content/expertises";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getExpertiseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertise(slug);

  if (!expertise) {
    return {};
  }

  return buildMetadata({
    title: expertise.title,
    description: expertise.introduction,
    path: `/expertises/${expertise.slug}`,
    keywords: [
      expertise.title,
      `PANGARAMA ${expertise.hubLabel}`,
      ...expertise.need.items.slice(0, 3).map((item) => item.title),
    ],
  });
}

export default async function ExpertiseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const expertise = getExpertise(slug);

  if (!expertise) {
    notFound();
  }

  return (
    <>
      <ExpertiseDetailHero expertise={expertise} />
      <ExpertiseDetailNeed expertise={expertise} />
      <ExpertiseDetailMethod expertise={expertise} />
      <ExpertiseDetailDeliverables expertise={expertise} />
      <ExpertiseDetailCta expertise={expertise} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Expertises", path: "/expertises" },
          { name: expertise.title, path: `/expertises/${expertise.slug}` },
        ])}
      />
    </>
  );
}
