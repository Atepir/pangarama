/* eslint-disable @next/next/no-img-element -- Les visuels sont des SVG autonomes
   (ils portent leurs propres filtres et identifiants) : ils doivent être chargés
   comme documents isolés via `<img>`, et non inlinés dans le DOM de la page. */

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

const SCENES: Record<IllustrationKey, SceneAsset> = {
  "strategic-intelligence": {
    src: `${BASE}/strategic-intelligence.svg`,
    width: 550,
    height: 580,
    alt: "Illustration : relief topographique et point de signal",
  },
  "market-report": {
    src: `${BASE}/market-report.svg`,
    width: 490,
    height: 330,
    alt: "Illustration : rapport relié et graphique de synthèse",
  },
  "field-notes": {
    src: `${BASE}/field-notes.svg`,
    width: 560,
    height: 390,
    alt: "Illustration : carnet de terrain et relevé cartographique",
  },
  "field-of-view": {
    src: `${BASE}/field-of-view.svg`,
    width: 500,
    height: 430,
    alt: "Illustration : éventail de lecture et champ d'observation",
  },
  "expertise-matrix": {
    src: `${BASE}/expertise-matrix.svg`,
    width: 470,
    height: 320,
    alt: "Illustration : quatre formes complémentaires",
  },
  "expertise-report": {
    src: `${BASE}/expertise-report.svg`,
    width: 500,
    height: 330,
    alt: "Illustration : double page éditoriale",
  },
  "expertise-network": {
    src: `${BASE}/expertise-network.svg`,
    width: 470,
    height: 320,
    alt: "Illustration : réseau de signaux et d'acteurs",
  },
  "expertise-forum": {
    src: `${BASE}/expertise-forum.svg`,
    width: 470,
    height: 320,
    alt: "Illustration : assemblée et gradins",
  },
  "expertise-territory": {
    src: `${BASE}/expertise-territory.svg`,
    width: 470,
    height: 320,
    alt: "Illustration : territoire et itinéraire",
  },
  "case-system": {
    src: `${BASE}/case-system.svg`,
    width: 470,
    height: 430,
    alt: "Illustration : système de signaux",
  },
  "case-note": {
    src: `${BASE}/case-note.svg`,
    width: 346,
    height: 180,
    alt: "Illustration : note de synthèse",
  },
  "insight-system": {
    src: `${BASE}/insight-system.svg`,
    width: 570,
    height: 390,
    alt: "Illustration : publication et données",
  },
  "case-study": {
    src: `${BASE}/case-study.svg`,
    width: 500,
    height: 330,
    alt: "Illustration : dossier de mission",
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
  "market-signals": { src: `${BASE}/insights/market-signals.svg`, width: 409, height: 205 },
  "corporate-finance": {
    src: `${BASE}/insights/corporate-finance.svg`,
    width: 409,
    height: 205,
  },
  "strategic-map": { src: `${BASE}/insights/strategic-map.svg`, width: 409, height: 205 },
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

/** Visuel éditorial de section, chargé comme document SVG autonome. */
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
      className={cn("h-auto w-full", className)}
    />
  );
}

/** Pastille d'expertise 106 × 78 (fond navy inclus dans l'asset). */
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
      className={cn("h-[78px] w-[106px] shrink-0", className)}
    />
  );
}

/** Couverture de carte insight 409 × 205. */
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
      className={cn("h-auto w-full", className)}
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
