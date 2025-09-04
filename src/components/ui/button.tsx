import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-button-primary text-white shadow-xs hover:opacity-90",
        destructive:
          "bg-button-destructive text-white shadow-xs hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-button-secondary text-gray-700 shadow-xs hover:opacity-90 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-button-secondary text-gray-700 shadow-xs hover:opacity-90",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "size-9 p-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 py-1 text-xs has-[>svg]:px-2",
        lg: "h-10 px-6 py-2 text-base has-[>svg]:px-4",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function CancelButton({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="cancel-button"
      className={cn("text-destructive hover:text-destructive/80 font-medium text-sm transition-colors", className)}
      {...props}
    />
  )
}

export { Button, CancelButton, buttonVariants }
