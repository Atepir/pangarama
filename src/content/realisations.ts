import type { IllustrationKey } from "@/components/art/illustration";

export type RealisationMetric = {
  label: string;
  value: string;
};

/** Étape de la démarche, numérotée à l’affichage (01 → 04). */
export type RealisationStep = {
  title: string;
  description: string;
};

export type Realisation = {
  slug: string;
  /** Nature de la mission : portée par le surtitre du héros. */
  eyebrow: string;
  title: string;
  /** Famille d’expertise : portée par la carte de la rubrique Réalisations. */
  category: string;
  /** Client : `null` tant que la référence n’est pas communiquée publiquement. */
  client: string | null;
  /** Introduction du héros : le besoin auquel la mission répond. */
  need: string;
  context: string;
  mission: string;
  duration: string;
  deliverables: readonly string[];
  /** Intitulé du défi. */
  challenge: string;
  /** Développement du défi. */
  challengeText: string;
  approach: readonly RealisationStep[];
  /** Intitulé de l’objectif de mission. */
  result: string;
  /** Développement de l’objectif. */
  resultText: string;
  /** Points de l’objectif, numérotés dans la bande sable. */
  resultPoints: readonly string[];
  metrics: readonly RealisationMetric[];
  publishedAt: string;
  /** Temps de lecture en minutes : absent tant qu’il n’est pas arrêté. */
  readingTime?: number;
  cover: IllustrationKey;
  isExample: boolean;
};

/**
 * Réalisations publiées.
 *
 * Volontairement vide : aucune mission réelle n’est encore disponible.
 * La page Réalisations & Insights affiche donc un empty state premium.
 * Ajouter une mission = ajouter une entrée ici (sans `isExample`).
 */
export const REALISATIONS: readonly Realisation[] = [];

/**
 * Exemples de démonstration, utilisés uniquement pour valider le template
 * de case study. La copie reprend l’exemple de la maquette : aucun client,
 * chiffre ou résultat n’est inventé, les métriques sont absentes et la page
 * porte une mention explicite.
 */
export const DEMO_REALISATIONS: readonly Realisation[] = [
  {
    slug: "exemple-etude-de-marche",
    eyebrow: "Étude de marché",
    title: "Cartographier un marché pour sécuriser une décision d’entrée",
    category: "Études & Intelligence stratégique",
    client: null,
    need: "Exemple de besoin : évaluer une opportunité au Burkina Faso avant une décision d’investissement.",
    context: "Entrée potentielle sur un marché peu documenté",
    mission: "Étude sectorielle + cartographie d’acteurs",
    duration: "Selon le périmètre",
    deliverables: ["Rapport", "matrice d’acteurs", "recommandations"],
    challenge: "Transformer un environnement peu lisible en décision exploitable.",
    challengeText:
      "Une entreprise peut avoir besoin de structurer des informations dispersées : acteurs, concurrence, conditions d’entrée et risques.",
    approach: [
      {
        title: "Cadrage",
        description: "Questions de décision, hypothèses et critères.",
      },
      {
        title: "Recherche",
        description: "Desk research, sources locales, entretiens ciblés.",
      },
      {
        title: "Cartographie",
        description: "Acteurs, rôles, influence et relations.",
      },
      {
        title: "Analyse",
        description: "Scénarios, risques, opportunités et recommandations.",
      },
    ],
    result: "Donner une base structurée à la décision.",
    resultText:
      "Livrables possibles : une lecture du marché, des interlocuteurs prioritaires et des scénarios argumentés. Aucun résultat client n’est revendiqué dans cet exemple.",
    resultPoints: ["cartographie d’acteurs", "analyse du marché", "scénarios argumentés"],
    metrics: [],
    publishedAt: "2026-06-01",
    cover: "case-study",
    isExample: true,
  },
];

export const ALL_REALISATIONS: readonly Realisation[] = [
  ...REALISATIONS,
  ...DEMO_REALISATIONS,
];

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return ALL_REALISATIONS.find((realisation) => realisation.slug === slug);
}

export function getPublishedRealisations(): readonly Realisation[] {
  return REALISATIONS;
}

export function getExampleRealisations(): readonly Realisation[] {
  return DEMO_REALISATIONS;
}

export function formatRealisationDate(isoDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
