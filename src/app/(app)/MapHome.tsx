"use client";

// Page d'accueil du site : la carte du monde des parcs, en grand.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AppHeader from "@/components/AppHeader";
import Art from "@/components/Art";
import Icon, { type IconName } from "@/components/Icon";
import ParkPopup from "@/components/ParkPopup";
import Scene from "@/components/Scene";
import WorldMap, { type WorldMapHandle } from "@/components/WorldMap";
import { Avatar, Progress } from "@/components/ui";
import { CHALLENGES, SOUVENIRS, TRIPS } from "@/data/demo";
import { PARKS, STATUS_META, STATUS_ORDER, distanceKm, parkById, type StampStatus } from "@/data/parks";
import { daysUntil, formatRange, useStats, useToday } from "@/lib/store";
import type { WorldData } from "@/lib/world";

// Un grand tampon par région du monde (les autres parcs restent en petit, zoome pour les voir)
const FEATURED = [
  "europa-park",
  "universal-studios-florida",
  "six-flags-magic-mountain",
  "beto-carrero",
  "tokyo-disney-resort",
  "ferrari-world",
  "dreamworld",
  "gold-reef-city",
];

export default function MapHome({ world }: { world: WorldData }) {
  const mapRef = useRef<WorldMapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const today = useToday();
  const stats = useStats();
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<Set<StampStatus>>(new Set(STATUS_ORDER));
  const [stampPx, setStampPx] = useState(30);
  const [locating, setLocating] = useState(false);

  // Taille des tampons selon la largeur de l'écran, et carte recentrée sur l'Atlantique sur mobile
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const w = el.clientWidth;
    setStampPx(Math.round(Math.min(36, Math.max(24, w / 15))));
    if (w < 700) mapRef.current?.jump({ k: 1, x: 70, y: 0 });
  }, []);

  const onlyMine = !filter.has("decouvrir");
  const toggleStatus = (s: StampStatus) =>
    setFilter((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next.size ? next : new Set(STATUS_ORDER);
    });

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const nearest = [...PARKS].sort((a, b) => distanceKm(me, a) - distanceKm(me, b))[0];
        setSelected(nearest.id);
        mapRef.current?.focus(nearest.id, 4);
        setLocating(false);
      },
      () => setLocating(false),
    );
  };

  const trip = TRIPS[0];
  const tripPark = parkById(trip.parkId)!;
  const days = today ? daysUntil(trip.start, today) : null;
  const challenge = CHALLENGES[0];
  const memory = SOUVENIRS.find((s) => s.id === "portaventura-2024")!;
  const memoryPark = parkById(memory.parkId)!;
  const years = today ? Math.max(1, Math.floor((today.getTime() - new Date(memory.date).getTime()) / (365.25 * 86400000))) : 2;

  return (
    <main className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="mx-auto max-w-6xl px-4">
        <AppHeader logo />
      </div>

      {/* La carte, en avant */}
      <section className="mx-auto mt-3 max-w-6xl sm:px-4">
        <div ref={boxRef} className="relative overflow-hidden bg-ocean sm:rounded-[2rem] sm:shadow-[0_10px_40px_-20px_rgba(31,42,77,0.35)]">
          <WorldMap
            ref={mapRef}
            world={world}
            fill
            featured={FEATURED}
            featuredPx={stampPx}
            stampPx={Math.round(stampPx * 0.45)}
            filter={filter}
            selected={selected}
            onSelect={setSelected}
            showControls={false}
            className="h-[62vh] min-h-[400px] sm:aspect-[1000/530] sm:h-auto sm:max-h-[660px] sm:min-h-0"
          />

          <div className="absolute right-3 top-3 flex flex-col gap-2 sm:top-auto sm:bottom-20">
            <MapButton icon="filter" label={onlyMine ? "Afficher tous les parcs" : "Seulement mes parcs"} active={onlyMine} onClick={() => toggleStatus("decouvrir")} />
            <MapButton icon="locate" label="Parcs autour de moi" active={locating} onClick={locate} />
            <Link href="/carte" aria-label="Carte en plein écran" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-navy shadow-md shadow-navy/10 hover:bg-white">
              <Icon name="expand" size={19} />
            </Link>
          </div>

          {selected ? (
            <ParkPopup parkId={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="no-scrollbar absolute inset-x-3 bottom-3 flex justify-start overflow-x-auto sm:justify-center">
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/95 p-1.5 shadow-md shadow-navy/10">
                {STATUS_ORDER.map((s) => {
                  const m = STATUS_META[s];
                  const on = filter.has(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleStatus(s)}
                      aria-pressed={on}
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-navy/75 transition sm:text-sm ${on ? "" : "opacity-40"}`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full border-2" style={{ borderColor: m.ink, backgroundColor: m.fill }} />
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Les cartes sous la carte */}
      <section className="mx-auto mt-4 grid max-w-6xl gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={`/voyages/${trip.id}`} className="card group relative flex min-h-44 overflow-hidden bg-gradient-to-r from-[#fff3e8] to-white sm:col-span-2">
          <div className="relative z-10 flex flex-1 flex-col p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-peach">Prochain voyage</p>
            <p className="mt-1 font-display text-2xl font-semibold">{tripPark.name}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-navy/75">
              <Icon name="pin" size={16} className="text-peach" /> {days === null ? "…" : `Dans ${days} jours`}
            </p>
            <p className="text-sm text-navy/60">Du {formatRange(trip.start, trip.end)}</p>
            <span className="mt-auto inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-full bg-peach px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-peach/40 transition group-hover:brightness-95">
              Préparer mon séjour <Icon name="chevron" size={15} />
            </span>
          </div>
          <div className="w-[38%] shrink-0 sm:w-[45%]">
            <Scene art={tripPark.art} sky={tripPark.sky} rounded="rounded-none" />
          </div>
        </Link>

        <Link href={`/defis/${challenge.id}`} className="card relative flex min-h-44 flex-col overflow-hidden bg-gradient-to-br from-[#f4eefc] to-white p-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lilac-dark">
            <Icon name="trophy" size={14} /> Défi du moment
          </p>
          <p className="mt-1 max-w-[70%] font-display text-xl font-semibold leading-tight">{challenge.title}</p>
          <p className="mt-auto font-display text-lg font-semibold">
            {challenge.done} <span className="text-sm text-navy/50">/ {challenge.total}</span>
          </p>
          <Progress value={challenge.done / challenge.total} color="#9a72c4" className="max-w-[60%]" />
          <Art kind={challenge.art} size={96} strokeWidth={3.5} className="absolute -right-2 bottom-2 text-lilac" />
          <Art kind="trophy" size={34} strokeWidth={5} className="absolute right-5 top-5 text-lilac-dark/70" />
        </Link>

        <Link href="/carte" className="card relative flex min-h-48 flex-col overflow-hidden bg-gradient-to-br from-[#eaf6f5] to-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-dark">Explorer</p>
          <p className="mt-2 max-w-[60%] text-navy/75">Découvre des parcs autour de toi et dans le monde.</p>
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white">
            Explorer la carte <Icon name="chevron" size={15} />
          </span>
          <Art kind="globe" size={100} strokeWidth={3.5} className="absolute -right-3 top-8 text-teal" />
        </Link>

        <Link href="/atlas" className="card relative flex min-h-48 flex-col overflow-hidden bg-gradient-to-br from-[#eef7ec] to-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-sage-dark">Ton Atlas</p>
          <ul className="mt-2 space-y-1 text-sm text-navy/80">
            {(
              [
                ["globe", `${stats.countries} pays`],
                ["coaster", `${stats.coasters} coasters`],
                ["pin", `${stats.parks} parcs`],
                ["heart", `${SOUVENIRS.length} souvenirs`],
              ] as [IconName, string][]
            ).map(([icon, text]) => (
              <li key={text} className="flex items-center gap-2">
                <Icon name={icon} size={16} className="text-sage-dark" /> {text}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-sage-dark px-4 py-2 text-sm font-semibold text-white">
            Voir mon Atlas <Icon name="chevron" size={15} />
          </span>
          <Suitcase />
        </Link>

        <Link href={`/carnet/${memory.id}`} className="card relative flex min-h-48 flex-col overflow-hidden bg-gradient-to-br from-[#fdeeec] to-white p-5 sm:col-span-2 lg:col-span-1">
          <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-coral">
            Aujourd&apos;hui dans ton Atlas <Icon name="heart" size={15} filled />
          </p>
          <p className="mt-2 max-w-[55%] text-navy/80">
            <strong>Il y a {years} ans…</strong> tu découvrais {memory.favorite} à {memoryPark.name} pour la première fois !
          </p>
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white">
            Revoir cette journée <Icon name="chevron" size={15} />
          </span>
          <div className="absolute right-4 top-12 w-28 rotate-6 rounded-md bg-white p-1.5 pb-4 shadow-lg shadow-navy/15">
            <div className="h-20 overflow-hidden rounded-sm">
              <Scene art={memory.photos[0].art} sky={memory.photos[0].sky} rounded="rounded-none" />
            </div>
          </div>
        </Link>

        <Community />
      </section>
    </main>
  );
}

function MapButton({ icon, label, onClick, active = false }: { icon: IconName; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-md shadow-navy/10 transition active:scale-95 ${active ? "bg-navy text-white" : "bg-white/95 text-navy hover:bg-white"}`}
    >
      <Icon name={icon} size={19} />
    </button>
  );
}

function Community() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="card relative flex flex-col gap-4 overflow-hidden bg-gradient-to-r from-[#f4eefc] via-white to-[#eaf6f5] p-5 sm:col-span-2 lg:col-span-3 lg:flex-row lg:items-center">
      <div className="flex items-center gap-3 lg:w-80">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-lilac-dark shadow-sm">
          <Icon name="user" size={24} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-lilac-dark">Les Atlasters</p>
          <p className="font-display font-semibold leading-tight">Sophie cherche des conseils pour Nigloland</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center">
        <Avatar name="Sophie" size={36} />
        <p className="flex-1 text-sm italic text-navy/75">« Visite prévue avec des enfants, des recommandations ? »</p>
        {!open && !sent && (
          <button onClick={() => setOpen(true)} className="w-fit rounded-full bg-lilac-dark px-4 py-2 text-sm font-semibold text-white">
            Répondre
          </button>
        )}
        {sent && <p className="text-sm font-semibold text-sage-dark">Merci pour ton conseil 💜</p>}
      </div>
      {open && !sent && (
        <form
          className="flex gap-2 lg:w-96"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) setSent(true);
          }}
        >
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ton conseil pour Sophie…"
            className="min-w-0 flex-1 rounded-full bg-white px-4 py-2 outline-none ring-1 ring-navy/10 focus:ring-2 focus:ring-lilac-dark"
          />
          <button className="rounded-full bg-lilac-dark px-4 font-semibold text-white">Envoyer</button>
        </form>
      )}
      <Art kind="wheel" size={70} strokeWidth={3.5} className="absolute -bottom-3 right-4 hidden text-lilac/70 lg:block" />
    </div>
  );
}

// Petite valise de voyage avec des autocollants
function Suitcase() {
  return (
    <svg viewBox="0 0 100 90" width="92" height="82" className="absolute -right-1 bottom-3" aria-hidden="true">
      <path d="M38 18 V10 a4 4 0 0 1 4 -4 h16 a4 4 0 0 1 4 4 v8" fill="none" stroke="#b9875a" strokeWidth="4" />
      <rect x="14" y="18" width="72" height="62" rx="9" fill="#e7b98a" />
      <rect x="14" y="18" width="72" height="62" rx="9" fill="none" stroke="#c99a6a" strokeWidth="2" />
      <path d="M32 18 V80 M68 18 V80" stroke="#c99a6a" strokeWidth="3" />
      <circle cx="46" cy="38" r="8" fill="#a8d5a2" />
      <circle cx="60" cy="58" r="7" fill="#8ec5e8" />
      <rect x="38" y="56" width="12" height="9" rx="2" fill="#f28b82" transform="rotate(-10 44 60)" />
      <path d="M57 30 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z" fill="#fbd27a" />
    </svg>
  );
}
