import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const path = process.env.P ?? "/a-propos";
const widths = process.env.WIDTHS
  ? process.env.WIDTHS.split(",").map((w) => Number.parseInt(w.trim(), 10))
  : [320, 360, 390, 414, 768, 1024, 1280, 1440];

const browser = await chromium.launch();
const report = [];

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.addStyleTag({ content: "*{transition:none!important;animation:none!important}" });
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  });
  await page.waitForTimeout(150);

  const row = await page.evaluate(() => {
    const offenders = [];
    const describe = (el) => {
      const id = el.id ? `#${el.id}` : "";
      const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 4).join(".") : "";
      return `${el.tagName.toLowerCase()}${id}${cls ? "." + cls : ""} :: ${el.textContent.trim().slice(0, 28)}`;
    };
    document.querySelectorAll("body *").forEach((el) => {
      if (el.closest("[aria-hidden='true']")) return;
      if (el.scrollWidth - el.clientWidth > 1 && el.clientWidth > 0) {
        offenders.push({ kind: "x-overflow", el: describe(el), sw: el.scrollWidth, cw: el.clientWidth });
      }
      const s = getComputedStyle(el);
      if (
        (s.overflow === "hidden" || s.overflowY === "hidden") &&
        el.scrollHeight - el.clientHeight > 1 &&
        !el.className.toString().includes("sr-only")
      ) {
        offenders.push({ kind: "y-clipped", el: describe(el), sh: el.scrollHeight, ch: el.clientHeight });
      }
    });
    return {
      viewport: window.innerWidth,
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      h: document.documentElement.scrollHeight,
      offenders: offenders.slice(0, 12),
    };
  });

  report.push(row);

  if (width === 390) {
    const menu = await page.evaluate(() => {
      const btn = document.querySelector("header button");
      return btn ? btn.getAttribute("aria-label") : null;
    });
    await page.evaluate(() => {
      const btn = document.querySelector("header button");
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    const menuRow = await page.evaluate(() => {
      const opened = document.querySelector("[role='dialog'], [data-state='open'], header + div, nav[aria-label]");
      return {
        trigger: true,
        dialogText: opened ? opened.textContent.trim().slice(0, 80) : null,
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      };
    });
    report.push({ menuCheck: { ...menuRow, buttonLabel: menu } });
  }

  await context.close();
}

console.log(JSON.stringify(report, null, 2));
await browser.close();
