"use client";

import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, Share2, UserRoundX, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EventImage } from "@/components/events/event-image";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { CommunityEvent } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const userId = session?.user.id;
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [joined, setJoined] = useState(false);
  const [checkedAttendanceKey, setCheckedAttendanceKey] = useState<string | null>(null);
  const [error, setError] = useState("");
  const attendanceKey = userId ? `${userId}:${id}` : null;
  const joinStatusLoading = isPending || Boolean(attendanceKey && checkedAttendanceKey !== attendanceKey);
  const isJoined = Boolean(attendanceKey && checkedAttendanceKey === attendanceKey && joined);

  useEffect(() => {
    apiFetch<{ data: CommunityEvent }>(`/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (isPending || !userId) return;
    let active = true;

    apiFetch<{ joined: boolean }>(`/api/events/${id}/join-status`, { authenticated: true })
      .then((response) => {
        if (active) setJoined(response.joined);
      })
      .catch((reason) => {
        if (!active) return;
        setJoined(false);
        toast.error(reason instanceof Error ? reason.message : "Unable to check your attendance");
      })
      .finally(() => {
        if (active) setCheckedAttendanceKey(`${userId}:${id}`);
      });

    return () => {
      active = false;
    };
  }, [id, isPending, userId]);

  async function handleJoin() {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }
    setJoining(true);
    try {
      const response = await apiFetch<{ message: string; alreadyJoined?: boolean }>(`/api/events/${id}/join`, { method: "POST", authenticated: true });
      setJoined(true);
      setCheckedAttendanceKey(attendanceKey);
      if (!response.alreadyJoined) setEvent((current) => current ? { ...current, participantCount: current.participantCount + 1 } : current);
      toast.success(response.message);
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Unable to join this event");
    } finally {
      setJoining(false);
    }
  }

  async function handleCancelAttendance() {
    setCancelling(true);
    try {
      const response = await apiFetch<{ message: string; removed: boolean }>(`/api/events/${id}/join`, {
        method: "DELETE",
        authenticated: true,
      });
      setJoined(false);
      setCheckedAttendanceKey(attendanceKey);
      if (response.removed) {
        setEvent((current) => current ? { ...current, participantCount: Math.max(0, current.participantCount - 1) } : current);
      }
      toast.success(response.message);
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Unable to cancel your attendance");
    } finally {
      setCancelling(false);
    }
  }

  if (loading) return <main className="container-shell section-padding"><Skeleton className="mx-auto aspect-[16/10] w-full max-w-5xl rounded-2xl sm:aspect-video lg:aspect-[2/1]" /><Skeleton className="mt-10 h-12 w-3/4" /><Skeleton className="mt-6 h-32 w-full" /></main>;
  if (error || !event) return <main className="container-shell section-padding text-center"><h1 className="text-3xl font-bold">Event unavailable</h1><p className="mt-3 text-[var(--muted-foreground)]">{error || "This event could not be found."}</p><Button asChild variant="outline" className="mt-7"><Link href="/events"><ArrowLeft size={17} />Back to events</Link></Button></main>;

  return (
    <main className="pb-24 pt-10 sm:pb-32 sm:pt-14">
      <div className="container-shell">
        <Link href="/events" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)]"><ArrowLeft size={17} />All upcoming events</Link>
        <header className="mt-8 grid gap-8 border-t border-[var(--border)] pt-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div><Badge>{event.eventType}</Badge><h1 className="display-title text-balance mt-5 max-w-5xl text-4xl leading-[1.03] sm:text-5xl lg:text-6xl">{event.title}</h1></div>
          <div className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm font-semibold text-[var(--muted-foreground)] shadow-[var(--shadow-soft)]">
            <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-[var(--primary)]" />{formatEventDate(event.eventDate)}</span>
            <span className="inline-flex items-start gap-2"><MapPin size={18} className="mt-0.5 shrink-0 text-[var(--primary)]" />{event.location}</span>
            <span className="inline-flex items-center gap-2"><Users size={18} className="text-[var(--primary)]" />{event.participantCount} people joined</span>
          </div>
        </header>
        <div className="mx-auto mt-10 aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl bg-[var(--muted)] shadow-[var(--shadow-soft)] sm:aspect-video lg:aspect-[2/1]">
          <EventImage src={event.thumbnailUrl} alt={event.title} className="h-full w-full object-cover" />
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">
          <article>
            <p className="section-kicker">About the action</p>
            <p className="mt-7 max-w-3xl whitespace-pre-line text-lg leading-9 text-[var(--muted-foreground)] sm:text-xl">{event.description}</p>
            <div className="mt-12 flex items-center gap-4 border-y border-[var(--foreground)]/30 py-5">
              {event.createdBy.image ? <img src={event.createdBy.image} alt="" className="size-12 rounded-sm object-cover" /> : <span className="grid size-12 place-items-center rounded-sm bg-[var(--accent)] font-bold text-[var(--primary)]">{event.createdBy.name.charAt(0)}</span>}
              <div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Organised by</p><p className="mt-1 font-bold">{event.createdBy.name}</p></div>
            </div>
          </article>
          <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-soft)] lg:sticky lg:top-28">
            <div className="flex items-center gap-3"><Clock3 className="text-[var(--primary)]" /><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Save your place</p><p className="mt-1 font-bold">{formatEventDate(event.eventDate)}</p></div></div>
            <p className="mt-6 border-t pt-5 text-sm leading-7 text-[var(--muted-foreground)]">Join to add this event to your dashboard and let the organiser know you are coming.</p>
            {isJoined ? (
              <div className="mt-6 grid gap-3">
                <div className="flex min-h-13 items-center justify-center gap-2 rounded-md border border-emerald-600/35 bg-emerald-600/10 px-4 font-bold text-emerald-800 dark:text-emerald-300"><CheckCircle2 size={18} />You&apos;re attending</div>
                <ConfirmDialog
                  title="Cancel your attendance?"
                  description="This event will be removed from your joined events. You can join again later while registration remains open."
                  confirmLabel="Cancel attendance"
                  destructive
                  onConfirm={handleCancelAttendance}
                  trigger={<Button variant="outline" className="w-full" disabled={cancelling}><UserRoundX size={17} />{cancelling ? "Cancelling…" : "Cancel attendance"}</Button>}
                />
              </div>
            ) : (
              <Button className="mt-6 w-full" size="lg" onClick={handleJoin} disabled={joining || isPending || joinStatusLoading}>{joining ? "Joining…" : joinStatusLoading ? "Checking attendance…" : "Join this event"}</Button>
            )}
            <Button variant="ghost" className="mt-3 w-full" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Event link copied"); }}><Share2 size={17} />Copy event link</Button>
          </aside>
        </div>
      </div>
    </main>
  );
}
