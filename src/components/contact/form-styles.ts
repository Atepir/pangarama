/**
 * Classes partagées par les champs du formulaire de contact.
 *
 * Deux variantes cohabitent sans jamais poser deux utilitaires concurrents sur
 * un même élément : lignes soulignées sur mobile, champs encadrés sur desktop.
 */

export const FIELD = "flex w-full flex-col gap-2";

export const LABEL =
  "text-[12px] font-bold uppercase leading-[1.4] tracking-[0.06em] text-gold-ink";

export const ERROR_TEXT = "text-[12px] leading-[1.4] text-danger";

const CONTROL_SHARED =
  "w-full border-b border-line-warm bg-transparent pb-2.5 pt-2 text-[16px] leading-[1.4] text-ink-deep placeholder:text-body-soft lg:rounded-input lg:border lg:border-line-warm lg:bg-white lg:px-4 lg:py-3 lg:placeholder:text-body-soft aria-[invalid=true]:border-danger";

/** Champ de saisie d'une ligne. */
export const CONTROL_INPUT = `${CONTROL_SHARED} lg:h-[52px]`;

/** Message lisible et redimensionnable aussi sur mobile. */
export const CONTROL_TEXTAREA = `${CONTROL_SHARED} min-h-[120px] resize-y lg:min-h-[140px] lg:py-3.5`;

export const CARD =
  "flex w-full flex-col gap-6 rounded-frame bg-paper p-5 shadow-raised sm:p-7 lg:p-8";

/** Pastille d'envoi : navy sur mobile comme sur desktop. */
export const SUBMIT_BUTTON =
  "inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold leading-[1.2] text-white transition-colors duration-300 ease-editorial hover:bg-navy-hover disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-navy";
