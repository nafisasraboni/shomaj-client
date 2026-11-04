"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function EventImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={cn("grid place-items-center bg-[var(--muted)] text-[var(--muted-foreground)]", className)}><ImageIcon size={32} /><span className="sr-only">Image unavailable</span></div>;
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" />;
}
