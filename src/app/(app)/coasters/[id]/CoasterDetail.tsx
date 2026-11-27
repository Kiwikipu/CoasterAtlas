"use client";

import Link from "next/link";
import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Scene from "@/components/Scene";
import { Rating } from "@/components/ui";
import { coasterById } from "@/data/coasters";
import { parkById } from "@/data/parks";
import { useAtlas } from "@/lib/store";

export default function CoasterDetail({ coasterId }: { coasterId: string }) {
  const c = coasterById(coasterId)!;
  const park = parkById(c.parkId)!;
  const { ridden, toggleRidden } = useAtlas();
  const done = ridden[c.id];
  const [fav, setFav] = useState(false);
  const [pop, setPop] = useState(false);

  const stats: [IconName, string, string][] = [
    ["height", "Hauteur", `${c.height} m`],
    ["gauge", "Vitesse", `${c.speed} km/h`],
    ["loop", "Inversions", `${c.inversions}`],
    ["ruler", "Longueur", `${c.length.toLocaleString("fr-FR")} m`],
  ];

  return (
    <main className="-mx-4">
      <div className="relative h-72 sm:h-80">
        <Scene art={c.art} sky={c.sky} rounded="rounded-none" />
        <div className="absolute inset-x-4 top-4 flex justify-between">
          <Link href={`/parcs/${park.id}`} aria-label="Retour" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <Icon name="back" />
          </Link>
          {done && (
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 text-sm font-semibold text-sage-dark shadow-sm">
              <Icon name="check" size={16} strokeWidth={2.6} /> Fait
            </span>
          )}
        </div>
      </div>

      <div className="relative -mt-10 rounded-t-[2rem] bg-cream px-4 pt-5">
        <h1 className="font-display text-3xl font-semibold">{c.name}</h1>
        <Link href={`/parcs/${park.id}`} className="text-navy/60 hover:underline">
          {park.name} {park.flag}
        </Link>
        <div className="mt-1">
          <Rating value={c.rating} reviews={c.reviews} size="lg" />
        </div>
        {c.rank && <p className="mt-1 font-semibold text-coral">#{c.rank} au classement mondial des Atlasters</p>}

        <div className="mt-4 grid grid-cols-4 gap-2">
          {stats.map(([icon, label, value]) => (
            <div key={label} className="flex flex-col items-center gap-1 rounded-2xl bg-white py-3 text-center shadow-sm shadow-navy/5">
              <Icon name={icon} size={22} className="text-navy/70" />
              <p className="text-[11px] text-navy/55">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <dl className="card mt-4 divide-y divide-navy/5 px-4">
          {[
            ["Constructeur", c.manufacturer],
            ["Ouverture", String(c.opened)],
            ["Type", c.type],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-3">
              <dt className="text-navy/60">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between py-3">
            <dt className="text-navy/60">Intensité</dt>
            <dd className="flex items-center gap-2 font-semibold">
              <span className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`h-2.5 w-2.5 rounded-full ${n <= Math.round(c.intensity) ? "bg-coral" : "bg-navy/10"}`} />
                ))}
              </span>
              {c.intensity.toLocaleString("fr-FR")} / 5
            </dd>
          </div>
        </dl>

        <p className="mt-3 text-xs text-navy/45">Chiffres indicatifs (données d&apos;exemple).</p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => {
              if (!done) {
                setPop(true);
                setTimeout(() => setPop(false), 900);
              }
              toggleRidden(c.id);
            }}
            className={`relative flex-1 rounded-full py-3.5 font-display font-semibold shadow-md transition ${
              done ? "bg-[#eef7ec] text-sage-dark shadow-none" : "bg-coral text-white shadow-coral/30 hover:brightness-95"
            }`}
          >
            {done ? "✓ Dans ton atlas (annuler)" : "Je l'ai fait !"}
            {pop && <span className="absolute -top-8 left-1/2 -translate-x-1/2 animate-fade-up text-2xl">🎢✨</span>}
          </button>
          <button
            onClick={() => setFav((f) => !f)}
            aria-label="Favori"
            className="flex h-13 w-13 items-center justify-center rounded-full border border-coral/40 bg-white"
            style={{ width: 52, height: 52 }}
          >
            <Icon name="heart" filled={fav} className="text-coral" />
          </button>
        </div>
      </div>
    </main>
  );
}
