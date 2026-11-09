/* eslint-disable @next/next/no-img-element -- Les visuels sont servis comme
   fichiers statiques (photographies optimisées et SVG autonomes portant leurs
   propres filtres et identifiants) : ils passent par `<img>`, pas next/image. */

import { cn } from "@/lib/cn";

type Asset = {
  src: string;
  width: number;
  height: number;
};

type SceneAsset = Asset & {
  alt: string;
};

export type IllustrationKey =
  | "strategic-intelligence"
  | "market-report"
  | "field-notes"
  | "field-of-view"
  | "expertise-matrix"
  | "expertise-report"
  | "expertise-network"
  | "expertise-forum"
  | "expertise-territory"
  | "case-system"
  | "case-note"
  | "insight-system"
  | "case-study";

export type EmblemKey =
  | "communication-financiere"
  | "etudes-intelligence-strategique"
  | "evenementiel-engagement"
  | "developpement-accompagnement";

export type InsightCoverKey = "market-signals" | "corporate-finance" | "strategic-map";

/** Codes d'emblème du contenu éditorial → ressources graphiques. */
const EMBLEM_CODE: Record<string, EmblemKey> = {
  CF: "communication-financiere",
  EI: "etudes-intelligence-strategique",
  EE: "evenementiel-engagement",
  DA: "developpement-accompagnement",
};

export function emblemKey(code: string): EmblemKey | undefined {
  return EMBLEM_CODE[code];
}

const BASE = "/illustrations";

/** Photographies documentaires : elles remplacent les scènes illustrées d'origine. */
const PHOTO = `${BASE}/photos`;

/**
 * Chaque scène porte la photographie qui documente son sujet : terrain
 * burkinabè, marché, atelier de travail, institution, rencontres, territoire,
 * analyses. Seuls les emblèmes et la cartographie d'article restent illustrés
 * (voir `EMBLEMS` et `INSIGHT_CARTOGRAPHY`).
 */
const SCENES: Record<IllustrationKey, SceneAsset> = {
  "strategic-intelligence": {
    src: `${PHOTO}/ouagadougou-vue-aerienne.webp`,
    width: 550,
    height: 580,
    alt: "Photographie : vue aérienne d'un carrefour giratoire au cœur d'une ville",
  },
  "market-report": {
    src: `${PHOTO}/ouagadougou-rue-marche.webp`,
    width: 490,
    height: 330,
    alt: "Photographie : rue commerçante de Ouagadougou, charrettes et passants",
  },
  "field-notes": {
    src: `${PHOTO}/atelier-briefing.webp`,
    width: 560,
    height: 390,
    alt: "Photographie : table de travail couverte de notes manuscrites et de feutres",
  },
  "field-of-view": {
    src: `${PHOTO}/territoire-africain.webp`,
    width: 500,
    height: 430,
    alt: "Photographie : immeubles de bureaux le long d'une avenue arborée",
  },
  /* Communication financière : même visuel sur la page Expertises et le détail. */
  "expertise-matrix": {
    src: `${PHOTO}/monument-ouagadougou.webp`,
    width: 470,
    height: 320,
    alt: "Photographie : monument aux héros nationaux de Ouagadougou",
  },
  "expertise-report": {
    src: `${PHOTO}/monument-ouagadougou.webp`,
    width: 500,
    height: 330,
    alt: "Photographie : monument aux héros nationaux de Ouagadougou",
  },
  "expertise-network": {
    src: `${PHOTO}/marche-urbain.webp`,
    width: 470,
    height: 320,
    alt: "Photographie : rue marchande, étals, enseignes et passants",
  },
  "expertise-forum": {
    src: `${PHOTO}/reunion-professionnelle.webp`,
    width: 470,
    height: 320,
    alt: "Photographie : réunion de travail autour d'une table",
  },
  "expertise-territory": {
    src: `${PHOTO}/ouagadougou-avenues.webp`,
    width: 470,
    height: 320,
    alt: "Photographie : avenues, immeubles et trafic d'un quartier de Ouagadougou vus du ciel",
  },
  "case-system": {
    src: `${PHOTO}/ouagadougou-vue-aerienne.webp`,
    width: 470,
    height: 430,
    alt: "Photographie : vue aérienne d'un carrefour giratoire et de ses avenues",
  },
  "case-note": {
    src: `${BASE}/case-note.svg`,
    width: 346,
    height: 180,
    alt: "Illustration : note de synthèse",
  },
  "insight-system": {
    src: `${PHOTO}/atelier-briefing.webp`,
    width: 570,
    height: 390,
    alt: "Photographie : table de travail couverte de notes, de feutres et de repères",
  },
  "case-study": {
    src: `${PHOTO}/ouagadougou-rue-marche.webp`,
    width: 500,
    height: 330,
    alt: "Photographie : rue commerçante de Ouagadougou, charrettes et passants",
  },
};

const EMBLEMS: Record<EmblemKey, Asset> = {
  "communication-financiere": {
    src: `${BASE}/emblems/communication-financiere.svg`,
    width: 106,
    height: 78,
  },
  "etudes-intelligence-strategique": {
    src: `${BASE}/emblems/etudes-intelligence-strategique.svg`,
    width: 106,
    height: 78,
  },
  "evenementiel-engagement": {
    src: `${BASE}/emblems/evenementiel-engagement.svg`,
    width: 106,
    height: 78,
  },
  "developpement-accompagnement": {
    src: `${BASE}/emblems/developpement-accompagnement.svg`,
    width: 106,
    height: 78,
  },
};

const INSIGHT_COVERS: Record<InsightCoverKey, Asset> = {
  "market-signals": { src: `${PHOTO}/monument-ouagadougou.webp`, width: 409, height: 205 },
  "corporate-finance": { src: `${PHOTO}/reunion-professionnelle.webp`, width: 409, height: 205 },
  "strategic-map": { src: `${PHOTO}/marche-urbain.webp`, width: 409, height: 205 },
};

/** Cartographie du bloc « Aller plus loin » du gabarit article. */
export const INSIGHT_CARTOGRAPHY: Asset = {
  src: `${BASE}/insight-cartography.svg`,
  width: 420,
  height: 260,
};

type IllustrationProps = {
  name: IllustrationKey;
  className?: string;
  /** `alt=""` lorsque le visuel est redondant avec un titre visible. */
  alt?: string;
  priority?: boolean;
};

/**
 * Visuel éditorial de section. La largeur est fluide et la hauteur suit le
 * ratio de la photographie ; `width`/`height` réservent la place avant
 * chargement. Les conteneurs qui bornent la hauteur (hero d'accueil) recadrent
 * alors au centre via `object-cover`.
 */
export function Illustration({ name, className, alt, priority }: IllustrationProps) {
  const scene = SCENES[name];

  return (
    <img
      src={scene.src}
      width={scene.width}
      height={scene.height}
      alt={alt ?? scene.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}

/** Pastille d'expertise compacte, proportionnelle à l'asset 106 × 78. */
export function Emblem({ name, className }: { name: EmblemKey; className?: string }) {
  const emblem = EMBLEMS[name];
  return (
    <img
      src={emblem.src}
      width={emblem.width}
      height={emblem.height}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn("h-[60px] w-[82px] shrink-0 lg:h-[64px] lg:w-[88px]", className)}
    />
  );
}

/** Couverture de carte insight : cadre de la maquette 409 × 205, recadré au centre. */
export function InsightCover({
  name,
  className,
}: {
  name: InsightCoverKey;
  className?: string;
}) {
  const cover = INSIGHT_COVERS[name];

  return (
    <img
      src={cover.src}
      width={cover.width}
      height={cover.height}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn("aspect-[409/205] w-full object-cover", className)}
    />
  );
}

/**
 * Cartographie du bloc « Aller plus loin » du gabarit article. La maquette la
 * place en absolu dans un cadre de 420 × 260 : les dimensions sont donc portées
 * par l'appelant (voir `InsightFurther`).
 */
export function InsightCartography({ className }: { className?: string }) {
  return (
    <img
      src={INSIGHT_CARTOGRAPHY.src}
      width={INSIGHT_CARTOGRAPHY.width}
      height={INSIGHT_CARTOGRAPHY.height}
      alt=""
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
