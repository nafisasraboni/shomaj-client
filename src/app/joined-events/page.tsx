"use client";

import { CalendarX2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { EventCard } from "@/components/events/event-card";
import { EventGridSkeleton } from "@/components/events/event-grid-skeleton";
import { apiFetch } from "@/lib/api";
import type { JoinedEvent } from "@/lib/types";

export default function JoinedEventsPage() {
  const [joins, setJoins] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ data: JoinedEvent[] }>("/api/me/joined-events", { authenticated: true })
      .then((response) => setJoins(response.data))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <main className="container-shell section-padding">
        <div className="border-b border-[var(--border)] pb-8"><p className="section-kicker">Your commitments</p><h1 className="section-heading mt-5">Events you are joining.</h1><p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">Everything you have committed to, ordered by event date.</p></div>
        <div className="mt-10">{loading ? <EventGridSkeleton count={3} /> : error ? <p className="rounded-2xl border border-red-300 p-6 text-red-700">{error}</p> : joins.length === 0 ? <div className="grid place-items-center rounded-2xl border bg-[var(--card)] px-6 py-16 text-center"><CalendarX2 size={36} className="text-[var(--primary)]" /><h2 className="mt-5 text-2xl font-bold">No joined events yet</h2><p className="mt-2 text-[var(--muted-foreground)]">Explore upcoming events and choose one that matters to you.</p></div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{joins.map((join) => <EventCard key={join._id} event={join.event} />)}</div>}</div>
      </main>
    </ProtectedRoute>
  );
}
