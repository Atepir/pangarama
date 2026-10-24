/**
 * reCAPTCHA v2 « invisible » : le test s'exécute à la soumission, sans case à
 * cocher dans l'interface. Le jeton produit est vérifié par EmailJS (clé secrète
 * stockée dans le tableau de bord EmailJS), donc rien de sensible ne transite
 * par le navigateur.
 */

export const RECAPTCHA_SITE_KEY = (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "").trim();

const SCRIPT_ID = "recaptcha-v2-script";
const SCRIPT_URL = "https://www.google.com/recaptcha/api.js?render=explicit";
const TOKEN_TIMEOUT_MS = 20_000;

type RenderParameters = {
  sitekey: string;
  size: "invisible";
  badge?: "bottomright" | "bottomleft" | "inline";
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type Grecaptcha = {
  ready(callback: () => void): void;
  render(container: HTMLElement, parameters: RenderParameters): number;
  execute(widgetId?: number): void;
  reset(widgetId?: number): void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loading: Promise<Grecaptcha> | null = null;
let widgetId: number | null = null;
let pending:
  | { resolve: (token: string) => void; reject: (error: Error) => void }
  | null = null;

function settle(token: string | null, error?: Error) {
  const current = pending;
  pending = null;

  if (!current) {
    return;
  }

  if (error || !token) {
    current.reject(error ?? new Error("Vérification anti-robot échouée"));
    return;
  }

  current.resolve(token);
}

function loadScript(): Promise<Grecaptcha> {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("reCAPTCHA indisponible hors navigateur"));
  }

  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha);
  }

  if (loading) {
    return loading;
  }

  loading = new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;

    script.addEventListener(
      "load",
      () => {
        const api = window.grecaptcha;
        if (!api) {
          loading = null;
          reject(new Error("reCAPTCHA indisponible"));
          return;
        }

        api.ready(() => resolve(api));
      },
      { once: true },
    );

    script.addEventListener(
      "error",
      () => {
        loading = null;
        reject(new Error("Le script reCAPTCHA n’a pas pu être chargé"));
      },
      { once: true },
    );

    document.head.appendChild(script);
  });

  return loading;
}

function ensureWidget(api: Grecaptcha): number {
  if (widgetId !== null) {
    return widgetId;
  }

  const container = document.createElement("div");
  container.id = "contact-recaptcha";
  document.body.appendChild(container);

  widgetId = api.render(container, {
    sitekey: RECAPTCHA_SITE_KEY,
    size: "invisible",
    badge: "bottomright",
    callback: (token) => settle(token),
    "expired-callback": () => settle(null, new Error("Vérification anti-robot expirée")),
    "error-callback": () => settle(null, new Error("Vérification anti-robot échouée")),
  });

  return widgetId;
}

/** Exécute le test invisible et renvoie le jeton à transmettre à EmailJS. */
export async function requestCaptchaToken(): Promise<string> {
  const api = await loadScript();
  const id = ensureWidget(api);

  return new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => {
      settle(null, new Error("Vérification anti-robot expirée"));
    }, TOKEN_TIMEOUT_MS);

    pending = {
      resolve: (token) => {
        clearTimeout(timer);
        resolve(token);
      },
      reject: (error) => {
        clearTimeout(timer);
        reject(error);
      },
    };

    api.reset(id);
    api.execute(id);
  });
}
