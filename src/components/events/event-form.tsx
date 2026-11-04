"use client";

import { CalendarPlus, ImageIcon, MapPin, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";
import type { CommunityEvent } from "@/lib/types";
import { eventSchema } from "@/lib/validations";

function localDateTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

const MINIMUM_EVENT_DATE = localDateTime(new Date(Date.now() + 60_000).toISOString());

export function EventForm({ event }: { event?: CommunityEvent }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    const form = submitEvent.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const selectedDate = new Date(String(values.eventDate));
    const eventDate = Number.isNaN(selectedDate.getTime()) ? "" : selectedDate.toISOString();
    const result = eventSchema.safeParse({ ...values, eventDate });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Check the event details");
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch(event ? `/api/events/${event._id}` : "/api/events", {
        method: event ? "PATCH" : "POST",
        authenticated: true,
        body: JSON.stringify(result.data),
      });
      toast.success(event ? "Event updated successfully" : "Event created successfully");
      router.push(event ? "/events/manage" : "/events");
      router.refresh();
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Unable to save the event");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-soft)] lg:grid-cols-[0.34fr_0.66fr]" noValidate>
      <div className="border-b bg-[var(--muted)] p-6 sm:p-9 lg:border-b-0 lg:border-r">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--primary)]">Event brief</p>
        <h2 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-3xl">Give people enough clarity to say yes.</h2>
        <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)]">Use a specific title, an exact meeting point, and explain what participants should expect or bring.</p>
      </div>
      <div className="grid gap-6 p-6 sm:p-9 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold md:col-span-2"><span className="inline-flex items-center gap-2"><Type size={16} />Event title</span><Input name="title" defaultValue={event?.title} placeholder="Winter clothes distribution in Mirpur" required /></label>
        <label className="grid gap-2 text-sm font-bold"><span className="inline-flex items-center gap-2"><CalendarPlus size={16} />Event type</span><select name="eventType" defaultValue={event?.eventType ?? ""} required className="focus-ring h-12 rounded-lg border bg-[var(--card)] px-4 text-sm hover:border-[var(--foreground)]/45 focus:border-[var(--primary)]"><option value="" disabled>Select a cause</option>{EVENT_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold"><span className="inline-flex items-center gap-2"><CalendarPlus size={16} />Date and time</span><Input name="eventDate" type="datetime-local" min={MINIMUM_EVENT_DATE} defaultValue={localDateTime(event?.eventDate)} required /></label>
        <label className="grid gap-2 text-sm font-bold md:col-span-2"><span className="inline-flex items-center gap-2"><MapPin size={16} />Location</span><Input name="location" defaultValue={event?.location} placeholder="Mirpur 10, Dhaka" required /></label>
        <label className="grid gap-2 text-sm font-bold md:col-span-2"><span className="inline-flex items-center gap-2"><ImageIcon size={16} />Thumbnail image URL</span><Input name="thumbnailUrl" type="url" defaultValue={event?.thumbnailUrl} placeholder="https://images.example.com/event.jpg" required /></label>
        <label className="grid gap-2 text-sm font-bold md:col-span-2">Description<textarea name="description" defaultValue={event?.description} rows={8} placeholder="Explain what volunteers will do, where to meet, and anything they should bring…" required className="focus-ring resize-y rounded-lg border bg-[var(--card)] p-4 text-sm leading-6 outline-none hover:border-[var(--foreground)]/45 focus:border-[var(--primary)]" /></label>
        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end md:col-span-2">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={submitting}>{submitting ? "Saving event…" : event ? "Update event" : "Create event"}</Button>
        </div>
      </div>
    </form>
  );
}
