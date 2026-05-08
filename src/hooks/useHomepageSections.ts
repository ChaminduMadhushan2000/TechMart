import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { fetchHomepageSections, STORE_ID } from "../api";
import type { HomepageSection } from "../api";

const WS_URL = "http://localhost:3001/homepage";

/**
 * Custom hook that:
 * 1. Fetches active homepage sections from the API on mount
 * 2. Connects to WebSocket and joins the store room
 * 3. Listens for "homepage:updated" events and updates state in real-time
 * 4. Falls back to null (caller provides defaults) if API is unreachable
 */
export function useHomepageSections() {
  const [sections, setSections] = useState<HomepageSection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Fetch sections from API
  const loadSections = useCallback(async () => {
    try {
      const data = await fetchHomepageSections();
      setSections(data);
      setError(null);
    } catch (err) {
      console.warn("Failed to fetch homepage sections, using defaults:", err);
      setError("API unreachable");
      // sections stay null → caller uses defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    loadSections();

    // Connect to WebSocket
    const socket = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[TechMart] WebSocket connected:", socket.id);
      // Join the store room so we only receive updates for our store
      // TODO: replace hardcoded storeId
      socket.emit("join-store", { storeId: STORE_ID });
    });

    socket.on("homepage:updated", (data: { storeId: string; sections: HomepageSection[] }) => {
      console.log("[TechMart] Received homepage:updated", data.sections.length, "sections");
      setSections(data.sections);
    });

    socket.on("disconnect", (reason) => {
      console.log("[TechMart] WebSocket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.warn("[TechMart] WebSocket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [loadSections]);

  return { sections, loading, error };
}
