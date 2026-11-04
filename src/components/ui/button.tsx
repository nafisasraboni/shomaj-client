import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold tracking-[-0.01em] disabled:pointer-events-none disabled:opacity-55 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-md",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-sm hover:-translate-y-0.5 hover:brightness-95",
        outline: "border border-[var(--border)] bg-[var(--card)] hover:-translate-y-0.5 hover:border-[var(--primary)]/45 hover:bg-[var(--accent)]/55 hover:text-[var(--primary-dark)]",
        ghost: "bg-transparent hover:bg-[var(--muted)]",
        danger: "bg-[var(--danger)] text-white hover:-translate-y-0.5 hover:brightness-90",
      },
      size: {
        default: "h-11",
        sm: "h-9 min-h-9 px-4 text-xs",
        lg: "h-13 min-h-13 px-7 text-base",
        icon: "size-11 min-h-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
