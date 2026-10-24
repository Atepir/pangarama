import type { InsightCategory } from "@/content/insights";

/**
 * Contenus structurants des pages.
 *
 * Les libellés de section sont ceux de la maquette : sur mobile, le titre de
 * section est remplacé par un surtitre en capitales ; sur desktop, par un filet
 * et un libellé aligné à droite (`SectionHeading`).
 */

export const HOME_HERO = {
  eyebrow: "Comprendre • Valoriser • Développer",
  titleLines: [
    "Comprendre votre environnement.",
    "Valoriser votre organisation.",
    "Développer vos projets.",
  ],
  intro:
    "PANGARAMA accompagne les entreprises, institutions et organisations dans la compréhension de leur environnement, la valorisation de leurs activités et le développement de leurs projets.",
  primaryCta: { label: "Découvrir nos expertises", href: "/expertises" },
  secondaryCta: { label: "Nous contacter", href: "/contact" },
} as const;

/** Bandeau d'activité placé sous le hero de l'accueil. */
export const HOME_ACTIVITY = {
  label: "À vos côtés",
  audiences: [
    "Banques & assurances",
    "Entreprises & groupes",
    "Institutions & ONG",
    "Investisseurs internationaux",
  ],
} as const;

export const HOME_BRIEF = {
  eyebrow: "Pangarama en bref",
  title: "Une expertise burkinabè, ouverte sur l’Afrique.",
  text: "PANGARAMA réunit quatre expertises complémentaires — communication financière et corporate, intelligence stratégique, événementiel et développement — autour d’une même exigence : des décisions mieux éclairées, des messages plus justes et des projets qui aboutissent. Notre ancrage à Ouagadougou et notre ouverture internationale nous permettent de conjuguer connaissance du terrain et standards professionnels.",
  cta: { label: "Découvrir PANGARAMA", href: "/a-propos" },
} as const;

export const HOME_EXPERTISES = {
  eyebrow: "Nos expertises",
  title: "Nos expertises",
  label: "04 territoires d’intervention",
} as const;

export const HOME_APPROACH = {
  eyebrow: "Notre approche",
  title: "Comprendre. Valoriser. Développer.",
  text: "Comprendre votre environnement et vos besoins. Valoriser vos informations et vos ambitions. Développer les opportunités par des solutions concrètes.",
  cta: { label: "Découvrir notre méthode", href: "/a-propos#methode" },
} as const;

export const HOME_INSIGHTS = {
  eyebrow: "Nos analyses",
  title: "Insights",
  label: "ANALYSES • DÉCRYPTAGES • DONNÉES",
} as const;

export const HOME_FINAL_CTA = {
  title: "Un projet, un besoin, une ambition ?",
  cta: { label: "Parler de votre projet", href: "/contact" },
} as const;

/** Contenus de la page Réalisations & Insights. */
export const REALISATIONS_INSIGHTS_HERO = {
  eyebrow: "Réalisations & Insights",
  titleLines: ["Nos expertises en action.", "Nos analyses pour mieux comprendre."],
  intro:
    "PANGARAMA partage progressivement ses projets, analyses, décryptages et données sur les entreprises, les marchés et les transformations économiques.",
  /** Maquette mobile : l'introduction y est condensée. */
  introShort:
    "Projets, analyses, décryptages et données sur les entreprises, les marchés et les transformations économiques.",
  /** Couverture éditoriale de la maquette mobile : composée en texte, sans asset dédié. */
  mobileCover: {
    brand: "PANGARAMA",
    label: "WEST AFRICA MARKET OUTLOOK",
    value: "2026",
  },
} as const;

export const RI_ANALYSES_SECTION = {
  id: "analyses",
  /** Libellé du format : surtitre sur mobile, intitulé de l'argumentaire sur desktop. */
  label: "PANGARAMA Insights",
  /** Surtitre desktop. */
  eyebrow: "Nos analyses",
  title: "Analyses, notes et études sur les marchés, secteurs et enjeux des organisations.",
  /** Maquette mobile : titre et texte resserrés. */
  titleShort: "Analyses, notes et études sur les marchés et les enjeux des organisations.",
  text: "Une information structurée et contextualisée pour mieux comprendre les dynamiques économiques et éclairer les décisions.",
  textShort: "Une information structurée et contextualisée pour éclairer les décisions.",
  cta: { label: "Lire l’analyse", href: "/realisations-insights#insights" },
} as const;

export const REALISATIONS_SECTION = {
  id: "realisations",
  eyebrow: "Réalisations",
  title: "Nos missions",
  emptyState: {
    badge: "À venir",
    title: "Nos premières réalisations seront prochainement présentées ici.",
    note: "Publication avec l’accord du client",
    text: "Découvrez progressivement les projets et missions réalisés par PANGARAMA aux côtés de ses clients et partenaires.",
    /** Maquette mobile : l'état vide se limite au badge, au titre et à un texte court. */
    textShort:
      "Découvrez progressivement les missions réalisées aux côtés de nos clients et partenaires.",
    chip: "Prochainement",
  },
} as const;

export const INSIGHTS_SECTION = {
  id: "insights",
  eyebrow: "Nos analyses",
  title: "Insights",
  filtersLabel: "Filtrer les analyses",
  allLabel: "Tous",
  emptyLabel: "Aucune analyse publiée dans cette catégorie pour le moment.",
  /** Annonce affichée tant qu'aucune analyse n'est publiée. */
  emptyAnnouncement: {
    badge: "Prochainement",
    text: "Les premières publications PANGARAMA seront prochainement disponibles.",
  },
} as const;

export const EXPERTISES_PAGE = {
  eyebrow: "Expertises",
  titleLines: [
    "Quatre expertises complémentaires",
    "au service des organisations.",
  ],
  intro:
    "Communication, décision, engagement et développement : des expertises mobilisées selon vos enjeux.",
  cards: [
    { number: "01", label: "Corporate" },
    { number: "02", label: "Intelligence" },
    { number: "03", label: "Engagement" },
    { number: "04", label: "Développement" },
  ],
} as const;

export const EXPERTISE_HUB_LABELS = {
  interventions: "Nous intervenons sur",
  deliverables: "Livrables possibles",
  detailCta: "Échangeons sur votre besoin",
  momentsEyebrow: "À quels moments nous mobiliser ?",
  ctaTitle: "Une expertise peut commencer par une question.",
  ctaLabel: "Parler de votre projet",
} as const;

/** Moments de mobilisation affichés sur la page Expertises. */
export const EXPERTISE_MOMENTS = [
  {
    id: "lancer",
    title: "Lancer",
    description: "une activité ou une offre sur un nouveau marché",
  },
  {
    id: "decider",
    title: "Décider",
    description: "avant un investissement, un partenariat ou une implantation",
  },
  {
    id: "convaincre",
    title: "Convaincre",
    description: "des investisseurs, partenaires ou parties prenantes",
  },
  {
    id: "mobiliser",
    title: "Mobiliser",
    description: "une communauté professionnelle ou institutionnelle",
  },
] as const;

/** Libellés du gabarit de page détail d'expertise. */
export const EXPERTISE_DETAIL_LABELS = {
  eyebrowPrefix: "Expertise",
  needEyebrow: "Quand nous solliciter",
  methodEyebrow: "Notre méthode",
  deliverablesEyebrow: "Livrables types",
  ctaLabel: "Échangeons sur votre besoin",
} as const;

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  title: "Parlons de votre projet.",
  intro:
    "Vous avez un projet, une problématique ou souhaitez simplement échanger avec PANGARAMA ? Présentez-nous votre besoin. Nous reviendrons vers vous pour mieux comprendre votre contexte et envisager ensemble la réponse la plus adaptée.",
  /** Intro condensée de la maquette mobile. */
  introMobile:
    "Présentez-nous votre projet, votre problématique ou votre besoin. Nous reviendrons vers vous pour mieux comprendre votre contexte.",
} as const;

export const CONTACT_FORM = {
  title: "Décrivez votre besoin",
  intro:
    "Ces informations serviront uniquement à comprendre votre contexte et préparer notre réponse.",
  selectPlaceholder: "Sélectionner une option",
  submitLabel: "Envoyer ma demande",
  requiredLabel: "champ obligatoire",
  /** Rappel lu aux lecteurs d'écran : la maquette ne l'affiche pas. */
  requiredHint: "Les champs marqués d’un astérisque sont obligatoires.",
  optionalSuffix: "· Facultatif",
  messages: {
    /** Aucun envoi n’a lieu : les messages ne doivent jamais simuler un succès. */
    invalid: "Merci de corriger les champs signalés avant d’envoyer votre demande.",
    unconfigured:
      "L’envoi du formulaire n’est pas encore activé : votre demande n’a pas été transmise.",
    fallbackContact: "Vous pouvez nous écrire directement à",
    submitting: "Envoi en cours…",
    sent: "Merci, votre demande a bien été envoyée. Nous revenons vers vous prochainement.",
    error:
      "Votre demande n’a pas pu être envoyée. Réessayez dans un instant, ou écrivez-nous directement à",
  },
  /** Mention exigée par Google lorsqu’un formulaire utilise reCAPTCHA. */
  recaptchaNotice: {
    lead: "Ce formulaire est protégé par reCAPTCHA ; les",
    privacy: "règles de confidentialité",
    middle: "et les",
    terms: "conditions d’utilisation",
    tail: "de Google s’appliquent.",
  },
} as const;

export const CONTACT_CHANNELS = [
  {
    id: "ecrire",
    label: "Écrire",
    description: "Pour une mission, un partenariat ou une prise de contact.",
  },
  {
    id: "appeler",
    label: "Appeler",
    description: "Téléphone et WhatsApp professionnel.",
  },
  {
    id: "rencontrer",
    label: "Rencontrer",
    description: "Les rendez-vous sont organisés sur confirmation préalable.",
  },
] as const;

export const CONTACT_STEPS = {
  eyebrow: "Comment démarre une mission ?",
  title: "Trois étapes avant de commencer.",
  steps: [
    {
      id: "cadrage",
      order: 1,
      title: "Cadrage",
      description: "Nous clarifions le contexte, l’objectif et la décision à préparer.",
    },
    {
      id: "proposition",
      order: 2,
      title: "Proposition",
      description: "Nous définissons approche, livrables, calendrier et modalités.",
    },
    {
      id: "lancement",
      order: 3,
      title: "Lancement",
      description:
        "Le périmètre validé, la mission démarre avec un interlocuteur dédié.",
    },
  ],
} as const;

export const CONTACT_CONFIDENTIALITY = {
  title: "Confidentialité",
  text: "Les demandes reçues sont traitées avec discrétion et uniquement dans le cadre de l’échange professionnel.",
} as const;

export const NEED_OPTIONS: readonly { value: string; label: string }[] = [
  {
    value: "communication-financiere-corporate",
    label: "Communication financière & corporate",
  },
  {
    value: "etudes-intelligence-strategique",
    label: "Études & Intelligence stratégique",
  },
  { value: "evenementiel-engagement", label: "Événementiel & Engagement" },
  { value: "developpement-accompagnement", label: "Développement & Accompagnement" },
  { value: "partenariat", label: "Partenariat" },
  { value: "autre", label: "Autre" },
];

export const INSIGHT_FORMAT_CARDS: readonly {
  category: InsightCategory;
  label: string;
  description: string;
}[] = [
  {
    category: "insight",
    label: "PANGARAMA Insights",
    description:
      "Analyses, notes et études sur les marchés, secteurs et enjeux des organisations.",
  },
  {
    category: "decryptage",
    label: "PANGARAMA Décryptage",
    description:
      "Lecture claire et contextualisée d’une actualité ou d’un enjeu économique, financier ou stratégique.",
  },
  {
    category: "chiffre",
    label: "Le Chiffre PANGARAMA",
    description:
      "Une donnée significative mise en perspective pour mieux comprendre une tendance ou un marché.",
  },
];

/** Libellés du gabarit article. */
export const ARTICLE_LABELS = {
  /** Surtitre d'un contenu de démonstration : la maquette le porte dans le héros. */
  demoEyebrow: "Exemple de publication · Contenu à valider",
  tocTitle: "Dans cette note",
  shareLinkedIn: "Partager sur LinkedIn",
  moreAnalyses: "Découvrir nos autres analyses",
  /** Métadonnées du héros : « Auteur · PANGARAMA », « 8 min de lecture ». */
  authorPrefix: "Auteur",
  publishedPrefix: "Date de publication",
  /** Date affichée pour un contenu de démonstration, non daté dans la maquette. */
  publishedUndefined: "À définir",
  takeawaysEyebrow: "À retenir",
  furtherEyebrow: "Aller plus loin",
  furtherTitle: "Besoin d’une étude adaptée à votre décision ?",
  furtherText:
    "PANGARAMA réalise des études de marché, benchmarks, cartographies d’acteurs et analyses sectorielles sur mesure.",
  furtherCta: { label: "Parler de votre projet", href: "/contact" },
  furtherCaption: "Burkina Faso • Afrique de l’Ouest",
} as const;

/** Libellés du gabarit réalisation (case study). */
export const CASE_STUDY_LABELS = {
  /**
   * Préfixe du surtitre d’un contenu de démonstration : « Exemple de mission · Étude de marché ».
   * Les missions réelles affichent directement la nature de la mission.
   */
  exampleEyebrow: "Exemple de mission",
  challengeEyebrow: "Le défi",
  approachEyebrow: "Notre approche",
  objectiveEyebrow: "Objectif de la mission",
  /** Bande de conversion navy du gabarit. */
  cta: {
    title: "Vous préparez une décision sur un marché ?",
    label: "Parler d’une mission",
    href: "/contact",
  },
  shareLinkedIn: "Partager sur LinkedIn",
  moreAnalyses: "Découvrir nos autres analyses",
  /** Métadonnées du héros : « Auteur · PANGARAMA », « Temps de lecture · À définir ». */
  authorPrefix: "Auteur",
  author: "PANGARAMA",
  publishedPrefix: "Date de publication",
  readingPrefix: "Temps de lecture",
  /** Valeur affichée tant que l’information n’est pas arrêtée. */
  undefinedValue: "À définir",
  fields: {
    context: "Contexte",
    mission: "Mission",
    duration: "Durée",
    deliverables: "Livrables",
  },
} as const;

export const NOT_FOUND_PAGE = {
  code: "404",
  title: "Page introuvable",
  text: "Le contenu recherché n’existe pas ou a été déplacé.",
  cta: { label: "Retour à l’accueil", href: "/" },
} as const;

export const TODO_MARKER = "à compléter";
