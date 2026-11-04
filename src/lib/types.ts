import type { EVENT_TYPES } from "./constants";

export type EventType = (typeof EVENT_TYPES)[number];

export interface EventCreator {
  userId: string;
  email: string;
  name: string;
  image?: string | null;
}

export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
  createdBy: EventCreator;
  participantCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface JoinedEvent {
  _id: string;
  joinedAt: string;
  event: CommunityEvent;
}

export interface ApiErrorBody {
  message?: string;
  fieldErrors?: Record<string, string[]>;
}
