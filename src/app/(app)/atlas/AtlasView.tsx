"use client";

import Link from "next/link";
import Art from "@/components/Art";
import Icon, { type IconName } from "@/components/Icon";
import Stamp from "@/components/Stamp";
import WorldMap from "@/components/WorldMap";
import { Avatar, Progress, SectionTitle } from "@/components/ui";
import { BADGES, CHALLENGES, USER } from "@/data/demo";
import { PARKS } from "@/data/parks";
import { useAtlas, useStats } from "@/lib/store";
import type { WorldData } from "@/lib/world";

export default function AtlasView({ world }: { world: WorldData }) {
  const stats = useStats();
  const { statuses, reset } = useAtlas();
  const visited = PARKS.filter((p) => statuses[p.id] === "visite");
  const xp = 2350 + stats.parks * 150 + stats.coasters * 40;
  const level = Math.floor(xp / 1000) + 1;

  return (
    <main className="pt-4">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Mon Atlas</h1>
        <Avatar name={USER.firstName} size={48} />
      </header>

      <div className="card mt-4 flex items-center gap-4 p-4">
        <Avatar name={USER.firstName} size={64} />
        <div className="flex-1">
          <p className="font-display text-xl font-semibold">{USER.firstName}</p>
          <p className="text-sm text-navy/60">
            {USER.title} · Niveau {level}
          </p>
          <Progress value={(xp % 1000) / 1000} color="#c9a7e8" className="mt-2" />
          <p className="mt-1 text-xs text-navy/50">{xp.toLocaleString("fr-FR")} XP · encore {1000 - (xp % 1000)} XP avant le niveau {level + 1}</p>
        </div>
      </div>

      <div className="card mt-4 overflow-hidden">
        <WorldMap world={world} interactive={false} stampPx={7} className="h-52 bg-ocean sm:h-72" />
        <div className="grid grid-cols-3 gap-2 p-4 text-center">
          <div>
            <p className="font-display text-2xl font-semibold text-teal-dark">{stats.parks}</p>
            <p className="text-xs text-navy/55">Parcs visités</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-peach">{stats.coasters}</p>
            <p className="text-xs text-navy/55">Coasters faits</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-sage-dark">{stats.countries}</p>
            <p className="text-xs text-navy/55">Pays visités</p>
          </div>
        </div>
        <Link href="/carte" className="flex items-center justify-center gap-2 border-t border-navy/5 py-3 text-sm font-semibold text-teal-dark hover:bg-cream">
          Ouvrir ma carte <Icon name="chevron" size={16} />
        </Link>
      </div>

      <SectionTitle title="Badges" href="/defis" />
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
        {BADGES.map((b) => (
          <div key={b.label} className="flex w-20 shrink-0 flex-col items-center gap-1.5 text-center">
            <span
              className={`flex h-18 w-18 items-center justify-center rounded-full text-white shadow-md ${b.unlocked ? "" : "opacity-35 grayscale"}`}
              style={{ backgroundColor: b.color, width: 68, height: 68, boxShadow: `0 6px 16px -6px ${b.color}` }}
            >
              <Art kind={b.art} size={38} strokeWidth={6} />
            </span>
            <span className="text-xs font-semibold text-navy/70">{b.label}</span>
          </div>
        ))}
      </div>

      <SectionTitle title="Ton passeport" href="/passeport" linkLabel="Ouvrir" />
      <Link href="/passeport" className="card relative block overflow-hidden bg-[#fbf3e6] p-4">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(0deg,transparent_0_22px,#e9dcc6_22px_23px)]" />
        <div className="relative flex flex-wrap justify-center gap-1">
          {visited.slice(0, 5).map((p, i) => (
            <Stamp key={p.id} status="visite" art={p.art} label={p.name} size={84} rotate={[-10, 6, -4, 9, -7][i]} animate={false} />
          ))}
          {visited.length === 0 && <p className="py-6 text-navy/60">Ton premier tampon t&apos;attend !</p>}
        </div>
        <p className="relative mt-3 text-center text-sm font-semibold text-navy/70">Tous tes tampons, tous tes souvenirs</p>
      </Link>

      <SectionTitle title="Défis en cours" href="/defis" />
      <div className="grid gap-3 sm:grid-cols-2">
        {CHALLENGES.filter((c) => c.done < c.total)
          .slice(0, 2)
          .map((c) => (
            <Link key={c.id} href={`/defis/${c.id}`} className="card flex items-center gap-3 p-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: c.color + "22", color: c.color }}>
                <Art kind={c.art} size={30} strokeWidth={6} />
              </span>
              <div className="flex-1">
                <p className="font-semibold">{c.title}</p>
                <Progress value={c.done / c.total} color={c.color} className="mt-1" />
                <p className="mt-0.5 text-xs text-navy/55">
                  {c.done} / {c.total}
                </p>
              </div>
            </Link>
          ))}
      </div>

      <SectionTitle title="Raccourcis" />
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["/carnet", "Carnet de voyage", "camera", "#fef0e2", "#e08a3c"],
            ["/voyages", "Mes voyages", "suitcase", "#e3f4f3", "#3f9e9c"],
            ["/coasters", "Mes coasters", "coaster", "#f2ebfb", "#9a72c4"],
            ["/parcs", "Tous les parcs", "pin", "#e8f2fa", "#4f8fc0"],
          ] as [string, string, IconName, string, string][]
        ).map(([href, label, icon, bg, fg]) => (
          <Link key={href} href={href} className="card flex items-center gap-3 p-3 font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: bg, color: fg }}>
              <Icon name={icon} size={20} />
            </span>
            {label}
          </Link>
        ))}
      </div>

      <button onClick={reset} className="mx-auto mt-8 block text-xs text-navy/40 underline hover:text-navy/70">
        Réinitialiser le profil de démonstration
      </button>
    </main>
  );
}
