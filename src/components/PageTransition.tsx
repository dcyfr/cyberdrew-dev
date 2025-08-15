import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => (
  <div className={`animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ${className}`}>
    {children}
  </div>
);