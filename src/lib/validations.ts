import { z } from "zod";
import { EVENT_TYPES } from "./constants";

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters").max(80),
  email: z.email("Enter a valid email address"),
  photoURL: z.url("Enter a valid photo URL"),
  password: z.string().regex(passwordRule, "Use at least 6 characters with uppercase and lowercase letters"),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const eventSchema = z.object({
  title: z.string().trim().min(4, "Title must contain at least 4 characters").max(120),
  description: z.string().trim().min(30, "Description must contain at least 30 characters").max(2000),
  eventType: z.enum(EVENT_TYPES),
  thumbnailUrl: z.url("Enter a valid thumbnail URL"),
  location: z.string().trim().min(3, "Location is required").max(160),
  eventDate: z.string().refine((value) => {
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date.getTime() > Date.now();
  }, "Choose a future date"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters").max(80),
  image: z.url("Enter a valid photo URL"),
});

export type EventFormValues = z.infer<typeof eventSchema>;
