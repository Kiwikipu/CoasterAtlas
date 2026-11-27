"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import Scene from "@/components/Scene";
import { BackHeader } from "@/components/ui";
import { USER } from "@/data/demo";
import { PARKS, STATUS_META, distanceKm } from "@/data/parks";
import { useAtlas } from "@/lib/store";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function VisitPage() {
  const { statuses, markVisited } = useAtlas();
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      PARKS.filter((p) => !q || norm(`${p.name} ${p.city} ${p.country}`).includes(norm(q)))
        .map((p) => ({ p, km: distanceKm(USER.home, p) }))
        .sort((a, b) => Number(statuses[a.p.id] === "visite") - Number(statuses[b.p.id] === "visite") || a.km - b.km),
    [q, statuses],
  );

  return (
    <main>
      <BackHeader title="Je visite un parc" />
      <p className="mb-4 text-navy/65">Choisis le parc où tu es (ou que tu as visité) : un tampon va se poser dans ton passeport.</p>
      <div className="mb-4 flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm shadow-navy/10">
        <Icon name="search" className="text-navy/50" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un parc…" className="flex-1 bg-transparent outline-none" aria-label="Rechercher un parc" />
      </div>
      <div className="flex flex-col gap-2.5">
        {list.map(({ p, km }) => {
          const st = statuses[p.id];
          const visited = st === "visite";
          return (
            <div key={p.id} className="card flex items-center gap-3 p-2 pr-3">
              <div className="h-14 w-16 shrink-0 overflow-hidden rounded-xl">
                <Scene art={p.art} sky={p.sky} rounded="rounded-none" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="truncate text-xs text-navy/55">
                  {p.flag} {p.country} · {km.toLocaleString("fr-FR")} km
                </p>
              </div>
              {visited ? (
                <span className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ color: STATUS_META.visite.ink, backgroundColor: STATUS_META.visite.soft }}>
                  ✓ Visité
                </span>
              ) : (
                <button onClick={() => markVisited(p.id)} className="rounded-full bg-teal px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-teal/30 hover:bg-teal-dark">
                  Tamponner
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
