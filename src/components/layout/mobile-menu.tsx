"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { Wordmark } from "@/components/layout/wordmark";
import { MENU_ITEMS, isNavItemActive } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { asHref } from "@/lib/routes";

/**
 * Panneau de navigation mobile : entrées numérotées, pastille de contact.
 * Le panneau recouvre la barre d'en-tête, dont il reprend la signature et
 * ajoute la croix de fermeture.
 */
export function MobileMenu({
  id,
  pathname,
  onClose,
}: {
  id: string;
  pathname: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      id={id}
      className="absolute inset-x-0 top-0 z-20 flex flex-col gap-7 bg-navy px-6 pt-5 pb-9 lg:hidden"
    >
      <div className="flex h-10 items-center gap-3">
        <Wordmark variant="menu" tone="onDarkWarm" />
        <span className="h-px flex-1 bg-line-menu" aria-hidden="true" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="relative shrink-0 text-[28px] leading-none font-normal text-on-dark-warm transition-colors duration-300 ease-editorial after:absolute after:-inset-3 after:content-[''] hover:text-gold focus-visible:text-gold"
        >
          ×
        </button>
      </div>

      <nav aria-label="Navigation mobile" className="flex flex-col">
        {MENU_ITEMS.map((item, index) => {
          const active = isNavItemActive(item, pathname);

          return (
            <Link
              key={item.href}
              href={asHref(item.href)}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className="flex items-baseline gap-3 border-b border-line-menu py-4 transition-colors duration-300 ease-editorial"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "w-6 shrink-0 text-[11px] font-bold tracking-[0.08em]",
                  active ? "text-cream" : "text-gold",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 text-[24px] leading-[1.2] font-bold tracking-[-0.02em]",
                  active ? "text-cream" : "text-on-dark-warm",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/contact"
        onClick={onClose}
        className="inline-flex shrink-0 self-start rounded-full bg-cream px-6 py-3.5 text-[14px] leading-[1.2] font-bold text-clay transition-colors duration-300 ease-editorial hover:bg-white"
      >
        Nous contacter
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </Link>
    </div>
  );
}
