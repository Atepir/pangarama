import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT } from "@/config/site";
import { CONTACT_FORM, NEED_OPTIONS } from "@/content/pages";

/**
 * L'envoi EmailJS et reCAPTCHA sont simulés : les tests portent sur le contrat
 * du formulaire, pas sur les services tiers.
 */
const delivery = vi.hoisted(() => ({
  configured: false,
  failure: null as Error | null,
}));

vi.mock("@/lib/contact-delivery", () => ({
  isContactDeliveryConfigured: () => delivery.configured,
  sendContactRequest: () =>
    delivery.failure ? Promise.reject(delivery.failure) : Promise.resolve(),
}));

const VALID = {
  name: "Awa Ouédraogo",
  organisation: "Sahel Capital Partners",
  email: "awa.ouedraogo@example.com",
  need: NEED_OPTIONS[0]!.value,
  message: "Nous préparons une levée de fonds et cherchons un accompagnement éditorial.",
};

function field(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Champ introuvable : #${id}`);
  }
  return element;
}

function submitButton() {
  return screen.getByRole("button", { name: new RegExp(CONTACT_FORM.submitLabel) });
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Nom complet/), VALID.name);
  await user.type(screen.getByLabelText(/Organisation/), VALID.organisation);
  await user.type(screen.getByLabelText(/E-mail/), VALID.email);
  await user.click(screen.getByRole("combobox"));
  await user.click(screen.getByRole("option", { name: NEED_OPTIONS[0]!.label }));
  await user.type(screen.getByLabelText(/Message/), VALID.message);
}

describe("ContactForm", () => {
  beforeEach(() => {
    delivery.configured = false;
    delivery.failure = null;
  });

  it("affiche les six champs de la maquette, dans l’ordre", () => {
    render(<ContactForm />);

    expect(screen.getByRole("heading", { name: CONTACT_FORM.title })).toBeInTheDocument();

    const controls = Array.from(
      document.querySelectorAll<HTMLElement>("input, textarea, [role='combobox']"),
    ).map((element) => element.id);

    expect(controls).toEqual([
      "contact-name",
      "contact-organisation",
      "contact-email",
      "contact-phone",
      "contact-need",
      "contact-message",
    ]);

    // Seul le téléphone est facultatif.
    expect(document.getElementById("contact-phone-label")).toHaveTextContent("Facultatif");
    expect(field("contact-phone")).not.toHaveAttribute("required");
    expect(field("contact-name")).toHaveAttribute("required");
    expect(field("contact-name")).toHaveAccessibleName(new RegExp(CONTACT_FORM.requiredLabel));
  });

  it("refuse un envoi vide et signale les cinq champs obligatoires", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(submitButton());

    const invalid = Array.from(
      document.querySelectorAll('[aria-invalid="true"]'),
    ).map((element) => element.id);

    expect(invalid).toEqual([
      "contact-name",
      "contact-organisation",
      "contact-email",
      "contact-need",
      "contact-message",
    ]);
    expect(field("contact-phone")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByRole("status")).toHaveTextContent(CONTACT_FORM.messages.invalid);
    // Aucun repli tant que la demande n’est pas exploitable.
    expect(screen.queryByRole("link", { name: CONTACT.email })).toBeNull();
  });

  it("relie chaque erreur à son champ et l’efface à la correction", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await user.click(submitButton());

    expect(field("contact-name")).toHaveAttribute("aria-describedby", "contact-name-error");
    expect(document.getElementById("contact-name-error")).toHaveTextContent(
      /Merci d’indiquer votre nom et prénom/,
    );

    await user.type(screen.getByLabelText(/Nom complet/), VALID.name);

    expect(field("contact-name")).not.toHaveAttribute("aria-invalid");
    expect(document.getElementById("contact-name-error")).toBeNull();
    // Les autres champs restent signalés.
    expect(field("contact-message")).toHaveAttribute("aria-invalid", "true");
  });

  it("sans configuration, une demande valide renvoie vers l’écriture directe", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(submitButton());

    expect(screen.getByRole("status")).toHaveTextContent(CONTACT_FORM.messages.unconfigured);
    expect(screen.getByRole("status")).toHaveTextContent(CONTACT_FORM.messages.fallbackContact);
    expect(screen.getByRole("link", { name: CONTACT.email })).toHaveAttribute(
      "href",
      `mailto:${CONTACT.email}`,
    );

    // Le formulaire reste en place : aucune demande n’a été transmise, la
    // saisie doit rester disponible pour que le visiteur écrive lui-même.
    expect(submitButton()).toBeInTheDocument();
    expect(field("contact-email")).toHaveValue(VALID.email);
    expect(field("contact-name")).not.toHaveAttribute("aria-invalid");
  });

  it("revient au signalement des champs si la demande redevient invalide", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(submitButton());

    expect(screen.getByRole("link", { name: CONTACT.email })).toBeInTheDocument();

    await user.clear(field("contact-email"));
    await user.click(submitButton());

    expect(screen.getByRole("status")).toHaveTextContent(CONTACT_FORM.messages.invalid);
    expect(field("contact-email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByRole("link", { name: CONTACT.email })).toBeNull();
  });
});

describe("ContactForm — envoi EmailJS protégé par reCAPTCHA", () => {
  beforeEach(() => {
    delivery.configured = true;
    delivery.failure = null;
  });

  it("confirme l’envoi puis remet le formulaire à zéro", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(CONTACT_FORM.messages.sent),
    );

    expect(field("contact-name")).toHaveValue("");
    expect(field("contact-email")).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("link", { name: CONTACT.email })).toBeNull();
    expect(submitButton()).toBeEnabled();
  });

  it("signale un échec d’envoi et propose l’écriture directe", async () => {
    delivery.failure = new Error("EmailJS indisponible");

    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(submitButton());

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(CONTACT_FORM.messages.error),
    );
    expect(screen.getByRole("link", { name: CONTACT.email })).toHaveAttribute(
      "href",
      `mailto:${CONTACT.email}`,
    );
    // La saisie est conservée pour permettre une nouvelle tentative.
    expect(field("contact-email")).toHaveValue(VALID.email);
  });

  it("affiche la mention légale exigée par Google", () => {
    render(<ContactForm />);

    expect(screen.getByText(CONTACT_FORM.recaptchaNotice.privacy)).toHaveAttribute(
      "href",
      "https://policies.google.com/privacy",
    );
    expect(screen.getByText(CONTACT_FORM.recaptchaNotice.terms)).toHaveAttribute(
      "href",
      "https://policies.google.com/terms",
    );
  });
});
