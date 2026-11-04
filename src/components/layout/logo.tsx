import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("focus-ring inline-flex items-center gap-3 rounded-lg", className)} aria-label="Shomaj home">
      <Image src="/shomaj-logo.png" alt="" width={48} height={48} className="size-11 shrink-0 rounded-full object-cover shadow-sm sm:size-12" aria-hidden="true" priority />
      <span>
        <span className="display-title block text-[1.55rem] leading-none">Shomaj</span>
        <span className="mt-1 hidden text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--muted-foreground)] sm:block">People make place</span>
      </span>
    </Link>
  );
}
