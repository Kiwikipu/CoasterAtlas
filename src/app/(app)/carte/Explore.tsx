"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Stamp from "@/components/Stamp";
import WorldMap, { type WorldMapHandle } from "@/components/WorldMap";
import { Rating } from "@/components/ui";
import { PARKS, STATUS_META, STATUS_ORDER, parkById, type StampStatus } from "@/data/parks";
import { useAtlas, useStats } from "@/lib/store";
import type { WorldData } from "@/lib/world";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Explore({ world }: { world: WorldData }) {
  const { statuses, toggleWishlist, markVisited, setStatus } = useAtlas();
  const stats = useStats();
  const mapRef = useRef<WorldMapHandle>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<Set<StampStatus>>(new Set(STATUS_ORDER));
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Paramètres d'adresse : ?parc=europa-park, ?q=disney, ?statut=wishlist
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parc = params.get("parc");
    const q = params.get("q");
    const statut = params.get("statut") as StampStatus | null;
    if (statut && STATUS_ORDER.includes(statut)) setFilter(new Set([statut]));
    if (q) {
      setQuery(q);
      setSearchOpen(true);
    }
    if (parc && parkById(parc)) {
      setSelected(parc);
      setTimeout(() => mapRef.current?.focus(parc, 5), 150);
    }
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = norm(query);
    return PARKS.filter((p) => norm(`${p.name} ${p.city} ${p.country}`).includes(q)).slice(0, 6);
  }, [query]);

  const counts = useMemo(() => {
    const c: Record<StampStatus, number> = { decouvrir: 0, wishlist: 0, visite: 0, prochain: 0, defi: 0 };
    PARKS.forEach((p) => c[statuses[p.id]]++);
    return c;
  }, [statuses]);

  const toggleFilter = (s: StampStatus) => {
    setFilter((prev) => {
      const all = prev.size === STATUS_ORDER.length;
      if (all) return new Set([s]);
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next.size === 0 ? new Set(STATUS_ORDER) : next;
    });
  };

  const pick = (id: string) => {
    setSelected(id);
    setSearchOpen(false);
    setQuery("");
    mapRef.current?.focus(id, 5);
  };

  const park = selected ? parkById(selected) : null;
  const status = park ? statuses[park.id] : null;

  return (
    <main className="pt-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Explorer</h1>
        <Link href="/parcs" className="flex items-center gap-1 text-sm font-semibold text-teal-dark">
          <Icon name="list" size={17} /> Liste des parcs
        </Link>
      </div>

      <div className="relative z-30 mt-3">
        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm shadow-navy/10">
          <Icon name="search" className="text-navy/50" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Rechercher un parc, une ville, un pays…"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-navy/40"
            aria-label="Rechercher un parc"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Effacer">
              <Icon name="x" size={18} className="text-navy/50" />
            </button>
          )}
        </div>
        {searchOpen && results.length > 0 && (
          <ul className="card absolute inset-x-0 top-full mt-2 overflow-hidden p-1">
            {results.map((p) => (
              <li key={p.id}>
                <button onClick={() => pick(p.id)} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left hover:bg-cream">
                  <span className="h-3 w-3 rounded-full border-2" style={{ borderColor: STATUS_META[statuses[p.id]].ink, backgroundColor: STATUS_META[statuses[p.id]].fill }} />
                  <span className="flex-1">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-xs text-navy/55">
                      {p.city}, {p.country}
                    </span>
                  </span>
                  <span>{p.flag}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {searchOpen && query && results.length === 0 && (
          <p className="card absolute inset-x-0 top-full mt-2 p-4 text-sm text-navy/60">Aucun parc trouvé pour « {query} ».</p>
        )}
      </div>

      {/* Légende = filtres */}
      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {STATUS_ORDER.map((s) => {
          const m = STATUS_META[s];
          const on = filter.has(s);
          return (
            <button
              key={s}
              onClick={() => toggleFilter(s)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${on ? "bg-white shadow-sm" : "border-transparent bg-white/40 opacity-50"}`}
              style={{ borderColor: on ? m.ink + "55" : undefined, color: m.ink }}
              aria-pressed={on}
            >
              <span className="h-3.5 w-3.5 rounded-full border-2" style={{ borderColor: m.ink, backgroundColor: m.fill }} />
              {m.label}
              <span className="text-xs opacity-70">{counts[s]}</span>
            </button>
          );
        })}
      </div>

      <div className="relative left-1/2 mt-3 w-screen -translate-x-1/2 px-0 sm:px-4">
        <div className="relative mx-auto max-w-6xl overflow-hidden sm:rounded-3xl sm:shadow-sm">
          <WorldMap
            ref={mapRef}
            world={world}
            fill
            filter={filter}
            selected={selected}
            onSelect={setSelected}
            className="h-[calc(100dvh-235px)] min-h-[420px]"
          />

          <p className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs text-navy/60">
            Pince ou fais défiler pour zoomer
          </p>

          {park && status ? (
            <div key={park.id} className="absolute inset-x-3 bottom-3 mx-auto max-w-lg animate-fade-up">
              <div className="card p-4">
                <div className="flex items-start gap-3">
                  <Stamp status={status} art={status === "visite" || status === "decouvrir" ? park.art : undefined} size={72} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold leading-tight">{park.name}</p>
                    <p className="text-sm text-navy/60">
                      {park.flag} {park.city}, {park.country}
                    </p>
                    <Rating value={park.rating} reviews={park.reviews} />
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Fermer" className="-mr-1 -mt-1 rounded-full p-1.5 text-navy/50 hover:bg-cream">
                    <Icon name="x" size={18} />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {[
                    [park.coasters, "Coasters"],
                    [park.attractions, "Attractions"],
                    [park.shows, "Spectacles"],
                  ].map(([v, l]) => (
                    <div key={l} className="rounded-2xl bg-cream py-2">
                      <p className="font-display text-lg font-semibold">{v}</p>
                      <p className="text-[11px] text-navy/55">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  {status === "visite" ? (
                    <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#eef7ec] py-2.5 text-sm font-semibold text-sage-dark">
                      <Icon name="check" size={17} /> Parc visité
                    </span>
                  ) : (
                    <button onClick={() => markVisited(park.id)} className="flex-1 rounded-full bg-teal py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/30 hover:bg-teal-dark">
                      J&apos;y suis allé !
                    </button>
                  )}
                  <button
                    onClick={() => (status === "visite" ? setStatus(park.id, "wishlist") : toggleWishlist(park.id))}
                    aria-label="Wishlist"
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${status === "wishlist" ? "border-sky bg-[#eaf4fb]" : "border-navy/10 bg-white"}`}
                  >
                    <Icon name="heart" size={19} filled={status === "wishlist"} className="text-coral" />
                  </button>
                  <Link href={`/parcs/${park.id}`} className="flex items-center rounded-full border border-navy/10 bg-white px-4 text-sm font-semibold hover:bg-cream">
                    Fiche
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-x-3 bottom-3 mx-auto max-w-lg">
              <div className="card px-4 py-3">
                <p className="mb-2 text-sm font-semibold text-navy/70">Ton atlas en chiffres</p>
                <div className="grid grid-cols-4 gap-1 text-center">
                  {[
                    [stats.parks, "parcs visités"],
                    [stats.coasters, "coasters faits"],
                    [stats.countries, "pays visités"],
                    [stats.km.toLocaleString("fr-FR"), "km de rails"],
                  ].map(([v, l]) => (
                    <div key={l as string}>
                      <p className="font-display text-lg font-semibold">{v}</p>
                      <p className="text-[10px] leading-tight text-navy/55">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
