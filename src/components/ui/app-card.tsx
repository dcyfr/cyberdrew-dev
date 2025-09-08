import * as React from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

// Shared base classes to standardize card interactions app-wide
export const APP_CARD_BASE =
  "group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.99]";

// Static base for cards that should not hover/scale but retain accessibility focus styles
export const STATIC_CARD_BASE =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export type AppCardVariant = "interactive" | "static";

/**
 * AppCard wraps the base Card to provide consistent interactions app-wide.
 * - variant: "interactive" adds hover/scale/shadow effects (default)
 * - variant: "static" disables hover/scale but keeps focus-visible rings
 * - noHover: legacy alias for variant="static" (kept for backward compatibility)
 */
type AppCardProps = React.ComponentProps<typeof Card> & {
  variant?: AppCardVariant;
  noHover?: boolean; // deprecated: prefer `variant="static"`
};

export const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, variant, noHover = false, ...props }, ref) => {
    const effectiveVariant: AppCardVariant = variant ?? (noHover ? "static" : "interactive");
    const base = effectiveVariant === "static" ? STATIC_CARD_BASE : APP_CARD_BASE;
    return <Card ref={ref} className={cn(base, className)} {...props} />;
  }
);

AppCard.displayName = "AppCard";
