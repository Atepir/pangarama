import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/config/site";

const PROFILE_NETWORKS = ["facebook", "instagram", "youtube"] as const;

describe("SocialLinks", () => {
  it("affiche les quatre réseaux dans l’ordre", () => {
    render(<SocialLinks />);

    const items = Array.from(document.querySelectorAll("li"));

    expect(items).toHaveLength(4);
    expect(items.map((item) => item.querySelector("[aria-label]")?.getAttribute("aria-label"))).toEqual([
      `${siteConfig.name} sur LinkedIn — lien officiel à confirmer`,
      `${siteConfig.name} sur Facebook`,
      `${siteConfig.name} sur Instagram`,
      `${siteConfig.name} sur YouTube`,
    ]);
  });

  it("pointe vers les profils confirmés, en nouvel onglet", () => {
    render(<SocialLinks />);

    const anchors = screen.getAllByRole("link");

    expect(anchors.map((anchor) => anchor.getAttribute("href"))).toEqual(
      PROFILE_NETWORKS.map((network) => siteConfig.socials[network]),
    );

    for (const anchor of anchors) {
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor.getAttribute("rel")).toContain("noreferrer");
      expect(anchor.getAttribute("rel")).toContain("noopener");
    }
  });

  it("n’invente aucun lien pour LinkedIn, non confirmé", () => {
    render(<SocialLinks />);

    const placeholders = screen.getAllByRole("img");

    expect(placeholders).toHaveLength(1);
    expect(placeholders[0]?.tagName).toBe("SPAN");
    expect(document.body.innerHTML).not.toMatch(/linkedin\.com/i);
  });

  it("applique la tonalité demandée aux pastilles", () => {
    const { container: light } = render(<SocialLinks tone="light" />);
    const { container: dark } = render(<SocialLinks tone="dark" />);

    expect(light.querySelectorAll("a, span[role='img']")).toHaveLength(4);
    expect(dark.querySelectorAll("a, span[role='img']")).toHaveLength(4);
    expect(light.querySelector("a")?.className).toContain("border-on-dark-faint");
    expect(dark.querySelector("a")?.className).toContain("border-navy/30");
  });
});
