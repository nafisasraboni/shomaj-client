import { describe, expect, it } from "vitest";
import { eventSchema, registrationSchema } from "./validations";

describe("registrationSchema", () => {
  const validUser = { name: "Nafisa Ahmed", email: "nafisa@example.com", photoURL: "https://example.com/photo.jpg", password: "Shomaj7" };

  it("accepts a complete valid registration", () => {
    expect(registrationSchema.safeParse(validUser).success).toBe(true);
  });

  it.each(["lowercase7", "UPPERCASE7", "Short"])("rejects password %s", (password) => {
    expect(registrationSchema.safeParse({ ...validUser, password }).success).toBe(false);
  });
});

describe("eventSchema", () => {
  const validEvent = {
    title: "Blanket distribution in Mohammadpur",
    description: "Volunteers will organise, package, and distribute warm blankets to families in need.",
    eventType: "Donation",
    thumbnailUrl: "https://example.com/event.jpg",
    location: "Mohammadpur, Dhaka",
    eventDate: new Date(Date.now() + 86_400_000).toISOString(),
  };

  it("accepts a future event", () => {
    expect(eventSchema.safeParse(validEvent).success).toBe(true);
  });

  it("rejects an event in the past", () => {
    expect(eventSchema.safeParse({ ...validEvent, eventDate: new Date(Date.now() - 86_400_000).toISOString() }).success).toBe(false);
  });
});
