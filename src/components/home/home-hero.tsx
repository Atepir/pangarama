import { Illustration } from "@/components/art/illustration";
import { ActionLink } from "@/components/ui/action";
import { EditorialHero } from "@/components/ui/editorial-hero";
import { HOME_HERO } from "@/content/pages";

/**
 * Hero de l'accueil : le titre court sur toute la largeur, l'introduction et
 * les CTA se placent à gauche, le visuel à droite. Le visuel est chargé en
 * priorité (LCP).
 */
export function HomeHero() {
  return (
    <EditorialHero
      eyebrow={HOME_HERO.eyebrow}
      titleLines={HOME_HERO.titleLines}
      intro={HOME_HERO.intro}
      aside={
        <div className="overflow-hidden rounded-cover bg-mist [&_img]:max-h-[260px] [&_img]:object-cover lg:rounded-frame lg:[&_img]:max-h-[340px]">
          <Illustration name="strategic-intelligence" alt="" priority />
        </div>
      }
    >
      <ActionLink href={HOME_HERO.primaryCta.href} arrow={false}>
        {HOME_HERO.primaryCta.label}
      </ActionLink>
      <ActionLink href={HOME_HERO.secondaryCta.href} variant="outline" arrow={false}>
        {HOME_HERO.secondaryCta.label}
      </ActionLink>
    </EditorialHero>
  );
}
