import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/ui/social-links";
import { SOCIAL_LINKS, siteConfig } from "@/config/site";

const YOUTUBE = SOCIAL_LINKS.find((link) => link.network === "youtube");

describe("SocialLinks", () => {
  it("affiche les trois réseaux de la maquette, dans l’ordre", () => {
    render(<SocialLinks />);

    const items = Array.from(document.querySelectorAll("li"));

    expect(items).toHaveLength(3);
    expect(items.map((item) => item.querySelector("[aria-label]")?.getAttribute("aria-label"))).toEqual([
      `${siteConfig.name} sur LinkedIn — lien officiel à confirmer`,
      `${siteConfig.name} sur Facebook — lien officiel à confirmer`,
      YOUTUBE?.ariaLabel,
    ]);
  });

  it("pointe uniquement vers la chaîne YouTube confirmée", () => {
    render(<SocialLinks />);

    const anchors = screen.getAllByRole("link");

    expect(anchors).toHaveLength(1);
    expect(anchors[0]).toHaveAttribute("href", siteConfig.socials.youtube);
    expect(anchors[0]).toHaveAttribute("target", "_blank");
    expect(anchors[0]?.getAttribute("rel")).toContain("noreferrer");
    expect(anchors[0]?.getAttribute("rel")).toContain("noopener");
  });

  it("n’invente aucun lien pour les réseaux non confirmés", () => {
    render(<SocialLinks />);

    const placeholders = screen.getAllByRole("img");

    expect(placeholders).toHaveLength(2);
    expect(placeholders.map((placeholder) => placeholder.tagName)).toEqual(["SPAN", "SPAN"]);

    const html = document.body.innerHTML;

    expect(html).not.toMatch(/linkedin\.com/i);
    expect(html).not.toMatch(/facebook\.com/i);
  });

  it("applique la tonalité demandée aux pastilles", () => {
    const { container: light } = render(<SocialLinks tone="light" />);
    const { container: dark } = render(<SocialLinks tone="dark" />);

    expect(light.querySelectorAll("a, span[role='img']")).toHaveLength(3);
    expect(dark.querySelectorAll("a, span[role='img']")).toHaveLength(3);
    expect(light.querySelector("a")?.className).toContain("border-on-dark-faint");
    expect(dark.querySelector("a")?.className).toContain("border-navy/30");
  });
});
