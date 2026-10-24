import Link from "next/link";

import { Container } from "@/components/layout/container";
import { asHref } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

type ShareBarProps = {
  /** Chemin interne du contenu partagé, converti en URL absolue pour LinkedIn. */
  path: string;
  shareLabel: string;
  more: { label: string; href: string };
};

/**
 * Bandeau de partage des gabarits éditoriaux (article et réalisation) :
 * lien LinkedIn externe à gauche, renvoi vers le hub à droite.
 */
export function ShareBar({ path, shareLabel, more }: ShareBarProps) {
  const shareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    absoluteUrl(path),
  )}`;

  return (
    <section className="bg-on-dark-warm">
      <Container className="flex flex-col items-start gap-3 py-[24px] lg:flex-row lg:items-center lg:gap-5 lg:py-[34px]">
        {/* Deux espaces avant la flèche, comme la maquette : `whitespace-pre` les conserve. */}
        <a
          href={shareHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] leading-[1.4] font-semibold whitespace-pre text-ink-deep transition-colors duration-300 ease-editorial hover:text-gold-ink-deep"
        >
          {`${shareLabel}  ↗`}
        </a>

        {/* La maquette réserve un espace souple au centre du bandeau : aucun filet. */}
        <div aria-hidden="true" className="hidden flex-1 lg:block" />

        <Link
          href={asHref(more.href)}
          className="text-[15px] leading-[1.4] font-semibold whitespace-pre text-gold-ink-deep transition-colors duration-300 ease-editorial hover:text-ink-deep"
        >
          {`${more.label}  →`}
        </Link>
      </Container>
    </section>
  );
}
