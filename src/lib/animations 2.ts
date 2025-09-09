// Deprecated framer-motion helpers: kept as plain objects for backward-compat without importing the library.
// Prefer CSS-based animations (tailwindcss-animate) and the PageTransition component.

export const PAGE_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.3,
} as const;

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
} as const;

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
} as const;

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
} as const;
