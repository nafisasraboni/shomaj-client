import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section id="newsletter" className="section-padding scroll-mt-20">
      <div className="container-shell rounded-3xl bg-[var(--primary)] px-6 py-10 text-[var(--primary-foreground)] shadow-[var(--shadow-soft)] sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:px-14 lg:py-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">The monthly dispatch · No clutter</p>
          <h2 className="display-title text-balance mt-5 max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">Good work deserves to travel.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg">One thoughtful roundup of community events and stories from across Bangladesh.</p>
        </div>
        <div className="mt-9 border-t border-white/25 pt-6 lg:mt-0">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Input id="newsletter-email" type="email" placeholder="you@example.com" className="border-white/25 bg-white text-[#16312b] placeholder:text-[#71817b]" />
            <Button type="button" variant="secondary" className="shrink-0">Subscribe <ArrowRight size={17} /></Button>
          </div>
          <p className="pt-3 text-xs text-white/60">Design preview only—no emails will be sent.</p>
        </div>
      </div>
    </section>
  );
}
