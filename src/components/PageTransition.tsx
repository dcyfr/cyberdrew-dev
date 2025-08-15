import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  /**
   * Enable simple fade/slide animation on route change. Defaults to false to avoid double anims.
   */
  animated?: boolean;
}

export const PageTransition = ({ children, className = "", animated = true }: PageTransitionProps) => (
  <div className={animated ? `animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ${className}` : className}>
    {children}
  </div>
);