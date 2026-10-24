import type { InsightCoverKey } from "@/components/art/illustration";

export type InsightCategory = "insight" | "decryptage" | "chiffre";

export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "stat"; value: string; label: string };

export type InsightSection = {
  id: string;
  title: string;
  blocks: readonly InsightBlock[];
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  /**
   * Visuel de couverture issu de la maquette PANGARAMA.
   */
  cover: InsightCoverKey;
  keywords: readonly string[];
  /**
   * Points clés résumés dans la section « À retenir » du gabarit article.
   * La maquette en prévoit trois, alignés sur une ligne.
   */
  keyPoints?: readonly string[];
  sections: readonly InsightSection[];
  /**
   * Contenu de démonstration : clairement identifié comme exemple dans
   * l’interface. Les contenus réels ne portent pas ce marqueur.
   */
  isExample: boolean;
};

export const INSIGHT_CATEGORIES: Record<
  InsightCategory,
  { label: string; shortLabel: string; description: string }
> = {
  insight: {
    label: "PANGARAMA Insights",
    shortLabel: "Insights",
    description:
      "Analyses, notes et études sur les marchés, secteurs et enjeux des organisations.",
  },
  decryptage: {
    label: "PANGARAMA Décryptage",
    shortLabel: "Décryptage",
    description:
      "Lecture claire et contextualisée d’une actualité ou d’un enjeu économique, financier ou stratégique.",
  },
  chiffre: {
    label: "Le Chiffre PANGARAMA",
    shortLabel: "Le Chiffre",
    description:
      "Une donnée significative mise en perspective pour mieux comprendre une tendance ou un marché.",
  },
};

export const INSIGHT_CATEGORY_ORDER: readonly InsightCategory[] = [
  "insight",
  "decryptage",
  "chiffre",
];

/**
 * Contenus éditoriaux.
 *
 * Les entrées ci-dessous sont des exemples de démonstration : elles décrivent
 * des méthodes et des principes de travail, sans aucun fait, chiffre ou
 * référence client inventé, et sont affichées avec une mention explicite.
 * Ajouter un contenu réel = ajouter une entrée sans `isExample`.
 */
export const INSIGHTS: readonly Insight[] = [
  {
    slug: "structurer-un-rapport-annuel-qui-eclaire-la-decision",
    title: "Structurer un rapport annuel qui éclaire la décision",
    excerpt:
      "Un rapport annuel n’est pas un exercice de forme : c’est le document par lequel une organisation explique ce qu’elle a fait, ce qu’elle a produit et où elle va.",
    category: "insight",
    author: "PANGARAMA",
    publishedAt: "2026-06-12",
    readingTime: 7,
    cover: "market-signals",
    keywords: ["rapport annuel", "communication financière", "lisibilité", "parties prenantes"],
    keyPoints: [
      "Définir la fonction d’abord",
      "Stabiliser la structure",
      "Séquencer la production",
    ],
    isExample: true,
    sections: [
      {
        id: "fonction",
        title: "Un document, une fonction",
        blocks: [
          {
            type: "paragraph",
            text: "Un rapport annuel n’est pas un exercice de forme. C’est le document par lequel une organisation explique, une fois l’an, ce qu’elle a fait, ce qu’elle a produit et où elle va. Sa valeur ne tient pas au nombre de pages, mais à la clarté de ce qu’il permet de comprendre.",
          },
          {
            type: "paragraph",
            text: "Lorsqu’il est conçu comme un instrument de dialogue, il devient un support réellement utilisé par les actionnaires, les partenaires financiers, les autorités de tutelle et les équipes internes — et non un objet parcouru une fois avant d’être archivé.",
          },
        ],
      },
      {
        id: "exigences",
        title: "Trois exigences de lisibilité",
        blocks: [
          {
            type: "paragraph",
            text: "Trois exigences reviennent dans la plupart des projets que nous accompagnons.",
          },
          {
            type: "list",
            items: [
              "Une structure stable, qui permet au lecteur de retrouver la même information d’une édition à l’autre.",
              "Un propos hiérarchisé, où l’essentiel est identifiable sans lire l’intégralité du document.",
              "Des chiffres contextualisés, accompagnés de leur périmètre et de leur mode de calcul.",
            ],
          },
        ],
      },
      {
        id: "commencer",
        title: "Par où commencer",
        blocks: [
          {
            type: "paragraph",
            text: "La première étape consiste rarement à écrire. Elle consiste à décider de ce que le document doit permettre de comprendre, et à qui il s’adresse en priorité. Cette décision conditionne le sommaire, le niveau de détail des chapitres et le ton des commentaires.",
          },
          {
            type: "paragraph",
            text: "À partir de là, la production peut être organisée : collecte des données, rédaction, validation des chiffres, mise en forme, relecture. Ce séquencement évite les deux écueils les plus fréquents — un document tardif, ou un document complet mais inutilisable.",
          },
        ],
      },
      {
        id: "suites",
        title: "Ce que cela change",
        blocks: [
          {
            type: "paragraph",
            text: "Un rapport construit sur cette logique reste utilisable après sa publication : il alimente les présentations aux partenaires financiers, les échanges avec les parties prenantes et la communication institutionnelle de l’année.",
          },
        ],
      },
    ],
  },
  {
    slug: "dialogue-investisseurs-se-prepare-en-amont",
    title: "Le dialogue avec les investisseurs se prépare bien avant la sollicitation",
    excerpt:
      "La qualité de la relation avec les partenaires financiers dépend rarement du moment de la demande. Elle se construit sur la lisibilité de l’information produite en amont.",
    category: "decryptage",
    author: "PANGARAMA",
    publishedAt: "2026-05-20",
    readingTime: 5,
    cover: "corporate-finance",
    keywords: ["investisseurs", "parties prenantes", "communication financière", "transparence"],
    keyPoints: [
      "Préparer en amont",
      "Rendre les chiffres lisibles",
      "Tenir le même discours",
    ],
    isExample: true,
    sections: [
      {
        id: "amont",
        title: "Une relation qui se construit en amont",
        blocks: [
          {
            type: "paragraph",
            text: "Le dialogue avec les investisseurs et les partenaires financiers se joue rarement au moment où une organisation formule une demande. Il se joue dans la régularité de l’information qu’elle produit, dans la cohérence de son discours et dans sa capacité à expliquer ses arbitrages.",
          },
          {
            type: "paragraph",
            text: "Une organisation dont les publications sont irrégulières ou difficiles à lire impose à ses interlocuteurs un travail de reconstitution. Ce coût, même implicite, pèse sur la relation.",
          },
        ],
      },
      {
        id: "attentes",
        title: "Ce que les partenaires financiers cherchent d’abord",
        blocks: [
          {
            type: "list",
            items: [
              "La régularité : des publications attendues aux mêmes moments, avec la même structure.",
              "La traçabilité : des chiffres dont l’origine et le périmètre sont explicites.",
              "La cohérence : un discours suivi d’un document à l’autre, sans rupture ni réécriture opportuniste.",
            ],
          },
        ],
      },
      {
        id: "consequences",
        title: "Ce que cela change pour l’organisation",
        blocks: [
          {
            type: "paragraph",
            text: "Préparer le dialogue en amont n’exige pas de produire davantage, mais de produire de manière ordonnée. Les mêmes informations, organisées et hiérarchisées, remplissent alors plusieurs usages : présentation aux partenaires, échanges avec les autorités de tutelle, communication auprès des équipes.",
          },
          {
            type: "quote",
            text: "La qualité de l’information produite conditionne la qualité du dialogue qui en découle.",
          },
        ],
      },
    ],
  },
  {
    slug: "un-chiffre-une-mise-en-perspective",
    title: "Un chiffre, une mise en perspective",
    excerpt:
      "Le Chiffre PANGARAMA met en perspective une donnée significative pour éclairer une tendance, un marché ou un enjeu d’organisation.",
    category: "chiffre",
    author: "PANGARAMA",
    publishedAt: "2026-04-08",
    readingTime: 4,
    cover: "strategic-map",
    keywords: ["données", "analyse", "mise en perspective", "décision"],
    keyPoints: [
      "Partir d’une donnée",
      "Sourcer chaque chiffre",
      "Éclairer la décision",
    ],
    isExample: true,
    sections: [
      {
        id: "principe",
        title: "Le principe",
        blocks: [
          {
            type: "paragraph",
            text: "Chaque édition retient une donnée significative et l’accompagne de sa mise en perspective : d’où elle vient, ce qu’elle mesure et ce qu’elle permet de comprendre sur une tendance ou un marché.",
          },
          {
            type: "stat",
            value: "1",
            label: "donnée significative mise en perspective, par édition",
          },
        ],
      },
      {
        id: "selection",
        title: "Comment nous sélectionnons la donnée",
        blocks: [
          {
            type: "list",
            items: [
              "Une source identifiable et datable, jamais une estimation présentée comme un chiffre constaté.",
              "Un périmètre explicite : pays, période et définition retenue.",
              "Un intérêt de décision : la donnée doit éclairer un choix, pas seulement surprendre.",
            ],
          },
        ],
      },
      {
        id: "apport",
        title: "Ce que la mise en perspective apporte",
        blocks: [
          {
            type: "paragraph",
            text: "Un chiffre isolé ne dit rien. Rappelé à sa tendance, comparé à un référentiel et replacé dans son contexte sectoriel, il devient une information utilisable en réunion de direction, dans une note d’opportunité ou dans un rapport annuel.",
          },
          {
            type: "paragraph",
            text: "C’est cette étape — la mise en perspective — qui fait la valeur du format.",
          },
        ],
      },
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.slug === slug);
}

export function getPublishedInsights(): readonly Insight[] {
  return INSIGHTS.filter((insight) => !insight.isExample);
}

export function getExampleInsights(): readonly Insight[] {
  return INSIGHTS.filter((insight) => insight.isExample);
}

export function getInsightsByCategory(category: InsightCategory): readonly Insight[] {
  return INSIGHTS.filter((insight) => insight.category === category);
}

/** Analyses liées : même catégorie d’abord, puis les plus récentes. */
export function getRelatedInsights(slug: string, limit = 3): readonly Insight[] {
  const current = getInsightBySlug(slug);
  const others = INSIGHTS.filter((insight) => insight.slug !== slug);

  return [...others]
    .sort((a, b) => {
      const sameCategoryA = current && a.category === current.category ? 0 : 1;
      const sameCategoryB = current && b.category === current.category ? 0 : 1;

      if (sameCategoryA !== sameCategoryB) {
        return sameCategoryA - sameCategoryB;
      }

      return b.publishedAt.localeCompare(a.publishedAt);
    })
    .slice(0, limit);
}

export function formatInsightDate(isoDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min de lecture`;
}
