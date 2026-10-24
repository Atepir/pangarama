import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type RenderParams = {
  sitekey: string;
  size: "invisible";
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

/** Paramètres capturés au rendu du widget invisible. */
const captured: { params?: RenderParams } = {};

function fakeRecaptcha(execute: () => void, reset = vi.fn()) {
  return {
    ready: (callback: () => void) => callback(),
    render: (_container: HTMLElement, options: RenderParams) => {
      captured.params = options;
      return 7;
    },
    execute,
    reset,
  } as unknown as Window["grecaptcha"];
}

function resetEnvironment() {
  document.getElementById("recaptcha-v2-script")?.remove();
  document.getElementById("contact-recaptcha")?.remove();
  window.grecaptcha = undefined;
  captured.params = undefined;
}

describe("requestCaptchaToken", () => {
  beforeEach(() => {
    resetEnvironment();
    vi.resetModules();
  });

  afterEach(resetEnvironment);

  it("injecte le script reCAPTCHA explicite puis renvoie le jeton", async () => {
    const { requestCaptchaToken } = await import("@/lib/recaptcha");

    const pending = requestCaptchaToken();
    const script = document.getElementById("recaptcha-v2-script") as HTMLScriptElement | null;

    expect(script).not.toBeNull();
    expect(script?.src).toContain("https://www.google.com/recaptcha/api.js?render=explicit");

    const reset = vi.fn();
    window.grecaptcha = fakeRecaptcha(() => captured.params?.callback("jeton-captcha"), reset);

    script?.dispatchEvent(new Event("load"));

    await expect(pending).resolves.toBe("jeton-captcha");
    expect(captured.params?.size).toBe("invisible");
    expect(reset).toHaveBeenCalledWith(7);
  });

  it("réutilise le widget invisible déjà rendu", async () => {
    const { requestCaptchaToken } = await import("@/lib/recaptcha");

    const base = fakeRecaptcha(() => undefined) as NonNullable<Window["grecaptcha"]>;
    const render = vi.fn(base.render);
    window.grecaptcha = {
      ...fakeRecaptcha(() => captured.params?.callback("premier-jeton")),
      render,
    } as unknown as Window["grecaptcha"];

    await expect(requestCaptchaToken()).resolves.toBe("premier-jeton");
    await expect(requestCaptchaToken()).resolves.toBe("premier-jeton");
    expect(render).toHaveBeenCalledTimes(1);
  });

  it("rejette quand le test anti-robot échoue", async () => {
    const { requestCaptchaToken } = await import("@/lib/recaptcha");

    window.grecaptcha = fakeRecaptcha(() => captured.params?.["error-callback"]?.());

    await expect(requestCaptchaToken()).rejects.toThrow(/anti-robot/i);
  });
});
