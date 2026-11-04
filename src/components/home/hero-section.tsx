import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="surface-grid relative overflow-hidden border-b border-[var(--border)]">
      <div className="container-shell relative grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-14 xl:gap-16">
        <div className="relative z-10">
          <p className="section-kicker">Community action, made local</p>
          <h1 className="display-title text-balance mt-4 max-w-3xl text-[clamp(2.85rem,6vw,5.65rem)] leading-[0.98]">A better place starts with <span className="text-[var(--primary)]">us.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg sm:leading-8 lg:text-xl">Discover people already doing good nearby. Bring your time, your hands, and one honest intention to help.</p>
          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-4">
            <Button asChild size="lg" className="w-full min-[420px]:w-auto"><Link href="/events">Explore events <ArrowRight size={18} /></Link></Button>
            <Button asChild variant="outline" size="lg" className="w-full min-[420px]:w-auto"><Link href="/events/create">Create an event</Link></Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-2"><MapPin size={17} className="text-[var(--primary)]" /> Across Bangladesh</span>
            <span className="inline-flex items-center gap-2"><Users size={17} className="text-[var(--primary)]" /> Open to everyone</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-2xl pb-10 sm:pb-12 lg:pb-0">
          <div className="absolute -right-3 -top-3 h-[76%] w-[78%] rounded-3xl bg-[var(--accent)] sm:-right-5 sm:-top-5" aria-hidden="true" />
          <div className="relative ml-auto w-[94%] overflow-hidden rounded-3xl bg-[var(--muted)] shadow-[var(--shadow-lift)] sm:w-[90%] lg:w-[92%]">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=88" alt="Volunteers working together in their community" className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]" fetchPriority="high" decoding="async" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-5 right-5 max-w-[13rem] text-right text-xs font-bold leading-5 text-white sm:bottom-6 sm:right-6">Ordinary people.<br />Visible change.</p>
          </div>
          <div className="absolute bottom-0 left-0 w-[min(92%,20rem)] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow-lift)] sm:p-5 lg:-left-2">
            <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--accent)] text-[var(--primary)]"><CalendarDays size={19} /></span><div><p className="text-xs font-bold text-[var(--primary)]">Next local action</p><p className="mt-1 font-bold leading-snug">Mirpur community cleanup</p></div></div>
            <p className="mt-3 pl-[3.25rem] text-xs text-[var(--muted-foreground)] sm:text-sm">Saturday · 8:00 AM · Mirpur 10</p>
          </div>
        </div>
      </div>
    </section>
  );
}
