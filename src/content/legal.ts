/**
 * Contenus des pages juridiques.
 *
 * Les textes sont repris au mot près des frames Figma « Mentions légales » et
 * « Politique de confidentialité », qui n'existent qu'en desktop. Les
 * informations juridiques définitives n'étant pas disponibles, les mentions
 * « à compléter » de la maquette sont conservées telles quelles : ne jamais
 * inventer de raison sociale, d'immatriculation, d'adresse ni de durée.
 */

import { CONTACT } from "@/config/site";

export type LegalFact = {
  id: string;
  title: string;
  body: string;
};

export type LegalPageContent = {
  /** Chemin canonique de la page. */
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  facts: readonly LegalFact[];
  metadata: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
};

/** Carte « Contact » : identique sur les deux pages de la maquette. */
const CONTACT_FACT: LegalFact = {
  id: "contact",
  title: "Contact",
  body: `${CONTACT.email} • ${CONTACT.phoneDisplay}`,
};

/** Page 16 — « Mentions légales ». */
export const MENTIONS_LEGALES: LegalPageContent = {
  path: "/mentions-legales",
  eyebrow: "Informations légales",
  title: "Mentions légales",
  intro:
    "Les informations définitives devront être complétées et validées avant la mise en ligne du site.",
  facts: [
    {
      id: "editeur",
      title: "Éditeur du site",
      body: "PANGARAMA • Ouagadougou, Burkina Faso. Forme juridique, capital social, siège, RCCM et IFU à compléter.",
    },
    {
      id: "publication",
      title: "Direction de la publication",
      body: "Nom et qualité du responsable de publication à compléter.",
    },
    {
      id: "hebergement",
      title: "Hébergement",
      body: "Prestataire, adresse et coordonnées à compléter après validation technique.",
    },
    CONTACT_FACT,
  ],
  metadata: {
    title: "Mentions légales",
    description:
      "Informations légales du site PANGARAMA : éditeur, direction de la publication, hébergement et coordonnées de contact.",
    keywords: [
      "PANGARAMA",
      "mentions légales",
      "éditeur du site",
      "direction de la publication",
      "hébergement",
    ],
  },
};

/** Page 17 — « Politique de confidentialité ». */
export const POLITIQUE_CONFIDENTIALITE: LegalPageContent = {
  path: "/politique-de-confidentialite",
  eyebrow: "Protection des données",
  title: "Politique de confidentialité",
  intro:
    "Cette page présente les principes appliqués aux informations transmises par le formulaire de contact.",
  facts: [
    {
      id: "responsable",
      title: "Responsable du traitement",
      body: "PANGARAMA • Ouagadougou, Burkina Faso.",
    },
    {
      id: "donnees",
      title: "Données collectées",
      body: "Nom, organisation, adresse e-mail, téléphone facultatif, type de besoin et contenu du message.",
    },
    {
      id: "finalite",
      title: "Finalité",
      body: "Comprendre la demande, préparer le premier échange et apporter une réponse adaptée.",
    },
    {
      id: "conservation",
      title: "Conservation et droits",
      body: "Durées de conservation, modalités d’exercice des droits et informations réglementaires à compléter avant publication.",
    },
    {
      id: "services-tiers",
      title: "Services tiers",
      body: "Le formulaire est protégé par reCAPTCHA (Google) pour prévenir les envois automatisés, et la demande est transmise par e-mail via EmailJS.",
    },
    CONTACT_FACT,
  ],
  metadata: {
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité de PANGARAMA : responsable du traitement, données collectées, finalité, conservation et droits, contact.",
    keywords: [
      "PANGARAMA",
      "politique de confidentialité",
      "données personnelles",
      "formulaire de contact",
      "protection des données",
    ],
  },
};
