import emailjs from "@emailjs/browser";

import { NEED_OPTIONS } from "@/content/pages";
import type { ContactRequestInput } from "@/lib/contact";
import { RECAPTCHA_SITE_KEY, requestCaptchaToken } from "@/lib/recaptcha";

/**
 * Envoi sans serveur : le navigateur appelle EmailJS avec une clé publique
 * prévue pour cela (restreinte par origine et par quota). Le jeton reCAPTCHA
 * est vérifié côté EmailJS, qui détient la clé secrète.
 */

export const EMAILJS_SERVICE_ID = (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "").trim();
export const EMAILJS_TEMPLATE_ID = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "").trim();
export const EMAILJS_PUBLIC_KEY = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "").trim();

/** Sans configuration complète, le formulaire retombe sur l'écriture directe. */
export function isContactDeliveryConfigured(): boolean {
  return Boolean(
    EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY && RECAPTCHA_SITE_KEY,
  );
}

export type ContactTemplateParams = {
  from_name: string;
  organisation: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  "g-recaptcha-response": string;
};

export function buildTemplateParams(
  input: ContactRequestInput,
  token: string,
): ContactTemplateParams {
  const need = NEED_OPTIONS.find((option) => option.value === input.need)?.label ?? input.need;

  return {
    from_name: input.name.trim(),
    organisation: input.organisation.trim(),
    email: input.email.trim(),
    phone: input.phone.trim() || "Non renseigné",
    need,
    message: input.message.trim(),
    "g-recaptcha-response": token,
  };
}

export async function sendContactRequest(input: ContactRequestInput): Promise<void> {
  const token = await requestCaptchaToken();

  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, buildTemplateParams(input, token), {
    publicKey: EMAILJS_PUBLIC_KEY,
  });
}
