"use client";

import { useEffect, useRef } from "react";

/**
 * The corona, as a fragment shader.
 *
 * WHY THIS EXISTS AT ALL, given the note in Eclipse.tsx
 * -----------------------------------------------------
 * That component's whole boast is "no asset, no canvas, no shader and no
 * JavaScript", and it earned it: the thing it replaced was a bitmap under a
 * WebGL warp with a particle canvas over it, and deleting that stack made the
 * section faster, smaller and identical with scripting off.
 *
 * Nothing here takes that back. The CSS eclipse is still the whole picture —
 * the occluder, the limb, the atmosphere, the spill and the grain are all
 * still painted by gradients on empty divs, and all of it renders when this
 * file never runs. What this adds is the one thing a box-shadow genuinely
 * cannot do: the streamers. A real corona is not a smooth halo, it is
 * filaments following field lines out of the limb, and they move. Below, that
 * is 40 lines of GLSL over a fullscreen triangle. As a stack of animated
 * gradients it would be neither cheap nor convincing.
 *
 * WHY NOT THREE.JS. This draws two triangles' worth of geometry and owns no
 * scene, no camera, no lights, no materials and no loader. Three would be
 * ~150KB gzipped to hand us a `RawShaderMaterial` on a `PlaneGeometry`, on a
 * page that ships no runtime dependencies for its own artwork today. Raw WebGL2
 * is ~4KB of source and no dependency at all.
 *
 * PROGRESSIVE, IN THE STRICT SENSE. The canvas mounts hidden and only fades in
 * once a first frame has actually been drawn, so every path that fails —
 * no WebGL2, blocked context, shader compile error, lost context, reduced
 * motion, a phone that reports too few cores — leaves the page exactly as the
 * CSS renders it, with nothing to clean up and no layout reflow.
 *
 * COST CONTROL, because this is a decorative loop and the site argues against
 * exactly that kind of thing everywhere else:
 *   - never starts under prefers-reduced-motion
 *   - runs only while on screen (IntersectionObserver) and only while the tab
 *     is visible
 *   - renders at a fraction of device resolution and lets the compositor
 *     upscale — a corona is all low-frequency gradient, so this is invisible
 *     and it is most of the win on a phone
 *   - one buffer, one program, no per-frame allocation, no readback
 */

/**
 * Render scale by class of device. The shader is fill-rate bound and outputs
 * nothing but smooth gradients, so resolution buys almost no fidelity here.
 * Phones get the smallest buffer AND a cheaper streamer count.
 */
const SCALE_DESKTOP = 0.62;
const SCALE_MOBILE = 0.42;
/**
 * Hard ceiling on the backing store, so a 5K display cannot ask for 5K of it.
 * Measured at 1600: a 1440x900 window at 2x came out to 1600x875, or 1.4
 * megapixels a frame for a layer made entirely of smooth falloff. 1280 costs
 * ~36% of that and there is nothing in the output fine enough to show it.
 */
const MAX_DIM = 1280;
/**
 * The corona drifts at 0.021 — about one full turn of the noise field every
 * five minutes. Sampling that 60 times a second is spending GPU on frames that
 * are, by construction, indistinguishable from their neighbours. 30 halves the
 * cost of a decorative layer with no visible change to a motion this slow.
 */
const FRAME_MS = 1000 / 30;

const VERT = `#version 300 es
// A single oversized triangle rather than a quad: no index buffer, no shared
// edge for the rasteriser to touch twice, three vertices instead of six.
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 uv;
void main() {
  vec2 p = P[gl_VertexID];
  uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

in vec2 uv;
out vec4 frag;

uniform vec2  uRes;      // canvas size in px
uniform float uTime;     // seconds
uniform vec2  uCentre;   // disc centre, in uv space
uniform float uRadius;   // disc radius, as a fraction of the SHORT axis
uniform float uBearing;  // radians; where the light sits
uniform vec3  uWarm;
uniform vec3  uCool;
uniform float uPolarity; // +1 dark ground (add light), -1 paper (subtract)
uniform float uStreamers;

// Cheap value noise. Two octaves is enough: the streamer field is masked to a
// narrow annulus and anything finer is lost to the falloff.
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

void main() {
  // Work in a square space anchored on the SHORT axis, so the corona stays
  // circular whether the section is a 2.4:1 letterbox or a 4:3 block.
  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - uCentre) * vec2(aspect, 1.0);
  float r = length(p) / uRadius;          // 1.0 == the disc's own edge
  float a = atan(p.y, p.x);

  // Nothing inside the occluder: the CSS disc is painted over this, and
  // drawing under it is fill rate spent on invisible pixels.
  if (r < 0.985) { frag = vec4(0.0); return; }

  // ---- streamers ---------------------------------------------------------
  // Filaments along field lines: noise sampled in POLAR space, so it stretches
  // radially instead of tiling. Two layers counter-rotating very slowly, which
  // is what stops the corona reading as a static texture without ever showing
  // a direction of travel.
  float t = uTime * 0.021;
  float s1 = noise(vec2(a * uStreamers, r * 1.6 - t));
  float s2 = noise(vec2(a * uStreamers * 0.53 + 11.0, r * 1.1 + t * 0.7));
  float streak = pow(max(s1 * 0.65 + s2 * 0.55, 0.0), 2.6);

  // ---- falloff -----------------------------------------------------------
  // Steep just past the limb, long into the field. exp is the honest shape and
  // it is also what keeps the outer half of the canvas nearly transparent, so
  // the page ground shows through rather than being tinted.
  float near = exp(-(r - 1.0) * 6.5);
  float far  = exp(-(r - 1.0) * 1.35);
  float body = near * 0.55 + far * 0.45;

  // ---- the light has a position ------------------------------------------
  // Same bearing the CSS limb uses, so the shader's brightest streamers sit
  // where the painted limb is hottest. Never zero on the far side, for the
  // same reason --ecl-limb-dim is not zero.
  float lit = 0.30 + 0.70 * pow(max(cos(a - uBearing) * 0.5 + 0.5, 0.0), 1.5);

  float amp = body * lit * (0.30 + 0.70 * streak);

  // Warm at the limb, cooling outward: the temperature ramp the whole page
  // runs, in the one place with room to actually show it.
  vec3 col = mix(uWarm, uCool, clamp((r - 1.0) * 0.55, 0.0, 1.0));

  // On paper the corona cannot be brighter than the ground, so it becomes the
  // shadow the object casts instead. Same field, opposite sign.
  if (uPolarity < 0.0) col = vec3(0.10, 0.09, 0.08);

  float alpha = clamp(amp * 0.42, 0.0, 1.0);
  // Premultiplied: the canvas composites over the page ground, and
  // straight-alpha edges fringe against a near-black backdrop.
  frag = vec4(col * alpha, alpha);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** `rgb(1 2 3 / .4)` or `#abc` from a custom property → 0..1 triplet. */
function readRGB(styles: CSSStyleDeclaration, name: string, fallback: [number, number, number]) {
  const raw = styles.getPropertyValue(name).trim();
  const nums = raw.match(/[\d.]+/g);
  if (nums && nums.length >= 3 && !raw.startsWith("#")) {
    return [+nums[0] / 255, +nums[1] / 255, +nums[2] / 255] as [number, number, number];
  }
  const hex = raw.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255] as [number, number, number];
  }
  return fallback;
}

export function EclipseField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // The wrapper is what carries the bleed insets and therefore what the
    // buffer is sized against; the artwork is where the occluder lives, and
    // that is a SIBLING of the wrapper rather than a descendant.
    const host = canvas.parentElement;
    const art = canvas.closest<HTMLElement>(".eclipse-art");
    if (!host || !art) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A decorative loop is not worth a core on a two-core phone.
    if ((navigator.hardwareConcurrency || 8) < 4) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      // The default would have the browser keep a readback copy of every frame.
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(prog);

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      centre: gl.getUniformLocation(prog, "uCentre"),
      radius: gl.getUniformLocation(prog, "uRadius"),
      bearing: gl.getUniformLocation(prog, "uBearing"),
      warm: gl.getUniformLocation(prog, "uWarm"),
      cool: gl.getUniformLocation(prog, "uCool"),
      polarity: gl.getUniformLocation(prog, "uPolarity"),
      streamers: gl.getUniformLocation(prog, "uStreamers"),
    };

    gl.enable(gl.BLEND);
    // Premultiplied source: the shader already multiplied colour by alpha.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const mobile = window.matchMedia("(max-width: 47.99rem)").matches;
    const scale = mobile ? SCALE_MOBILE : SCALE_DESKTOP;

    let raf = 0;
    let running = false;
    let started = 0;
    let painted = false;

    /** Theme-dependent uniforms, re-read rather than restarted on a swap. */
    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      const warm = readRGB(cs, "--ecl-limb-mid", [1, 0.77, 0.57]);
      const cool = readRGB(cs, "--ecl-limb-cool", [0.58, 0.7, 1]);
      // --plate-invert is gone with the plate; polarity follows the page's own
      // ground instead. Bone ground -> the corona is a shadow.
      const bg = readRGB(cs, "--bg", [0.04, 0.04, 0.05]);
      const light = bg[0] + bg[1] + bg[2] > 1.5;
      gl.useProgram(prog);
      gl.uniform3f(u.warm, warm[0], warm[1], warm[2]);
      gl.uniform3f(u.cool, cool[0], cool[1], cool[2]);
      gl.uniform1f(u.polarity, light ? -1 : 1);

      const bearingRaw = cs.getPropertyValue("--ecl-bearing").trim();
      // CSS bearing is a compass angle: 0deg at twelve o'clock, clockwise.
      // atan2 in the shader is 0 at three o'clock, counter-clockwise.
      const deg = parseFloat(bearingRaw) || 315;
      gl.uniform1f(u.bearing, ((90 - deg) * Math.PI) / 180);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      let w = Math.round(rect.width * dpr * scale);
      let h = Math.round(rect.height * dpr * scale);
      const over = Math.max(w, h) / MAX_DIM;
      if (over > 1) {
        w = Math.round(w / over);
        h = Math.round(h / over);
      }
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.useProgram(prog);
        gl.uniform2f(u.res, w, h);
      }

      // The disc is a CSS element; its geometry is the source of truth, and
      // reading it is what keeps the shader's centre welded to the painted
      // occluder through every breakpoint and clamp() the layout runs.
      const disc = art.querySelector<HTMLElement>(".eclipse-disc");
      if (disc) {
        const d = disc.getBoundingClientRect();
        gl.uniform2f(
          u.centre,
          (d.left + d.width / 2 - rect.left) / rect.width,
          1 - (d.top + d.height / 2 - rect.top) / rect.height,
        );
        // Radius is measured against the short axis, matching the shader.
        gl.uniform1f(u.radius, d.width / 2 / rect.height);
      }
      gl.uniform1f(u.streamers, mobile ? 9 : 15);
      return true;
    };

    let lastFrame = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      // Throttle to FRAME_MS. Still driven by rAF rather than a timer, so the
      // browser keeps its own throttling on a background tab and the loop
      // never runs while the compositor is not asking for frames.
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      if (!started) started = now;
      gl.useProgram(prog);
      gl.uniform1f(u.time, (now - started) / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!painted) {
        painted = true;
        // Only now is there something to show. Until this line the canvas is
        // transparent, so a failure anywhere above is invisible.
        canvas.dataset.ready = "";
      }
    };

    const start = () => {
      if (running) return;
      if (!resize()) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    readTheme();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (host.getBoundingClientRect().bottom > 0) start();
    };
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    scheme.addEventListener("change", readTheme);

    // A lost context is not an error worth surfacing — preventDefault stops the
    // browser's default teardown, and without a restore handler the canvas just
    // stays on its last frame under the CSS artwork.
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      scheme.removeEventListener("change", readTheme);
      canvas.removeEventListener("webglcontextlost", onLost);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    // See the note on .eclipse-canvas-wrap: a <canvas> is a replaced element,
    // so it cannot be stretched to an inset box by `width: auto`. The wrapper
    // takes the bleed; the canvas fills it.
    <span className="eclipse-canvas-wrap" aria-hidden="true">
      <canvas className="eclipse-canvas" ref={canvasRef} />
    </span>
  );
}
