import type { Customer, CustomerAuthResponse } from "../types/storefront";

const isBrowser = typeof window !== "undefined";

function getStoragePrefix(): string {
  if (!isBrowser) return "storefront";
  const host = window.location.hostname;
  if (host && host !== "localhost") return `storefront:${host}`;
  const envDomain = (import.meta.env.VITE_STORE_DOMAIN || "").trim();
  if (envDomain) return `storefront:${envDomain}`;
  const envStoreId = (import.meta.env.VITE_STORE_ID || "").trim();
  if (envStoreId) return `storefront:${envStoreId}`;
  return "storefront:local";
}

function getStorageKey(suffix: string): string {
  return `${getStoragePrefix()}:${suffix}`;
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function createGuestId(): string {
  if (isBrowser && "crypto" in window && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `guest_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function getStoredCustomer(): Customer | null {
  if (!isBrowser) return null;
  return safeParse<Customer>(window.localStorage.getItem(getStorageKey("customer")));
}

export function getAuthToken(): string | null {
  if (!isBrowser) return null;
  return window.localStorage.getItem(getStorageKey("token"));
}

export function setCustomerAuth(auth: CustomerAuthResponse): void {
  if (!isBrowser) return;
  window.localStorage.setItem(getStorageKey("customer"), JSON.stringify(auth.customer));
  window.localStorage.setItem(getStorageKey("token"), auth.accessToken);
}

export function clearCustomerAuth(): void {
  if (!isBrowser) return;
  window.localStorage.removeItem(getStorageKey("customer"));
  window.localStorage.removeItem(getStorageKey("token"));
}

export function getGuestCustomerId(): string {
  if (!isBrowser) return "guest";
  const existing = window.localStorage.getItem(getStorageKey("guestId"));
  if (existing) return existing;
  const created = createGuestId();
  window.localStorage.setItem(getStorageKey("guestId"), created);
  return created;
}

export function getActiveCustomerId(): string {
  const customer = getStoredCustomer();
  return customer?.id || getGuestCustomerId();
}
