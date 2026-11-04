import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const footerLinks = [
  { href: "/events", label: "Upcoming events" },
  { href: "/events/create", label: "Create an event" },
  { href: "/about", label: "Our mission" },
  { href: "/profile", label: "Your profile" },
];

export function Footer() {
  return (
    <footer className="bg-[#102820] text-[#f4f8f6]">
      <div className="container-shell flex flex-col gap-7 border-b border-white/15 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <div><p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#91cdb9]">Ready when you are</p><p className="display-title mt-3 max-w-2xl text-2xl leading-tight sm:text-3xl lg:text-4xl">Find one useful thing to do nearby.</p></div>
        <Button asChild variant="secondary" className="shrink-0 border-0 shadow-none"><Link href="/events">Browse upcoming events <ArrowUpRight size={17} /></Link></Button>
      </div>
      <div className="container-shell grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-[1.35fr_0.65fr_0.65fr] lg:py-14">
        <div className="max-w-md">
          <Logo className="[--muted-foreground:#aab9b3] [--primary:#f4f0e7] [--primary-foreground:#10251f]" />
          <p className="mt-6 text-base leading-8 text-[#b9c5c0] sm:text-lg">A public square for people who believe their neighbourhood can be better—and are ready to help make it happen.</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#88a198]"><MapPin size={16} />Built for communities across Bangladesh</p>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fa39b]">Explore</h2>
          <ul className="mt-6 grid gap-3 text-sm text-[#d7dfdb]">
            {footerLinks.map((link) => <li key={link.href}><Link className="hover:text-[var(--secondary)]" href={link.href}>{link.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8fa39b]">Follow the work</h2>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href={["https://facebook.com", "https://instagram.com", "https://linkedin.com"][index]} target="_blank" rel="noreferrer" aria-label={["Facebook", "Instagram", "LinkedIn"][index]} className="focus-ring grid size-10 place-items-center rounded-md border border-[#63766e] hover:-translate-y-0.5 hover:border-[var(--secondary)] hover:text-[var(--secondary)]"><Icon size={17} /></a>
            ))}
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="focus-ring grid size-10 place-items-center rounded-md border border-[#63766e] font-bold hover:-translate-y-0.5 hover:border-[var(--secondary)] hover:text-[var(--secondary)]">𝕏</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 py-5 text-xs tracking-wide text-[#8fa39b]">
        <div className="container-shell flex flex-col justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} Shomaj · Built in Bangladesh for every neighbourhood.</span>
          <span className="flex gap-5"><Link href="/privacy" className="hover:text-[#f4f0e7]">Privacy</Link><Link href="/terms" className="hover:text-[#f4f0e7]">Terms</Link></span>
        </div>
      </div>
    </footer>
  );
}
