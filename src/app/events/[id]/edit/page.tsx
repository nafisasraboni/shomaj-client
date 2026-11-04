"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { EventForm } from "@/components/events/event-form";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
import type { CommunityEvent } from "@/lib/types";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ data: CommunityEvent }>(`/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((reason: Error) => setError(reason.message));
  }, [id]);

  return (
    <ProtectedRoute>
      <main className="container-shell section-padding">
        <div className="border-b border-[var(--foreground)] pb-8"><p className="section-kicker">Keep details current</p><h1 className="section-heading mt-6">Update your event.</h1></div>
        <div className="mt-12">{error ? <p className="rounded-2xl border border-red-300 p-6 text-red-700">{error}</p> : event ? <EventForm event={event} /> : <Skeleton className="h-[650px] w-full rounded-none" />}</div>
      </main>
    </ProtectedRoute>
  );
}
