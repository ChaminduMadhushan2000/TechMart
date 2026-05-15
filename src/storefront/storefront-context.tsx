import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { StorefrontConfig } from "../types/storefront";
import { resolveStoreConfig } from "../api";

interface StorefrontState {
  config: StorefrontConfig | null;
  storeId: string | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const StorefrontContext = createContext<StorefrontState | undefined>(undefined);

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<StorefrontConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cfg = await resolveStoreConfig();
      setConfig(cfg);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load store config";
      setError(message);
      setConfig(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<StorefrontState>(() => {
    return {
      config,
      storeId: config?.id ?? null,
      loading,
      error,
      refresh,
    };
  }, [config, loading, error, refresh]);

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

export function useStorefront(): StorefrontState {
  const ctx = useContext(StorefrontContext);
  if (!ctx) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }
  return ctx;
}
