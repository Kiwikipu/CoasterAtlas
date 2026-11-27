"use client";

import Link from "next/link";
import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Scene from "@/components/Scene";
import Stamp from "@/components/Stamp";
import { BackHeader } from "@/components/ui";
import { SOUVENIRS } from "@/data/demo";
import { parkById } from "@/data/parks";
import { formatDate } from "@/lib/store";

export default function SouvenirView({ souvenirId, isNew }: { souvenirId: string; isNew: boolean }) {
  const s = SOUVENIRS.find((x) => x.id === souvenirId)!;
  const p = parkById(s.parkId)!;
  const [msg, setMsg] = useState<string | null>(null);
  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 2200);
  };

  const actions: [IconName, string, () => void][] = [
    [
      "share",
      "Partager",
      async () => {
        try {
          if (navigator.share) await navigator.share({ title: `${p.name} · CoasterAtlas`, url: window.location.href });
          else {
            await navigator.clipboard.writeText(window.location.href);
            flash("Lien copié !");
          }
        } catch {}
      },
    ],
    ["download", "Télécharger", () => window.print()],
    ["printer", "Imprimer", () => window.print()],
    ["book", "Ajouter au carnet", () => flash("Ajouté à ton carnet de voyage 📖")],
  ];

  return (
    <main>
      <BackHeader title={isNew ? "Créer un souvenir" : "Carnet de voyage"} href="/carnet" />

      {isNew && (
        <div className="mb-4 text-center">
          <p className="font-display text-xl font-semibold">Ton souvenir est prêt ! ✨</p>
          <p className="text-sm text-navy/60">Ton aventure à {p.name} a été ajoutée à ton carnet.</p>
        </div>
      )}

      {/* La carte postale */}
      <div className="relative mx-auto max-w-lg -rotate-1 rounded-2xl bg-white p-3 shadow-[0_14px_40px_-16px_rgba(31,42,77,0.4)]">
        <div className="relative h-64 overflow-hidden rounded-xl sm:h-72">
          <Scene art={s.photos[0].art} sky={s.photos[0].sky} rounded="rounded-none" />
          <div className="absolute left-4 top-3 text-white drop-shadow-[0_2px_6px_rgba(31,42,77,0.5)]">
            <p className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">{p.name}</p>
            <p className="font-display text-lg">{formatDate(s.date, true)}</p>
          </div>
          <div className="absolute bottom-3 right-3">
            <Stamp status="visite" art={p.art} label={p.name} sublabel={formatDate(s.date)} size={92} rotate={-12} animate={false} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {actions.map(([icon, label, f]) => (
          <button key={label} onClick={f} className="flex flex-col items-center gap-1.5 text-xs font-semibold text-navy/70">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm shadow-navy/10">
              <Icon name={icon} />
            </span>
            {label}
          </button>
        ))}
      </div>
      {msg && <p className="mt-3 text-center text-sm font-semibold text-sage-dark animate-fade-up">{msg}</p>}

      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          [s.attractions, "Attractions", "text-peach"],
          [`${s.distanceKm.toLocaleString("fr-FR")} km`, "Distance", "text-coral"],
          [`☀ ${s.weather}°`, "Météo", "text-[#e9a23b]"],
        ].map(([v, l, c]) => (
          <div key={l} className="rounded-2xl bg-white py-3 text-center shadow-sm shadow-navy/5">
            <p className={`font-display text-xl font-semibold ${c}`}>{v}</p>
            <p className="text-[11px] text-navy/55">{l}</p>
          </div>
        ))}
      </div>

      <div className="card mt-4 flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdeceb] text-coral">
          <Icon name="coaster" />
        </span>
        <div className="flex-1">
          <p className="text-xs text-navy/50">Attraction préférée</p>
          <p className="font-semibold">{s.favorite}</p>
        </div>
        <span className="flex items-center gap-1 font-semibold text-coral">
          <Icon name="star" size={16} filled className="text-[#f5b942]" strokeWidth={1} /> {s.favoriteRating.toLocaleString("fr-FR")}
        </span>
      </div>

      <p className="mt-4 px-1 text-lg">{s.note} ❤️</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {s.photos.map((ph, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-2xl">
            <Scene art={ph.art} sky={ph.sky} rounded="rounded-none" />
          </div>
        ))}
      </div>

      <Link href="/carnet" className="mt-6 block rounded-full bg-teal py-3.5 text-center font-display font-semibold text-white shadow-md shadow-teal/30 hover:bg-teal-dark">
        Voir tous mes souvenirs
      </Link>
    </main>
  );
}
