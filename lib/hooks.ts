"use client";

import { useEffect, useState } from "react";

export const pad = (n: number) => (n < 10 ? "0" : "") + n;

// Wall-clock "HH:MM". Renders "--:--" until mounted so SSR and client agree.
export function useClock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// Session uptime "HH:MM:SS" since mount.
export function useUptime() {
  const [t, setT] = useState("00:00:00");
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const s = Math.floor((Date.now() - start) / 1000);
      setT(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}
