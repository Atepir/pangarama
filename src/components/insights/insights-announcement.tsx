import { INSIGHTS_SECTION } from "@/content/pages";
import { cn } from "@/lib/cn";

/**
 * Annonce affichée à la place des cartes tant qu'aucune analyse n'est publiée :
 * le site ne présente aucun contenu de démonstration comme une publication.
 */
export function InsightsAnnouncement({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-card border border-line bg-card-cream px-6 py-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-7",
        className,
      )}
    >
      <span className="inline-flex shrink-0 items-center self-start rounded-full bg-gold-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
        {INSIGHTS_SECTION.emptyAnnouncement.badge}
      </span>
      <p className="text-body-lg font-semibold text-navy lg:text-lead">
        {INSIGHTS_SECTION.emptyAnnouncement.text}
      </p>
    </div>
  );
}
