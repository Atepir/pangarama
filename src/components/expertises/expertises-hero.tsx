import { EditorialHero } from "@/components/ui/editorial-hero";
import { EXPERTISES_PAGE } from "@/content/pages";
import { cn } from "@/lib/cn";

/** Panneau décoratif : les quatre expertises en grille, la première en crème. */
function ExpertisePanel() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-frame bg-navy p-5" aria-hidden="true">
      {EXPERTISES_PAGE.cards.map((card, index) => (
        <div
          key={card.number}
          className={cn(
            "flex aspect-[3/2] flex-col justify-between rounded-card p-4",
            index === 0 ? "bg-cream text-clay" : "bg-navy-raised text-on-dark-strong",
          )}
        >
          <p
            className={cn(
              "text-[26px] leading-none font-bold tracking-[-0.02em]",
              index === 0 ? "text-clay" : "text-gold-soft",
            )}
          >
            {card.number}
          </p>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em]">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Introduction de la page Expertises. */
export function ExpertisesHero() {
  return (
    <EditorialHero
      eyebrow={EXPERTISES_PAGE.eyebrow}
      titleLines={EXPERTISES_PAGE.titleLines}
      intro={EXPERTISES_PAGE.intro}
      aside={<ExpertisePanel />}
      className="bg-mist"
    />
  );
}
