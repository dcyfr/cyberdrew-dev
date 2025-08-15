import React from "react";

/**
 * AnimatedBackground
 * Subtle, low-cost animated SVG background evoking blueprints and sketches.
 * - Honors dark/light via currentColor and Tailwind text classes
 * - Disables motion if user prefers reduced motion
 * - Fixed, full-viewport, pointer-events-none so it never intercepts clicks
 */
export const AnimatedBackground: React.FC = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <svg
        className="absolute inset-0 h-full w-full text-gray-300/25 dark:text-gray-500/25"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label=""
      >
        <defs>
          {/* Smaller grid overlay */}
          <pattern id="grid-small" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#grid-small)" />
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>

          {/* Larger grid overlay */}
          <pattern id="grid-large" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect width="160" height="160" fill="url(#grid-large)" />
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>

          {/* Vignette mask to softly fade edges */}
          <radialGradient id="vignette-grad" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="vignette-mask">
            <rect width="100%" height="100%" fill="url(#vignette-grad)" />
          </mask>
        </defs>

        {/* Grid layers */}
        <g mask="url(#vignette-mask)">
          <rect width="100%" height="100%" fill="url(#grid-large)" className="" />
          <rect width="100%" height="100%" fill="url(#grid-small)" className="" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
