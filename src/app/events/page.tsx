"use client";

import { CalendarArrowUp, CalendarX2, Search, SlidersHorizontal, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import { EventCard } from "@/components/events/event-card";
import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";
import type { CommunityEvent } from "@/lib/types";

export default function EventsPage() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [sort, setSort] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams({ sort });
      if (search.trim()) params.set("search", search.trim());
      if (eventType) params.set("type", eventType);
      setLoading(true);
      setError("");
      apiFetch<{ data: CommunityEvent[] }>(`/api/events?${params}`, { signal: controller.signal })
        .then((response) => setEvents(response.data))
        .catch((reason: Error) => { if (reason.name !== "AbortError") setError(reason.message); })
        .finally(() => setLoading(false));
    }, 280);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [eventType, search, sort]);

  return (
    <main>
      <section className="border-b border-[var(--border)] bg-[var(--card)]/85 py-14 sm:py-16 lg:py-20">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end"><div><p className="section-kicker">Upcoming events</p><h1 className="section-heading text-balance mt-5">Find a reason to show up.</h1></div><p className="max-w-xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg lg:justify-self-end">Search by place or cause. Every event is upcoming, local, and open to people ready to help.</p></div>
        </div>
      </section>
      <section className="container-shell section-padding !pt-7 sm:!pt-9">
        <div className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow-soft)] md:grid-cols-2 lg:grid-cols-[1fr_230px_200px_auto] lg:items-end">
          <label className="grid gap-2 md:col-span-2 lg:col-span-1"><span className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[var(--muted-foreground)]"><Search size={14} />Search</span><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Title, location, or keyword" /></label>
          <label className="grid gap-2"><span className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[var(--muted-foreground)]"><Tags size={14} />Cause</span><select value={eventType} onChange={(event) => setEventType(event.target.value)} className="focus-ring h-12 w-full rounded-lg border bg-[var(--card)] px-4 text-sm hover:border-[var(--foreground)]/45 focus:border-[var(--primary)]"><option value="">All event types</option>{EVENT_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="grid gap-2"><span className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[var(--muted-foreground)]"><CalendarArrowUp size={14} />Order</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="focus-ring h-12 w-full rounded-lg border bg-[var(--card)] px-4 text-sm hover:border-[var(--foreground)]/45 focus:border-[var(--primary)]"><option value="asc">Soonest first</option><option value="desc">Latest first</option></select></label>
          <Button variant="outline" className="md:col-span-2 lg:col-span-1" onClick={() => { setSearch(""); setEventType(""); setSort("asc"); }}><SlidersHorizontal size={17} />Reset</Button>
        </div>
        <div className="mt-12">
          {loading && <EventGridSkeleton count={6} />}
          {!loading && error && <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-center text-red-800 dark:bg-red-950/30 dark:text-red-200"><p className="font-bold">Events could not be loaded</p><p className="mt-2 text-sm">{error}</p></div>}
          {!loading && !error && events.length === 0 && <div className="grid place-items-center rounded-3xl border bg-[var(--card)] px-6 py-16 text-center"><CalendarX2 size={36} className="text-[var(--primary)]" /><h2 className="mt-5 text-2xl font-bold">No matching events</h2><p className="mt-2 text-[var(--muted-foreground)]">Try a different search or clear the filters.</p></div>}
          {!loading && !error && events.length > 0 && <><div className="mb-7 flex items-center justify-between gap-4 border-b border-[var(--foreground)]/20 pb-4"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Showing {events.length} upcoming {events.length === 1 ? "event" : "events"}</p><span className="hidden text-xs text-[var(--muted-foreground)] sm:block">Updated from the community calendar</span></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{events.map((event) => <EventCard key={event._id} event={event} />)}</div></>}
        </div>
      </section>
    </main>
  );
}
