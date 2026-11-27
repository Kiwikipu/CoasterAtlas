import Stamp from "@/components/Stamp";

const PROMESSES = [
  { icon: "🌍", titre: "Explore", texte: "Découvre les parcs partout dans le monde.", couleur: "text-teal-dark" },
  { icon: "🗺️", titre: "Prépare", texte: "Planifie tes voyages et crée ta bucket list.", couleur: "text-lilac-dark" },
  { icon: "🎢", titre: "Vis", texte: "Profite à fond et garde tes meilleurs souvenirs.", couleur: "text-coral" },
  { icon: "🏆", titre: "Collectionne", texte: "Relève des défis et débloque des badges uniques.", couleur: "text-sage-dark" },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 py-16 sm:px-8">
      {/* En-tête */}
      <section className="flex flex-col items-center gap-6 text-center">
        <p className="text-6xl" aria-hidden="true">🌍🎢</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          Coaster<span className="text-coral">Atlas</span>
        </h1>
        <p className="font-display text-sm tracking-[0.3em] text-navy/80">
          EXPLORE <span className="text-coral">•</span> RIDE{" "}
          <span className="text-teal">•</span> COLLECT{" "}
          <span className="text-peach">•</span> REMEMBER.
        </p>
        <p className="max-w-xl text-lg text-navy/80">
          Le compagnon de voyage des passionnés de parcs d&apos;attractions.
          Chaque visite est une histoire, CoasterAtlas est là pour l&apos;écrire.
        </p>
        <span
          className="cursor-not-allowed rounded-full bg-teal px-7 py-3 font-display font-semibold text-white shadow-md shadow-teal/30"
          title="La liste d'attente arrive bientôt"
        >
          🚀 Devenir Atlaster Fondateur
        </span>
        <p className="text-sm text-navy/60">L&apos;application arrive bientôt.</p>
      </section>

      {/* Les tampons */}
      <section className="rounded-3xl bg-white/70 p-8 shadow-sm">
        <h2 className="mb-2 font-display text-2xl font-semibold">Ton passeport des parcs</h2>
        <p className="mb-8 text-navy/70">
          Chaque parc devient un tampon. Ta carte du monde se remplit au fil de tes visites.
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:justify-between">
          <Stamp status="decouvrir" />
          <Stamp status="wishlist" />
          <Stamp status="visite" />
          <Stamp status="prochain" />
          <Stamp status="defi" />
        </div>
      </section>

      {/* Promesses */}
      <section className="grid gap-6 sm:grid-cols-2">
        {PROMESSES.map((p) => (
          <div key={p.titre} className="flex items-start gap-4 rounded-3xl bg-white/70 p-6 shadow-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean text-2xl">
              {p.icon}
            </span>
            <div>
              <h3 className={`font-display text-xl font-semibold ${p.couleur}`}>{p.titre}</h3>
              <p className="text-navy/75">{p.texte}</p>
            </div>
          </div>
        ))}
      </section>

      <footer className="text-center text-sm text-navy/50">
        © {new Date().getFullYear()} CoasterAtlas · Explore the world, one coaster at a time.
      </footer>
    </main>
  );
}
