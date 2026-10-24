import type { Page } from "@playwright/test";

/**
 * Largeurs auditées : le minimum supporté (320), la maquette mobile (390), la
 * bascule `lg` (1024), la bascule `xl` (1280) et la maquette desktop (1440).
 */
export const AUDIT_WIDTHS: readonly number[] = [320, 390, 1024, 1280, 1440];

export type LayoutFinding =
  | { kind: "overflow"; detail: string }
  | { kind: "bleed"; el: string; over: number; text: string }
  | { kind: "clipped"; el: string; size: string; text: string }
  | { kind: "overlap"; a: string; b: string; w: number; h: number }
  | { kind: "exceeds"; el: string; child: number; parent: string };

/** Désactive les transitions et révèle les blocs animés avant de mesurer. */
export async function prepareForAudit(page: Page): Promise<void> {
  await page.addStyleTag({
    content: "*{transition:none!important;animation:none!important}",
  });
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("is-visible");
    });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(50);
}

export type LayoutAuditOptions = {
  /**
   * Sélecteur du sous-arbre à auditer. À réserver aux états où un panneau
   * opaque recouvre la page — le menu mobile ouvert, par exemple : les éléments
   * qu'il masque ne sont pas des collisions, et l'heuristique de chevauchement
   * ne connaît pas les empilements `z-index`. Le débordement du document reste
   * mesuré, et un sélecteur sans correspondance échoue bruyamment.
   */
  scope?: string;
};

/**
 * Audit de mise en page (§49) : débordement horizontal du document, éléments
 * sortant du viewport sans ancêtre qui coupe, texte rogné, chevauchement
 * texte/texte et composant plus large que son parent.
 *
 * Le code tourne dans la page : il ne peut donc référencer aucune variable
 * extérieure.
 */
export async function auditLayout(
  page: Page,
  options: LayoutAuditOptions = {},
): Promise<LayoutFinding[]> {
  return page.evaluate((scopeSelector) => {
    const doc = document.documentElement;
    const findings: LayoutFinding[] = [];
    const scopeRoot: ParentNode = scopeSelector
      ? (() => {
          const found = document.querySelector(scopeSelector);
          if (!found) throw new Error(`périmètre d'audit introuvable : ${scopeSelector}`);
          return found;
        })()
      : document.body;

    const describe = (element: Element) => {
      const cls =
        typeof element.className === "string"
          ? element.className.split(" ").slice(0, 4).join(".")
          : "";
      return `${element.tagName.toLowerCase()}${cls ? `.${cls}` : ""}`;
    };
    const text = (element: Element) =>
      (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 30);
    const visible = (element: Element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 2 || rect.height <= 2) return false;
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return false;
      if (Number.parseFloat(style.opacity) === 0) return false;
      return true;
    };
    const isSrOnly = (element: Element) =>
      element.classList.contains("sr-only") || Boolean(element.closest(".sr-only"));
    const hasOwnText = (element: Element) =>
      Array.from(element.childNodes).some(
        (node) => node.nodeType === 3 && (node.textContent ?? "").trim().length > 0,
      );

    const clipped: Array<{ el: string; size: string; text: string }> = [];
    const bleed: Array<{ el: string; over: number; text: string }> = [];
    const exceeds: Array<{ el: string; child: number; parent: string }> = [];
    const overlaps: Array<{ a: string; b: string; w: number; h: number }> = [];
    const textElements: Array<{ element: Element; rect: DOMRect; label: string }> = [];

    scopeRoot.querySelectorAll("*").forEach((element) => {
      if (element.closest("[aria-hidden='true']") || isSrOnly(element)) return;
      if (!visible(element)) return;

      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);

      if (hasOwnText(element)) {
        const cut =
          ((style.overflowX === "hidden" || style.overflowX === "clip") &&
            element.scrollWidth - element.clientWidth > 1) ||
          ((style.overflowY === "hidden" || style.overflowY === "clip") &&
            element.scrollHeight - element.clientHeight > 1);

        if (cut) {
          clipped.push({
            el: describe(element),
            size: `${element.scrollWidth}x${element.scrollHeight} / ${element.clientWidth}x${element.clientHeight}`,
            text: text(element),
          });
        }

        textElements.push({ element, rect, label: describe(element) });
      }

      const over = Math.round(rect.right - doc.clientWidth);
      if (over > 1 || rect.left < -1) {
        let node: Element | null = element.parentElement;
        let contained = false;
        while (node && node !== doc) {
          const parentStyle = getComputedStyle(node);
          if (parentStyle.overflowX === "hidden" || parentStyle.overflowX === "clip") {
            contained = true;
            break;
          }
          node = node.parentElement;
        }
        if (!contained) {
          bleed.push({ el: describe(element), over, text: text(element) });
        }
      }

      const parent = element.parentElement;
      if (parent && parent !== document.body) {
        const parentRect = parent.getBoundingClientRect();
        const parentStyle = getComputedStyle(parent);
        const clips =
          parentStyle.overflowX === "hidden" ||
          parentStyle.overflowX === "clip" ||
          parentStyle.overflow === "hidden";

        if (!clips && parentRect.width > 0 && rect.width - parentRect.width > 1) {
          exceeds.push({
            el: describe(element),
            child: Math.round(rect.width),
            parent: `${describe(parent)} ${Math.round(parentRect.width)}`,
          });
        }
      }
    });

    for (let i = 0; i < textElements.length; i += 1) {
      for (let j = i + 1; j < textElements.length; j += 1) {
        const a = textElements[i];
        const b = textElements[j];
        if (a.element.contains(b.element) || b.element.contains(a.element)) continue;

        const width =
          Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
        const height =
          Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);

        if (width > 2 && height > 2) {
          overlaps.push({
            a: `${a.label} :: ${text(a.element)}`,
            b: `${b.label} :: ${text(b.element)}`,
            w: Math.round(width),
            h: Math.round(height),
          });
        }
      }
    }

    if (doc.scrollWidth > doc.clientWidth) {
      findings.push({
        kind: "overflow",
        detail: `document ${doc.scrollWidth}px > viewport ${doc.clientWidth}px`,
      });
    }
    bleed.slice(0, 5).forEach((item) => findings.push({ kind: "bleed", ...item }));
    clipped.slice(0, 5).forEach((item) => findings.push({ kind: "clipped", ...item }));
    exceeds.slice(0, 5).forEach((item) => findings.push({ kind: "exceeds", ...item }));
    overlaps.slice(0, 5).forEach((item) => findings.push({ kind: "overlap", ...item }));

    return findings;
  }, options.scope ?? null);
}

/** Rendu lisible d'un constat, utilisé dans les messages d'assertion. */
export function describeFinding(finding: LayoutFinding): string {
  switch (finding.kind) {
    case "overflow":
      return `débordement du document : ${finding.detail}`;
    case "bleed":
      return `hors viewport (${finding.over}px) : ${finding.el} « ${finding.text} »`;
    case "clipped":
      return `texte rogné (${finding.size}) : ${finding.el} « ${finding.text} »`;
    case "overlap":
      return `chevauchement ${finding.w}×${finding.h}px : ${finding.a} / ${finding.b}`;
    case "exceeds":
      return `enfant ${finding.child}px plus large que ${finding.parent} : ${finding.el}`;
  }
}
