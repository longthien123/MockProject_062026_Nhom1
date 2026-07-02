import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-[1.125rem] p-5 hover:border-primary transition-colors group cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export { Card };
