"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import Scene from "@/components/Scene";
import { BackHeader, Rating } from "@/components/ui";
import { COASTERS } from "@/data/coasters";
import { parkById } from "@/data/parks";
import { useAtlas, useStats } from "@/lib/store";

export default function CoastersPage() {
  const { ridden, toggleRidden } = useAtlas();
  const stats = useStats();
  return (
    <main>
      <BackHeader title="Coasters" />
      <div className="card mb-4 flex items-center justify-between bg-gradient-to-r from-white to-[#fdeee8] p-4">
        <div>
          <p className="font-display text-2xl font-semibold text-coral">{stats.coasters}</p>
          <p className="text-sm text-navy/60">coasters dans ton atlas</p>
        </div>
        <p className="max-w-[55%] text-right text-sm text-navy/70">Coche ceux que tu as faits pour remplir ton atlas.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {COASTERS.map((c) => {
          const park = parkById(c.parkId)!;
          const done = ridden[c.id];
          return (
            <div key={c.id} className="card flex items-center gap-3 p-2 pr-3">
              <Link href={`/coasters/${c.id}`} className="h-18 w-20 shrink-0 overflow-hidden rounded-2xl" style={{ height: 72 }}>
                <Scene art={c.art} sky={c.sky} rounded="rounded-none" />
              </Link>
              <Link href={`/coasters/${c.id}`} className="min-w-0 flex-1">
                <p className="truncate font-display font-semibold">{c.name}</p>
                <p className="truncate text-sm text-navy/60">
                  {park.name} {park.flag}
                </p>
                <p className="flex items-center gap-2 text-xs text-navy/55">
                  <Rating value={c.rating} /> · {c.speed} km/h
                </p>
              </Link>
              <button
                onClick={() => toggleRidden(c.id)}
                aria-label={done ? "Retirer de mon atlas" : "Je l'ai fait"}
                aria-pressed={done}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  done ? "border-sage-dark bg-sage-dark text-white" : "border-navy/15 text-navy/30 hover:border-sage-dark hover:text-sage-dark"
                }`}
              >
                <Icon name="check" size={18} strokeWidth={3} />
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
