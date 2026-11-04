import { authClient } from "./auth-client";
import { API_URL } from "./constants";
import type { ApiErrorBody } from "./types";

export class ApiError extends Error {
  constructor(message: string, public status: number, public body?: ApiErrorBody) {
    super(message);
  }
}

export async function apiFetch<T>(path: string, options: RequestInit & { authenticated?: boolean } = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body) headers.set("Content-Type", "application/json");

  if (options.authenticated) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new ApiError("Please log in to continue", 401);
    headers.set("Authorization", `Bearer ${data.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers, cache: "no-store" });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(body?.message ?? "Something went wrong. Please try again.", response.status, body ?? undefined);
  }
  return body as T;
}
