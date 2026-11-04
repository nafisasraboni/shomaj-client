import type { Metadata } from "next";
import { API_URL } from "@/lib/constants";
import type { CommunityEvent } from "@/lib/types";

function buildDescription(event: CommunityEvent) {
  const date = new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(event.eventDate));
  const description = `${event.description.replace(/\s+/g, " ").trim()} · ${event.location} · ${date}`;

  return description.length > 180 ? `${description.slice(0, 177).trimEnd()}…` : description;
}

async function getEvent(id: string) {
  const response = await fetch(`${API_URL}/api/events/${encodeURIComponent(id)}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  const payload = await response.json() as { data?: CommunityEvent };
  return payload.data ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const event = await getEvent(id);
    if (!event) return { title: "Event unavailable", robots: { index: false, follow: false } };

    const description = buildDescription(event);
    const eventUrl = `/events/${event._id}`;

    return {
      title: event.title,
      description,
      alternates: { canonical: eventUrl },
      openGraph: {
        type: "article",
        url: eventUrl,
        siteName: "Shomaj",
        title: event.title,
        description,
        images: [{ url: event.thumbnailUrl, alt: event.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description,
        images: [event.thumbnailUrl],
      },
    };
  } catch {
    return { title: "Community event", description: "View this community event on Shomaj." };
  }
}

export default function EventLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
