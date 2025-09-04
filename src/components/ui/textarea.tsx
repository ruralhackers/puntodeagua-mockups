import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const hasValue = props.value !== undefined && props.value !== "";
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input-border bg-input-custom px-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground",
          "hover:border-input-border-hover",
          "focus-visible:outline-none focus-visible:border-input-border-focus focus-visible:ring-[3px] focus-visible:ring-input-ring-focus",
          "aria-invalid:border-input-border-error aria-invalid:ring-input-border-error/20",
          hasValue && "bg-input-background-filled",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }