import type { Insight } from "@/content/insights";
import { INSIGHT_CATEGORIES, formatInsightDate, formatReadingTime } from "@/content/insights";
import { InsightCover } from "@/components/art/illustration";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { insightHref } from "@/lib/routes";

type InsightCardProps = {
  insight: Insight;
  /** Date et temps de lecture : affichés sur les listes éditoriales. */
  showMeta?: boolean;
  /** `category` remplace la date par la rubrique et le temps de lecture (hub éditorial). */
  metaFormat?: "date" | "category";
  showExcerpt?: boolean;
  /** Libellé du lien de pied de carte. */
  linkLabel?: string;
  className?: string;
  titleClassName?: string;
};

/**
 * Carte d'analyse. La carte entière est cliquable : le titre porte le lien
 * accessible, étendu à la carte par un pseudo-élément, ce qui évite
 * d'imbriquer plusieurs liens vers la même destination.
 */
export function InsightCard({
  insight,
  showMeta = false,
  metaFormat = "date",
  showExcerpt = false,
  linkLabel = "Lire l’analyse",
  className,
  titleClassName,
}: InsightCardProps) {
  return (
    <article className={cn("group relative flex h-full flex-col gap-[14px]", className)}>
      <div className="overflow-hidden rounded-cover bg-mist">
        <InsightCover
          name={insight.cover}
          className="transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
        />
      </div>

      {showMeta && metaFormat === "category" ? (
        <p className="whitespace-pre text-section-label uppercase text-gold-ink">
          {`${INSIGHT_CATEGORIES[insight.category].shortLabel}  ·  ${insight.readingTime} min`}
        </p>
      ) : (
        <p className="text-eyebrow uppercase text-gold-ink">
          {INSIGHT_CATEGORIES[insight.category].shortLabel}
        </p>
      )}

      <h3 className={cn("text-display-4 lg:max-w-[360px]", titleClassName)}>
        <Link
          href={insightHref(insight.slug)}
          className="before:absolute before:inset-0 before:content-['']"
        >
          {insight.title}
        </Link>
      </h3>

      {showMeta && metaFormat === "date" ? (
        <p className="text-meta text-body-soft">
          {formatInsightDate(insight.publishedAt)} · {formatReadingTime(insight.readingTime)}
        </p>
      ) : null}

      {showExcerpt ? (
        <p className="line-clamp-3 text-body-sm text-body">{insight.excerpt}</p>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-2 pt-1 text-[15px] font-semibold text-body-soft transition-colors duration-300 ease-editorial group-hover:text-navy">
        {linkLabel}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </article>
  );
}
