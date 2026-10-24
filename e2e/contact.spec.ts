import { expect, test, type Page } from "@playwright/test";

import { CONTACT } from "@/config/site";
import {
  CONTACT_CHANNELS,
  CONTACT_CONFIDENTIALITY,
  CONTACT_FORM,
  CONTACT_PAGE,
  CONTACT_STEPS,
  NEED_OPTIONS,
} from "@/content/pages";
import { CONTACT_FORM_FIELDS, type ContactFieldName } from "@/lib/contact";

const MAIN = "main#contenu";
/** Les erreurs de champ sont les seuls paragraphes `contact-*-error`. */
const ERRORS = 'p[id^="contact-"][id$="-error"]';
/** Région live du formulaire : elle seule annonce l’état de la demande. */
const LIVE = 'form [role="status"]';

/** Les cinq champs obligatoires, validés côté client. */
const REQUIRED_FIELDS = CONTACT_FORM_FIELDS.filter(
  (descriptor) => descriptor.required,
).map((descriptor) => descriptor.name);

/**
 * Ceux portés par un contrôle natif. Le type de besoin est un
 * `role="combobox"` : il n'accepte pas `required` et annonce son obligation par
 * le libellé (« champ obligatoire ») et par `aria-invalid` à la soumission vide.
 */
const NATIVE_REQUIRED_FIELDS = CONTACT_FORM_FIELDS.filter(
  (descriptor) => descriptor.required && descriptor.type !== "select",
).map((descriptor) => descriptor.name);

const VALID_INPUT = {
  name: "Awa Ouédraogo",
  organisation: "Institution partenaire",
  email: "awa.ouedraogo@example.com",
  phone: "",
  need: NEED_OPTIONS[0].value,
  message:
    "Nous préparons un rapport annuel destiné aux partenaires et souhaitons cadrer la mission.",
} as const;

const control = (page: Page, name: ContactFieldName) => page.locator(`#contact-${name}`);
const errorText = (page: Page, name: ContactFieldName) => page.locator(`#contact-${name}-error`);

async function fillValidForm(page: Page) {
  await control(page, "name").fill(VALID_INPUT.name);
  await control(page, "organisation").fill(VALID_INPUT.organisation);
  await control(page, "email").fill(VALID_INPUT.email);
  await control(page, "message").fill(VALID_INPUT.message);

  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: NEED_OPTIONS[0].label }).click();
}

test.describe("Page Contact — desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("expose la promesse, le formulaire, les canaux et la confidentialité", async ({
    page,
  }) => {
    const response = await page.goto("/contact");
    expect(response?.status()).toBe(200);

    const main = page.locator(MAIN);
    const heading = page.getByRole("heading", { level: 1 });

    await expect(heading).toHaveCount(1);
    await expect(heading).toHaveText(CONTACT_PAGE.title);
    await expect(main).toContainText(CONTACT_PAGE.intro);
    await expect(main).toContainText(CONTACT.location);

    await expect(page.getByRole("heading", { name: CONTACT_FORM.title })).toBeVisible();

    for (const descriptor of CONTACT_FORM_FIELDS) {
      await expect(control(page, descriptor.name)).toHaveCount(1);
      await expect(page.locator(`#contact-${descriptor.name}-label`)).toContainText(
        descriptor.label,
      );
    }

    for (const name of NATIVE_REQUIRED_FIELDS) {
      await expect(control(page, name)).toHaveAttribute("required", "");
    }

    await expect(control(page, "phone")).not.toHaveAttribute("required", "");
    await expect(page.locator("#contact-name")).toHaveAttribute("maxlength", "120");
    await expect(page.locator("#contact-message")).toHaveAttribute("maxlength", "4000");

    // Un seul sélecteur de besoin, fermé et vide au chargement.
    const combobox = page.getByRole("combobox");
    await expect(combobox).toHaveCount(1);
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
    await expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    await expect(combobox).toContainText(CONTACT_FORM.selectPlaceholder);
    // Champ obligatoire, sans `required` : l'obligation passe par le libellé.
    await expect(combobox).toHaveAccessibleName(new RegExp(CONTACT_FORM.requiredLabel));
    await expect(page.locator("#contact-need-listbox")).toHaveCount(0);

    const submit = page.getByRole("button", { name: CONTACT_FORM.submitLabel });
    await expect(submit).toHaveCount(1);
    await expect(submit).toBeEnabled();
    await expect(page.locator("form")).not.toHaveAttribute("aria-busy", "true");

    for (const channel of CONTACT_CHANNELS) {
      await expect(main).toContainText(channel.label);
      await expect(main).toContainText(channel.description);
    }

    await expect(main).toContainText(CONTACT_STEPS.eyebrow);
    await expect(main).toContainText(CONTACT_STEPS.title);
    for (const step of CONTACT_STEPS.steps) {
      await expect(main).toContainText(step.title);
      await expect(main).toContainText(step.description);
    }

    await expect(main).toContainText(CONTACT_CONFIDENTIALITY.title);
    await expect(main).toContainText(CONTACT_CONFIDENTIALITY.text);

    await expect(main.locator(`a[href="mailto:${CONTACT.email}"]`).first()).toBeAttached();
    await expect(main.locator(`a[href="${CONTACT.phoneHref}"]`).first()).toBeAttached();
  });

  test("une soumission vide signale les cinq champs obligatoires, sans envoi", async ({
    page,
  }) => {
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.method() === "POST") {
        requests.push(request.url());
      }
    });

    await page.goto("/contact");
    await page.getByRole("button", { name: CONTACT_FORM.submitLabel }).click();

    const errors = page.locator(ERRORS);
    await expect(errors).toHaveCount(REQUIRED_FIELDS.length);

    for (const name of REQUIRED_FIELDS) {
      await expect(errorText(page, name)).not.toBeEmpty();
      await expect(control(page, name)).toHaveAttribute("aria-invalid", "true");
      await expect(control(page, name)).toHaveAttribute(
        "aria-describedby",
        `contact-${name}-error`,
      );
    }

    // Le champ facultatif reste sans erreur.
    await expect(errorText(page, "phone")).toHaveCount(0);
    await expect(control(page, "phone")).not.toHaveAttribute("aria-invalid", "true");

    // Rien n'est transmis : le site statique n'expose aucun point d'envoi.
    expect(requests).toEqual([]);
    await expect(page.url()).toContain("/contact");

    await expect(page.locator(LIVE)).toContainText(CONTACT_FORM.messages.invalid);
    await expect(page.locator(LIVE)).not.toContainText(CONTACT_FORM.messages.unconfigured);
    await expect(page.locator(LIVE).locator(`a[href="mailto:${CONTACT.email}"]`)).toHaveCount(0);

    // La saisie corrigée efface l’erreur du champ concerné.
    await control(page, "name").fill(VALID_INPUT.name);
    await expect(errorText(page, "name")).toHaveCount(0);
    await expect(control(page, "name")).not.toHaveAttribute("aria-invalid", "true");
    await expect(page.locator(ERRORS)).toHaveCount(REQUIRED_FIELDS.length - 1);
  });

  test("une demande complète renvoie vers l’écriture directe, sans succès simulé", async ({
    page,
  }) => {
    await page.goto("/contact");
    await fillValidForm(page);
    await page.getByRole("button", { name: CONTACT_FORM.submitLabel }).click();

    const status = page.locator(LIVE);
    await expect(status).toContainText(CONTACT_FORM.messages.unconfigured);
    await expect(status).toContainText(CONTACT_FORM.messages.fallbackContact);
    await expect(status.locator(`a[href="mailto:${CONTACT.email}"]`)).toHaveCount(1);

    // Le formulaire reste en place : aucune demande n’a été transmise.
    await expect(page.getByRole("button", { name: CONTACT_FORM.submitLabel })).toBeEnabled();
    await expect(control(page, "email")).toHaveValue(VALID_INPUT.email);
    await expect(page.locator(ERRORS)).toHaveCount(0);

    // Un retour à une saisie invalide réaffiche les erreurs de champ.
    await control(page, "email").fill("");
    await page.getByRole("button", { name: CONTACT_FORM.submitLabel }).click();

    await expect(page.locator(LIVE)).toContainText(CONTACT_FORM.messages.invalid);
    await expect(status.locator(`a[href="mailto:${CONTACT.email}"]`)).toHaveCount(0);
    await expect(control(page, "email")).toHaveAttribute("aria-invalid", "true");
  });

  test("le sélecteur de besoin se pilote au clavier", async ({ page }) => {
    await page.goto("/contact");

    const combobox = page.getByRole("combobox");
    await combobox.focus();
    await combobox.press("Enter");

    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    await expect(combobox).toHaveAttribute("aria-controls", "contact-need-listbox");

    const options = page.locator("#contact-need-listbox > li[role='option']");
    await expect(options).toHaveCount(NEED_OPTIONS.length);
    await expect(options.first()).toHaveText(NEED_OPTIONS[0].label);
    await expect(combobox).toHaveAttribute("aria-activedescendant", "contact-need-option-0");

    await combobox.press("ArrowDown");
    await expect(combobox).toHaveAttribute("aria-activedescendant", "contact-need-option-1");

    await combobox.press("End");
    await expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      `contact-need-option-${NEED_OPTIONS.length - 1}`,
    );

    await combobox.press("Enter");
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#contact-need-listbox")).toHaveCount(0);
    await expect(combobox).toContainText(NEED_OPTIONS[NEED_OPTIONS.length - 1].label);
    await expect(combobox).toBeFocused();

    // Réouverture : l’option courante est marquée comme sélectionnée.
    await combobox.press("Enter");
    await expect(
      page.locator(`#contact-need-option-${NEED_OPTIONS.length - 1}`),
    ).toHaveAttribute("aria-selected", "true");

    await combobox.press("Escape");
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
    await expect(combobox).toBeFocused();

    // Tab referme la liste sans voler la navigation au clavier.
    await combobox.press("Enter");
    await expect(combobox).toHaveAttribute("aria-expanded", "true");
    await combobox.press("Tab");
    await expect(combobox).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Page Contact — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("le formulaire reste utilisable et mène au repli par e-mail", async ({ page }) => {
    const response = await page.goto("/contact");
    expect(response?.status()).toBe(200);

    const main = page.locator(MAIN);
    await expect(main).toContainText(CONTACT_PAGE.introMobile);
    await expect(page.getByRole("combobox")).toHaveCount(1);

    await fillValidForm(page);
    await page.getByRole("button", { name: CONTACT_FORM.submitLabel }).click();

    const status = page.locator(LIVE);
    await expect(status).toContainText(CONTACT_FORM.messages.unconfigured);
    await expect(status.locator(`a[href="mailto:${CONTACT.email}"]`)).toHaveCount(1);
  });
});
