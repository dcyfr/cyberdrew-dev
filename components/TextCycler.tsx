"use client";

import { useEffect, useState } from "react";

/**
 * Streams each phrase in the way a model emits one: in ragged token-sized
 * chunks rather than a fixed per-character tick, with a block caret that is
 * present only while generating and gone at rest. That "only while working"
 * detail is what separates the LLM read from a retro typewriter, which the
 * identity doc explicitly warns against.
 *
 * Accessibility: the animated span is aria-hidden and the full phrase set is
 * exposed once in a visually-hidden sibling, so assistive tech reads one
 * stable string instead of text that rewrites itself every few seconds.
 * Under prefers-reduced-motion nothing runs and items[0] stands.
 */
export function TextCycler({
  items,
  label,
  holdMs = 2400,
}: {
  items: readonly string[];
  label?: string;
  holdMs?: number;
}) {
  const [text, setText] = useState(items[0]);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      let i = 0;
      await wait(holdMs);
      while (!cancelled) {
        i = (i + 1) % items.length;
        const next = items[i];

        setStreaming(true);
        setText("");

        let n = 0;
        while (n < next.length && !cancelled) {
          // 1-3 chars per emit: uneven chunking is what reads as tokens
          n = Math.min(next.length, n + 1 + Math.floor(Math.random() * 3));
          setText(next.slice(0, n));
          await wait(24 + Math.random() * 36);
        }
        if (cancelled) return;

        setStreaming(false);
        await wait(holdMs);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [items, holdMs]);

  return (
    <>
      <span aria-hidden="true">
        {text}
        {streaming ? <i className="caret" /> : null}
      </span>
      <span className="sr-only">{label ?? items[0]}</span>
    </>
  );
}
