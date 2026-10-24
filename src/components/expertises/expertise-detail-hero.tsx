import { Illustration } from "@/components/art/illustration";
import { EditorialHero } from "@/components/ui/editorial-hero";
import type { Expertise } from "@/content/expertises";
import { EXPERTISE_DETAIL_LABELS } from "@/content/pages";

/** Hero de la page détail : surtitre, titre pleine largeur, introduction et visuel. */
export function ExpertiseDetailHero({ expertise }: { expertise: Expertise }) {
  return (
    <EditorialHero
      eyebrow={`${EXPERTISE_DETAIL_LABELS.eyebrowPrefix} ${expertise.number}`}
      titleLines={[expertise.title]}
      intro={expertise.introduction}
      className="bg-mist"
      aside={
        <div className="overflow-hidden rounded-cover bg-paper lg:rounded-frame">
          <Illustration name={expertise.detailIllustration} alt="" priority />
        </div>
      }
    />
  );
}
