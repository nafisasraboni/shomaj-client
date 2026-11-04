"use client";

import Link from "next/link";
import { ArrowRight, CalendarX2 } from "lucide-react";
import { useEffect, useState } from "react";
import { EventCard } from "@/components/events/event-card";
import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import type { CommunityEvent } from "@/lib/types";

export function RecentEventsSection() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ data: CommunityEvent[] }>("/api/events?limit=6&sort=asc")
      .then((response) => setEvents(response.data))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="upcoming" className="section-padding scroll-mt-20">
      <div className="container-shell">
        <div className="flex flex-col gap-7 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="section-kicker">Happening soon</p><h2 className="section-heading text-balance mt-5">Your time can matter here.</h2></div>
          <Button asChild variant="outline"><Link href="/events">View all events <ArrowRight size={17} /></Link></Button>
        </div>
        <div className="mt-10">
          {loading && <EventGridSkeleton count={6} />}
          {!loading && error && <div className="rounded-2xl border border-red-300 bg-red-50 p-8 text-center text-red-800 dark:bg-red-950/30 dark:text-red-200"><p className="font-bold">Events could not be loaded</p><p className="mt-2 text-sm">{error}</p></div>}
          {!loading && !error && events.length === 0 && <div className="grid place-items-center rounded-2xl border bg-[var(--card)] px-6 py-16 text-center"><CalendarX2 size={34} className="text-[var(--primary)]" /><h3 className="mt-5 text-xl font-bold">No upcoming events yet</h3><p className="mt-2 text-[var(--muted-foreground)]">Create the first action for your community.</p></div>}
          {!loading && !error && events.length > 0 && <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{events.map((event) => <EventCard key={event._id} event={event} />)}</div>}
        </div>
      </div>
    </section>
  );
}
