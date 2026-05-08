import axios from "axios";

// TODO: replace hardcoded storeId with dynamic value from store config
const STORE_ID = "aa9e3bda-60d3-4b10-be5f-2685e15c7f1b";

const API_BASE = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export interface HomepageSection {
  storeId: string;
  type: string;
  label: string;
  isActive: boolean;
  sortOrder: number;
  config: Record<string, unknown>;
  createdAt: string;
}

export async function fetchHomepageSections(): Promise<HomepageSection[]> {
  const res = await api.get<HomepageSection[]>(
    `/storefront/homepage/sections`,
    {
      params: { storeId: STORE_ID },
    }
  );
  return res.data;
}

export { STORE_ID };
export default api;
