import React from 'react';

type FadeSlideInProps = React.HTMLAttributes<HTMLDivElement> & {
  delayMs?: number;
  /**
   * Vertical slide intensity. 1 = small, 2 = larger offset
   */
  intensity?: 1 | 2;
  /**
   * Animation duration in ms
   */
  durationMs?: number;
};

export function FadeSlideIn({
  children,
  className = '',
  delayMs = 0,
  intensity = 1,
  durationMs = 300,
  style,
  ...rest
}: FadeSlideInProps) {
  const [mounted, setMounted] = React.useState(false);

  // Determine user preference for reduced motion once on mount
  const prefersReduced = React.useMemo(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  React.useEffect(() => {
    // Ensure we toggle visibility in the next frame to avoid initial flicker
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Translate distance based on intensity
  const offset = intensity === 2 ? 24 : 12; // px

  // When reduced motion is preferred, show content immediately without animation
  const initialOpacity = prefersReduced ? 1 : 0;
  const initialTransform = prefersReduced ? 'none' : `translate3d(0, ${offset}px, 0)`;
  const finalOpacity = 1;
  const finalTransform = 'translate3d(0, 0, 0)';

  const transition = prefersReduced
    ? undefined
    : `opacity ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`;

  return (
    <div
      className={className}
      style={{
        willChange: prefersReduced ? undefined : 'opacity, transform',
        opacity: mounted ? finalOpacity : initialOpacity,
        transform: mounted ? finalTransform : initialTransform,
        transition,
        backfaceVisibility: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
