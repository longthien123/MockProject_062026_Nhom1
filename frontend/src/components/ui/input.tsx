import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-slate-50 border text-[15px] text-slate-800 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400/85",
          error
            ? "border-red-500 ring-2 ring-red-500/10 bg-red-50/20"
            : "border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
