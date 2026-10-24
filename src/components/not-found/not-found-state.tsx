import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { NOT_FOUND_PAGE } from "@/content/pages";

/**
 * État « page introuvable » : numéro 404 or, titre, message et retour à
 * l'accueil, centré dans un aplat sable de 674 px de haut sur la maquette.
 *
 * La pastille de retour est écrite à la main plutôt que via `ActionLink` : la
 * maquette la dimensionne à 178 × 47 px (rembourrage horizontal de 22 px) avec
 * un libellé ivoire, là où `ActionLink` applique 20 px et la teinte
 * `on-dark-strong`. Comme `cn()` ne fusionne pas les classes Tailwind, il n'est
 * pas possible de corriger ces deux valeurs depuis le composant.
 */
export function NotFoundState() {
  return (
    <section className="bg-mist">
      <Container className="flex flex-col items-center justify-center py-[80px] lg:min-h-[674px] lg:py-[150px]">
        <Reveal className="flex flex-col items-center gap-[24px] text-center">
          <p className="text-[72px] font-bold leading-[normal] text-gold-ink lg:text-[120px]">
            {NOT_FOUND_PAGE.code}
          </p>

          {/* Interlignes en pixels : valeurs que Figma rend pour `normal`. */}
          <h1 className="text-[30px] font-bold leading-[1.18] tracking-[-0.6px] text-navy lg:text-[48px] lg:leading-[66px] lg:tracking-normal">
            {NOT_FOUND_PAGE.title}
          </h1>

          <p className="text-[15px] leading-[1.55] text-navy lg:text-[18px] lg:leading-[25px]">
            {NOT_FOUND_PAGE.text}
          </p>

          <Link
            href={NOT_FOUND_PAGE.cta.href}
            className="inline-flex items-center justify-center gap-[6px] rounded-full bg-navy px-[22px] py-[14px] text-[14px] font-semibold leading-[normal] text-ivory transition-colors duration-300 ease-editorial hover:bg-navy-hover"
          >
            <span>{NOT_FOUND_PAGE.cta.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
