"use client";

import Link from "next/link";
import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Scene from "@/components/Scene";
import Stamp from "@/components/Stamp";
import { Rating, SectionTitle } from "@/components/ui";
import { coastersOfPark } from "@/data/coasters";
import { STATUS_META, parkById, type StampStatus } from "@/data/parks";
import { useAtlas } from "@/lib/store";

export default function ParkDetail({ parkId }: { parkId: string }) {
  const park = parkById(parkId)!;
  const { statuses, setStatus, markVisited, ridden } = useAtlas();
  const status = statuses[park.id];
  const coasters = coastersOfPark(park.id);
  const [shared, setShared] = useState(false);
  const [review, setReview] = useState({ stars: 0, text: "", sent: false });

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: park.name, url });
      else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {}
  };

  const choices: { s: StampStatus; label: string }[] = [
    { s: "wishlist", label: "Wishlist" },
    { s: "prochain", label: "Prochain voyage" },
    { s: "defi", label: "Défi" },
  ];

  return (
    <main className="-mx-4">
      <div className="relative h-72 sm:h-80">
        <Scene art={park.art} sky={park.sky} rounded="rounded-none" />
        <div className="absolute inset-x-4 top-4 flex justify-between">
          <Link href="/carte" aria-label="Retour" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <Icon name="back" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setStatus(park.id, status === "wishlist" ? "decouvrir" : "wishlist")}
              aria-label="Wishlist"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
            >
              <Icon name="heart" filled={status === "wishlist"} className="text-coral" />
            </button>
            <button onClick={share} aria-label="Partager" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm">
              <Icon name={shared ? "check" : "share"} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative -mt-10 rounded-t-[2rem] bg-cream px-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold">{park.name}</h1>
            <p className="text-navy/60">
              {park.flag} {park.city}, {park.country}
            </p>
            <div className="mt-1">
              <Rating value={park.rating} reviews={park.reviews} size="lg" />
            </div>
          </div>
          <div className="-mt-16 shrink-0">
            <Stamp status={status} art={status === "visite" || status === "decouvrir" ? park.art : undefined} size={96} rotate={-8} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            [park.coasters, "Coasters"],
            [park.attractions, "Attractions"],
            [park.restaurants, "Restaurants"],
            [park.cleanliness.toLocaleString("fr-FR"), "Propreté"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-white py-3 text-center shadow-sm shadow-navy/5">
              <p className="font-display text-xl font-semibold">{v}</p>
              <p className="text-[11px] text-navy/55">{l}</p>
            </div>
          ))}
        </div>

        <div className="card mt-4 p-4">
          {status === "visite" ? (
            <p className="flex items-center justify-center gap-2 font-semibold text-sage-dark">
              <Icon name="check" /> Parc visité, il est dans ton passeport
            </p>
          ) : (
            <button onClick={() => markVisited(park.id)} className="w-full rounded-full bg-teal py-3 font-display font-semibold text-white shadow-md shadow-teal/30 hover:bg-teal-dark">
              J&apos;y suis allé ! Poser le tampon
            </button>
          )}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {choices.map((c) => {
              const on = status === c.s;
              const m = STATUS_META[c.s];
              return (
                <button
                  key={c.s}
                  onClick={() => setStatus(park.id, on ? "decouvrir" : c.s)}
                  className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                  style={{ borderColor: m.ink + (on ? "" : "44"), color: m.ink, backgroundColor: on ? m.fill : "white" }}
                  aria-pressed={on}
                >
                  {on ? "✓ " : ""}
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 leading-relaxed text-navy/80">{park.description}</p>

        {coasters.length > 0 && (
          <>
            <SectionTitle title="À ne pas manquer" href="/coasters" />
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {coasters.map((c) => (
                <Link key={c.id} href={`/coasters/${c.id}`} className="card w-36 shrink-0 overflow-hidden">
                  <div className="relative h-28">
                    <Scene art={c.art} sky={c.sky} rounded="rounded-none" />
                    {ridden[c.id] && (
                      <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-sage-dark text-white">
                        <Icon name="check" size={14} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="font-semibold leading-tight">{c.name}</p>
                    <Rating value={c.rating} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <SectionTitle title="Informations pratiques" />
        <div className="card divide-y divide-navy/5">
          {(
            [
              ["info", "Infos pratiques", `Ouvert depuis ${park.opened} · ${park.zones} zones`],
              ["coaster", "Attractions", `${park.attractions} attractions dont ${park.coasters} coasters`],
              ["music", "Spectacles", `${park.shows} spectacles`],
              ["food", "Restaurants", `${park.restaurants} restaurants`],
            ] as [IconName, string, string][]
          ).map(([icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean text-teal-dark">
                <Icon name={icon} size={19} />
              </span>
              <div className="flex-1">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-navy/55">{sub}</p>
              </div>
            </div>
          ))}
          <a href={park.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 hover:bg-cream">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdeceb] text-coral">
              <Icon name="globe" size={19} />
            </span>
            <div className="flex-1">
              <p className="font-semibold">Site et application officiels</p>
              <p className="text-sm text-navy/55">Horaires, billets et temps d&apos;attente</p>
            </div>
            <Icon name="chevron" className="text-navy/40" />
          </a>
        </div>

        <Link href={`/carte?parc=${park.id}`} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#5b7fd1] py-3.5 font-display font-semibold text-white shadow-md shadow-[#5b7fd1]/30 hover:brightness-95">
          <Icon name="map" size={20} /> Voir sur la carte
        </Link>

        <section id="avis" className="scroll-mt-6">
          <SectionTitle title="Ton avis" />
          <div className="card p-4">
            {review.sent ? (
              <p className="text-center font-semibold text-sage-dark">Merci ! Ton avis aide les autres Atlasters 💙</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (review.stars) setReview((r) => ({ ...r, sent: true }));
                }}
              >
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setReview((r) => ({ ...r, stars: n }))} aria-label={`${n} étoiles`}>
                      <Icon name="star" size={32} filled={n <= review.stars} className={n <= review.stars ? "text-[#f5b942]" : "text-navy/20"} strokeWidth={1.4} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={review.text}
                  onChange={(e) => setReview((r) => ({ ...r, text: e.target.value }))}
                  placeholder={`Raconte ta journée à ${park.name}…`}
                  rows={3}
                  className="mt-3 w-full resize-none rounded-2xl bg-cream p-3 outline-none focus:ring-2 focus:ring-teal"
                />
                <button disabled={!review.stars} className="mt-2 w-full rounded-full bg-navy py-2.5 font-semibold text-white disabled:opacity-40">
                  Publier mon avis
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
