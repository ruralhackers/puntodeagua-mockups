'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const registryBlockVariants = cva(
  "rounded-lg p-4 w-full",
  {
    variants: {
      variant: {
        default: "bg-registry-block border border-gray-200 shadow-sm",
      },
      size: {
        default: "p-4",
        sm: "p-3",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RegistryBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof registryBlockVariants> {}

const RegistryBlock = React.forwardRef<HTMLDivElement, RegistryBlockProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(registryBlockVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
RegistryBlock.displayName = "RegistryBlock";

export { RegistryBlock, registryBlockVariants };