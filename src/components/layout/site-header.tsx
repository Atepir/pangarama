"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Wordmark } from "@/components/layout/wordmark";
import { ActionLink } from "@/components/ui/action";
import { NAV_ITEMS, isNavItemActive } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { asHref } from "@/lib/routes";

const MOBILE_MENU_ID = "site-mobile-menu";
const PRIMARY_ITEMS = NAV_ITEMS.filter((item) => item.href !== "/contact");

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);

  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  const closeMenu = useCallback(() => {
    restoreFocusRef.current = true;
    setOpen(false);
  }, []);

  // Tant que le panneau est ouvert, le bouton porte `invisible` : il n'est donc
  // pas focalisable. Le focus ne peut être rendu qu'une fois `open` repassé à
  // false, c'est-à-dire après le rendu suivant.
  useEffect(() => {
    if (open || !restoreFocusRef.current) return;

    restoreFocusRef.current = false;
    toggleRef.current?.focus();
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/92 backdrop-blur-md">
      <Container padding="wide" className="flex items-center gap-4 py-4 lg:gap-10 lg:py-5">
        <Wordmark variant="header" />

        <nav
          aria-label="Navigation principale"
          className="ml-auto hidden items-center gap-7 lg:flex xl:gap-9"
        >
          {PRIMARY_ITEMS.map((item) => {
            const active = isNavItemActive(item, pathname);

            return (
              <Link
                key={item.href}
                href={asHref(item.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-[15px] font-medium leading-[1.4] transition-colors duration-300 ease-editorial",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold-ink after:transition-transform after:duration-300 after:ease-editorial",
                  active
                    ? "text-gold-ink after:scale-x-100"
                    : "text-ink hover:text-gold-ink hover:after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <span className="hidden lg:inline-flex">
          <ActionLink href="/contact" variant="navy" size="sm">
            Nous contacter
          </ActionLink>
        </span>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
          aria-label="Ouvrir le menu"
          className={cn(
            "relative ml-auto flex h-6 w-7 shrink-0 items-center justify-center text-navy transition-colors duration-300 ease-editorial after:absolute after:-inset-x-3 after:-inset-y-3 after:content-[''] hover:text-gold-ink lg:hidden",
            open ? "invisible" : "",
          )}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 20"
            fill="none"
            className="h-5 w-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M0 .5h24M0 6.5h24M0 12.5h24" />
          </svg>
        </button>
      </Container>

      {open ? <MobileMenu id={MOBILE_MENU_ID} pathname={pathname} onClose={closeMenu} /> : null}
    </header>
  );
}
