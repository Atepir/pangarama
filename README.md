# PANGARAMA — site institutionnel

Site public du cabinet PANGARAMA (communication financière, intelligence
stratégique, événementiel, développement — Ouagadougou, Burkina Faso).

Implémentation **Next.js 16 (App Router)** + **React 19** + **Tailwind CSS 4**,
fidèle aux maquettes Figma (« 01 — Site public », 20 frames desktop et mobile).

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | serveur de développement |
| `npm run build` | build de production (export statique dans `out/`) |
| `npm run preview` | sert `out/` via l'émulateur Firebase Hosting (port **3210**) |
| `npm run deploy` | build puis déploiement sur Firebase Hosting |
| `npm run lint` | ESLint (configuration Next.js) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | tests unitaires Vitest (`src/__tests__`) |
| `npm run test:e2e` | build puis suite Playwright complète (`e2e/`) |
| `npx playwright test e2e/navigation.spec.ts` | une seule suite E2E |

> `npm run test:e2e` démarre son propre émulateur Firebase Hosting sur le port
> **3210** (`reuseExistingServer: false`) : arrêter tout serveur déjà à l'écoute
> sur ce port avant de lancer la suite. Pour cibler un serveur déjà démarré :
> `$env:BASE_URL="http://127.0.0.1:3210"; npx playwright test`.

## Déploiement (Firebase Hosting)

Le site est **entièrement statique** : `next.config.ts` déclare
`output: "export"`, et `next build` écrit le site complet dans `out/`. Aucun
serveur n'est nécessaire en production, y compris pour le formulaire de contact,
qui est remis à EmailJS depuis le navigateur (voir « Formulaire de contact »
ci-dessous). Le projet tient donc sur le **plan Firebase gratuit (Spark)**.

```bash
firebase login                # une fois par poste
npm run deploy                # build + firebase deploy --only hosting
```

- `firebase.json` — dossier publié (`out`), `cleanUrls: true`,
`trailingSlash: false`, cache immuable des actifs sous `_next/static`.
- `.firebaserc` — projet Firebase cible (`default`).
- Prérequis : la CLI **Firebase** (`npm i -g firebase-tools`), utilisée par
`npm run preview`, `npm run deploy` et la suite E2E. Aucun plan payant.

> `cleanUrls: true` impose de ne jamais lier une page avec `.html` ou un `/`
> final : toutes les URL du site passent par `absoluteUrl()`
> (`src/lib/seo.ts`), qui produit déjà la forme canonique sans slash final.

> **Export Windows — charges RSC aplaties.** Sous Windows, Next écrit la charge
> RSC d'une page dans `<route>/__next.<route>/__PAGE__.txt` (dossier imbriqué)
> alors que le client la demande sous la forme plate
> `<route>/__next.<route>.__PAGE__.txt` (la forme produite sous Linux — voir
> `node_modules/next/dist/bundle-analyzer/`). `npm run build` enchaîne donc
> `scripts/flatten-rsc-segment-files.mjs`, qui renomme ces fichiers et supprime
> les dossiers vidés (opération idempotente). Sans elle, chaque préchargement de
> lien échoue en 404 : la navigation reste fonctionnelle, mais sans
> préchargement.

## Formulaire de contact (EmailJS + reCAPTCHA v2 invisible)

Le site reste 100 % statique : le navigateur valide la saisie, exécute un test
**reCAPTCHA v2 « invisible »** (aucune case à cocher, déclenché à la
soumission), puis remet la demande à **EmailJS** avec le jeton dans
`g-recaptcha-response`. EmailJS vérifie ce jeton avec la clé secrète stockée
dans ses réglages avant d'envoyer l'e-mail.

Conséquence : la clé publique EmailJS est visible dans le JS — c'est son rôle.
Le **plan gratuit** (200 requêtes/mois, 1 service, 2 templates, historique
7 jours) **n'offre pas** de liste de domaines autorisés : la protection repose
sur reCAPTCHA v2 (jeton obligatoire, vérifié par EmailJS) et sur le quota, les
requêtes au-delà étant refusées. Sans configuration complète au build, le
formulaire se replie sur l'écriture directe — voir
`src/components/contact/contact-form.tsx`.

### Variables d'environnement

`.env.local` (modèle `.env.example`) — **inlinées au build** :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | identifiant du service e-mail EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | identifiant du template EmailJS |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | clé publique du compte EmailJS |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | clé de site reCAPTCHA **v2 invisible** |

Les quatre sont requises : si l'une manque, le formulaire n'envoie rien et
propose l'écriture directe.

### Mise en service

1. **EmailJS** — ajouter le service e-mail (Gmail, ou SMTP), créer un template
   dont le destinataire est `pangaramabf@gmail.com`, le « Reply To » vaut
   `{{email}}` et l'objet `Demande de contact — {{from_name}}`. Variables
   utilisées par le formulaire : `{{from_name}}`, `{{organisation}}`,
   `{{email}}`, `{{phone}}`, `{{need}}`, `{{message}}`.
2. **reCAPTCHA** — créer une clé **v2 Invisible** pour `pangarama.com`,
   `www.pangarama.com`, `pangarama.web.app`, `pangarama.firebaseapp.com` et
   `localhost` ; coller la clé de site dans `.env.local` et la clé secrète dans
   le template EmailJS (*Settings* → *Enable reCAPTCHA V2 verification*).
3. Renseigner les quatre variables, puis `npm run dev` (ou `npm run build`).

> EmailJS ne prend en charge que reCAPTCHA **v2** : un jeton v3 serait refusé.

## Structure

```
src/
  app/            routes App Router (pages, sitemap, robots, /og.png)
  components/     composants d'interface par domaine (home, about, expertises, …)
  content/        contenu éditorial typé (pas de chaîne en dur dans les composants)
  config/site.ts  identité, coordonnées, réseaux sociaux (source unique)
  lib/            utilitaires (SEO, routes, révélation au défilement)
public/illustrations/  illustrations SVG (variantes desktop et mobile/)
e2e/              suites Playwright + helpers (audit de mise en page, routes)
scripts/          outillage post-build (voir « Déploiement »)
.figma/           outillage et captures de comparaison visuelle (voir ci-dessous)
```

## Contenu et informations manquantes

Toute information non confirmée reste **explicitement marquée** et n'est jamais
inventée : elle est centralisée dans `src/config/site.ts` (domaine définitif,
URL LinkedIn et Facebook) ou reprise littéralement de la maquette
(`src/content/legal.ts` : éditeur, hébergeur, durées de conservation). La liste
complète des écarts assumés par rapport à Figma est tenue à jour dans le
document de suivi `deviations.md` livré avec le projet.

**Logotype et charte.** Le logotype définitif est fourni dans `public/brand/`
(monogramme, wordmark et déclinaisons couleur / inversée) et posé par
`src/components/layout/wordmark.tsx` dans l'en-tête, le menu mobile et le pied de
page. La palette de la charte — navy `#16243d`, crème `#ffe9cf`, blanc `#ffffff`,
gris clair `#efefef`, or `#bb975a` — est déclarée dans le bloc `@theme` de
`src/app/globals.css`, source unique des couleurs (fonds, aplats navy, accents
dorés, textes) ; les illustrations de `public/illustrations/` en reprennent les
teintes. `src/app/icon.svg` reprend le monogramme comme favicon.

## Tests

- **Unitaires** (Vitest + Testing Library, `src/__tests__`) : navigation, contenu
  des quatre expertises, données d'articles et de réalisations, configuration du
  site, format du numéro, liens sociaux, formulaire et sélecteur de besoin, SEO
  et actifs SEO. `contact-form.test.tsx` couvre l'envoi protégé (confirmation,
  échec, repli), `contact-delivery.test.ts` le contrat EmailJS (paramètres du
  template, jeton reCAPTCHA) et `recaptcha.test.ts` le test invisible.
- **Bout en bout** (Playwright, `e2e/`) :
  - `navigation.spec.ts` — état actif par route, `aria-current`, menu mobile,
    restitution du focus, lien d'évitement, footer, 404, exploration des liens.
  - `responsive.spec.ts` — audit à 320 / 390 / 1024 / 1280 / 1440 px sur toutes
    les routes : débordement horizontal, chevauchements, texte rogné, dépassement
    de parent ; états superposés (menu mobile ouvert, liste déroulante ouverte).
  - `contenu.spec.ts` — fidélité des textes et de la structure.
  - `contact.spec.ts` — validation du formulaire, absence d'envoi réseau en build
    non configuré (aucune clé reCAPTCHA), repli par écriture directe (`mailto:`)
    sur desktop et mobile.
  - `seo.spec.ts` — métadonnées par route, image Open Graph, `robots.txt`,
    `sitemap.xml`, données structurées JSON-LD.

## Comparaison visuelle avec Figma

L'outillage de vérification vit dans `.figma/` :

```bash
npm run preview                            # émulateur Firebase Hosting (port 3210)

$env:BASE_URL="http://127.0.0.1:3210"; node .figma/final-shots.mjs
# 15 routes × 1440 et 390 px → .figma/final/ (+ menu mobile en vue 390×599)
$env:MENU_ONLY="1"; node .figma/final-shots.mjs

node .figma/check-overflow.mjs             # débordement horizontal par route
python .figma/final-compare.py             # décalage de bandes vs rendus Figma
python .figma/rows.py <mock.png> <local.png>   # comparaison ligne à ligne
python .figma/align.py                     # alignement de bandes de couleur
```

Les rendus de référence extraits de Figma (`figma-*.png`, `design-*.png`) et les
relevés de métadonnées (`sub-*.txt`) sont conservés dans le même dossier pour
que chaque écart documenté reste vérifiable.
