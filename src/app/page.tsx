import Link from "next/link";
import Art, { type ArtKind } from "@/components/Art";
import Icon, { type IconName } from "@/components/Icon";
import { LogoMark, Slogan, Wordmark } from "@/components/Logo";
import Stamp from "@/components/Stamp";
import WorldMap from "@/components/WorldMap";
import { Rating } from "@/components/ui";
import { STATUS_ORDER, parkById } from "@/data/parks";
import { getWorld } from "@/lib/world";
import WaitlistForm from "./_landing/WaitlistForm";

const PROMISES: { title: string; text: string; icon: IconName; color: string; bg: string }[] = [
  { title: "Explore", text: "Découvre des parcs partout dans le monde.", icon: "globe", color: "#3f9e9c", bg: "#e3f4f3" },
  { title: "Prépare", text: "Planifie tes voyages et crée ta bucket list.", icon: "map", color: "#9a72c4", bg: "#f2ebfb" },
  { title: "Vis", text: "Profite à fond et garde tes meilleurs souvenirs.", icon: "calendar", color: "#f28b82", bg: "#fdeceb" },
  { title: "Collectionne", text: "Relève des défis et débloque des badges uniques.", icon: "trophy", color: "#5f9e57", bg: "#eef7ec" },
];

const PAINS: { q: string; text: string; icon: IconName }[] = [
  { q: "Où sont mes billets ?", text: "Entre les emails, les applications et les PDF, on ne les retrouve jamais au bon moment.", icon: "ticket" },
  { q: "Quel hôtel ai-je réservé ?", text: "Booking ? Le site du parc ? On oublie vite et on perd du temps à chercher.", icon: "bed" },
  { q: "Combien coûte le parking ?", text: "Faut-il réserver ? Est-il inclus ? Où se situe l'entrée ?", icon: "car" },
];

const SOLUTION: { label: string; icon: IconName }[] = [
  { label: "Billets", icon: "ticket" },
  { label: "Hôtel", icon: "bed" },
  { label: "Parking", icon: "car" },
  { label: "Transport", icon: "train" },
  { label: "Checklist", icon: "list" },
  { label: "Souvenirs", icon: "camera" },
];

const MOMENTS = [
  { title: "Avant", sub: "Préparer", items: ["Billets", "Réservations", "Checklist", "Wishlist"], color: "#3f9e9c", bg: "#e3f4f3" },
  { title: "Pendant", sub: "Profiter", items: ["Carte interactive", "Attractions", "Notes et photos", "Défis"], color: "#5f9e57", bg: "#eef7ec" },
  { title: "Après", sub: "Revivre", items: ["Souvenirs", "Album", "Ton Atlas", "Statistiques"], color: "#9a72c4", bg: "#f2ebfb" },
];

const VALUES: { title: string; text: string; art: ArtKind; color: string }[] = [
  { title: "Bienveillance", text: "Ici, on s'entraide et on partage.", art: "star", color: "#f28b82" },
  { title: "Évasion", text: "Chaque écran donne envie de voyager.", art: "globe", color: "#4f8fc0" },
  { title: "Souvenirs", text: "Les souvenirs comptent plus que les statistiques.", art: "castle", color: "#5f9e57" },
  { title: "Simplicité", text: "Une expérience claire, fluide et agréable.", art: "wave", color: "#9a72c4" },
  { title: "Partage", text: "Construisons ensemble la plus belle communauté.", art: "wheel", color: "#e08a3c" },
];

const ATLASTERS = [
  ["L", "#f7b57a"],
  ["M", "#6cc3c1"],
  ["S", "#c9a7e8"],
  ["T", "#f28b82"],
  ["J", "#a8d5a2"],
];

export default function Landing() {
  const world = getWorld();
  const ep = parkById("europa-park")!;
  return (
    <div className="overflow-x-hidden bg-[radial-gradient(ellipse_at_top_left,#fde9df_0%,transparent_40%),radial-gradient(ellipse_at_top_right,#e6f3f8_0%,transparent_40%)]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark size={40} />
          <Wordmark className="text-xl" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-navy/70 md:flex">
          <a href="#tampons" className="hover:text-navy">Tampons</a>
          <a href="#voyage" className="hover:text-navy">Voyages</a>
          <a href="#carte" className="hover:text-navy">La carte</a>
          <a href="#beta" className="hover:text-navy">Bêta</a>
        </nav>
        <Link href="/accueil" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90">
          Ouvrir l&apos;app
        </Link>
      </header>

      {/* Héros */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-6 sm:px-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <LogoMark size={150} />
            <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              Coaster<span className="text-coral">Atlas</span>
            </h1>
            <Slogan className="mt-3" />
            <p className="mt-6 max-w-lg font-display text-2xl font-semibold leading-snug">
              Le compagnon de voyage des passionnés de parcs d&apos;attractions <span className="text-sun">✦</span>
            </p>
            <p className="mt-2 max-w-lg text-lg text-navy/70">
              Chaque visite est une histoire. CoasterAtlas est là pour l&apos;écrire.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link href="/accueil" className="rounded-full bg-teal px-6 py-3.5 font-display font-semibold text-white shadow-lg shadow-teal/30 transition hover:bg-teal-dark">
                Découvrir l&apos;application
              </Link>
              <a href="#beta" className="rounded-full bg-white px-6 py-3.5 font-display font-semibold text-navy shadow-sm transition hover:shadow-md">
                🚀 Rejoindre la bêta
              </a>
            </div>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {PROMISES.map((p) => (
              <li key={p.title} className="flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: p.bg, color: p.color }}>
                  <Icon name={p.icon} size={24} />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold" style={{ color: p.color }}>
                    {p.title}
                  </span>
                  <span className="block text-navy/70">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Le vrai écran d'accueil de l'app, dans un téléphone */}
        <div className="relative mx-auto hidden md:block">
          <div className="absolute -left-24 bottom-10 z-10 rounded-3xl bg-white px-4 py-3 text-sm font-semibold shadow-lg">
            Prêt pour ta
            <br />
            prochaine aventure ?
          </div>
          <div className="relative h-[700px] w-[340px] overflow-hidden rounded-[3rem] border-[10px] border-navy bg-cream shadow-2xl shadow-navy/30">
            <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-navy" />
            <iframe src="/accueil" title="Aperçu de l'application CoasterAtlas" className="h-[875px] w-[400px] origin-top-left scale-[0.8] border-0" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Tampons */}
      <section id="tampons" className="mx-auto max-w-6xl scroll-mt-6 px-4 sm:px-8">
        <div className="rounded-[2rem] bg-white/80 p-6 shadow-sm sm:p-10">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-navy/60">Nos tampons</p>
          <h2 className="mt-1 font-display text-3xl font-semibold">Ton passeport des parcs</h2>
          <p className="mt-2 max-w-2xl text-navy/70">
            Chaque parc devient un tampon. Chaque tampon raconte un statut, pas seulement une position sur une carte.
          </p>
          <div className="mt-8 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
            {STATUS_ORDER.map((s) => (
              <Stamp key={s} status={s} caption />
            ))}
          </div>
        </div>
      </section>

      {/* Problèmes → solution */}
      <section id="voyage" className="mx-auto mt-16 grid max-w-6xl scroll-mt-6 gap-6 px-4 sm:px-8 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#fdf0ee] p-6 sm:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral">Les points critiques aujourd&apos;hui</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {PAINS.map((p) => (
              <div key={p.q} className="rounded-2xl bg-white/80 p-4">
                <Icon name={p.icon} size={30} className="text-coral" />
                <p className="mt-2 font-display font-semibold">{p.q}</p>
                <p className="mt-1 text-sm text-navy/65">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-[#eaf6f5] p-6 sm:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-dark">CoasterAtlas, la solution tout-en-un</p>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
            {SOLUTION.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center text-sm font-semibold">
                <Icon name={s.icon} size={30} className="text-teal-dark" />
                {s.label}
              </div>
            ))}
          </div>
          <p className="mt-5 text-lg font-semibold">Tout au même endroit, avant, pendant et après ton voyage.</p>
        </div>
      </section>

      {/* Les 3 moments */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-8">
        <h2 className="font-display text-3xl font-semibold">Les 3 moments de ton voyage</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {MOMENTS.map((m) => (
            <div key={m.title} className="rounded-[2rem] p-6" style={{ backgroundColor: m.bg }}>
              <p className="font-display text-2xl font-semibold" style={{ color: m.color }}>
                {m.title}
              </p>
              <p className="font-display text-lg font-semibold">{m.sub}</p>
              <ul className="mt-3 space-y-1.5">
                {m.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-navy/75">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.color }} /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* La carte */}
      <section id="carte" className="mx-auto mt-16 max-w-6xl scroll-mt-6 px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-ocean">
          <p className="absolute left-6 top-5 z-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-dark">La carte, le cœur de CoasterAtlas</p>
          <WorldMap world={world} interactive={false} stampPx={11} className="h-[300px] sm:h-[460px]" />
          <Link href="/carte?parc=europa-park" className="absolute bottom-5 right-5 hidden w-64 rounded-3xl bg-white p-4 shadow-xl transition hover:-translate-y-1 sm:block">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-semibold">{ep.name}</p>
                <p className="text-sm text-navy/60">{ep.country}</p>
              </div>
              <Icon name="heart" className="text-coral" />
            </div>
            <div className="mt-2 flex gap-5">
              <div>
                <p className="font-display text-xl font-semibold">{ep.coasters}</p>
                <p className="text-xs text-navy/55">Coasters</p>
              </div>
              <div>
                <p className="font-display text-xl font-semibold">{ep.shows}</p>
                <p className="text-xs text-navy/55">Spectacles</p>
              </div>
            </div>
            <Rating value={ep.rating} reviews={ep.reviews} />
          </Link>
          <div className="absolute bottom-5 left-5">
            <Link href="/carte" className="rounded-full bg-navy px-5 py-3 font-semibold text-white shadow-lg hover:bg-navy/90">
              Explorer la carte →
            </Link>
          </div>
        </div>
      </section>

      {/* Communauté + bêta */}
      <section id="beta" className="mx-auto mt-16 grid max-w-6xl scroll-mt-6 gap-6 px-4 sm:px-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between rounded-[2rem] bg-white/80 p-6 shadow-sm sm:p-8">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-dark">Une communauté bienveillante</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Les Atlasters</h2>
            <p className="mt-2 max-w-md text-lg text-navy/70">Partage, inspiration et entraide entre passionnés du monde entier.</p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex -space-x-3">
              {ATLASTERS.map(([l, c]) => (
                <span key={l} className="flex h-14 w-14 items-center justify-center rounded-full font-display text-xl font-semibold text-white ring-4 ring-white" style={{ backgroundColor: c }}>
                  {l}
                </span>
              ))}
            </div>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fdeceb] text-coral">
              <Icon name="heart" size={30} filled />
            </span>
          </div>
          <div className="mt-8 rounded-2xl bg-cream p-4">
            <p className="font-display font-semibold">Pourquoi « Fondateur » ?</p>
            <p className="mt-1 text-sm text-navy/70">
              Les premiers inscrits recevront le badge exclusif <strong>Founding Atlaster</strong>, testeront la bêta en avant-première et
              nous aideront à construire l&apos;application.
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-navy/5 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#5b7fd1]">Rejoins la bêta !</h2>
          <p className="mb-5 mt-1 text-navy/70">Sois parmi les premiers à découvrir CoasterAtlas.</p>
          <WaitlistForm />
        </div>
      </section>

      {/* Valeurs */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-navy/60">Nos valeurs</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {VALUES.map((v) => (
            <div key={v.title} className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: v.color + "22", color: v.color }}>
                <Art kind={v.art} size={28} strokeWidth={6} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold uppercase">{v.title}</p>
                <p className="text-sm text-navy/65">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center gap-3 border-t border-navy/5 px-4 py-10 text-center sm:px-8">
        <LogoMark size={56} />
        <Wordmark className="text-2xl" />
        <p className="text-navy/60">Explore the world, one coaster at a time.</p>
        <p className="text-sm text-navy/40">© 2026 CoasterAtlas · Les parcs cités appartiennent à leurs propriétaires. Illustrations originales, aucun logo officiel.</p>
      </footer>
    </div>
  );
}
