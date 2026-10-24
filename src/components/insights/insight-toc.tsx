import type { InsightSection } from "@/content/insights";
import { ARTICLE_LABELS } from "@/content/pages";

/**
 * Sommaire latéral du gabarit article : 260 px, collé au défilement à partir du
 * desktop. Chaque entrée renvoie à l'ancre de sa section.
 */
export function InsightToc({ sections }: { sections: readonly InsightSection[] }) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <nav
      aria-labelledby="sommaire-article"
      className="flex w-full flex-col gap-3 lg:sticky lg:top-[120px] lg:w-[260px] lg:shrink-0"
    >
      <p
        id="sommaire-article"
        className="text-[12px] font-bold uppercase tracking-[0.08em] text-gold-ink"
      >
        {ARTICLE_LABELS.tocTitle}
      </p>

      <ol className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <li key={section.id}>
            {/* Deux espaces après le numéro, comme la maquette : `whitespace-pre-wrap` les
                conserve et laisse les titres longs revenir à la ligne dans la colonne de 260 px. */}
            <a
              href={`#${section.id}`}
              className="text-[15px] font-medium leading-[1.45] whitespace-pre-wrap text-body transition-colors duration-300 ease-editorial hover:text-gold-ink"
            >
              {`${String(index + 1).padStart(2, "0")}  ${section.title}`}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
