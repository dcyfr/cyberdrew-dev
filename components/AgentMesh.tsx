"use client";

import { useEffect, useRef } from "react";

// Ambient "agent-mesh" — sparse drifting nodes + proximity links.
// Fixed full-viewport canvas behind everything. Pauses when hidden or when
// the visitor prefers reduced motion.
export default function AgentMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      canvas.style.display = "none";
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let running = true;
    let raf = 0;

    const accentRGB = (): [number, number, number] => {
      const t = document.documentElement.getAttribute("data-theme");
      const dark = t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      return dark ? [76, 227, 255] : [7, 132, 160];
    };

    const resize = () => {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    const seed = () => {
      const n = Math.max(14, Math.min(30, Math.floor(window.innerWidth / 46)));
      nodes = [];
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.14 * dpr,
          vy: (Math.random() - 0.5) * 0.14 * dpr,
          r: (Math.random() * 1.4 + 0.6) * dpr,
        });
      }
    };

    const frame = () => {
      if (!running) return;
      const c = accentRGB();
      const maxd = 150 * dpr;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxd) {
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.1 * (1 - dist / maxd)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.5)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    seed();
    raf = requestAnimationFrame(frame);

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        resize();
        seed();
      }, 180);
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="mesh" ref={ref} aria-hidden="true" />;
}
