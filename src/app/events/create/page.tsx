import { ProtectedRoute } from "@/components/auth/protected-route";
import { EventForm } from "@/components/events/event-form";

export const metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <main className="container-shell section-padding">
        <div className="max-w-4xl border-b border-[var(--foreground)] pb-8"><p className="section-kicker">Start something good</p><h1 className="section-heading mt-6">Create a community event.</h1><p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)]">Share clear details so neighbours know exactly how to take part.</p></div>
        <div className="mt-12"><EventForm /></div>
      </main>
    </ProtectedRoute>
  );
}
