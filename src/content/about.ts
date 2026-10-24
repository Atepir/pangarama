/** Contenus de la page À propos. */

export const ABOUT_HERO = {
  eyebrow: "À propos",
  titleLines: ["Une expertise ancrée au Burkina Faso,", "ouverte sur l’Afrique."],
  intro:
    "PANGARAMA est née d’une conviction : une organisation prend de meilleures décisions lorsqu’elle dispose de la bonne information, sait valoriser son action et comprend l’environnement dans lequel elle évolue. Créée au Burkina Faso, elle accompagne entreprises, institutions et organisations dans leurs problématiques de communication, d’analyse, d’engagement et de développement.",
  /** Variante condensée de la maquette mobile 38:6 (quatre lignes à 390 px). */
  introMobile:
    "PANGARAMA est née d’une conviction : une organisation prend de meilleures décisions lorsqu’elle dispose de la bonne information, sait valoriser son action et comprend son environnement.",
} as const;

export const ABOUT_NAME = {
  eyebrow: "Pourquoi Pangarama ?",
  title: "Un nom qui dit notre ambition.",
  text: "Le nom s’inspire de « Panga », qui signifie force ou pouvoir en mooré, associé à une sonorité évoquant l’ouverture, la vision et l’étendue. Il traduit notre ambition : mobiliser expertise, vision et action au service du développement et de la création de valeur.",
  /** Variante condensée de la maquette mobile 38:6 (trois lignes à 390 px). */
  textMobile:
    "Le nom s’inspire de « Panga », force ou pouvoir en mooré. Il exprime expertise, vision et action au service du développement.",
  /**
   * Lecture du nom : jamais de « + » entre PANGA et RAMA.
   */
  parts: [
    { id: "panga", text: "PANGA = Force / Pouvoir", tone: "navy" as const },
    { id: "rama", text: "RAMA = Ouverture / Vision / Étendue", tone: "gold" as const },
  ],
} as const;

export const ABOUT_MISSION = {
  eyebrow: "Notre mission",
  title:
    "Donner à nos clients les moyens de mieux comprendre, mieux communiquer et mieux développer leurs activités.",
  pillars: [
    {
      id: "approche",
      title: "Notre approche",
      text: "Analyse, écoute et solutions adaptées à chaque organisation.",
    },
    {
      id: "ambition",
      title: "Notre ambition",
      text: "Construire progressivement une expertise reconnue au Burkina Faso et en Afrique, associant réalités locales et standards professionnels internationaux.",
    },
  ],
} as const;

export const ABOUT_METHOD = {
  id: "methode",
  eyebrow: "Notre méthode",
  title: "Une méthode en quatre temps.",
  intro:
    "Chaque mission part d’une compréhension précise du besoin, puis se traduit par une approche adaptée, des expertises mobilisées, une exécution pilotée et des livrables directement exploitables.",
} as const;

export type AboutEngagement = {
  id: string;
  order: number;
  title: string;
  text: string;
  /** Variante condensée de la maquette mobile 38:6 (une ligne à 390 px). */
  textMobile?: string;
};

export const ABOUT_ENGAGEMENTS: {
  eyebrow: string;
  mobileMerge: { title: string; text: string };
  items: readonly AboutEngagement[];
} = {
  eyebrow: "Nos engagements",
  /**
   * Maquette mobile : la carte 04 condense Proximité et Impact en une seule
   * valeur. Le desktop conserve bien les cinq engagements du brief.
   */
  mobileMerge: {
    title: "Proximité & Impact",
    text: "Allier compréhension locale et solutions concrètement applicables.",
  },
  items: [
    {
      id: "exigence",
      order: 1,
      title: "Exigence",
      text: "Rechercher la qualité dans chaque mission.",
    },
    {
      id: "pertinence",
      order: 2,
      title: "Pertinence",
      text: "Proposer des réponses adaptées aux réalités et aux besoins du client.",
      textMobile: "Des réponses adaptées aux réalités et aux besoins.",
    },
    {
      id: "confidentialite",
      order: 3,
      title: "Confidentialité",
      text: "Protéger les informations qui nous sont confiées.",
    },
    {
      id: "proximite",
      order: 4,
      title: "Proximité",
      text: "Comprendre les réalités locales tout en conservant une ouverture internationale.",
    },
    {
      id: "impact",
      order: 5,
      title: "Impact",
      text: "Privilégier des recommandations et solutions concrètement applicables.",
    },
  ],
} as const;

export const ABOUT_REGION = {
  eyebrow: "Ouagadougou → Afrique de l’Ouest",
  titleLines: ["Ancré ici.", "Pensé régionalement."],
  text: "À long terme, PANGARAMA veut accompagner les entreprises et investisseurs dans le développement de projets et d’opportunités au Burkina Faso et dans la sous-région.",
} as const;
