"use client";

import Link from "next/link";
import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Scene from "@/components/Scene";
import { Progress } from "@/components/ui";
import { TRIPS } from "@/data/demo";
import { parkById } from "@/data/parks";
import { daysUntil, formatRange, useAtlas, useToday } from "@/lib/store";

type Tab = "voyage" | "billets" | "hotel" | "parking" | "checklist";
const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: "voyage", label: "Mon voyage", icon: "suitcase" },
  { id: "billets", label: "Billets", icon: "ticket" },
  { id: "hotel", label: "Hôtel", icon: "bed" },
  { id: "parking", label: "Parking", icon: "car" },
  { id: "checklist", label: "Checklist", icon: "list" },
];

export default function TripView({ tripId }: { tripId: string }) {
  const trip = TRIPS.find((t) => t.id === tripId)!;
  const park = parkById(trip.parkId)!;
  const today = useToday();
  const { checklist, toggleChecklist } = useAtlas();
  const [tab, setTab] = useState<Tab>("voyage");
  const [extra, setExtra] = useState<{ id: string; label: string }[]>([]);
  const [newItem, setNewItem] = useState("");
  const [local, setLocal] = useState<Record<string, boolean>>({});
  const items = [...trip.checklist, ...extra.map((e) => ({ ...e, done: false }))];
  const isDone = (id: string) => (id.startsWith("x-") ? !!local[id] : !!checklist[id]);
  const done = items.filter((i) => isDone(i.id)).length;
  const days = today ? daysUntil(trip.start, today) : null;

  return (
    <main className="-mx-4">
      <div className="relative h-56">
        <Scene art={park.art} sky={park.sky} rounded="rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
        <Link href="/voyages" aria-label="Retour" className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm">
          <Icon name="back" />
        </Link>
        <div className="absolute inset-x-4 bottom-12 text-white drop-shadow-[0_2px_8px_rgba(31,42,77,0.55)]">
          <p className="text-sm font-semibold">Prochain voyage</p>
          <p className="font-display text-3xl font-semibold">{park.name}</p>
          <p>{formatRange(trip.start, trip.end)}</p>
        </div>
      </div>

      <div className="relative -mt-8 rounded-t-[2rem] bg-cream px-4 pt-4">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${tab === t.id ? "bg-navy text-white" : "bg-white text-navy/65 shadow-sm shadow-navy/5"}`}
            >
              <Icon name={t.icon} size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-3 animate-fade-up" key={tab}>
          {tab === "voyage" && (
            <div className="flex flex-col gap-3">
              <div className="card flex items-center justify-between bg-gradient-to-r from-white to-[#fef0e2] p-4">
                <div>
                  <p className="font-display text-3xl font-semibold text-peach">{days ?? "…"}</p>
                  <p className="text-sm text-navy/60">jours avant le départ</p>
                </div>
                <div className="text-right text-sm text-navy/70">
                  <p className="font-semibold">{trip.travellers}</p>
                  <p>
                    {trip.transport.mode} · {park.city}
                  </p>
                </div>
              </div>
              {(
                [
                  ["billets", "ticket", "Billets", trip.tickets.map((t) => t.detail).join(" · "), "#e8f2fa", "#4f8fc0"],
                  ["hotel", "bed", "Hôtel", `${trip.hotel.name}`, "#e3f4f3", "#3f9e9c"],
                  ["parking", "car", "Parking", `${trip.parking.name} · ${trip.parking.price}`, "#fef0e2", "#e08a3c"],
                  ["voyage", "train", "Transport", trip.transport.detail, "#f2ebfb", "#9a72c4"],
                  ["checklist", "list", "Checklist", `${done}/${items.length} tâches complétées`, "#eef7ec", "#5f9e57"],
                ] as [Tab, IconName, string, string, string, string][]
              ).map(([target, icon, title, sub, bg, fg]) => (
                <button key={title} onClick={() => setTab(target)} className="card flex items-center gap-3 p-3 text-left">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: bg, color: fg }}>
                    <Icon name={icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{title}</span>
                    <span className="block truncate text-sm text-navy/55">{sub}</span>
                  </span>
                  <Icon name="chevron" className="text-navy/30" />
                </button>
              ))}
              <div className="card p-4">
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Icon name="pen" size={18} className="text-lilac-dark" /> Notes
                </p>
                <p className="text-navy/70">{trip.notes}</p>
              </div>
            </div>
          )}

          {tab === "billets" && (
            <div className="flex flex-col gap-3">
              <p className="text-navy/65">Tous tes billets au même endroit.</p>
              {trip.tickets.map((t) => (
                <div key={t.ref} className="card flex items-center gap-4 bg-gradient-to-br from-white to-[#eef7ec] p-4">
                  <div className="flex-1">
                    <p className="font-display text-lg font-semibold">{t.label}</p>
                    <p className="text-sm text-navy/65">{t.detail}</p>
                    <p className="mt-3 font-mono text-xs text-navy/45">{t.ref}</p>
                  </div>
                  <FakeQR seed={t.ref} />
                </div>
              ))}
              <button className="rounded-full bg-[#5b7fd1] py-3 font-semibold text-white shadow-md shadow-[#5b7fd1]/30">Ajouter un billet</button>
            </div>
          )}

          {tab === "hotel" && (
            <div className="card overflow-hidden">
              <div className="h-40">
                <Scene art={trip.hotel.art} sky="sunset" rounded="rounded-none" />
              </div>
              <div className="p-4">
                <p className="font-display text-xl font-semibold">{trip.hotel.name}</p>
                <p className="text-[#f5b942]">{"★".repeat(trip.hotel.stars)}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-cream p-3 text-sm">
                  <div>
                    <p className="font-semibold">{trip.start.slice(8)}/{trip.start.slice(5, 7)}</p>
                    <p className="text-navy/55">Check-in {trip.hotel.checkIn}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{trip.end.slice(8)}/{trip.end.slice(5, 7)}</p>
                    <p className="text-navy/55">Check-out {trip.hotel.checkOut}</p>
                  </div>
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm text-navy/70">
                  <Icon name="pin" size={18} className="shrink-0 text-coral" /> {trip.hotel.address}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-navy/70">
                  <Icon name="phone" size={18} className="text-teal-dark" /> {trip.hotel.phone}
                </p>
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(trip.hotel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full border border-navy/10 py-2.5 font-semibold text-[#5b7fd1]"
                >
                  Itinéraire <Icon name="pin" size={16} />
                </a>
              </div>
            </div>
          )}

          {tab === "parking" && (
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5b7fd1] text-white">
                  <Icon name="parking" />
                </span>
                <div>
                  <p className="font-semibold">{trip.parking.name}</p>
                  <p className="text-sm text-navy/55">{park.name}</p>
                </div>
              </div>
              <p className="mt-4 font-display text-2xl font-semibold">{trip.parking.price}</p>
              <ul className="mt-2 space-y-1 text-sm text-navy/70">
                {trip.parking.info.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon name="check" size={15} className="text-sage-dark" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold">À {trip.parking.walk}</p>
              <div className="relative mt-3 h-36 overflow-hidden rounded-2xl bg-[#eef3e6]">
                <svg viewBox="0 0 300 140" className="h-full w-full" aria-hidden="true">
                  <path d="M0 90 C80 70 140 110 300 60" stroke="#fff" strokeWidth="14" fill="none" />
                  <path d="M120 0 V140" stroke="#fff" strokeWidth="10" />
                  <rect x="170" y="80" width="80" height="40" rx="8" fill="#d6e8cf" />
                  <rect x="30" y="20" width="60" height="40" rx="8" fill="#d6e8cf" />
                </svg>
                <span className="absolute left-[44%] top-[30%] text-coral">
                  <Icon name="pin" size={34} filled strokeWidth={1.2} />
                </span>
              </div>
              <Link href={`/carte?parc=${park.id}`} className="mt-4 block rounded-full bg-[#5b7fd1] py-3 text-center font-semibold text-white">
                Voir sur la carte
              </Link>
            </div>
          )}

          {tab === "checklist" && (
            <div className="card p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold">Rien n&apos;est oublié</p>
                <p className="text-sm font-semibold text-navy/55">
                  {done}/{items.length}
                </p>
              </div>
              <Progress value={done / items.length} color="#5f9e57" className="mb-3" />
              <ul>
                {items.map((i) => {
                  const d = isDone(i.id);
                  return (
                    <li key={i.id}>
                      <button
                        onClick={() => (i.id.startsWith("x-") ? setLocal((l) => ({ ...l, [i.id]: !l[i.id] })) : toggleChecklist(i.id))}
                        className="flex w-full items-center gap-3 border-b border-navy/5 py-2.5 text-left"
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition ${d ? "border-sage-dark bg-sage-dark text-white" : "border-navy/20"}`}>
                          {d && <Icon name="check" size={14} strokeWidth={3} />}
                        </span>
                        <span className={d ? "text-navy/50 line-through" : ""}>{i.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newItem.trim()) return;
                  setExtra((x) => [...x, { id: `x-${Date.now()}`, label: newItem.trim() }]);
                  setNewItem("");
                }}
              >
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Ajouter une tâche"
                  className="min-w-0 flex-1 rounded-full bg-cream px-4 py-2 outline-none focus:ring-2 focus:ring-teal"
                />
                <button className="rounded-full bg-teal px-4 font-semibold text-white">+</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Faux QR code (décoratif), toujours le même pour une même référence
function FakeQR({ seed }: { seed: string }) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => ((h = (h * 1103515245 + 12345) >>> 0) / 2 ** 32);
  const n = 17;
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const inFinder = (x < 5 && y < 5) || (x > n - 6 && y < 5) || (x < 5 && y > n - 6);
      if (!inFinder && rand() > 0.52) cells.push([x, y]);
    }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="5" height="5" fill="#1f2a4d" />
      <rect x={x + 1} y={y + 1} width="3" height="3" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="1" height="1" fill="#1f2a4d" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} width="88" height="88" className="shrink-0 rounded-lg bg-white" aria-label="QR code du billet">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1f2a4d" />
      ))}
      {finder(0, 0)}
      {finder(n - 5, 0)}
      {finder(0, n - 5)}
    </svg>
  );
}
