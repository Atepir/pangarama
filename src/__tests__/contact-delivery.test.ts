import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { NEED_OPTIONS } from "@/content/pages";

const emailjs = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("@emailjs/browser", () => ({
  default: { send: emailjs.send },
}));

vi.mock("@/lib/recaptcha", () => ({
  RECAPTCHA_SITE_KEY: "cle-de-site",
  requestCaptchaToken: () => Promise.resolve("jeton-captcha"),
}));

const VALID = {
  name: "Awa Ouédraogo",
  organisation: "Sahel Capital Partners",
  email: "awa.ouedraogo@example.com",
  phone: "",
  need: NEED_OPTIONS[0]!.value,
  message: "Nous préparons une levée de fonds et cherchons un accompagnement éditorial.",
};

describe("contact-delivery (EmailJS)", () => {
  beforeEach(() => {
    vi.resetModules();
    emailjs.send.mockReset().mockResolvedValue({ status: 200, text: "OK" });
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_pangarama");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "template_contact");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "cle-publique");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("est configuré quand les identifiants publics sont renseignés", async () => {
    const { isContactDeliveryConfigured } = await import("@/lib/contact-delivery");

    expect(isContactDeliveryConfigured()).toBe(true);
  });

  it("reste inactif sans clé publique", async () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "");

    const { isContactDeliveryConfigured } = await import("@/lib/contact-delivery");

    expect(isContactDeliveryConfigured()).toBe(false);
  });

  it("transmet les champs du formulaire et le jeton reCAPTCHA", async () => {
    const { sendContactRequest } = await import("@/lib/contact-delivery");

    await sendContactRequest(VALID);

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_pangarama",
      "template_contact",
      {
        from_name: VALID.name,
        organisation: VALID.organisation,
        email: VALID.email,
        phone: "Non renseigné",
        need: NEED_OPTIONS[0]!.label,
        message: VALID.message,
        "g-recaptcha-response": "jeton-captcha",
      },
      { publicKey: "cle-publique" },
    );
  });

  it("propage l’échec d’EmailJS", async () => {
    emailjs.send.mockRejectedValueOnce(new Error("EmailJS indisponible"));

    const { sendContactRequest } = await import("@/lib/contact-delivery");

    await expect(sendContactRequest(VALID)).rejects.toThrow("EmailJS indisponible");
  });
});
