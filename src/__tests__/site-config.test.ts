import { describe, expect, it } from "vitest";

import {
  CONTACT,
  CONTACT_DETAILS,
  SOCIAL_LINKS,
  siteConfig,
} from "@/config/site";

describe("siteConfig", () => {
  it("déclare l’identité de la marque et sa localisation", () => {
    expect(siteConfig.name).toBe("PANGARAMA");
    expect(siteConfig.tagline).toBe("Comprendre. Valoriser. Développer.");
    expect(siteConfig.location).toBe("Ouagadougou, Burkina Faso");
    expect(siteConfig.description.length).toBeGreaterThan(80);
    expect(siteConfig.shortDescription.length).toBeGreaterThan(80);
  });

  it("n’expose aucun numéro de téléphone obsolète", () => {
    const serialized = JSON.stringify(siteConfig);

    expect(serialized).not.toContain("72849940");
    expect(serialized).not.toContain("72 84 99 40");
  });

  it("formate le téléphone pour l’affichage et pour les liens", () => {
    expect(siteConfig.phoneDisplay).toBe("+226 04009598");
    expect(siteConfig.phoneHref).toBe("+22604009598");
    // `phoneHref` doit être un numéro composable : uniquement + et chiffres.
    expect(siteConfig.phoneHref).toMatch(/^\+?[0-9]+$/);
    expect(CONTACT.phoneHref).toBe("tel:+22604009598");
    expect(CONTACT.phoneDisplay).toBe("+226 04009598");
  });

  it("expose l’adresse e-mail et son lien", () => {
    expect(siteConfig.email).toMatch(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/);
    expect(CONTACT.emailHref).toBe(`mailto:${siteConfig.email}`);
  });

  it("n’invente aucune URL de réseau social non confirmée", () => {
    expect(siteConfig.socials.linkedin).toBeNull();
    expect(siteConfig.socials.facebook).toBeNull();
    expect(siteConfig.socials.youtube).toMatch(/^https:\/\/(www\.)?youtube\.com\//);
  });

  it("ne liste que les réseaux réellement configurés", () => {
    expect(SOCIAL_LINKS.map((link) => link.network)).toEqual(["youtube"]);
    expect(SOCIAL_LINKS[0]?.href).toBe(siteConfig.socials.youtube);
    expect(SOCIAL_LINKS[0]?.ariaLabel).toBe("PANGARAMA sur YouTube");
  });

  it("décrit les trois coordonnées de la page Contact", () => {
    expect(CONTACT_DETAILS.map((detail) => detail.id)).toEqual([
      "location",
      "email",
      "phone",
    ]);
    expect(CONTACT_DETAILS.map((detail) => detail.value)).toEqual([
      siteConfig.location,
      siteConfig.email,
      siteConfig.phoneDisplay,
    ]);
    expect(CONTACT_DETAILS[0]).not.toHaveProperty("href");
    expect(CONTACT_DETAILS[1]?.href).toBe(CONTACT.emailHref);
    expect(CONTACT_DETAILS[2]?.href).toBe(CONTACT.phoneHref);
  });
});
