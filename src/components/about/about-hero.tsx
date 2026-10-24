import { Illustration } from "@/components/art/illustration";
import { EditorialHero } from "@/components/ui/editorial-hero";
import { ABOUT_HERO } from "@/content/about";

/** Introduction de la page À propos. */
export function AboutHero() {
  return (
    <EditorialHero
      eyebrow={ABOUT_HERO.eyebrow}
      titleLines={ABOUT_HERO.titleLines}
      intro={ABOUT_HERO.intro}
      className="bg-mist lg:bg-ivory"
      aside={
        <div className="overflow-hidden rounded-cover bg-paper lg:rounded-frame">
          <Illustration name="field-of-view" alt="" priority />
        </div>
      }
    />
  );
}
