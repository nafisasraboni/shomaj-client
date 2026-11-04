import { CalendarCheck2, HandHeart, ShieldCheck, UsersRound } from "lucide-react";

const features = [
  { icon: CalendarCheck2, title: "Discover what matters", copy: "Browse upcoming service events by date, cause, and neighbourhood." },
  { icon: UsersRound, title: "Bring people together", copy: "Create an event in minutes and invite your community to take part." },
  { icon: HandHeart, title: "Join with one click", copy: "Save your place, track joined events, and show up ready to help." },
  { icon: ShieldCheck, title: "Own your actions", copy: "Manage only the events you create through clear, secure ownership." },
];

export function FeaturesSection() {
  return (
    <section id="how-it-works" className="section-padding scroll-mt-20 bg-[var(--card)]">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <p className="section-kicker">Why Shomaj exists</p>
          <div className="lg:col-start-1"><h2 className="section-heading text-balance mt-5">Care becomes powerful when it has a place to go.</h2></div>
          <p className="max-w-xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg lg:col-start-2 lg:row-start-1 lg:row-end-3 lg:justify-self-end">No noise, no complicated process. Just clear opportunities, accountable organisers, and people ready to contribute.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12">
          {features.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:bg-[var(--card)] hover:shadow-[var(--shadow-soft)] sm:p-7">
              <div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]"><Icon size={22} /></span><span className="text-xs font-bold text-[var(--muted-foreground)]">0{index + 1}</span></div>
              <h3 className="mt-7 text-xl font-bold tracking-[-0.02em] sm:text-2xl">{title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-[var(--muted-foreground)]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
