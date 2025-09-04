import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const hasValue = props.value !== undefined && props.value !== "";
  
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border border-input-border px-3 py-1 text-base shadow-xs transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "bg-input-custom",
        "hover:border-input-border-hover",
        "focus-visible:border-input-border-focus focus-visible:ring-input-ring-focus focus-visible:ring-[3px]",
        "aria-invalid:border-input-border-error aria-invalid:ring-input-border-error/20",
        hasValue && "bg-input-background-filled",
        className
      )}
      {...props}
    />
  )
}

export { Input }
