import { describe, expect, it } from "vitest";

import { NEED_OPTIONS } from "@/content/pages";
import {
  CONTACT_FORM_FIELDS,
  CONTACT_LIMITS,
  EMPTY_CONTACT_FORM,
  hasContactErrors,
  validateContactRequest,
  type ContactRequestInput,
} from "@/lib/contact";

const validInput = (overrides: Partial<ContactRequestInput> = {}): ContactRequestInput => ({
  name: "Awa Ouédraogo",
  organisation: "Cabinet Exemple",
  email: "awa@exemple.com",
  phone: "",
  need: NEED_OPTIONS[0]!.value,
  message: "Nous souhaitons structurer notre rapport annuel avant la fin de l’année.",
  ...overrides,
});

describe("CONTACT_FORM_FIELDS", () => {
  it("décrit les six champs du formulaire dans l’ordre de la maquette", () => {
    expect(CONTACT_FORM_FIELDS.map((field) => field.name)).toEqual([
      "name",
      "organisation",
      "email",
      "phone",
      "need",
      "message",
    ]);
    expect(CONTACT_FORM_FIELDS.map((field) => field.type)).toEqual([
      "text",
      "text",
      "email",
      "tel",
      "select",
      "textarea",
    ]);
    expect(CONTACT_FORM_FIELDS.filter((field) => field.required).map((field) => field.name)).toEqual([
      "name",
      "organisation",
      "email",
      "need",
      "message",
    ]);
  });
});

describe("validateContactRequest", () => {
  it("accepte une demande complète", () => {
    expect(validateContactRequest(validInput())).toEqual({});
    expect(hasContactErrors(validateContactRequest(validInput()))).toBe(false);
  });

  it("signale chaque champ obligatoire manquant", () => {
    const errors = validateContactRequest({ ...EMPTY_CONTACT_FORM });

    expect(Object.keys(errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "need",
      "organisation",
    ]);
    expect(hasContactErrors(errors)).toBe(true);
  });

  it("valide le format de l’adresse e-mail", () => {
    expect(validateContactRequest(validInput({ email: "awa@exemple" })).email).toBe(
      "Merci d’indiquer une adresse e-mail valide.",
    );
    expect(validateContactRequest(validInput({ email: "awa exemple.com" })).email).toBe(
      "Merci d’indiquer une adresse e-mail valide.",
    );
    expect(validateContactRequest(validInput({ email: "awa@exemple.com" })).email).toBeUndefined();
  });

  it("refuse un type de besoin hors liste", () => {
    expect(validateContactRequest(validInput({ need: "besoin-inconnu" })).need).toBe(
      "Merci de sélectionner un type de besoin dans la liste.",
    );
    expect(
      validateContactRequest(validInput({ need: NEED_OPTIONS[5]!.value })).need,
    ).toBeUndefined();
  });

  it("impose une longueur minimale au message et au nom", () => {
    expect(validateContactRequest(validInput({ message: "trop court" })).message).toBe(
      "Merci de détailler votre besoin en quelques mots (20 caractères minimum).",
    );
    expect(validateContactRequest(validInput({ message: "" })).message).toBe(
      "Merci de décrire votre besoin.",
    );
    expect(validateContactRequest(validInput({ name: "A" })).name).toBe(
      "Le nom doit contenir au moins 2 caractères.",
    );
  });

  it("contrôle les longueurs maximales déclarées", () => {
    expect(
      validateContactRequest(
        validInput({ name: "a".repeat(CONTACT_LIMITS.name.max + 1) }),
      ).name,
    ).toBe("Le nom ne peut pas dépasser 120 caractères.");
    expect(
      validateContactRequest(
        validInput({ organisation: "a".repeat(CONTACT_LIMITS.organisation.max + 1) }),
      ).organisation,
    ).toBe("Le nom de l’organisation ne peut pas dépasser 160 caractères.");
    expect(
      validateContactRequest(
        validInput({ email: `${"a".repeat(200)}@exemple.com` }),
      ).email,
    ).toBe("L’adresse e-mail ne peut pas dépasser 200 caractères.");
    expect(
      validateContactRequest(
        validInput({ message: "a".repeat(CONTACT_LIMITS.message.max + 1) }),
      ).message,
    ).toBe("Le message ne peut pas dépasser 4000 caractères.");
    expect(
      validateContactRequest(
        validInput({ phone: "0".repeat(CONTACT_LIMITS.phone.max + 1) }),
      ).phone,
    ).toBe("Le numéro de téléphone ne peut pas dépasser 40 caractères.");
  });

  it("laisse le téléphone facultatif", () => {
    expect(validateContactRequest(validInput({ phone: "" })).phone).toBeUndefined();
    expect(validateContactRequest(validInput({ phone: "+226 04 00 95 98" })).phone).toBeUndefined();
  });
});
