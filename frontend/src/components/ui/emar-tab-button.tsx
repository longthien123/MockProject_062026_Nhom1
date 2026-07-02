import * as React from "react";

import { cn } from "@/lib/utils";

type TabButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

function TabButton({ active = false, className, ...props }: TabButtonProps) {
  return (
    <button
      className={cn(
        "flex-1 px-8 rounded-[6px] text-lg transition-all py-4",
        active
          ? "bg-slate-200 text-slate-900 font-bold"
          : "bg-transparent text-slate-600 font-semibold hover:bg-gray-200",
        className
      )}
      type="button"
      {...props}
    />
  );
}

export { TabButton };
