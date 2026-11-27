"use client";

// Fiche rapide d'un parc qui s'ouvre sur la carte.
import Link from "next/link";
import Icon from "./Icon";
import Stamp from "./Stamp";
import { Rating } from "./ui";
import { parkById } from "@/data/parks";
import { useAtlas } from "@/lib/store";

export default function ParkPopup({ parkId, onClose }: { parkId: string; onClose: () => void }) {
  const { statuses, toggleWishlist, markVisited, setStatus } = useAtlas();
  const park = parkById(parkId)!;
  const status = statuses[park.id];
  return (
            <div key={park.id} className="absolute inset-x-3 bottom-3 mx-auto max-w-lg animate-fade-up">
              <div className="card p-4">
                <div className="flex items-start gap-3">
                  <Stamp status={status} art={status === "visite" || status === "decouvrir" ? park.art : undefined} size={72} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold leading-tight">{park.name}</p>
                    <p className="text-sm text-navy/60">
                      {park.flag} {park.city}, {park.country}
                    </p>
                    <Rating value={park.rating} reviews={park.reviews} />
                  </div>
                  <button onClick={onClose} aria-label="Fermer" className="-mr-1 -mt-1 rounded-full p-1.5 text-navy/50 hover:bg-cream">
                    <Icon name="x" size={18} />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {[
                    [park.coasters, "Coasters"],
                    [park.attractions, "Attractions"],
                    [park.shows, "Spectacles"],
                  ].map(([v, l]) => (
                    <div key={l} className="rounded-2xl bg-cream py-2">
                      <p className="font-display text-lg font-semibold">{v}</p>
                      <p className="text-[11px] text-navy/55">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  {status === "visite" ? (
                    <span className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#eef7ec] py-2.5 text-sm font-semibold text-sage-dark">
                      <Icon name="check" size={17} /> Parc visité
                    </span>
                  ) : (
                    <button onClick={() => markVisited(park.id)} className="flex-1 rounded-full bg-teal py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/30 hover:bg-teal-dark">
                      J&apos;y suis allé !
                    </button>
                  )}
                  <button
                    onClick={() => (status === "visite" ? setStatus(park.id, "wishlist") : toggleWishlist(park.id))}
                    aria-label="Wishlist"
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${status === "wishlist" ? "border-sky bg-[#eaf4fb]" : "border-navy/10 bg-white"}`}
                  >
                    <Icon name="heart" size={19} filled={status === "wishlist"} className="text-coral" />
                  </button>
                  <Link href={`/parcs/${park.id}`} className="flex items-center rounded-full border border-navy/10 bg-white px-4 text-sm font-semibold hover:bg-cream">
                    Fiche
                  </Link>
                </div>
              </div>
            </div>
  );
}
