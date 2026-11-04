import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main className="container-shell section-padding text-center"><p className="section-kicker">404</p><h1 className="section-heading mx-auto mt-4">This path does not lead to an event.</h1><p className="mt-5 text-[var(--muted-foreground)]">The page may have moved or the event may no longer exist.</p><Button asChild className="mt-8"><Link href="/"><ArrowLeft size={17} />Return home</Link></Button></main>;
}
