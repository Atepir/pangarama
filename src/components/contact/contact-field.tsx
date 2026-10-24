"use client";

import { useEffect, useState, type ChangeEvent } from "react";

import { CONTACT_FORM } from "@/content/pages";
import { cn } from "@/lib/cn";
import {
  CONTACT_LIMITS,
  type ContactFieldDescriptor,
  type ContactFieldName,
} from "@/lib/contact";

import { CONTROL_INPUT, CONTROL_TEXTAREA, ERROR_TEXT, FIELD, LABEL } from "./form-styles";
import { NeedSelect } from "./need-select";

const MAX_LENGTH: Partial<Record<ContactFieldName, number>> = {
  name: CONTACT_LIMITS.name.max,
  organisation: CONTACT_LIMITS.organisation.max,
  email: CONTACT_LIMITS.email.max,
  phone: CONTACT_LIMITS.phone.max,
  message: CONTACT_LIMITS.message.max,
};

/**
 * Seul l’exemple du message diffère entre les deux maquettes ; le placeholder
 * est donc recalculé côté client après montage (rendu serveur = maquette mobile).
 */
function useDesktopBreakpoint() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

type ContactFieldProps = {
  descriptor: ContactFieldDescriptor;
  value: string;
  error?: string;
  onChange: (name: ContactFieldName, value: string) => void;
  className?: string;
};

export function ContactField({
  descriptor,
  value,
  error,
  onChange,
  className,
}: ContactFieldProps) {
  const isDesktop = useDesktopBreakpoint();
  const id = `contact-${descriptor.name}`;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  const placeholder =
    descriptor.type === "textarea" && !isDesktop
      ? descriptor.placeholderMobile ?? descriptor.placeholder
      : descriptor.placeholder;

  const label = (
    <>
      <span className="lg:hidden">{descriptor.labelMobile ?? descriptor.label}</span>
      <span className="hidden lg:inline">{descriptor.label}</span>
      {descriptor.required ? (
        <span aria-hidden="true" className="hidden lg:inline">
          {" *"}
        </span>
      ) : (
        <span aria-hidden="true" className="hidden lg:inline">
          {` ${CONTACT_FORM.optionalSuffix}`}
        </span>
      )}
      {descriptor.required ? (
        <span className="sr-only">{`, ${CONTACT_FORM.requiredLabel}`}</span>
      ) : null}
    </>
  );

  const errorMessage = error ? (
    <p id={errorId} className={ERROR_TEXT}>
      {error}
    </p>
  ) : null;

  if (descriptor.type === "select") {
    return (
      <div className={cn(FIELD, className)}>
        <span id={labelId} className={LABEL}>
          {label}
        </span>
        <NeedSelect
          id={id}
          labelId={labelId}
          value={value}
          onChange={(next) => onChange(descriptor.name, next)}
          invalid={Boolean(error)}
          describedBy={error ? errorId : undefined}
        />
        {errorMessage}
      </div>
    );
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(descriptor.name, event.target.value);
  };

  return (
    <div className={cn(FIELD, className)}>
      <label id={labelId} htmlFor={id} className={LABEL}>
        {label}
      </label>
      {descriptor.type === "textarea" ? (
        <textarea
          id={id}
          name={descriptor.name}
          rows={1}
          value={value}
          placeholder={placeholder}
          required={descriptor.required}
          maxLength={MAX_LENGTH[descriptor.name]}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
          className={CONTROL_TEXTAREA}
        />
      ) : (
        <input
          id={id}
          name={descriptor.name}
          type={descriptor.type}
          value={value}
          placeholder={placeholder}
          required={descriptor.required}
          maxLength={MAX_LENGTH[descriptor.name]}
          autoComplete={descriptor.autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
          className={CONTROL_INPUT}
        />
      )}
      {errorMessage}
    </div>
  );
}
