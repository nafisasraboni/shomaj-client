"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CalendarPlus, ChevronDown, ListChecks, LogOut, Menu, UserRound, UsersRound, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/about", label: "Our Mission" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();

  async function handleLogout() {
    await signOut();
    toast.success("You have been logged out");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_90%,transparent)] backdrop-blur-xl">
      <div className="container-shell flex h-[4.5rem] items-center justify-between gap-4 lg:h-[4.75rem]">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "focus-ring relative rounded-lg px-1 py-2 text-sm font-semibold text-[var(--muted-foreground)] after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--primary)] after:transition-transform hover:text-[var(--foreground)] hover:after:scale-x-100",
                pathname === link.href && "text-[var(--primary-dark)] after:scale-x-100 dark:text-[var(--primary)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {!isPending && !session && <Button asChild className="hidden sm:inline-flex"><Link href="/login">Log in</Link></Button>}
          {!isPending && session && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="focus-ring flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 pr-3 shadow-sm hover:border-[var(--primary)]/45" title={session.user.name} aria-label={`Open ${session.user.name}'s menu`}>
                  {session.user.image ? <img src={session.user.image} alt={`${session.user.name}'s profile`} className="size-9 rounded-md object-cover" referrerPolicy="no-referrer" /> : <span className="grid size-9 place-items-center rounded-md bg-[var(--accent)] font-bold text-[var(--primary)]">{session.user.name?.charAt(0).toUpperCase()}</span>}
                  <ChevronDown size={15} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" sideOffset={8} className="z-[60] min-w-60 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[var(--shadow-lift)]">
                  <div className="px-3 py-2"><p className="font-bold">{session.user.name}</p><p className="truncate text-xs text-[var(--muted-foreground)]">{session.user.email}</p></div>
                  <DropdownMenu.Separator className="my-2 h-px bg-[var(--border)]" />
                  {[
                    ["/events/create", "Create Event", CalendarPlus],
                    ["/events/manage", "Manage Events", ListChecks],
                    ["/joined-events", "Joined Events", UsersRound],
                    ["/profile", "Profile", UserRound],
                  ].map(([href, label, Icon]) => (
                    <DropdownMenu.Item key={String(href)} asChild>
                      <Link href={String(href)} className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-semibold outline-none hover:bg-[var(--muted)] focus:bg-[var(--muted)]"><Icon size={17} />{String(label)}</Link>
                    </DropdownMenu.Item>
                  ))}
                  <DropdownMenu.Separator className="my-2 h-px bg-[var(--border)]" />
                  <DropdownMenu.Item onSelect={handleLogout} className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-semibold text-[var(--danger)] outline-none hover:bg-[var(--muted)] focus:bg-[var(--muted)]"><LogOut size={17} />Log out</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle navigation">
            {open ? <X size={21} /> : <Menu size={21} />}
          </Button>
        </div>
      </div>
      {open && (
        <div id="mobile-navigation" className="border-t border-[var(--border)] bg-[var(--card)]/98 shadow-[var(--shadow-soft)] lg:hidden">
          <nav className="container-shell grid gap-6 py-5 sm:grid-cols-2 sm:py-6" aria-label="Mobile navigation">
            <div>
              <p className="mb-2 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Navigate</p>
              <div className="grid gap-1">
                {links.map((link, index) => (
                  <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)} className={cn("focus-ring flex items-center justify-between rounded-xl px-3 py-3 font-semibold hover:bg-[var(--muted)]", pathname === link.href && "bg-[var(--accent)] text-[var(--primary-dark)]")}>
                    <span>{link.label}</span><span className="font-mono text-[0.65rem] opacity-55">0{index + 1}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{session ? "Your account" : "Take part"}</p>
              <div className="grid gap-1">
                {session && [
                  ["/events/create", "Create Event"], ["/events/manage", "Manage Events"], ["/joined-events", "Joined Events"], ["/profile", "Profile"],
                ].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="focus-ring rounded-lg px-3 py-3 font-semibold hover:bg-[var(--muted)]">{label}</Link>)}
                {!isPending && !session && <Button asChild className="mt-2"><Link href="/login" onClick={() => setOpen(false)}>Log in to Shomaj</Link></Button>}
                {session && <Button variant="outline" className="mt-2" onClick={handleLogout}><LogOut size={17} />Log out</Button>}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
