"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import Art from "@/components/Art";
import Icon from "@/components/Icon";
import { LogoMark } from "@/components/Logo";
import Scene from "@/components/Scene";
import WorldMap from "@/components/WorldMap";
import { Progress, Rating, SectionTitle } from "@/components/ui";
import { CHALLENGES, NEWS, SOUVENIRS, TRIPS, USER } from "@/data/demo";
import { PARKS, distanceKm, parkById } from "@/data/parks";
import { daysUntil, formatDate, formatRange, useAtlas, useStats, useToday } from "@/lib/store";
import type { WorldData } from "@/lib/world";

export default function Home({ world }: { world: WorldData }) {
  const router = useRouter();
  const today = useToday();
  const stats = useStats();
  const { statuses, toggleWishlist } = useAtlas();
  const [here, setHere] = useState<{ lat: number; lon: number; label: string }>({ ...USER.home, label: USER.home.name });
  const [query, setQuery] = useState("");

  const nearby = useMemo(
    () => PARKS.map((p) => ({ p, km: distanceKm(here, p) })).sort((a, b) => a.km - b.km).slice(0, 6),
    [here],
  );
  const trip = TRIPS[0];
  const tripPark = parkById(trip.parkId)!;
  const days = today ? daysUntil(trip.start, today) : null;
  const challenge = CHALLENGES[0];
  const souvenir = SOUVENIRS[0];
  const souvenirPark = parkById(souvenir.parkId)!;

  const locate = () => {
    navigator.geolocation?.getCurrentPosition((pos) =>
      setHere({ lat: pos.coords.latitude, lon: pos.coords.longitude, label: "ta position" }),
    );
  };

  return (
    <main>
      <AppHeader />

      <section className="relative mt-4 flex items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Bonjour {USER.firstName} ! <span className="inline-block origin-bottom-right animate-[wave_2s_ease-in-out_1]">👋</span>
          </h1>
          <p className="mt-1 text-lg text-navy/75">Où t&apos;emmène ton prochain frisson aujourd&apos;hui ?</p>
        </div>
        <LogoMark size={96} className="hidden shrink-0 sm:block" />
      </section>

      <div className="no-scrollbar -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1">
        <QuickCard value={days ?? "…"} unit="jours" text={`avant ${tripPark.name}`} icon="castle" color="text-coral" href={`/voyages/${trip.id}`} />
        <QuickCard value={Math.max(0, USER.objective2027 - 2)} unit="coasters" text="pour ton objectif 2027" icon="loop" color="text-coral" href="/coasters" />
        <QuickCard value={1} unit="badge" text="à débloquer aujourd'hui" icon="trophy" color="text-coral" href="/defis" />
      </div>

      <form
        className="mt-5 flex items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-sm shadow-navy/10"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/carte?q=${encodeURIComponent(query)}`);
        }}
      >
        <Icon name="search" className="text-navy/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un parc, un pays, une attraction…"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-navy/40"
          aria-label="Rechercher"
        />
        <Link href="/carte" aria-label="Filtres" className="text-navy/60">
          <Icon name="filter" />
        </Link>
      </form>

      <SectionTitle title="Parcs proches de toi" href="/parcs" />
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {nearby.map(({ p, km }) => (
          <div key={p.id} className="card w-44 shrink-0 snap-start overflow-hidden">
            <div className="relative h-28">
              <Link href={`/parcs/${p.id}`}>
                <Scene art={p.art} sky={p.sky} rounded="rounded-none" />
              </Link>
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-semibold">
                <Icon name="locate" size={11} /> {km.toLocaleString("fr-FR")} km
              </span>
              <button
                onClick={() => toggleWishlist(p.id)}
                aria-label={statuses[p.id] === "wishlist" ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95"
              >
                <Icon name="heart" size={17} filled={statuses[p.id] === "wishlist"} className="text-coral" />
              </button>
            </div>
            <Link href={`/parcs/${p.id}`} className="block p-3">
              <p className="font-display font-semibold leading-tight">{p.name}</p>
              <p className="text-sm text-navy/60">{p.country}</p>
              <div className="mt-1">
                <Rating value={p.rating} />
                <span className="ml-1 text-xs text-navy/45">({p.reviews.toLocaleString("fr-FR")})</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button onClick={locate} className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-navy/55 hover:text-teal-dark">
        <Icon name="locate" size={13} /> Distances depuis {here.label}. Utiliser ma position
      </button>

      <SectionTitle title="Tes prochains voyages" href="/voyages" />
      <Link href={`/voyages/${trip.id}`} className="card flex overflow-hidden bg-gradient-to-r from-white to-[#fdeee8] transition hover:-translate-y-0.5">
        <div className="w-28 shrink-0 sm:w-40">
          <Scene art={tripPark.art} sky={tripPark.sky} rounded="rounded-none" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1 p-4">
          <div className="flex items-center justify-between text-sm text-navy/60">
            <span className="flex items-center gap-1.5">
              <Icon name="calendar" size={15} /> {formatRange(trip.start, trip.end)}
            </span>
            <span className="flex items-center gap-1 font-semibold text-navy/70">
              <Icon name="sun" size={16} className="text-peach" /> 9°
            </span>
          </div>
          <p className="font-display text-xl font-semibold">{tripPark.name}</p>
          <p className="text-sm text-navy/70">
            {days === null ? "…" : `${days} jours restants`} · {tripPark.flag} {tripPark.country}
          </p>
          <Progress value={days === null ? 0 : Math.max(0.08, 1 - days / 120)} className="mt-1" />
        </div>
        <div className="flex items-center pr-3 text-navy/40">
          <Icon name="chevron" />
        </div>
      </Link>

      <SectionTitle title="Continue ton défi" href="/defis" linkLabel="Voir mes défis" />
      <Link href={`/defis/${challenge.id}`} className="card flex items-center gap-4 bg-gradient-to-r from-white to-[#f3ecfb] p-4 transition hover:-translate-y-0.5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ece4f8] text-lilac-dark">
          <Art kind={challenge.art} size={40} strokeWidth={5} />
        </span>
        <div className="flex-1">
          <p className="font-display text-lg font-semibold">{challenge.title}</p>
          <Progress value={challenge.done / challenge.total} className="my-1.5" />
          <p className="text-sm text-navy/60">
            {challenge.done} / {challenge.total} parcs visités
          </p>
        </div>
        <Medal />
      </Link>

      <SectionTitle title="Ton dernier souvenir" href="/carnet" />
      <Link href={`/carnet/${souvenir.id}`} className="card flex flex-col overflow-hidden transition hover:-translate-y-0.5 sm:flex-row">
        <div className="h-36 sm:h-auto sm:w-44">
          <Scene art={souvenir.photos[0].art} sky={souvenir.photos[0].sky} rounded="rounded-none" />
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm text-navy/60">
            {formatDate(souvenir.date)} · {souvenirPark.name}
          </p>
          <div className="mt-2 grid grid-cols-4 items-end gap-2">
            <MiniStat value={souvenir.attractions} label="attractions" />
            <MiniStat value={`${souvenir.distanceKm.toLocaleString("fr-FR")} km`} label="parcourus" />
            <MiniStat value={`${souvenir.weather}°`} label="météo" />
            <Icon name="sun" size={26} className="mb-2 justify-self-center text-peach" />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-navy/5 pt-3">
            <div className="flex items-center gap-2">
              <Icon name="coaster" size={30} className="text-navy/70" />
              <div>
                <p className="text-xs text-navy/50">Attraction préférée</p>
                <p className="font-semibold">{souvenir.favorite}</p>
              </div>
            </div>
            <div className="flex -space-x-3">
              {souvenir.photos.slice(1, 3).map((ph, i) => (
                <div key={i} className="h-11 w-11 overflow-hidden rounded-xl ring-2 ring-white">
                  <Scene art={ph.art} sky={ph.sky} rounded="rounded-none" />
                </div>
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-sm font-semibold text-white ring-2 ring-white">+6</span>
            </div>
          </div>
        </div>
      </Link>

      <SectionTitle title="Ton Atlas" href="/atlas" linkLabel="Voir mon atlas" />
      <Link href="/atlas" className="card block overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-4 pb-2">
          <MiniStat value={stats.parks} label="Parcs visités" big color="text-teal-dark" />
          <MiniStat value={stats.coasters} label="Coasters faits" big color="text-peach" />
          <MiniStat value={stats.countries} label="Pays explorés" big color="text-sage-dark" />
        </div>
        <WorldMap world={world} interactive={false} stampPx={6} className="h-40 sm:h-56" />
      </Link>

      <SectionTitle title="Nouveautés à découvrir" />
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {NEWS.map((n) => (
          <Link key={n.title} href={n.href} className="flex w-52 shrink-0 items-center gap-3 rounded-2xl p-2.5 pr-3" style={{ backgroundColor: n.tint }}>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/70 text-navy/80">
              <Art kind={n.art} size={38} strokeWidth={5} />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-navy/60">{n.kicker}</span>
              <span className="block font-display text-sm font-semibold">{n.title}</span>
              <span className="block text-xs text-navy/60">{n.place}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

function QuickCard({ value, unit, text, icon, color, href }: { value: React.ReactNode; unit: string; text: string; icon: "castle" | "loop" | "trophy"; color: string; href: string }) {
  return (
    <Link href={href} className="card flex min-w-40 flex-1 items-end justify-between gap-2 p-3.5 transition hover:-translate-y-0.5">
      <div>
        <p className="leading-none">
          <span className={`font-display text-2xl font-semibold ${color}`}>{value}</span>{" "}
          <span className="text-sm text-navy/70">{unit}</span>
        </p>
        <p className="mt-1.5 text-xs leading-snug text-navy/65">{text}</p>
      </div>
      <Art kind={icon} size={26} strokeWidth={6} className="shrink-0 text-lilac-dark" />
    </Link>
  );
}

function MiniStat({ value, label, big = false, color = "text-navy" }: { value: React.ReactNode; label: string; big?: boolean; color?: string }) {
  return (
    <div className={big ? "text-center" : ""}>
      <p className={`font-display font-semibold ${big ? "text-2xl" : "text-lg"} ${color}`}>{value}</p>
      <p className="text-xs text-navy/55">{label}</p>
    </div>
  );
}

export function Medal({ size = 52 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path d="M18 40 L12 56 L22 52 L26 60 L30 44 Z M42 40 L48 56 L38 52 L34 60 L30 44 Z" fill="#f7b57a" />
      <circle cx="30" cy="26" r="22" fill="#fbd27a" stroke="#f5b942" strokeWidth="3" />
      <circle cx="30" cy="26" r="15" fill="#f9c85b" />
      <path d="M30 15 l3.4 7 7.6 1 -5.5 5.3 1.3 7.6 -6.8 -3.6 -6.8 3.6 1.3 -7.6 -5.5 -5.3 7.6 -1z" fill="#fff6dc" />
    </svg>
  );
}
