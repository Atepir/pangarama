import { Illustration } from "@/components/art/illustration";
import { EditorialHero } from "@/components/ui/editorial-hero";
import { REALISATIONS_INSIGHTS_HERO } from "@/content/pages";

/** Hero du hub éditorial, posé sur aplat navy. */
export function HubHero() {
  return (
    <EditorialHero
      tone="dark"
      eyebrow={REALISATIONS_INSIGHTS_HERO.eyebrow}
      titleLines={REALISATIONS_INSIGHTS_HERO.titleLines}
      intro={REALISATIONS_INSIGHTS_HERO.intro}
      aside={
        <div className="overflow-hidden rounded-cover lg:rounded-frame">
          <Illustration name="case-system" alt="" priority />
        </div>
      }
    />
  );
}
