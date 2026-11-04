import Link from "next/link";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import type { CommunityEvent } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EventImage } from "./event-image";

export function EventCard({ event }: { event: CommunityEvent }) {
  const eventDate = new Date(event.eventDate);
  const month = eventDate.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const day = eventDate.toLocaleDateString("en-GB", { day: "2-digit" });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-lift)]">
      <div className="relative overflow-hidden bg-[var(--muted)]">
        <EventImage src={event.thumbnailUrl} alt={event.title} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
        <Badge className="absolute left-4 top-4 border-0 bg-[var(--card)] text-[var(--primary)] shadow-sm">{event.eventType}</Badge>
      </div>
      <div className="grid flex-1 grid-cols-[3.25rem_1fr] gap-4 p-5 pb-4">
        <div className="border-r border-[var(--border)] pr-3 text-center">
          <p className="text-[0.65rem] font-extrabold tracking-[0.12em] text-[var(--primary)]">{month}</p>
          <p className="mt-1 text-2xl font-bold leading-none">{day}</p>
        </div>
        <div className="flex min-w-0 flex-col">
          <p className="text-xs font-semibold text-[var(--muted-foreground)]">{formatEventDate(event.eventDate)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug tracking-[-0.025em] sm:text-2xl">{event.title}</h3>
          <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[var(--muted-foreground)]"><MapPin size={15} className="mt-1 shrink-0 text-[var(--primary)]" />{event.location}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-4 text-xs font-bold">
        <span className="inline-flex items-center gap-1.5 text-[var(--muted-foreground)]"><Users size={15} />{event.participantCount} joined</span>
        <Link className="focus-ring inline-flex items-center gap-1 rounded-sm text-[var(--primary)] hover:text-[var(--secondary)]" href={`/events/${event._id}`}>View event <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}
