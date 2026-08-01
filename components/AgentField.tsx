"use client";

import { useEffect, useRef } from "react";

/**
 * The static plate is the render; this is the same idea in motion.
 *
 * The generated artwork supplies what canvas is expensive at — the dither
 * grain, the depth, the soft mass at the centre — and stays visible
 * underneath. The canvas supplies what a still cannot: the swarm actually
 * moving inside its ring, and reacting to you.
 *
 * Geometry is normalised to the plate so the drawn ring lands on the rendered
 * one: the container is pinned to the asset's 1536x640 aspect, the image is
 * `object-fit: cover` at that same ratio (so no crop), and the ring is placed
 * at the centre with the radius measured off the render.
 *
 * It draws nothing at all under prefers-reduced-motion, and stops entirely
 * when scrolled out of view or when the tab is hidden. A decorative loop that
 * keeps a core busy behind a background tab is exactly the kind of thing this
 * site argues against everywhere else.
 */

/** Measured off the render: the ring's radius as a fraction of plate height. */
const RING_R = 0.465;
/** Agents per megapixel of backing store, so density reads the same at any size. */
const DENSITY = 190;
const MAX_AGENTS = 260;
/** Cursor influence, as a fraction of plate height. */
const REACH = 0.34;

type Agent = {
  /** Position on the ring's disc, in polar coords about the centre. */
  angle: number;
  radius: number;
  speed: number;
  /** Radial wobble, so the swarm breathes instead of running on rails. */
  wobble: number;
  wobblePhase: number;
  size: number;
  base: number;
};

function makeAgents(count: number, rand: () => number): Agent[] {
  return Array.from({ length: count }, () => ({
    angle: rand() * Math.PI * 2,
    // Held to the outer annulus rather than filling the disc. The render's own
    // mass occupies the centre, and drawing over it just muddied detail the
    // model spent its resolution on; out here the live layer orbits that mass
    // instead of competing with it. sqrt over the shifted range keeps the
    // annulus evenly covered rather than bunching at its inner edge.
    radius: Math.sqrt(0.2 + rand() * 0.8) * 0.96,
    // Inner agents come round faster, which reads as orbital rather than as a
    // texture being rotated wholesale.
    speed: (0.02 + rand() * 0.05) * (rand() < 0.5 ? -1 : 1),
    wobble: 0.004 + rand() * 0.016,
    wobblePhase: rand() * Math.PI * 2,
    size: 0.6 + rand() * 1.5,
    base: 0.25 + rand() * 0.45,
  }));
}

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

    let agents: Agent[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let last = 0;
    // Cursor in CSS pixels, or null when the pointer is not over the plate.
    let px: number | null = null;
    let py: number | null = null;
    // Eased so the reaction arrives with the cursor rather than snapping to it.
    let influence = 0;

    // Read the palette from the stylesheet instead of hardcoding it, so the
    // canvas follows the theme toggle like everything else does.
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

      const target = Math.min(MAX_AGENTS, Math.round((w * h) / 1_000_000 * DENSITY * 4));
      if (agents.length !== target) agents = makeAgents(target, mulberry32(0x5eed));
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      // Seconds since the last frame, clamped so a backgrounded tab returning
      // does not jump the swarm across the plate in one step.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const cx = w / 2;
      const cy = h / 2;
      const ring = h * RING_R;
      const reach = h * REACH;

      const wantInfluence = px === null ? 0 : 1;
      influence += (wantInfluence - influence) * Math.min(dt * 4, 1);

      ctx.clearRect(0, 0, w, h);

      // Positions first: links need to know where everyone ended up.
      const xs: number[] = [];
      const ys: number[] = [];
      for (const a of agents) {
        a.angle += a.speed * dt;
        a.wobblePhase += dt * 0.7;
        const r = (a.radius + Math.sin(a.wobblePhase) * a.wobble) * ring;
        xs.push(cx + Math.cos(a.angle) * r);
        ys.push(cy + Math.sin(a.angle) * r);
      }

      // Links, drawn only near the cursor. The whole graph at once is noise;
      // a local neighbourhood reads as the fleet noticing you.
      if (influence > 0.01 && px !== null && py !== null) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < agents.length; i++) {
          const di = Math.hypot(xs[i] - px, ys[i] - py);
          if (di > reach) continue;
          for (let j = i + 1; j < agents.length; j++) {
            const dj = Math.hypot(xs[j] - px, ys[j] - py);
            if (dj > reach) continue;
            const d = Math.hypot(xs[i] - xs[j], ys[i] - ys[j]);
            if (d > reach * 0.42) continue;
            const near = 1 - (di + dj) / (reach * 2);
            ctx.globalAlpha = influence * near * (1 - d / (reach * 0.42)) * 0.5;
            ctx.strokeStyle = ink;
            ctx.beginPath();
            ctx.moveTo(xs[i], ys[i]);
            ctx.lineTo(xs[j], ys[j]);
            ctx.stroke();
          }
        }
      }

      // Agents on top of their links.
      ctx.fillStyle = ink;
      for (let i = 0; i < agents.length; i++) {
        const a = agents[i];
        let alpha = a.base * 0.55;
        let size = a.size;
        if (influence > 0.01 && px !== null && py !== null) {
          const d = Math.hypot(xs[i] - px, ys[i] - py);
          if (d < reach) {
            const near = 1 - d / reach;
            alpha += near * influence * 0.5;
            size += near * influence * 1.1;
          }
        }
        ctx.globalAlpha = Math.min(alpha, 1);
        ctx.beginPath();
        ctx.arc(xs[i], ys[i], size, 0, Math.PI * 2);
        ctx.fill();
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
