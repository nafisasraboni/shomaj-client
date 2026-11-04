import { HandHeart, MapPin, Users } from "lucide-react";

export const metadata = { title: "Our Mission" };

export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#12352d] py-16 text-[#f4f8f6] sm:py-20 lg:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div><p className="section-kicker text-[#9bd9c5]">Our mission</p><h1 className="section-heading text-balance mt-5 max-w-5xl">Make local service feel like a normal part of life.</h1></div>
          <p className="max-w-xl text-base leading-8 text-[#c5d7d1] sm:text-lg lg:justify-self-end">Shomaj connects people who care with practical ways to improve the places they already call home.</p>
        </div>
      </section>
      <section className="container-shell section-padding">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--secondary)]">The belief behind the work</p>
            <p className="text-balance mt-5 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">People do not lack care. They often lack a clear way to act on it.</p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"><img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1400&q=88" alt="Community members bringing their hands together" className="aspect-[16/10] w-full object-cover" /></div>
        </div>
      </section>
      <section className="border-y border-[var(--foreground)]/25 bg-[var(--card)]">
        <div className="container-shell grid md:grid-cols-3">
        {[
          [MapPin, "Local first", "Discover work happening close enough to join and meaningful enough to remember."],
          [Users, "Open to everyone", "Anyone can create an initiative, gather neighbours, and turn intent into action."],
          [HandHeart, "Built on trust", "Clear event ownership and community participation keep every action accountable."],
        ].map(([Icon, title, copy], index) => (
          <article key={String(title)} className="border-b border-[var(--border)] py-9 md:border-b-0 md:border-r md:px-8 md:py-12 first:pl-0 last:border-r-0 last:pr-0">
            <div className="flex items-center justify-between"><Icon className="text-[var(--primary)]" /><span className="font-mono text-xs text-[var(--muted-foreground)]">0{index + 1}</span></div>
            <h2 className="mt-7 text-2xl font-bold tracking-[-0.025em]">{String(title)}</h2>
            <p className="mt-4 leading-7 text-[var(--muted-foreground)]">{String(copy)}</p>
          </article>
        ))}
        </div>
      </section>
      <section className="container-shell section-padding text-center">
        <p className="section-kicker">One neighbourhood at a time</p>
        <p className="mx-auto mt-6 max-w-4xl text-balance text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">The smallest useful action is always more powerful than the biggest good intention.</p>
      </section>
    </main>
  );
}
