import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { MENU_ITEMS, NAV_ITEMS } from "@/config/navigation";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

// Next 16 `Link` suppose le contexte de l’App Router : il est remplacé par une
// ancre brute, ce qui suffit à observer le contrat de navigation.
vi.mock("next/link", async () => {
  const { createElement } = await import("react");

  return {
    default: ({ children, ...rest }: { href?: string; children?: ReactNode }) =>
      createElement("a", rest, children),
  };
});

const MOBILE_MENU_ID = "site-mobile-menu";

beforeEach(() => {
  navigation.pathname = "/";
});

describe("SiteHeader", () => {
  it("affiche les entrées de navigation desktop", () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    const labels = Array.from(nav.querySelectorAll("a")).map((link) =>
      link.textContent?.trim(),
    );

    expect(labels).toEqual(
      NAV_ITEMS.filter((item) => item.href !== "/contact").map((item) => item.label),
    );
    expect(screen.getByRole("link", { name: /Nous contacter/ })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("expose un bouton de menu relié au panneau mobile", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", MOBILE_MENU_ID);
    expect(document.getElementById(MOBILE_MENU_ID)).toBeNull();
  });

  it("ouvre le menu mobile et y donne le focus", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    const panel = document.getElementById(MOBILE_MENU_ID);
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });

    expect(panel).not.toBeNull();
    expect(panel?.className).toContain("lg:hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    // La barre d’en-tête est recouverte par le panneau.
    expect(toggle.className).toContain("invisible");
    expect(screen.getByRole("button", { name: "Fermer le menu" })).toHaveFocus();

    const nav = screen.getByRole("navigation", { name: "Navigation mobile" });
    const links = Array.from(nav.querySelectorAll("a"));

    expect(links.map((link) => link.textContent)).toEqual(
      MENU_ITEMS.map((item, index) => `${String(index + 1).padStart(2, "0")}${item.label}`),
    );
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      MENU_ITEMS.map((item) => item.href),
    );
  });

  it("se referme sur Échap et rend le focus au bouton", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.keyboard("{Escape}");

    expect(document.getElementById(MOBILE_MENU_ID)).toBeNull();
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveFocus();
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("garde le clavier dans le menu et restaure le défilement à la fermeture", async () => {
    const user = userEvent.setup();
    document.body.style.overflow = "auto";
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    const panel = screen.getByRole("dialog", { name: "Menu principal" });
    const controls = panel.querySelectorAll<HTMLElement>("a[href], button");
    const first = controls[0];
    const last = controls[controls.length - 1];
    expect(document.body.style.overflow).toBe("hidden");

    first.focus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(document.body.style.overflow).toBe("auto");
    document.body.style.overflow = "";
  });

  it("se referme avec le bouton de fermeture et rend le focus au bouton", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.click(screen.getByRole("button", { name: "Fermer le menu" }));

    expect(document.getElementById(MOBILE_MENU_ID)).toBeNull();
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveFocus();
  });

  it("se referme au changement de page", async () => {
    const user = userEvent.setup();

    const { rerender } = render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    expect(document.getElementById(MOBILE_MENU_ID)).not.toBeNull();

    navigation.pathname = "/a-propos";
    rerender(<SiteHeader />);

    expect(document.getElementById(MOBILE_MENU_ID)).toBeNull();
  });

  it("marque l’entrée active de la page courante", () => {
    navigation.pathname = "/expertises";

    render(<SiteHeader />);

    const current = Array.from(document.querySelectorAll("[aria-current='page']"));

    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("Expertises");
  });

  it("marque l’entrée « Réalisations & Insights » sur les sous-pages", () => {
    navigation.pathname = "/insights/un-modele-financier-lisible";

    render(<SiteHeader />);

    const current = screen.getByRole("link", { name: "Réalisations & Insights" });

    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("ne marque aucune entrée sur la page d’accueil", () => {
    render(<SiteHeader />);

    expect(document.querySelectorAll("[aria-current]")).toHaveLength(0);
  });
});
