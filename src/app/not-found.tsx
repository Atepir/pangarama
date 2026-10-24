import { NotFoundState } from "@/components/not-found/not-found-state";

/**
 * Page 404 du site. Pas de `metadata` ici : Next.js gère l'indexation de cette
 * route, et l'en-tête comme le pied de page — donc la navigation de secours —
 * proviennent du layout global.
 */
export default function NotFound() {
  return <NotFoundState />;
}
