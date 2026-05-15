import type { Customer, CustomerAuthResponse } from "../types/storefront";

const CUSTOMER_KEY = "techmart.customer";
const TOKEN_KEY = "techmart.token";
const GUEST_KEY = "techmart.guestId";

const isBrowser = typeof window !== "undefined";

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
  return safeParse<Customer>(window.localStorage.getItem(CUSTOMER_KEY));
}

export function getAuthToken(): string | null {
  if (!isBrowser) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setCustomerAuth(auth: CustomerAuthResponse): void {
  if (!isBrowser) return;
  window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(auth.customer));
  window.localStorage.setItem(TOKEN_KEY, auth.accessToken);
}

export function clearCustomerAuth(): void {
  if (!isBrowser) return;
  window.localStorage.removeItem(CUSTOMER_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getGuestCustomerId(): string {
  if (!isBrowser) return "guest";
  const existing = window.localStorage.getItem(GUEST_KEY);
  if (existing) return existing;
  const created = createGuestId();
  window.localStorage.setItem(GUEST_KEY, created);
  return created;
}

export function getActiveCustomerId(): string {
  const customer = getStoredCustomer();
  return customer?.id || getGuestCustomerId();
}
