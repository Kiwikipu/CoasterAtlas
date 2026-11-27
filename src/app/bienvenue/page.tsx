"use client";

// Premier lancement : on fait rêver avant de demander un compte (voir docs/ux.md).
import Link from "next/link";
import { useState } from "react";
import Art, { type ArtKind } from "@/components/Art";
import { LogoMark, Wordmark } from "@/components/Logo";
import Stamp from "@/components/Stamp";

const SCREENS: { emoji: string; title: string; text: string; visual: "map" | "passport" | "collect" | "join" }[] = [
  { emoji: "🌍", title: "Le monde t'attend.", text: "Découvre des centaines de parcs dans le monde, sur une carte qui te ressemble.", visual: "map" },
  { emoji: "📖", title: "Construis ton Atlas.", text: "Chaque parc visité devient un tampon dans ton passeport.", visual: "passport" },
  { emoji: "🎢", title: "Collectionne les expériences.", text: "Défis, badges, voyages : ta passion prend vie.", visual: "collect" },
  { emoji: "❤️", title: "Rejoins les Atlasters.", text: "Une communauté bienveillante de passionnés du monde entier.", visual: "join" },
];

const TYPES: { label: string; art: ArtKind; color: string }[] = [
  { label: "Sensations fortes", art: "loop", color: "#f28b82" },
  { label: "En famille", art: "wheel", color: "#f7b57a" },
  { label: "Univers immersifs", art: "castle", color: "#c9a7e8" },
  { label: "Gastronomie", art: "star", color: "#fbd27a" },
  { label: "Photographie", art: "mountain", color: "#8ec5e8" },
  { label: "Spectacles", art: "fairy", color: "#a8d5a2" },
];

export default function Welcome() {
  const [step, setStep] = useState(-1);
  const [types, setTypes] = useState<string[]>([]);

  if (step === -1) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-cream px-6 text-center">
        <div className="animate-big-stamp" style={{ animationName: "fade-up" }}>
          <LogoMark size={180} />
        </div>
        <Wordmark className="mt-2 text-4xl" />
        <p className="mt-6 font-display text-2xl font-semibold animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Bienvenue Atlaster 👋
        </p>
        <button onClick={() => setStep(0)} className="mt-10 rounded-full bg-teal px-8 py-3.5 font-display font-semibold text-white shadow-lg shadow-teal/30 hover:bg-teal-dark">
          Commencer l&apos;aventure
        </button>
      </main>
    );
  }

  if (step >= SCREENS.length) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col bg-cream px-6 py-10">
        <h1 className="font-display text-3xl font-semibold">✨ Quel type d&apos;Atlaster es-tu ?</h1>
        <p className="mt-2 text-navy/65">Tu peux en choisir plusieurs. On personnalisera ton accueil.</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {TYPES.map((t) => {
            const on = types.includes(t.label);
            return (
              <button
                key={t.label}
                onClick={() => setTypes((x) => (on ? x.filter((y) => y !== t.label) : [...x, t.label]))}
                className={`flex flex-col items-center gap-2 rounded-3xl border-2 bg-white p-4 font-semibold transition ${on ? "scale-[1.02] shadow-md" : "border-transparent shadow-sm"}`}
                style={{ borderColor: on ? t.color : undefined }}
                aria-pressed={on}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: t.color + "33", color: t.color }}>
                  <Art kind={t.art} size={38} strokeWidth={6} />
                </span>
                {t.label}
              </button>
            );
          })}
        </div>
        <Link href="/accueil" className="mt-auto rounded-full bg-teal py-3.5 text-center font-display font-semibold text-white shadow-lg shadow-teal/30 hover:bg-teal-dark">
          {types.length ? "C'est parti !" : "Passer"}
        </Link>
      </main>
    );
  }

  const s = SCREENS[step];
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col bg-cream px-6 py-10">
      <div className="flex justify-end">
        <button onClick={() => setStep(SCREENS.length)} className="text-sm font-semibold text-navy/50">
          Passer
        </button>
      </div>
      <div key={step} className="flex flex-1 flex-col items-center justify-center text-center animate-fade-up">
        <div className="flex h-64 items-center justify-center">
          {s.visual === "map" && <LogoMark size={220} />}
          {s.visual === "passport" && (
            <div className="flex -space-x-6">
              <Stamp status="visite" label="Europa-Park" size={120} rotate={-10} animate={false} />
              <Stamp status="wishlist" label="Efteling" size={120} rotate={8} animate={false} />
              <Stamp status="prochain" size={120} rotate={-4} />
            </div>
          )}
          {s.visual === "collect" && (
            <div className="grid grid-cols-3 gap-3">
              {(["trophy", "castle", "globe", "flame", "star", "rocket"] as ArtKind[]).map((a, i) => (
                <span key={a} className="flex h-20 w-20 items-center justify-center rounded-full text-white" style={{ backgroundColor: ["#f7b57a", "#8ec5e8", "#a8d5a2", "#f28b82", "#c9a7e8", "#fbd27a"][i] }}>
                  <Art kind={a} size={44} strokeWidth={6} />
                </span>
              ))}
            </div>
          )}
          {s.visual === "join" && <Stamp status="defi" art="rocket" label="Atlaster" size={190} animate={false} />}
        </div>
        <h1 className="mt-8 font-display text-3xl font-semibold">
          {s.emoji} {s.title}
        </h1>
        <p className="mt-3 text-lg text-navy/70">{s.text}</p>
      </div>
      <div className="mb-6 flex justify-center gap-2">
        {SCREENS.map((_, i) => (
          <span key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-teal" : "w-2 bg-navy/15"}`} />
        ))}
      </div>
      <button onClick={() => setStep(step + 1)} className="rounded-full bg-teal py-3.5 font-display font-semibold text-white shadow-lg shadow-teal/30 hover:bg-teal-dark">
        {step === SCREENS.length - 1 ? "Créer mon compte" : "Suivant"}
      </button>
    </main>
  );
}
