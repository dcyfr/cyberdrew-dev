import React from 'react';

type FadeSlideInProps = React.HTMLAttributes<HTMLDivElement> & {
  delayMs?: number;
  intensity?: 1 | 2; // slide distance
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
  const slideClass = intensity === 2 ? 'slide-in-from-bottom-2' : 'slide-in-from-bottom-1';
  // Map to valid Tailwind duration tokens to ensure generated class exists
  const allowedDurations = [100, 150, 200, 300, 500, 700, 1000] as const;
  const nearest = allowedDurations.reduce((prev, curr) =>
    Math.abs(curr - durationMs) < Math.abs(prev - durationMs) ? curr : prev
  , allowedDurations[0]);
  const durationClass = `duration-${nearest}`;
  return (
    <div
      className={`animate-in fade-in-50 ${slideClass} ${durationClass} ${className}`}
      style={{ animationDelay: delayMs ? `${delayMs}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
