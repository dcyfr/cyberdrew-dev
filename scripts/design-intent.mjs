/**
 * Design-intent assertions.
 *
 * WHY THIS EXISTS ALONGSIDE THE CONTRAST GATE
 * -------------------------------------------
 * scripts/a11y-contrast.mjs answers "is this legible?". It cannot answer "is
 * this what we meant?", and the two are not the same question. The bug that
 * prompted this file made the hero's second line BRIGHTER than intended — the
 * contrast gate saw an improvement and passed, while the deliberate two-tone
 * headline had silently collapsed to one tone for every visitor not running
 * reduced motion.
 *
 * There is a second blind spot this closes. The contrast gate runs every
 * context with `reducedMotion: "reduce"`, deliberately, so animation cannot
 * make measurements non-deterministic. The entire [data-glow] treatment only
 * exists under `prefers-reduced-motion: no-preference`, so the gate never
 * exercises it at all. These checks run in the DEFAULT motion state.
 *
 * What belongs here: invariants that are true by design, cheap to assert, and
 * that fail SILENTLY — no console error, no layout break, just a page quietly
 * not doing what it says. Every one of these has already broken once.
 *
 * Measurement note: where a check reads a painted pixel, it samples the exact
 * pixel and not a band around it. Averaging a 2px band across a 1px border
 * halves its apparent contrast — that artifact produced two false findings
 * during this work (a "1.25:1" button edge that was really 3.57:1, and a
 * "3.16:1" focus ring that was really 14.08:1). Sample precisely or not at all.
 *
 * Usage:
 *   node scripts/design-intent.mjs
 *   AUDIT_URL=https://www.cyberdrew.dev/ node scripts/design-intent.mjs
 */
import { chromium } from "playwright";

const URL_ = process.env.AUDIT_URL || "http://localhost:3000/";

const lin = (v) => {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const results = [];
const check = (name, pass, detail) => {
  results.push({ name, pass, detail });
  console.log(`  ${pass ? "ok  " : "FAIL"}  ${name.padEnd(42)} ${detail}`);
};

const run = async () => {
  const browser = await chromium.launch();

  for (const theme of ["dark", "light"]) {
    // NOTE: no reducedMotion override. That is the entire point of this file.
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      colorScheme: theme,
    });
    const page = await ctx.newPage();
    const resp = await page.goto(URL_, { waitUntil: "networkidle" });
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
    await page.waitForTimeout(700);

    console.log(`\n${theme}`);

    // Fail loudly on "this is not the site". A Vercel preview behind
    // deployment protection answers 302 to a login page, and every assertion
    // below then dies on a null querySelector with a TypeError that says
    // nothing about the actual problem. Check we are looking at the page.
    const landed = await page.evaluate(() =>
      !!document.querySelector(".header") && !!document.querySelector(".hero h1"));
    if (!landed) {
      const url = page.url();
      check("page under test actually loaded", false,
        `HTTP ${resp?.status() ?? "?"} · landed on ${url} · no .header/.hero found ` +
        `(deployment protection or a redirect?)`);
      await ctx.close();
      continue;
    }

    const dom = await page.evaluate(() => {
      const v = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      const h1 = document.querySelector(".hero h1");
      const spans = h1 ? [...h1.querySelectorAll("span")] : [];
      const line2 = spans[1] || null;

      // Nothing on this page may light TYPE. A gradient clipped to glyphs makes
      // the text's own colour a moving target for contrast, and it is how the
      // two-tone headline silently collapsed once before. Catch any element
      // that has gone back to painting itself.
      const clipped = [...document.querySelectorAll("h1, h1 span, h2, h3")].filter((e) => {
        const cs = getComputedStyle(e);
        return cs.backgroundClip === "text" || cs.webkitBackgroundClip === "text";
      });

      // The edges that carry the travelling light. ::after only exists inside
      // the hover + fine-pointer + no-reduced-motion gate, which is exactly the
      // state this script runs in.
      const edges = [...document.querySelectorAll("[data-rule-glow]")];
      const edgesLit = edges.filter(
        (e) => getComputedStyle(e, "::after").content !== "none",
      );

      return {
        ambient: getComputedStyle(document.body, "::before").backgroundImage,
        clippedCount: clipped.length,
        edgeCount: edges.length,
        edgesLit: edgesLit.length,
        headerBlur: getComputedStyle(document.querySelector(".header")).backdropFilter,
        line2Color: line2 ? getComputedStyle(line2).color : null,
        line1Color: spans[0] ? getComputedStyle(spans[0]).color : null,
        line2Text: line2 ? line2.textContent.trim().slice(0, 24) : null,
        inkMut: v("--ink-mut"),
        ink: v("--ink"),
        motionIsDefault: !matchMedia("(prefers-reduced-motion: reduce)").matches,
      };
    });

    check("running in default motion state", dom.motionIsDefault, `reduced-motion=${!dom.motionIsDefault}`);

    // 1. The ambient light layer renders at all.
    //    Shipped broken for months: a comma before `in oklab` made the browser
    //    discard the whole declaration, and the glass had nothing to refract.
    check("ambient light layer renders", !dom.ambient.startsWith("none"),
      dom.ambient.startsWith("none") ? "background-image: none" : dom.ambient.slice(0, 46) + "…");

    // 2. Glass is actually blurring. Lightning CSS has previously deduped the
    //    -webkit-/standard backdrop-filter pair down to a prefix Chrome no
    //    longer honours, silently killing the blur everywhere.
    check("header glass is blurring", dom.headerBlur !== "none" && !!dom.headerBlur,
      dom.headerBlur || "(none)");

    // 3. Nothing lights type. See the collector for why this is a rule.
    check("no text is clipped-gradient lit", dom.clippedCount === 0,
      dom.clippedCount === 0 ? "0 elements with background-clip:text" : `${dom.clippedCount} clipped`);

    //    And every edge that should carry a light actually generates one.
    check("every lit edge generates its light", dom.edgeCount > 0 && dom.edgesLit === dom.edgeCount,
      `${dom.edgesLit}/${dom.edgeCount} edges`);

    // 4. The hero's two-tone headline, asserted on the rendered colour rather
    //    than on any mechanism. It read as one tone in production for months
    //    while the mechanism looked correct, so the value is what gets checked.
    const toHex = (rgb) => {
      const m = (rgb || "").match(/[\d.]+/g);
      return m ? "#" + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, "0")).join("") : "(none)";
    };
    check("hero line 1 is full ink", toHex(dom.line1Color) === dom.ink.toLowerCase(),
      `${toHex(dom.line1Color)} vs --ink ${dom.ink}`);
    check("hero line 2 is the muted tier", toHex(dom.line2Color) === dom.inkMut.toLowerCase(),
      `${toHex(dom.line2Color)} vs --ink-mut ${dom.inkMut} · "${dom.line2Text}"`);

    // 5. Non-text contrast on the controls whose shape IS their affordance.
    //    Sampled one pixel at a time; see the note at the top of this file.
    for (const sel of [".btn-ghost", ".theme-toggle"]) {
      // Scroll, SETTLE, then measure. Reading getBoundingClientRect in the
      // same tick as scrollIntoView returns the pre-scroll rect, and every
      // pixel sampled afterwards is then taken from the wrong place. That
      // mistake produced a confident "1.00:1" for a control whose edge is
      // actually 3.57:1 — it only looked plausible because a failing number
      // is what the check was written to find.
      const found = await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return false;
        el.scrollIntoView({ block: "center" });
        return true;
      }, sel);
      if (!found) { check(`control edge ${sel}`, false, "element absent"); continue; }
      await page.waitForTimeout(500);
      const geo = await page.evaluate((s) => {
        const r = document.querySelector(s).getBoundingClientRect();
        return { cx: r.left + r.width / 2, top: r.top };
      }, sel);
      await page.waitForTimeout(150);
      const shot = await page.screenshot({ type: "png" });

      const decoder = await browser.newPage();
      await decoder.goto("about:blank");
      const sample = await decoder.evaluate(async ([b64, g]) => {
        const img = await createImageBitmap(await (await fetch("data:image/png;base64," + b64)).blob());
        const cv = new OffscreenCanvas(img.width, img.height);
        const cx = cv.getContext("2d", { willReadFrequently: true });
        cx.drawImage(img, 0, 0);
        const d = cx.getImageData(0, 0, img.width, img.height).data;
        const W = img.width;
        const px = (x, y) => { const i = (Math.round(y) * W + Math.round(x)) * 4; return [d[i], d[i+1], d[i+2]]; };
        const X = g.cx * 2, Y = g.top * 2;
        const rows = [];
        for (let dy = -4; dy <= 5; dy++) rows.push(px(X, Y + dy));
        return { rows, ground: px(X, Y - 14) };
      }, [shot.toString("base64"), geo]);
      await decoder.close();

      const gl = lum(...sample.ground);
      let best = { k: 0, px: sample.ground };
      for (const row of sample.rows) {
        const k = ratio(lum(...row), gl);
        if (k > best.k) best = { k, px: row };
      }
      check(`control edge ${sel} >= 3:1`, best.k >= 3,
        `${hex(best.px)} on ${hex(sample.ground)} = ${best.k.toFixed(2)}:1`);
    }

    await ctx.close();
  }

  await browser.close();

  const failed = results.filter((r) => !r.pass);
  console.log("");
  if (failed.length) {
    console.log(`✗ ${failed.length} design-intent assertion${failed.length > 1 ? "s" : ""} failed\n`);
    process.exit(1);
  }
  console.log(`✓ ${results.length} design-intent assertions hold\n`);
};

run().catch((e) => { console.error(e); process.exit(1); });
