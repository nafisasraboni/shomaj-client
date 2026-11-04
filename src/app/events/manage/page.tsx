"use client";

import { CalendarPlus, Edit3, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { EventImage } from "@/components/events/event-image";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { CommunityEvent } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ data: CommunityEvent[] }>("/api/me/events", { authenticated: true })
      .then((response) => setEvents(response.data))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  async function removeEvent(id: string) {
    try {
      await apiFetch(`/api/events/${id}`, { method: "DELETE", authenticated: true });
      setEvents((current) => current.filter((event) => event._id !== id));
      toast.success("Event deleted");
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Unable to delete the event");
    }
  }

  return (
    <ProtectedRoute>
      <main className="container-shell section-padding">
        <div className="flex flex-col gap-7 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker">Your events</p><h1 className="section-heading mt-5">Manage what you started.</h1></div><Button asChild><Link href="/events/create"><CalendarPlus size={18} />Create event</Link></Button></div>
        <div className="mt-10 grid gap-3">
          {loading && Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-44 w-full rounded-3xl" />)}
          {!loading && error && <p className="rounded-2xl border border-red-300 p-6 text-red-700">{error}</p>}
          {!loading && !error && events.length === 0 && <div className="rounded-3xl border bg-[var(--card)] p-12 text-center"><h2 className="text-2xl font-bold">You have not created an event yet</h2><p className="mt-3 text-[var(--muted-foreground)]">Start with one clear action your community can join.</p><Button asChild className="mt-6"><Link href="/events/create">Create your first event</Link></Button></div>}
          {events.map((event) => (
            <article key={event._id} className="grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] sm:grid-cols-[210px_1fr]">
              <EventImage src={event.thumbnailUrl} alt={event.title} className="h-48 w-full object-cover sm:h-full" />
              <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div><p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">{event.eventType} · {formatEventDate(event.eventDate)}</p><h2 className="mt-2 text-xl font-bold">{event.title}</h2><p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted-foreground)]"><MapPin size={15} />{event.location}</p></div>
                <div className="flex shrink-0 flex-wrap gap-2"><Button asChild variant="outline" size="sm"><Link href={`/events/${event._id}/edit`}><Edit3 size={15} />Edit</Link></Button><ConfirmDialog title="Delete this event?" description="This permanently removes the event and every associated join record." confirmLabel="Delete event" destructive onConfirm={() => removeEvent(event._id)} trigger={<Button variant="danger" size="sm"><Trash2 size={15} />Delete</Button>} /></div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
