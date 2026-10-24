/**
 * Méthodes d'intervention PANGARAMA.
 *
 * Deux jeux coexistent dans la maquette :
 * — `METHOD_STEPS` : la méthode générale présentée sur la page À propos
 *   (quatre étapes, sans description) ;
 * — `EDITORIAL_METHOD_STEPS` : la méthode éditoriale utilisée par le gabarit de
 *   page détail d'expertise (quatre étapes décrites).
 *
 * Ne jamais ajouter d'étape : la maquette finale en présente exactement quatre
 * dans les deux cas.
 */

export type MethodStep = {
  id: string;
  order: number;
  title: string;
  description: string;
};

export const METHOD_STEPS: readonly MethodStep[] = [
  {
    id: "cadrer",
    order: 1,
    title: "Cadrer",
    description: "Objectifs, publics, contraintes et calendrier.",
  },
  {
    id: "analyser",
    order: 2,
    title: "Analyser",
    description: "Environnement, données, acteurs et signaux faibles.",
  },
  {
    id: "concevoir",
    order: 3,
    title: "Concevoir",
    description: "Recommandations, messages et supports adaptés.",
  },
  {
    id: "deployer",
    order: 4,
    title: "Déployer",
    description: "Mise en œuvre, diffusion et mesure des résultats.",
  },
];

export const EDITORIAL_METHOD_STEPS: readonly MethodStep[] = [
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
];
