/**
 * Pixel-truth contrast audit.
 *
 * WHY THIS EXISTS, AND WHY IT IS NOT AN AXE RUN
 * --------------------------------------------
 * Nearly every surface on this site is `backdrop-filter` glass. The effective
 * background behind a glyph is therefore THE BLURRED PAGE, not the panel's
 * declared fill — so compositing declared token values down the ancestor chain
 * (which is what a token-based checker does) produces a number with no
 * necessary relationship to what is on screen. It reports comfortable passes
 * for text that is genuinely hard to read, and it cannot see the plate at all.
 *
 * So this reads pixels. Per theme x viewport x scroll position:
 *
 *   1. Walk text nodes and take Range.getClientRects() — the exact glyph line
 *      boxes, not element bounds.
 *   2. Screenshot the viewport once with every glyph painted transparent.
 *      Backgrounds, glass, blur, blooms, dither and the plate all stay.
 *   3. Sample that text-free plate under each line box: the true composited
 *      background, and how much it varies across the box.
 *   4. Contrast the text's own computed colour against the 2nd and 98th
 *      PERCENTILE of that background, not its mean. A mean hides the bright
 *      streak a glyph actually sits on; an absolute min/max over-reports,
 *      because a line box can clip one pixel of a card's hairline ring.
 *
 * TRANSIENT vs AT REST
 * --------------------
 * `.top-fade` paints the ground over content as it slides under the floating
 * dock — content there is DESIGNED to wash out, and any text will pass through
 * that band at some scroll offset. Judging contrast mid-dissolve is like
 * judging it mid-fade-in. Those boxes are labelled and reported separately
 * rather than dropped, so the exclusion stays visible and arguable.
 *
 * Only AT-REST failures fail the build.
 *
 * Usage:
 *   node scripts/a11y-contrast.mjs                    # against localhost:3000
 *   AUDIT_URL=https://www.cyberdrew.dev/ node scripts/a11y-contrast.mjs
 *   AUDIT_JSON=report.json node scripts/a11y-contrast.mjs
 */
import { chromium } from "playwright";
import fs from "node:fs";

const URL_ = process.env.AUDIT_URL || "http://localhost:3000/";
const JSON_OUT = process.env.AUDIT_JSON || "";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];
const THEMES = ["dark", "light"];
const SCROLLS = [0, 0.18, 0.36, 0.54, 0.72, 0.9];

const srgb = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const hex = (c) =>
  "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const parseColor = (s) => {
  const m = s.match(/[\d.]+/g);
  return m ? [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]] : null;
};
/** WCAG 1.4.3: 3:1 at >=24px, or >=18.66px bold. 4.5:1 otherwise. */
const required = (px, weight) =>
  px >= 24 || (px >= 18.66 && Number(weight) >= 700) ? 3 : 4.5;

const HIDE_TEXT = `
  *, *::before, *::after {
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
    text-decoration-color: transparent !important;
    text-shadow: none !important;
  }
  svg { visibility: hidden !important; }
`;

/* -- in page: glyph line boxes, tagged with their position in the fade band -- */
const COLLECT = () => {
  const out = [];
  const seen = new Set();
  const fade = document.querySelector(".top-fade");
  const dock = document.querySelector(".header");
  const band = fade ? fade.getBoundingClientRect() : null;
  const dockRect = dock ? dock.getBoundingClientRect() : null;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const text = n.nodeValue.replace(/\s+/g, " ").trim();
    if (!text) continue;
    const el = n.parentElement;
    if (!el) continue;
    if (el.closest("[aria-hidden='true']") || el.closest(".sr-only")) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (parseFloat(cs.opacity) < 0.15) continue;
    if (cs.color === "rgba(0, 0, 0, 0)") continue;

    const range = document.createRange();
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) {
      if (r.width < 2 || r.height < 2) continue;
      if (r.bottom <= 0 || r.top >= innerHeight) continue;
      if (r.right <= 0 || r.left >= innerWidth) continue;
      const key = [Math.round(r.x), Math.round(r.y), Math.round(r.width), cs.color].join("|");
      if (seen.has(key)) continue;
      seen.add(key);

      // 0 = clear of the fade, 1 = fully inside its opaque end
      let bandDepth = 0;
      if (band && r.top < band.bottom && r.bottom > band.top) {
        const mid = (r.top + r.bottom) / 2;
        const t = Math.min(1, Math.max(0, (mid - band.top) / band.height));
        bandDepth = band.top === 0 ? 1 - t : t;
      }
      const underDock = !!(
        dockRect &&
        r.top < dockRect.bottom && r.bottom > dockRect.top &&
        r.left < dockRect.right && r.right > dockRect.left
      );

      const parts = [];
      let e = el;
      for (let i = 0; e && i < 3; i++, e = e.parentElement) {
        let p = e.tagName.toLowerCase();
        if (typeof e.className === "string" && e.className.trim())
          p += "." + e.className.trim().split(/\s+/).slice(0, 2).join(".");
        parts.unshift(p);
      }

      out.push({
        text: text.slice(0, 48),
        color: cs.color,
        fontSize: parseFloat(cs.fontSize),
        fontWeight: cs.fontWeight,
        sel: parts.join(" > "),
        vy: Math.round(r.top),
        bandDepth: +bandDepth.toFixed(2),
        underDock,
        x: Math.max(0, r.x),
        y: Math.max(0, r.y),
        w: Math.min(r.width, innerWidth - Math.max(0, r.x)),
        h: Math.min(r.height, innerHeight - Math.max(0, r.y)),
      });
    }
  }
  return out;
};

/* -- on about:blank: decode the screenshot and sample under each box -------- */
/* A separate page because the site's CSP blocks data: URIs. */
const SAMPLE = async ([b64, boxes]) => {
  const blob = await (await fetch("data:image/png;base64," + b64)).blob();
  const img = await createImageBitmap(blob);
  const cv = new OffscreenCanvas(img.width, img.height);
  const cx = cv.getContext("2d", { willReadFrequently: true });
  cx.drawImage(img, 0, 0);
  const d = cx.getImageData(0, 0, img.width, img.height).data;
  const W = img.width;
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return boxes.map((b) => {
    const x0 = Math.round(b.x), y0 = Math.round(b.y);
    const x1 = Math.min(W, Math.round(b.x + b.w));
    const y1 = Math.min(img.height, Math.round(b.y + b.h));
    const Ls = [];
    let sr = 0, sg = 0, sb = 0, c = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 4;
        sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; c++;
        Ls.push(0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]));
      }
    }
    if (!c) return null;
    Ls.sort((p, q) => p - q);
    const at = (f) => Ls[Math.min(Ls.length - 1, Math.max(0, Math.floor(f * (Ls.length - 1))))];
    return { mean: [sr / c, sg / c, sb / c], p2: at(0.02), p98: at(0.98), count: c };
  });
};

const run = async () => {
  const browser = await chromium.launch();
  const decoder = await browser.newPage();
  await decoder.goto("about:blank");

  const atRest = [];
  const transient = [];
  let samples = 0;

  for (const theme of THEMES) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
        colorScheme: theme,
      });
      const page = await ctx.newPage();
      await page.goto(URL_, { waitUntil: "networkidle" });
      await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
      await page.waitForTimeout(450);
      const docH = await page.evaluate(() => document.body.scrollHeight);

      for (const frac of SCROLLS) {
        await page.evaluate(
          (y) => window.scrollTo(0, y),
          Math.max(0, Math.round((docH - vp.height) * frac)),
        );
        await page.waitForTimeout(280);

        const boxes = await page.evaluate(COLLECT);
        if (!boxes.length) continue;

        const style = await page.addStyleTag({ content: HIDE_TEXT });
        await page.waitForTimeout(130);
        const buf = await page.screenshot({ type: "png" });
        await style.evaluate((n) => n.remove());

        const got = await decoder.evaluate(SAMPLE, [buf.toString("base64"), boxes]);

        boxes.forEach((b, i) => {
          const s = got[i];
          if (!s || s.count < 4) return;
          const fg = parseColor(b.color);
          if (!fg) return;
          samples++;

          const comp = fg[3] >= 1
            ? fg.slice(0, 3)
            : [0, 1, 2].map((k) => fg[k] * fg[3] + s.mean[k] * (1 - fg[3]));
          const lf = lum(...comp);
          const r = Math.min(ratio(lf, s.p2), ratio(lf, s.p98));
          const need = required(b.fontSize, b.fontWeight);
          if (r >= need) return;

          const rec = {
            theme, viewport: vp.name, scroll: frac,
            sel: b.sel, text: b.text,
            fg: hex(comp), bg: hex(s.mean),
            fontSize: b.fontSize, fontWeight: b.fontWeight,
            need, ratio: +r.toFixed(2),
            vy: b.vy, bandDepth: b.bandDepth, underDock: b.underDock,
          };
          // Mid-dissolve under the dock is a scroll state, not a resting one.
          if (b.underDock || b.bandDepth >= 0.5) transient.push(rec);
          else atRest.push(rec);
        });
      }
      await ctx.close();
    }
  }
  await browser.close();

  const uniq = (list) => {
    const m = new Map();
    for (const f of list) {
      const k = f.theme + "|" + f.sel;
      if (!m.has(k) || m.get(k).ratio > f.ratio) m.set(k, f);
    }
    return [...m.values()].sort((a, b) => a.ratio - b.ratio);
  };

  console.log(`\ncontrast audit — ${URL_}`);
  console.log(`${samples} text samples · ${THEMES.length} themes · ${VIEWPORTS.length} viewports · ${SCROLLS.length} scroll positions`);
  console.log(`${atRest.length} at rest · ${transient.length} transient (under dock / mid-dissolve)\n`);

  for (const f of uniq(atRest)) {
    console.log(
      `  FAIL  ${f.ratio.toFixed(2)}:1 (need ${f.need})  [${f.theme}/${f.viewport}]  ` +
      `${f.fg} on ${f.bg}  ${f.fontSize}px  ${f.sel}\n        "${f.text}"`,
    );
  }
  if (transient.length) {
    console.log(`  ${transient.length} transient, worst per selector:`);
    for (const f of uniq(transient))
      console.log(`    ${f.ratio.toFixed(2)}:1  [${f.theme}/${f.viewport}] y=${f.vy} ${f.sel}`);
  }

  if (JSON_OUT) {
    fs.writeFileSync(JSON_OUT, JSON.stringify({ url: URL_, samples, atRest, transient }, null, 2));
    console.log(`\n  report -> ${JSON_OUT}`);
  }

  if (atRest.length) {
    console.log(`\n✗ ${atRest.length} at-rest contrast failures\n`);
    process.exit(1);
  }
  console.log(`\n✓ no at-rest contrast failures\n`);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
