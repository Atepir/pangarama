"use client";

import { useState, type FormEvent } from "react";

import { CONTACT } from "@/config/site";
import { CONTACT_FORM, NEED_OPTIONS } from "@/content/pages";
import { cn } from "@/lib/cn";
import { isContactDeliveryConfigured, sendContactRequest } from "@/lib/contact-delivery";
import {
  CONTACT_FORM_FIELDS,
  EMPTY_CONTACT_FORM,
  hasContactErrors,
  validateContactRequest,
  type ContactFieldDescriptor,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactRequestInput,
} from "@/lib/contact";

import { ContactField } from "./contact-field";
import { CARD, SUBMIT_BUTTON } from "./form-styles";

/**
 * Le site est statique : la demande est remise à EmailJS depuis le navigateur,
 * avec un jeton reCAPTCHA vérifié par EmailJS (aucun secret côté client). Sans
 * configuration complète au build, le formulaire retombe sur l’écriture
 * directe, sans simuler de succès.
 */
type Status = "idle" | "invalid" | "submitting" | "fallback" | "sent" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "submitting">, string> = {
  invalid: CONTACT_FORM.messages.invalid,
  fallback: CONTACT_FORM.messages.unconfigured,
  sent: CONTACT_FORM.messages.sent,
  error: CONTACT_FORM.messages.error,
};

const DESCRIPTORS = CONTACT_FORM_FIELDS.reduce(
  (accumulator, descriptor) => {
    accumulator[descriptor.name] = descriptor;
    return accumulator;
  },
  {} as Record<ContactFieldName, ContactFieldDescriptor>,
);

/** Les duos de champs ne passent côte à côte qu’une fois la carte assez large. */
const ROW = "flex w-full flex-col gap-[16px] xl:flex-row xl:gap-[24px]";
const ROW_FIELD = "xl:min-w-0 xl:flex-1";

const STATUS_TEXT = "text-[13px] leading-[1.45]";
const INLINE_LINK =
  "font-semibold text-gold-ink underline decoration-from-font underline-offset-2 transition-colors duration-300 ease-editorial hover:text-gold-ink-deep";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps) {
  const [values, setValues] = useState<ContactRequestInput>(EMPTY_CONTACT_FORM);
  const [submitted, setSubmitted] = useState<ContactRequestInput | null>(null);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const configured = isContactDeliveryConfigured();

  const handleChange = (name: ContactFieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });

    setStatus((current) => (current === "submitting" ? current : "idle"));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const validation = validateContactRequest(values);

    if (hasContactErrors(validation)) {
      setErrors(validation);
      setStatus("invalid");
      return;
    }

    setErrors({});

    if (!configured) {
      setSubmitted(values);
      setStatus("fallback");
      return;
    }

    setStatus("submitting");

    try {
      await sendContactRequest(values);
      setSubmitted(null);
      setValues(EMPTY_CONTACT_FORM);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field = (name: ContactFieldName, fieldClassName?: string) => (
    <ContactField
      key={name}
      descriptor={DESCRIPTORS[name]}
      value={values[name]}
      error={errors[name]}
      onChange={handleChange}
      className={fieldClassName}
    />
  );

  const isSubmitting = status === "submitting";
  const showMailto = status === "fallback" || status === "error";
  const statusMessage = status === "idle" || isSubmitting ? null : MESSAGES[status];

  const mailtoHref =
    status === "fallback" && submitted
      ? buildRequestMailto(submitted)
      : `mailto:${CONTACT.email}`;

  return (
    <form
      className={cn(CARD, className)}
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      noValidate
    >
      <h2 className="max-w-[280px] text-display-3 text-navy">{CONTACT_FORM.title}</h2>
      <p className="text-body-sm text-body">{CONTACT_FORM.intro}</p>

      <div className={ROW}>
        {field("name", ROW_FIELD)}
        {field("organisation", ROW_FIELD)}
      </div>
      <div className={ROW}>
        {field("email", ROW_FIELD)}
        {field("phone", ROW_FIELD)}
      </div>
      {field("need")}
      {field("message")}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className={cn(SUBMIT_BUTTON, "disabled:cursor-progress disabled:opacity-70")}
          disabled={isSubmitting}
        >
          {isSubmitting ? CONTACT_FORM.messages.submitting : CONTACT_FORM.submitLabel}
          <span aria-hidden="true">→</span>
        </button>

        {/*
          La région live reste dans le DOM (donc annoncée de façon fiable) sans
          ajouter d'écart vertical au repos.
        */}
        <div role="status" aria-live="polite" className="flex flex-col gap-2.5">
          {statusMessage ? (
            <p className={cn(STATUS_TEXT, status === "invalid" ? "text-danger" : "text-body")}>
              {statusMessage}
              {status === "error" ? (
                <>
                  {" "}
                  <a href={`mailto:${CONTACT.email}`} className={INLINE_LINK}>
                    {CONTACT.email}
                  </a>
                </>
              ) : null}
            </p>
          ) : null}

          {status === "fallback" ? (
            <p className={cn(STATUS_TEXT, "text-body")}>
              <span>{`${CONTACT_FORM.messages.fallbackContact} `}</span>
              <a href={`mailto:${CONTACT.email}`} className={INLINE_LINK}>
                {CONTACT.email}
              </a>
            </p>
          ) : null}

          {showMailto ? (
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 self-start rounded-full border border-outline px-5 py-2.5 text-[14px] font-semibold text-navy transition-colors duration-300 ease-editorial hover:bg-navy hover:text-white"
            >
              Envoyer ma demande par e-mail
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>

        {configured ? (
          <p className="text-[12px] leading-[1.45] text-body">
            {CONTACT_FORM.recaptchaNotice.lead}{" "}
            <a
              href="https://policies.google.com/privacy"
              className={INLINE_LINK}
              rel="noreferrer noopener"
              target="_blank"
            >
              {CONTACT_FORM.recaptchaNotice.privacy}
            </a>{" "}
            {CONTACT_FORM.recaptchaNotice.middle}{" "}
            <a
              href="https://policies.google.com/terms"
              className={INLINE_LINK}
              rel="noreferrer noopener"
              target="_blank"
            >
              {CONTACT_FORM.recaptchaNotice.terms}
            </a>{" "}
            {CONTACT_FORM.recaptchaNotice.tail}
          </p>
        ) : null}
      </div>
    </form>
  );
}

/** Repli sans serveur : la demande est pré-remplie dans le client de messagerie. */
function buildRequestMailto(values: ContactRequestInput) {
  const need = NEED_OPTIONS.find((option) => option.value === values.need)?.label ?? values.need;
  const body = [
    `Nom : ${values.name}`,
    `Organisation : ${values.organisation}`,
    `E-mail : ${values.email}`,
    values.phone ? `Téléphone : ${values.phone}` : null,
    `Type de besoin : ${need}`,
    "",
    values.message,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `Demande de contact — ${values.name}`,
  )}&body=${encodeURIComponent(body)}`;
}
