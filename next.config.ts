import type { NextConfig } from "next";

/**
 * Le site est entièrement statique : il est exporté en HTML/CSS/JS dans `out/`
 * et servi par Firebase Hosting (`firebase.json`).
 *
 * Aucune route rendue à la demande ne doit réapparaître (handler d’API, action
 * serveur, lecture de `cookies()` ou `headers()`) : `next build` échouerait, et
 * le projet reste ainsi sur le plan Firebase gratuit. Le formulaire de contact
 * passe par EmailJS depuis le navigateur.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
