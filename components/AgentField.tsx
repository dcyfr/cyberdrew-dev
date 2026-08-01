"use client";

import { useEffect, useRef } from "react";

/**
 * The static plate is the render; this is the same idea in motion.
 *
 * The generated artwork supplies what canvas is expensive at — the dither
 * grain, the depth, the soft mass at the centre — and stays visible
 * underneath. The canvas supplies what a still cannot: the swarm working
 * inside its ring, and noticing you.
 *
 * Agents are organised into clusters rather than scattered individually. A
 * field of independent dots drifting at slightly different speeds reads as
 * texture, not as a fleet; a cluster that holds together, links to itself, and
 * brightens as it works reads as a group of daemons doing something. It is
 * also what makes the links affordable: membership is fixed at init, so the
 * link set is a flat list of pairs rather than an O(n^2) neighbour search on
 * every frame.
 *
 * Three things move at once, on different clocks, so the field never settles
 * into a visible period:
 *   - the whole cluster orbits, faster nearer the centre
 *   - its activity breathes, driving both dot brightness and link alpha
 *   - occasionally it fires, briefly, well above its resting brightness
 *
 * Activity phase is seeded off the cluster's angle, so the breathing travels
 * around the ring as a wave rather than blinking at random. That is the loop,
 * drawn.
 *
 * Geometry is normalised to the plate so the drawn ring lands on the rendered
 * one: the container is pinned to the asset's 1536x640 aspect, the image is
 * `object-fit: cover` at that same ratio (so no crop), and the ring radius is
 * measured off the render.
 *
 * It draws nothing at all under prefers-reduced-motion, and stops entirely
 * when scrolled out of view or when the tab is hidden. A decorative loop that
 * keeps a core busy behind a background tab is exactly the kind of thing this
 * site argues against everywhere else.
 */

/** Measured off the render: the ring's radius as a fraction of plate height. */
const RING_R = 0.465;
/** Clusters per megapixel of backing store, so density reads the same at any size. */
const CLUSTER_DENSITY = 26;
const MAX_CLUSTERS = 34;
const MIN_CLUSTERS = 10;
/** Cursor influence, as a fraction of plate height. */
const REACH = 0.34;

type Agent = {
  /** Offset from the cluster centre, in radians and in ring fractions. */
  dAngle: number;
  dRadius: number;
  size: number;
  /** Per-agent scintillation, so members are not one solid blob. */
  twinkle: number;
  twinklePhase: number;
};

type Cluster = {
  angle: number;
  radius: number;
  speed: number;
  /** Activity oscillation. Rate varies so clusters never sync up. */
  actPhase: number;
  actRate: number;
  /** Firing: rare, brief, and much brighter than the resting state. */
  firedAt: number;
  fireEvery: number;
  agents: Agent[];
  /** Index pairs into `agents`, fixed at init. */
  links: [number, number][];
};

/** Deterministic PRNG: the same field every load, so it is art-directed rather than rolled. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeClusters(count: number, rand: () => number): Cluster[] {
  return Array.from({ length: count }, () => {
    const angle = rand() * Math.PI * 2;
    // Held to the outer annulus. The render's own mass owns the centre, and
    // drawing over it muddies detail the model spent its resolution on; out
    // here the live layer orbits that mass instead of competing with it.
    const radius = Math.sqrt(0.24 + rand() * 0.76) * 0.95;
    const size = 4 + Math.floor(rand() * 5);

    const agents: Agent[] = Array.from({ length: size }, () => ({
      // Angular spread scales inversely with radius so clusters keep a similar
      // apparent size whether they sit near the ring or well inside it.
      dAngle: ((rand() - 0.5) * 0.26) / Math.max(radius, 0.3),
      dRadius: (rand() - 0.5) * 0.12,
      size: 0.7 + rand() * 1.5,
      twinkle: 0.1 + rand() * 0.22,
      twinklePhase: rand() * Math.PI * 2,
    }));

    // A chain through the members plus one closing strand. Enough to read as a
    // connected group without becoming a solid mesh.
    const links: [number, number][] = [];
    for (let i = 0; i < agents.length - 1; i++) links.push([i, i + 1]);
    if (agents.length > 2) links.push([agents.length - 1, 0]);

    return {
      angle,
      radius,
      // Inner clusters come round faster, which reads as orbital rather than as
      // a texture being rotated wholesale.
      speed: ((0.026 + rand() * 0.05) / (0.5 + radius)) * (rand() < 0.5 ? -1 : 1),
      // Seeded off angle so activity travels round the ring as a wave.
      actPhase: angle * 1.6 + rand() * 0.9,
      actRate: 0.32 + rand() * 0.42,
      firedAt: -rand() * 14,
      fireEvery: 9 + rand() * 13,
      agents,
      links,
    };
  });
}

export function AgentField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motionOK.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let clusters: Cluster[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let last = 0;
    let t = 0;
    // Cursor in CSS pixels, or null when the pointer is not over the plate.
    let px: number | null = null;
    let py: number | null = null;
    // Eased so the reaction arrives with the cursor rather than snapping to it.
    let influence = 0;

    // Read the palette from the stylesheet instead of hardcoding it, so the
    // canvas follows the theme toggle like everything else does. In light this
    // resolves to obsidian, which is correct now that the plate inverts.
    let ink = "#edece8";
    const readInk = () => {
      const v = getComputedStyle(wrap).getPropertyValue("--ink").trim();
      if (v) ink = v;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(
        MIN_CLUSTERS,
        Math.min(MAX_CLUSTERS, Math.round(((w * h) / 1_000_000) * CLUSTER_DENSITY * 4)),
      );
      if (clusters.length !== target) clusters = makeClusters(target, mulberry32(0x5eed));
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      // Seconds since the last frame, clamped so a backgrounded tab returning
      // does not jump the swarm across the plate in one step.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const cx = w / 2;
      const cy = h / 2;
      const ring = h * RING_R;
      const reach = h * REACH;

      influence += ((px === null ? 0 : 1) - influence) * Math.min(dt * 4, 1);
      ctx.clearRect(0, 0, w, h);

      for (const c of clusters) {
        c.angle += c.speed * dt;

        // Resting brightness breathes; firing spikes it briefly. The spike
        // decays over ~1.1s: long enough to notice, short enough that several
        // can overlap without the field washing out.
        const breathe = 0.5 + 0.5 * Math.sin(t * c.actRate + c.actPhase);
        if (t - c.firedAt > c.fireEvery) c.firedAt = t;
        const since = t - c.firedAt;
        const fire = since < 1.1 ? (1 - since / 1.1) ** 2 : 0;
        const act = Math.min(breathe * 0.55 + fire * 0.95, 1);

        const xs: number[] = [];
        const ys: number[] = [];
        for (const a of c.agents) {
          const r = (c.radius + a.dRadius) * ring;
          const ang = c.angle + a.dAngle;
          xs.push(cx + Math.cos(ang) * r);
          ys.push(cy + Math.sin(ang) * r);
        }

        // Cursor proximity, measured once per cluster from its centre. Per
        // agent would be more precise and is not worth the arithmetic.
        let near = 0;
        if (influence > 0.01 && px !== null && py !== null) {
          const d = Math.hypot(
            cx + Math.cos(c.angle) * c.radius * ring - px,
            cy + Math.sin(c.angle) * c.radius * ring - py,
          );
          if (d < reach) near = (1 - d / reach) * influence;
        }

        // Internal filaments first, so the dots sit on top of them.
        ctx.strokeStyle = ink;
        ctx.lineWidth = 0.55;
        ctx.globalAlpha = Math.min(0.05 + act * 0.2 + near * 0.42, 0.72);
        if (ctx.globalAlpha > 0.012) {
          ctx.beginPath();
          for (const [i, j] of c.links) {
            ctx.moveTo(xs[i], ys[i]);
            ctx.lineTo(xs[j], ys[j]);
          }
          ctx.stroke();
        }

        ctx.fillStyle = ink;
        for (let i = 0; i < c.agents.length; i++) {
          const a = c.agents[i];
          const tw = 0.5 + 0.5 * Math.sin(t * 1.7 + a.twinklePhase);
          const alpha = Math.min(0.16 + act * 0.42 + tw * a.twinkle + near * 0.5, 1);
          const size = a.size * (1 + act * 0.28 + near * 0.6);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(xs[i], ys[i], size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    };

    readInk();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Only run while the plate is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (wrap.getBoundingClientRect().bottom > 0) start();
    };
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
    };
    const onLeave = () => {
      px = null;
      py = null;
    };
    // The theme toggle swaps --ink; re-read rather than restart.
    const mo = new MutationObserver(readInk);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", onVisibility);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="field-canvas-wrap" ref={wrapRef}>
      {/* Decorative: the alt on the plate underneath already describes it. */}
      <canvas className="field-canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
