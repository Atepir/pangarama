import { NEED_OPTIONS } from "@/content/pages";

export type ContactRequestInput = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  need: string;
  message: string;
};

export type ContactFieldName = keyof ContactRequestInput;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export const EMPTY_CONTACT_FORM: ContactRequestInput = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  need: "",
  message: "",
};

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  organisation: { min: 2, max: 160 },
  email: { max: 200 },
  phone: { max: 40 },
  message: { min: 20, max: 4000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const NEED_VALUES = new Set(NEED_OPTIONS.map((option) => option.value));

export type ContactFieldType = "text" | "email" | "tel" | "textarea" | "select";

/** Descripteur d’un champ du formulaire de contact, dans l’ordre d’affichage. */
export type ContactFieldDescriptor = {
  name: ContactFieldName;
  label: string;
  /** La maquette mobile abrège certains libellés (nom et prénom). */
  labelMobile?: string;
  type: ContactFieldType;
  required: boolean;
  autoComplete?: string;
  placeholder?: string;
  /** La maquette mobile tronque certains exemples de saisie. */
  placeholderMobile?: string;
};

export const CONTACT_FORM_FIELDS: readonly ContactFieldDescriptor[] = [
  {
    name: "name",
    label: "Nom complet",
    labelMobile: "Nom et prénom",
    type: "text",
    required: true,
    autoComplete: "name",
    placeholder: "Votre nom",
  },
  {
    name: "organisation",
    label: "Organisation",
    type: "text",
    required: true,
    autoComplete: "organization",
    placeholder: "Entreprise / institution",
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "nom@entreprise.com",
  },
  {
    name: "phone",
    label: "Téléphone",
    type: "tel",
    required: false,
    autoComplete: "tel",
    placeholder: "+226 ...",
  },
  {
    name: "need",
    label: "Type de besoin",
    type: "select",
    required: true,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Contexte, objectif, délai, livrable attendu…",
    placeholderMobile: "Contexte, objectif, délai…",
  },
];

export function validateContactRequest(
  input: ContactRequestInput,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = input.name.trim();
  const organisation = input.organisation.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  const need = input.need.trim();

  if (!name) {
    errors.name = "Merci d’indiquer votre nom et prénom.";
  } else if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = "Le nom ne peut pas dépasser 120 caractères.";
  }

  if (!organisation) {
    errors.organisation =
      "Merci d’indiquer votre organisation ou « Particulier » si vous écrivez à titre individuel.";
  } else if (organisation.length < CONTACT_LIMITS.organisation.min) {
    errors.organisation = "Le nom de l’organisation doit contenir au moins 2 caractères.";
  } else if (organisation.length > CONTACT_LIMITS.organisation.max) {
    errors.organisation = "Le nom de l’organisation ne peut pas dépasser 160 caractères.";
  }

  if (!email) {
    errors.email = "Merci d’indiquer votre adresse e-mail.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Merci d’indiquer une adresse e-mail valide.";
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = "L’adresse e-mail ne peut pas dépasser 200 caractères.";
  }

  if (!need) {
    errors.need = "Merci de sélectionner un type de besoin.";
  } else if (!NEED_VALUES.has(need)) {
    errors.need = "Merci de sélectionner un type de besoin dans la liste.";
  }

  if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = "Le message ne peut pas dépasser 4000 caractères.";
  } else if (!message) {
    errors.message = "Merci de décrire votre besoin.";
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = "Merci de détailler votre besoin en quelques mots (20 caractères minimum).";
  }

  if (input.phone.length > CONTACT_LIMITS.phone.max) {
    errors.phone = "Le numéro de téléphone ne peut pas dépasser 40 caractères.";
  }

  return errors;
}

export function hasContactErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
