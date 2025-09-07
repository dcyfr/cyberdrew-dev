import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/lib/badge-variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  // Provide a stable class and data attributes for accessibility and theming hooks
  const v = variant ?? "default";
  return (
    <div
      className={cn("badge", badgeVariants({ variant: v }), className)}
      data-variant={v}
      {...props}
    />
  )
}

export { Badge }
