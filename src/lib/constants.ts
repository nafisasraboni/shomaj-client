export const EVENT_TYPES = ["Cleanup", "Plantation", "Donation", "Education", "Healthcare", "Relief", "Animal Welfare", "Other"] as const;

export const PRIVATE_ROUTES = ["/events/create", "/events/manage", "/joined-events", "/profile"];

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";
