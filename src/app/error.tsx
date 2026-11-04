"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="container-shell section-padding text-center"><p className="section-kicker">Something went wrong</p><h1 className="section-heading mx-auto mt-4">We could not finish that request.</h1><p className="mx-auto mt-5 max-w-xl text-[var(--muted-foreground)]">Please try again. If the problem continues, return to the home page and start over.</p><Button className="mt-8" onClick={reset}><RotateCcw size={17} />Try again</Button></main>;
}
