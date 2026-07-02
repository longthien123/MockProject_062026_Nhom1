import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "danger" | "info";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-200 text-slate-900",
  danger: "bg-red-100 text-red-700",
  info: "bg-yellow-100 text-yellow-700",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold px-4 py-1 rounded-full",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
