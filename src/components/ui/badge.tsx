import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex rounded-full border border-current/15 bg-[var(--accent)] px-3 py-1 text-[0.7rem] font-bold tracking-[0.04em] text-[var(--primary-dark)]", className)} {...props} />;
}
