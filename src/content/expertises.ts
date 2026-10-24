import type { IllustrationKey } from "@/components/art/illustration";

/**
 * Les quatre expertises PANGARAMA.
 *
 * Structure issue de la maquette Figma. Les listes détaillées (`interventions`,
 * `deliverables`) reprennent mot pour mot le brief fonctionnel pour la page
 * détail ; le bloc `hub` reprend la version condensée de la page Expertises,
 * telle qu'elle apparaît dans la maquette. La structure est strictement
 * identique d'une expertise à l'autre — ne pas ajouter de cinquième entrée.
 */

export type ExpertiseMethodStep = {
  id: string;
  order: number;
  title: string;
  description: string;
};

export type ExpertiseNeedItem = {
  id: string;
  order: number;
  title: string;
};

/** Version condensée d'une expertise, telle qu'elle est présentée sur la page Expertises. */
export type ExpertiseHub = {
  /** Accroche de la colonne de gauche (identique à `tagline`, sauf pour l'expertise 01). */
  summary: string;
  /** Variante mobile de l'accroche, quand la maquette 38:7 diffère. */
  summaryMobile?: string;
  /** Quatre lignes « Nous intervenons sur ». */
  interventions: readonly string[];
  /** Livrables possibles résumés en une seule ligne. */
  deliverables: string;
  /** Bandeau de mots-clés affiché sous la vignette mobile (expertises 01 et 02). */
  mobileTags?: string;
  /** Teinte de l'aplat de l'illustration 470 × 320 (la maquette en change par expertise). */
  illustrationPlate: "mist" | "haze" | "navy-raised" | "navy";
};

export type Expertise = {
  /** Segment d'URL, sans barre oblique initiale. */
  slug: string;
  /** Numéro affiché dans les pastilles et sur les cartes : « 01 » … « 04 ». */
  number: string;
  /** Libellé court de la pastille sur la page Expertises : Corporate, Intelligence… */
  hubLabel: string;
  title: string;
  /**
   * Découpe desktop du titre du hero de la page détail, quand la maquette
   * impose des retours à la ligne que le navigateur ne produit pas seul.
   * Absente : le titre coule naturellement dans sa largeur maximale.
   */
  heroTitleLines?: readonly string[];
  /** Accroche d'une ligne affichée sur la page Expertises. */
  tagline: string;
  /** Description courte : cartes d'accueil et lignes de la page Expertises. */
  shortDescription: string;
  /** Texte condensé des cartes de l'accueil mobile. */
  cardSummaryMobile: string;
  /** Paragraphe d'introduction de la page détail. */
  introduction: string;
  /** Monogramme du carré vert : CF, EI, EE, DA. */
  emblem: string;
  /** Illustration de la page Expertises (ratio 470 × 320). */
  hubIllustration: IllustrationKey;
  /** Présentation condensée de l'expertise sur la page Expertises. */
  hub: ExpertiseHub;
  /** Illustration du hero de la page détail (ratio 500 × 330). */
  detailIllustration: IllustrationKey;
  /** Légende optionnelle affichée sous l'illustration du hero détail. */
  illustrationLabel?: string;
  need: {
    title: string;
    text: string;
    items: readonly ExpertiseNeedItem[];
  };
  method: {
    title: string;
    steps: readonly ExpertiseMethodStep[];
  };
  /** Prestations listées sur la page détail de l'expertise. */
  interventions: readonly string[];
  /** Livrables possibles : une carte par entrée sur la page détail. */
  deliverables: readonly string[];
  cta: { title: string; label: string; href: string };
};

export const EXPERTISES: readonly Expertise[] = [
  {
    slug: "communication-financiere-corporate",
    number: "01",
    hubLabel: "Corporate",
    title: "Communication financière & corporate",
    heroTitleLines: ["Communication", "financière", "& corporate"],
    tagline: "Structurer l’information, renforcer la confiance.",
    shortDescription:
      "Valoriser l’entreprise, ses performances et ses projets, et renforcer le dialogue avec ses parties prenantes.",
    cardSummaryMobile: "Valoriser l’entreprise, ses performances et ses projets.",
    introduction:
      "Structurer l’information, renforcer la confiance et produire des contenus institutionnels à la hauteur des enjeux de l’organisation.",
    emblem: "CF",
    hubIllustration: "expertise-matrix",
    hub: {
      summary:
        "Rendre votre information plus claire, plus accessible et plus utile à vos parties prenantes.",
      summaryMobile:
        "Rendre votre information plus claire, accessible et utile à vos parties prenantes.",
      interventions: [
        "Communication financière, rapports annuels et rapports d’activité",
        "Publications institutionnelles et présentations corporate",
        "Contenus stratégiques",
        "Communication auprès des investisseurs et parties prenantes",
      ],
      deliverables:
        "Stratégie et recommandations éditoriales • Rapports et publications • Présentations et supports • Éléments de langage et contenus",
      mobileTags:
        "Communication financière • Rapports et publications • Présentations corporate • Contenus stratégiques",
      illustrationPlate: "mist",
    },
    detailIllustration: "expertise-report",
    need: {
      title: "Quand une organisation doit expliquer, convaincre ou rassurer.",
      text: "Publication de résultats, rapport annuel, prise de parole institutionnelle, dialogue avec les investisseurs et partenaires financiers, transformation importante ou besoin de professionnaliser la communication corporate.",
      items: [
        { id: "communication-financiere", order: 1, title: "Communication financière" },
        {
          id: "relations-investisseurs",
          order: 2,
          title: "Relations investisseurs et partenaires financiers",
        },
        {
          id: "publications-institutionnelles",
          order: 3,
          title: "Publications institutionnelles",
        },
        {
          id: "communication-corporate",
          order: 4,
          title: "Communication corporate et institutionnelle",
        },
        {
          id: "contenus-strategiques",
          order: 5,
          title: "Contenus stratégiques",
        },
      ],
    },
    method: {
      title: "Du message au support final.",
      steps: [
        {
          id: "cadrer",
          order: 1,
          title: "Cadrer",
          description: "Objectifs, publics, obligations et calendrier.",
        },
        {
          id: "structurer",
          order: 2,
          title: "Structurer",
          description: "Architecture du message et hiérarchie de l’information.",
        },
        {
          id: "produire",
          order: 3,
          title: "Produire",
          description: "Rédaction, design éditorial et supports.",
        },
        {
          id: "valider",
          order: 4,
          title: "Valider",
          description: "Contrôle qualité, cohérence et préparation à la diffusion.",
        },
      ],
    },
    interventions: [
      "Communication financière",
      "Rapports annuels et rapports d’activité",
      "Publications institutionnelles",
      "Présentations corporate",
      "Contenus stratégiques",
      "Communication auprès des investisseurs et parties prenantes",
    ],
    deliverables: [
      "Stratégie et recommandations éditoriales",
      "Rapports et publications",
      "Présentations et supports",
      "Éléments de langage et contenus",
    ],
    cta: {
      title: "Un besoin de communication financière ou corporate ?",
      label: "Échangeons sur votre besoin",
      href: "/contact",
    },
  },
  {
    slug: "etudes-intelligence-strategique",
    number: "02",
    hubLabel: "Intelligence",
    title: "Études & Intelligence stratégique",
    tagline: "Mieux comprendre pour mieux décider.",
    shortDescription:
      "Transformer l’information en connaissance utile à la prise de décision.",
    cardSummaryMobile: "Transformer l’information en connaissance utile à la décision.",
    introduction:
      "Mieux comprendre pour mieux décider : éclairer une décision par des données fiables, des analyses structurées et une lecture claire de l’environnement.",
    emblem: "EI",
    hubIllustration: "expertise-network",
    hub: {
      summary: "Mieux comprendre pour mieux décider.",
      interventions: [
        "Études de marché, études sectorielles et benchmarks",
        "Veille stratégique et concurrentielle",
        "Cartographies d’acteurs, enquêtes et sondages",
        "Analyses d’opportunité",
      ],
      deliverables:
        "Rapports d’étude • Notes de synthèse • Tableaux de veille • Cartographies et benchmarks • Restitutions exécutives",
      mobileTags:
        "Études de marché • Veille • Benchmarks • Cartographies • Enquêtes • Analyses d’opportunité",
      illustrationPlate: "haze",
    },
    detailIllustration: "expertise-network",
    illustrationLabel: "Acteurs • Signaux • Risques • Opportunités",
    need: {
      title: "Quand une décision doit s’appuyer sur des constats solides.",
      text: "Ouverture d’un marché, évaluation d’un secteur, suivi concurrentiel, préparation d’un investissement ou besoin de disposer d’une lecture documentée et à jour de l’environnement.",
      items: [
        { id: "etudes-marche", order: 1, title: "Études de marché" },
        { id: "veille-strategique", order: 2, title: "Veille stratégique" },
        { id: "cartographies-acteurs", order: 3, title: "Cartographies d’acteurs" },
        { id: "enquetes-sondages", order: 4, title: "Enquêtes et sondages" },
        { id: "analyses-opportunite", order: 5, title: "Analyses d’opportunité" },
      ],
    },
    method: {
      title: "Des questions de décision aux constats.",
      steps: [
        {
          id: "cadrer",
          order: 1,
          title: "Cadrer",
          description: "Questions de décision, périmètre et critères de lecture.",
        },
        {
          id: "collecter",
          order: 2,
          title: "Collecter",
          description: "Sources documentaires, données disponibles et entretiens ciblés.",
        },
        {
          id: "analyser",
          order: 3,
          title: "Analyser",
          description: "Structuration des constats, hiérarchisation et mise en perspective.",
        },
        {
          id: "restituer",
          order: 4,
          title: "Restituer",
          description: "Synthèse exécutive, cartographies et recommandations d’action.",
        },
      ],
    },
    interventions: [
      "Études de marché",
      "Études sectorielles",
      "Benchmarks",
      "Veille stratégique et concurrentielle",
      "Cartographies d’acteurs",
      "Enquêtes et sondages",
      "Analyses d’opportunité",
    ],
    deliverables: [
      "Rapports d’étude",
      "Notes de synthèse",
      "Tableaux de veille",
      "Cartographies et benchmarks",
      "Restitutions exécutives",
    ],
    cta: {
      title: "Un besoin d’étude ou de veille stratégique ?",
      label: "Échangeons sur votre besoin",
      href: "/contact",
    },
  },
  {
    slug: "evenementiel-engagement",
    number: "03",
    hubLabel: "Engagement",
    title: "Événementiel & Engagement",
    tagline: "Créer des rencontres qui ont du sens.",
    shortDescription:
      "Créer des rencontres professionnelles et institutionnelles qui rapprochent les organisations de leurs publics.",
    cardSummaryMobile:
      "Créer des rencontres qui rapprochent les organisations de leurs publics.",
    introduction:
      "Créer des rencontres qui ont du sens : concevoir et organiser des événements professionnels et institutionnels qui rapprochent les organisations de leurs publics.",
    emblem: "EE",
    hubIllustration: "expertise-forum",
    hub: {
      summary: "Créer des rencontres qui ont du sens.",
      interventions: [
        "Conférences, forums et séminaires",
        "Tables rondes et rencontres professionnelles",
        "Événements corporate",
        "Dispositifs d’engagement des parties prenantes",
      ],
      deliverables:
        "Concept et programme • Pilotage et coordination • Contenus de communication • Gestion des parties prenantes • Bilan de l’événement",
      illustrationPlate: "navy-raised",
    },
    detailIllustration: "expertise-forum",
    need: {
      title: "Quand une organisation doit rencontrer ses publics.",
      text: "Organisation d’une conférence, d’un forum ou d’un séminaire, participation à un rendez-vous institutionnel ou volonté de faire vivre une communauté professionnelle.",
      items: [
        { id: "conception-evenement", order: 1, title: "Conception d’événement" },
        { id: "programmation", order: 2, title: "Programmation et contenus" },
        { id: "mobilisation", order: 3, title: "Mobilisation des publics" },
        { id: "coordination", order: 4, title: "Coordination et pilotage" },
        { id: "bilan-suites", order: 5, title: "Bilan et suites" },
      ],
    },
    method: {
      title: "De l’intention à la rencontre.",
      steps: [
        {
          id: "cadrer",
          order: 1,
          title: "Cadrer",
          description: "Objectifs, publics, format et calendrier.",
        },
        {
          id: "concevoir",
          order: 2,
          title: "Concevoir",
          description: "Programme, contenus et expérience des participants.",
        },
        {
          id: "mobiliser",
          order: 3,
          title: "Mobiliser",
          description: "Invitations, partenaires et dispositifs de communication.",
        },
        {
          id: "piloter",
          order: 4,
          title: "Piloter",
          description: "Coordination du jour J, logistique et suivi des suites.",
        },
      ],
    },
    interventions: [
      "Conférences",
      "Forums",
      "Séminaires",
      "Tables rondes",
      "Rencontres professionnelles",
      "Événements corporate",
      "Dispositifs d’engagement des parties prenantes",
    ],
    deliverables: [
      "Concept et programme",
      "Pilotage et coordination",
      "Contenus de communication",
      "Gestion des parties prenantes",
      "Bilan de l’événement",
    ],
    cta: {
      title: "Un événement ou un dispositif d’engagement à préparer ?",
      label: "Échangeons sur votre besoin",
      href: "/contact",
    },
  },
  {
    slug: "developpement-accompagnement",
    number: "04",
    hubLabel: "Développement",
    title: "Développement & Accompagnement",
    tagline: "Transformer les opportunités en projets.",
    shortDescription:
      "Comprendre les marchés, identifier les opportunités et accompagner le développement de nouveaux projets.",
    cardSummaryMobile:
      "Identifier les opportunités et accompagner de nouveaux projets.",
    introduction:
      "Transformer les opportunités en projets : accompagner la réflexion, la structuration et la mise en œuvre des initiatives de développement.",
    emblem: "DA",
    hubIllustration: "expertise-territory",
    hub: {
      summary: "Transformer les opportunités en projets.",
      interventions: [
        "Intelligence marché et études d’opportunité",
        "Cartographies d’écosystèmes et identification de partenaires",
        "Accompagnement à l’implantation",
        "Appui au développement de projets",
      ],
      deliverables:
        "Notes d’opportunité • Cartographies de partenaires • Analyses de marché • Recommandations d’implantation • Feuilles de route",
      illustrationPlate: "navy",
    },
    detailIllustration: "expertise-territory",
    need: {
      title: "Quand une opportunité doit devenir un projet.",
      text: "Recherche de nouveaux marchés, étude d’opportunité, préparation d’une implantation, identification de partenaires ou besoin de structurer un projet pour le présenter à des instances de décision.",
      items: [
        { id: "intelligence-marche", order: 1, title: "Intelligence marché" },
        { id: "etudes-opportunite", order: 2, title: "Études d’opportunité" },
        { id: "partenaires", order: 3, title: "Identification de partenaires" },
        { id: "implantation", order: 4, title: "Accompagnement à l’implantation" },
        { id: "feuilles-de-route", order: 5, title: "Feuilles de route" },
      ],
    },
    method: {
      title: "De l’opportunité à la feuille de route.",
      steps: [
        {
          id: "cadrer",
          order: 1,
          title: "Cadrer",
          description: "Ambition, périmètre et conditions de réussite.",
        },
        {
          id: "explorer",
          order: 2,
          title: "Explorer",
          description: "Marchés, écosystèmes et acteurs pertinents.",
        },
        {
          id: "prioriser",
          order: 3,
          title: "Prioriser",
          description: "Scénarios, risques et partenaires à mobiliser.",
        },
        {
          id: "structurer",
          order: 4,
          title: "Structurer",
          description: "Recommandations, plan d’action et conditions d’implantation.",
        },
      ],
    },
    interventions: [
      "Intelligence marché",
      "Études d’opportunité",
      "Cartographies d’écosystèmes",
      "Identification de partenaires",
      "Accompagnement à l’implantation",
      "Appui au développement de projets",
    ],
    deliverables: [
      "Notes d’opportunité",
      "Cartographies de partenaires",
      "Analyses de marché",
      "Recommandations d’implantation",
      "Feuilles de route",
    ],
    cta: {
      title: "Un projet de développement à structurer ?",
      label: "Échangeons sur votre besoin",
      href: "/contact",
    },
  },
];

export function getExpertise(slug: string): Expertise | undefined {
  return EXPERTISES.find((expertise) => expertise.slug === slug);
}

export function getExpertiseSlugs(): string[] {
  return EXPERTISES.map((expertise) => expertise.slug);
}
