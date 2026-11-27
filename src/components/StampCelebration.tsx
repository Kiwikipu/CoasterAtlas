"use client";

// Animation signature : le tampon passeport qui se pose avec un petit « clac ».
import Link from "next/link";
import { useEffect } from "react";
import { parkById } from "@/data/parks";
import { formatDate, useAtlas } from "@/lib/store";
import Stamp from "./Stamp";

export default function StampCelebration() {
  const { justStamped, clearStamp, visitedAt } = useAtlas();
  const park = justStamped ? parkById(justStamped) : null;

  useEffect(() => {
    if (!park) return;
    // petit « clac » sonore, discret (Web Audio, aucun fichier)
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const t = ctx.currentTime + 0.32;
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
      const src = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      const gain = ctx.createGain();
      gain.gain.value = 0.5;
      src.buffer = buf;
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start(t);
      setTimeout(() => ctx.close(), 1200);
    } catch {}
  }, [park]);

  if (!park) return null;
  const date = visitedAt[park.id] ?? new Date().toISOString().slice(0, 10);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/30 p-6 backdrop-blur-sm animate-fade-up" onClick={clearStamp}>
      <div className="card relative w-full max-w-sm overflow-hidden p-7 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#eef7ec,transparent_60%)]" />
        <p className="relative font-display text-sm font-semibold uppercase tracking-[0.2em] text-sage-dark">Nouveau tampon !</p>
        <div className="relative mx-auto my-5 flex h-52 w-52 items-center justify-center">
          <span className="absolute inset-6 rounded-full border-4 border-sage-dark/40 animate-ink-ring" />
          <div className="animate-big-stamp">
            <Stamp status="visite" art={park.art} label={park.name} sublabel={formatDate(date)} size={200} animate={false} />
          </div>
        </div>
        <h2 className="relative font-display text-2xl font-semibold">{park.name}</h2>
        <p className="relative mt-1 text-navy/70">
          {park.flag} {park.country} se colore sur ta carte. Bienvenue dans ton Atlas !
        </p>
        <div className="relative mt-6 flex flex-col gap-2">
          <Link href={`/carte?parc=${park.id}`} onClick={clearStamp} className="rounded-full bg-teal px-5 py-3 font-display font-semibold text-white shadow-md shadow-teal/30 hover:bg-teal-dark">
            Voir sur ma carte
          </Link>
          <button onClick={clearStamp} className="rounded-full px-5 py-2.5 font-semibold text-navy/60 hover:text-navy">
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
