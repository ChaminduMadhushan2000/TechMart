import axios from "axios";
import type {
  StorefrontConfig,
  HomepageSection,
  Category,
  Product,
  PaginatedResponse,
  NavigationMenu,
  CartSummary,
  CustomerAuthResponse,
  Customer,
  CouponValidation,
  PaymentMethod,
  Order,
} from "./types/storefront";
import { getActiveCustomerId, getAuthToken, setCustomerAuth } from "./storefront/customer";

const STORE_ID_OVERRIDE = (import.meta.env.VITE_STORE_ID || "").trim();
const STORE_DOMAIN_OVERRIDE = (import.meta.env.VITE_STORE_DOMAIN || "").trim();

function resolveApiBaseUrl(): string {
  const rawValue = import.meta.env.VITE_API_BASE_URL;
  if (!rawValue) {
    throw new Error("VITE_API_BASE_URL is required for the storefront.");
  }

  const value = rawValue.trim().replace(/\/$/, "");
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch (error) {
    throw new Error("VITE_API_BASE_URL must be a valid URL.");
  }

  if (import.meta.env.PROD && parsed.protocol !== "https:") {
    throw new Error("VITE_API_BASE_URL must use https in production.");
  }

  return value;
}

const API_BASE_URL = resolveApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let storeConfigCache: StorefrontConfig | null = null;
let storeConfigPromise: Promise<StorefrontConfig> | null = null;

function resolveStoreDomain(): string | null {
  if (STORE_DOMAIN_OVERRIDE) return STORE_DOMAIN_OVERRIDE;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host && host !== "localhost") return host;
  }
  return null;
}

async function fetchStoreConfigByDomain(domain: string): Promise<StorefrontConfig> {
  const res = await api.get<StorefrontConfig>("/stores/config/domain", {
    params: { domain },
  });
  return res.data;
}

export async function resolveStoreConfig(): Promise<StorefrontConfig> {
  if (storeConfigCache) return storeConfigCache;
  if (storeConfigPromise) return storeConfigPromise;

  storeConfigPromise = (async () => {
    const domain = resolveStoreDomain();

    if (domain) {
      try {
        return await fetchStoreConfigByDomain(domain);
      } catch (error) {
        const detail = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Store config not found for domain "${domain}". ${detail}`);
      }
    }

    if (STORE_ID_OVERRIDE) {
      const fallbackDomain = STORE_DOMAIN_OVERRIDE || (typeof window !== "undefined" ? window.location.hostname : "localhost");
      return {
        id: STORE_ID_OVERRIDE,
        name: "Storefront",
        domain: fallbackDomain,
        type: "general",
        checkoutMode: "cart",
      } as StorefrontConfig;
    }

    throw new Error("Store context missing. Set VITE_STORE_DOMAIN or VITE_STORE_ID for localhost.");
  })();

  try {
    storeConfigCache = await storeConfigPromise;
    return storeConfigCache;
  } finally {
    storeConfigPromise = null;
  }
}

export async function resolveStoreId(): Promise<string> {
  if (STORE_ID_OVERRIDE) return STORE_ID_OVERRIDE;
  const config = await resolveStoreConfig();
  return config.id;
}

export async function fetchHomepageSections(storeId?: string): Promise<HomepageSection[]> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<HomepageSection[]>("/storefront/homepage/sections", {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function fetchCategories(storeId?: string): Promise<Category[]> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<Category[]>("/storefront/categories", {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export async function fetchProducts(filters: ProductFilters = {}, storeId?: string): Promise<PaginatedResponse<Product>> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<PaginatedResponse<Product>>("/storefront/products", {
    params: { storeId: resolvedStoreId, ...filters },
  });
  return res.data;
}

export async function fetchFeaturedProducts(limit = 8, storeId?: string): Promise<Product[]> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<Product[]>("/storefront/products/featured", {
    params: { storeId: resolvedStoreId, limit },
  });
  return res.data;
}

export async function fetchProductBySlug(slug: string, storeId?: string): Promise<Product> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<Product>(`/storefront/products/slug/${slug}`, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function fetchNavigation(location: string, storeId?: string): Promise<NavigationMenu> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<NavigationMenu>(`/storefront/navigation/${location}`, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function fetchCart(storeId?: string, customerId?: string): Promise<CartSummary> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const resolvedCustomerId = customerId || getActiveCustomerId();
  const res = await api.get<CartSummary>("/storefront/cart", {
    params: { storeId: resolvedStoreId, customerId: resolvedCustomerId },
  });
  return res.data;
}

export async function addToCart(
  payload: { productId: string; variantId?: string; quantity: number },
  storeId?: string,
  customerId?: string,
): Promise<CartSummary> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const resolvedCustomerId = customerId || getActiveCustomerId();
  const res = await api.post<CartSummary>("/storefront/cart/add", payload, {
    params: { storeId: resolvedStoreId, customerId: resolvedCustomerId },
  });
  return res.data;
}

export async function updateCartItem(
  itemId: string,
  quantity: number,
  storeId?: string,
  customerId?: string,
): Promise<CartSummary> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const resolvedCustomerId = customerId || getActiveCustomerId();
  const res = await api.put<CartSummary>(`/storefront/cart/${itemId}`, { quantity }, {
    params: { storeId: resolvedStoreId, customerId: resolvedCustomerId },
  });
  return res.data;
}

export async function removeCartItem(
  itemId: string,
  storeId?: string,
  customerId?: string,
): Promise<CartSummary> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const resolvedCustomerId = customerId || getActiveCustomerId();
  const res = await api.delete<CartSummary>(`/storefront/cart/${itemId}`, {
    params: { storeId: resolvedStoreId, customerId: resolvedCustomerId },
  });
  return res.data;
}

export async function clearCart(storeId?: string, customerId?: string): Promise<CartSummary> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const resolvedCustomerId = customerId || getActiveCustomerId();
  const res = await api.delete<CartSummary>("/storefront/cart", {
    params: { storeId: resolvedStoreId, customerId: resolvedCustomerId },
  });
  return res.data;
}

export async function registerCustomer(
  payload: { name: string; email: string; password: string; phone?: string },
  storeId?: string,
): Promise<CustomerAuthResponse> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.post<CustomerAuthResponse>("/storefront/customers/register", payload, {
    params: { storeId: resolvedStoreId },
  });
  setCustomerAuth(res.data);
  return res.data;
}

export async function loginCustomer(
  payload: { email: string; password: string },
  storeId?: string,
): Promise<CustomerAuthResponse> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.post<CustomerAuthResponse>("/storefront/customers/login", payload, {
    params: { storeId: resolvedStoreId },
  });
  setCustomerAuth(res.data);
  return res.data;
}

export async function updateCustomer(
  id: string,
  payload: { name?: string; phone?: string; addresses?: Record<string, unknown>[] },
  storeId?: string,
): Promise<Customer> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.put<Customer>(`/storefront/customers/${id}`, payload, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function fetchCustomerOrders(id: string, storeId?: string): Promise<Order[]> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<Order[]>(`/storefront/customers/${id}/orders`, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function validateCoupon(code: string, orderAmount: number, storeId?: string): Promise<CouponValidation> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.post<CouponValidation>("/storefront/promotions/validate", { code, orderAmount }, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function getPaymentMethods(storeId?: string): Promise<PaymentMethod[]> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<PaymentMethod[]>("/storefront/payments/methods", {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function calculateShipping(orderAmount: number, region?: string, storeId?: string) {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.get<{ amount: number }>("/storefront/shipping/calculate", {
    params: { storeId: resolvedStoreId, orderAmount, region },
  });
  return res.data;
}

export async function createOrder(
  payload: {
    customerId: string;
    items: { productId: string; variantId?: string | null; productName: string; unitPrice: number; quantity: number }[];
    shippingAddress: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
    couponCode?: string;
    notes?: string;
    shippingCost?: number;
  },
  storeId?: string,
): Promise<Order> {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.post<Order>("/storefront/orders", payload, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export async function createInquiry(
  payload: { name: string; email: string; phone?: string; message: string; productId?: string },
  storeId?: string,
) {
  const resolvedStoreId = storeId || (await resolveStoreId());
  const res = await api.post<Record<string, unknown>>("/storefront/inquiries", payload, {
    params: { storeId: resolvedStoreId },
  });
  return res.data;
}

export { API_BASE_URL };
export default api;
