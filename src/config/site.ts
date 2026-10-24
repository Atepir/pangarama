/**
 * Configuration centrale du site.
 * Toutes les informations d'identité (coordonnées, réseaux, URL) sont
 * déclarées ici et ne doivent pas être dupliquées dans les composants.
 */

export const siteConfig = {
  name: "PANGARAMA",
  /** Wordmark bicolore du logo : « PANG » en navy, « ARAMA » en or. */
  wordmark: { head: "PANG", tail: "ARAMA" },
  tagline: "Comprendre. Valoriser. Développer.",
  description:
    "PANGARAMA accompagne les entreprises, institutions et organisations dans la compréhension de leur environnement, la valorisation de leurs activités et le développement de leurs projets.",
  shortDescription:
    "Cabinet de conseil en communication financière, intelligence stratégique, événementiel et développement, basé à Ouagadougou.",
  /**
   * TODO(contenu): remplacer par le domaine définitif une fois confirmé.
   * Utilisé pour les URL canoniques, Open Graph et le sitemap.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pangarama.com",
  email: "contact@pangarama.com",
  phoneDisplay: "+226 04009598",
  phoneHref: "+22604009598",
  location: "Ouagadougou, Burkina Faso",
  activityArea: "Burkina Faso • Afrique de l’Ouest",
  socials: {
    // TODO(contenu): renseigner l'URL officielle LinkedIn lorsqu'elle sera confirmée.
    linkedin: null,
    // TODO(contenu): renseigner l'URL officielle Facebook lorsqu'elle sera confirmée.
    facebook: null,
    youtube: "https://www.youtube.com/channel/UC0sM5JqxPJDfL6VfjblRP4Q",
  },
} as const;

export type SocialNetwork = keyof typeof siteConfig.socials;

const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
};

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  href: string;
  ariaLabel: string;
};

/**
 * Liste des réseaux réellement configurés.
 * Un réseau sans URL est simplement absent de cette liste : l'icône disparaît
 * proprement du footer, sans qu'aucun composant n'ait à être modifié.
 */
export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(siteConfig.socials) as [SocialNetwork, string | null][]
)
  .filter((entry): entry is [SocialNetwork, string] => Boolean(entry[1]))
  .map(([network, href]) => ({
    network,
    label: SOCIAL_LABELS[network],
    href,
    ariaLabel: `${siteConfig.name} sur ${SOCIAL_LABELS[network]}`,
  }));

export const CONTACT = {
  location: siteConfig.location,
  email: siteConfig.email,
  emailHref: `mailto:${siteConfig.email}`,
  phoneDisplay: siteConfig.phoneDisplay,
  phoneHref: `tel:${siteConfig.phoneHref}`,
} as const;

/** Coordonnées utilisées dans la page Contact et le footer. */
export const CONTACT_DETAILS = [
  { id: "location", label: "Localisation", value: CONTACT.location },
  { id: "email", label: "E-mail", value: CONTACT.email, href: CONTACT.emailHref },
  { id: "phone", label: "Téléphone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
] as const;
