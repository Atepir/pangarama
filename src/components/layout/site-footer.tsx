import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/layout/wordmark";
import { SocialLinks } from "@/components/ui/social-links";
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/config/navigation";
import { CONTACT, siteConfig } from "@/config/site";
import { asHref } from "@/lib/routes";

const FOOTER_ITEMS = [...NAV_ITEMS, ...SECONDARY_NAV_ITEMS];

const LINK_CLASS =
  "text-body-sm text-on-dark transition-colors duration-300 ease-editorial hover:text-white";

const FOOTER_LINK_CLASS =
  "text-meta text-on-dark-faint transition-colors duration-300 ease-editorial hover:text-white";

const COLUMN_LABEL = "text-[12px] font-bold uppercase tracking-[0.08em] text-gold-soft";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-on-dark">
      <Container className="py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Wordmark tone="onDark" />
            <p className="max-w-[340px] text-body-sm text-on-dark-muted">
              {siteConfig.shortDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <h2 className={COLUMN_LABEL}>Coordonnées</h2>
            <address className="flex flex-col gap-1.5 not-italic">
              <span className={LINK_CLASS}>{CONTACT.location}</span>
              <a href={CONTACT.emailHref} className={LINK_CLASS}>
                {CONTACT.email}
              </a>
              <a href={CONTACT.phoneHref} className={LINK_CLASS}>
                {CONTACT.phoneDisplay}
              </a>
            </address>
          </div>

          <div className="flex flex-col gap-3.5">
            <h2 className={COLUMN_LABEL}>Suivez Pangarama</h2>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line-dark pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="shrink-0 text-meta text-on-dark-faint">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>

          <nav
            aria-label="Liens de pied de page"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {FOOTER_ITEMS.map((item) => (
              <Link key={item.href} href={asHref(item.href)} className={FOOTER_LINK_CLASS}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
