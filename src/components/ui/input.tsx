import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-ring flex h-12 w-full rounded-lg border bg-[var(--card)]/90 px-4 text-sm outline-none placeholder:text-[var(--muted-foreground)]/85 hover:border-[var(--foreground)]/45 focus:border-[var(--primary)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
