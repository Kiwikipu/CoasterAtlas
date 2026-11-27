"use client";

// État du profil de démonstration, gardé dans le navigateur (localStorage).
// Plus tard, ces données viendront d'un compte Atlaster et d'une base de données.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PARKS, type StampStatus } from "@/data/parks";
import { COASTERS } from "@/data/coasters";
import { TRIPS } from "@/data/demo";

type State = {
  statuses: Record<string, StampStatus>;
  ridden: Record<string, boolean>;
  checklist: Record<string, boolean>;
  visitedAt: Record<string, string>;
  justStamped: string | null;
  waitlist: { firstName: string; email: string } | null;
};

const initial: State = {
  statuses: Object.fromEntries(PARKS.map((p) => [p.id, p.status])),
  ridden: Object.fromEntries(COASTERS.map((c) => [c.id, c.ridden])),
  checklist: Object.fromEntries(TRIPS.flatMap((t) => t.checklist.map((i) => [i.id, i.done]))),
  visitedAt: {},
  justStamped: null,
  waitlist: null,
};

type Ctx = State & {
  setStatus: (parkId: string, s: StampStatus) => void;
  markVisited: (parkId: string) => void;
  toggleWishlist: (parkId: string) => void;
  toggleRidden: (coasterId: string) => void;
  toggleChecklist: (itemId: string) => void;
  clearStamp: () => void;
  joinWaitlist: (w: { firstName: string; email: string }) => void;
  reset: () => void;
};

const AtlasContext = createContext<Ctx | null>(null);
const KEY = "coasteratlas-demo-v1";

export function AtlasProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const s = JSON.parse(saved) as Partial<State>;
        setState((prev) => ({
          ...prev,
          ...s,
          statuses: { ...prev.statuses, ...s.statuses },
          ridden: { ...prev.ridden, ...s.ridden },
          checklist: { ...prev.checklist, ...s.checklist },
          justStamped: null,
        }));
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      const { justStamped: _ignored, ...rest } = state;
      void _ignored;
      localStorage.setItem(KEY, JSON.stringify(rest));
    } catch {}
  }, [state, loaded]);

  const setStatus = useCallback((parkId: string, s: StampStatus) => {
    setState((prev) => ({ ...prev, statuses: { ...prev.statuses, [parkId]: s } }));
  }, []);

  const markVisited = useCallback((parkId: string) => {
    setState((prev) => ({
      ...prev,
      statuses: { ...prev.statuses, [parkId]: "visite" },
      visitedAt: { ...prev.visitedAt, [parkId]: new Date().toISOString().slice(0, 10) },
      justStamped: parkId,
    }));
  }, []);

  const toggleWishlist = useCallback((parkId: string) => {
    setState((prev) => {
      const cur = prev.statuses[parkId];
      const next: StampStatus = cur === "wishlist" ? "decouvrir" : "wishlist";
      return { ...prev, statuses: { ...prev.statuses, [parkId]: next } };
    });
  }, []);

  const toggleRidden = useCallback((id: string) => {
    setState((prev) => ({ ...prev, ridden: { ...prev.ridden, [id]: !prev.ridden[id] } }));
  }, []);

  const toggleChecklist = useCallback((id: string) => {
    setState((prev) => ({ ...prev, checklist: { ...prev.checklist, [id]: !prev.checklist[id] } }));
  }, []);

  const clearStamp = useCallback(() => setState((prev) => ({ ...prev, justStamped: null })), []);
  const joinWaitlist = useCallback((w: { firstName: string; email: string }) => setState((prev) => ({ ...prev, waitlist: w })), []);
  const reset = useCallback(() => setState(initial), []);

  const value = useMemo(
    () => ({ ...state, setStatus, markVisited, toggleWishlist, toggleRidden, toggleChecklist, clearStamp, joinWaitlist, reset }),
    [state, setStatus, markVisited, toggleWishlist, toggleRidden, toggleChecklist, clearStamp, joinWaitlist, reset],
  );

  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>;
}

export function useAtlas() {
  const ctx = useContext(AtlasContext);
  if (!ctx) throw new Error("useAtlas doit être utilisé dans <AtlasProvider>");
  return ctx;
}

// Chiffres de « Ton Atlas », calculés à partir des tampons et des coasters cochés.
export function useStats() {
  const { statuses, ridden } = useAtlas();
  return useMemo(() => {
    const visited = PARKS.filter((p) => statuses[p.id] === "visite");
    const countries = new Set(visited.map((p) => p.countryCode));
    const coasters = COASTERS.filter((c) => ridden[c.id]);
    const km = coasters.reduce((sum, c) => sum + c.length, 0) / 1000;
    return {
      parks: visited.length,
      countries: countries.size,
      countryCodes: countries,
      coasters: coasters.length,
      km: Math.round(km * 10) / 10,
    };
  }, [statuses, ridden]);
}

// Date du jour côté navigateur (évite les écarts entre le rendu serveur et le navigateur)
export function useToday() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  return today;
}

export { daysUntil, formatDate, formatRange } from "./dates";
