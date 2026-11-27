"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import Scene from "@/components/Scene";
import { BackHeader, Progress } from "@/components/ui";
import { TRIPS } from "@/data/demo";
import { parkById } from "@/data/parks";
import { daysUntil, formatRange, useAtlas, useToday } from "@/lib/store";

const MOMENTS = [
  { title: "Avant", sub: "Préparer", items: "Billets, réservations, checklist, wishlist", color: "#6cc3c1" },
  { title: "Pendant", sub: "Profiter", items: "Carte, attractions, notes et photos, défis", color: "#a8d5a2" },
  { title: "Après", sub: "Revivre", items: "Souvenirs, album, ton Atlas, statistiques", color: "#c9a7e8" },
];

export default function TripsPage() {
  const today = useToday();
  const { checklist } = useAtlas();
  return (
    <main>
      <BackHeader title="Mes voyages" />
      <p className="mb-4 text-navy/65">Tout au même endroit, avant, pendant et après ton voyage.</p>
      <div className="flex flex-col gap-4">
        {TRIPS.map((t) => {
          const p = parkById(t.parkId)!;
          const done = t.checklist.filter((i) => checklist[i.id]).length;
          const days = today ? daysUntil(t.start, today) : null;
          return (
            <Link key={t.id} href={`/voyages/${t.id}`} className="card overflow-hidden transition hover:-translate-y-0.5">
              <div className="relative h-36">
                <Scene art={p.art} sky={p.sky} rounded="rounded-none" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-peach">
                  ✈ {days === null ? "…" : `Plus que ${days} jours`}
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-xl font-semibold">{p.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-navy/60">
                  <Icon name="calendar" size={15} /> {formatRange(t.start, t.end)} · {t.travellers}
                </p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <Progress value={done / t.checklist.length} />
                  <span className="shrink-0 font-semibold text-navy/60">
                    {done}/{t.checklist.length}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        <Link href="/parcs" className="flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-teal/50 py-3 font-semibold text-teal-dark hover:bg-white">
          + Préparer un nouveau voyage
        </Link>
      </div>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Les 3 moments de ton voyage</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {MOMENTS.map((m) => (
          <div key={m.title} className="card border-l-4 p-4" style={{ borderLeftColor: m.color }}>
            <p className="font-display text-lg font-semibold" style={{ color: m.color }}>
              {m.title}
            </p>
            <p className="font-semibold">{m.sub}</p>
            <p className="mt-1 text-sm text-navy/60">{m.items}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
