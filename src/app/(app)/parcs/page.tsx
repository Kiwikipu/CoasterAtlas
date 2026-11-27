"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import Scene from "@/components/Scene";
import { BackHeader, Chip, Rating } from "@/components/ui";
import { PARKS, STATUS_META, STATUS_ORDER, type StampStatus } from "@/data/parks";
import { useAtlas } from "@/lib/store";

export default function ParksPage() {
  const { statuses } = useAtlas();
  const [filter, setFilter] = useState<StampStatus | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const countries = useMemo(() => [...new Set(PARKS.map((p) => p.country))].sort(), []);
  const list = PARKS.filter((p) => (!filter || statuses[p.id] === filter) && (!country || p.country === country));

  return (
    <main>
      <BackHeader title="Tous les parcs" />
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
        <Chip active={!filter} onClick={() => setFilter(null)}>Tous</Chip>
        {STATUS_ORDER.map((s) => (
          <Chip key={s} active={filter === s} color={STATUS_META[s].ink} onClick={() => setFilter(filter === s ? null : s)}>
            {STATUS_META[s].label}
          </Chip>
        ))}
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
        {countries.map((c) => (
          <Chip key={c} active={country === c} onClick={() => setCountry(country === c ? null : c)}>
            {PARKS.find((p) => p.country === c)?.flag} {c}
          </Chip>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => {
          const m = STATUS_META[statuses[p.id]];
          return (
            <Link key={p.id} href={`/parcs/${p.id}`} className="card flex items-center gap-3 overflow-hidden p-2 pr-4 transition hover:-translate-y-0.5">
              <div className="h-20 w-24 shrink-0 overflow-hidden rounded-2xl">
                <Scene art={p.art} sky={p.sky} rounded="rounded-none" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-semibold">{p.name}</p>
                <p className="truncate text-sm text-navy/60">
                  {p.flag} {p.city}, {p.country}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  <Rating value={p.rating} />
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ color: m.ink, backgroundColor: m.soft }}>
                    {m.label}
                  </span>
                </div>
              </div>
              <Icon name="chevron" className="text-navy/30" />
            </Link>
          );
        })}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-navy/60">Aucun parc avec ces filtres.</p>}
    </main>
  );
}
