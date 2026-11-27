import { notFound } from "next/navigation";
import Link from "next/link";
import Art from "@/components/Art";
import Scene from "@/components/Scene";
import { BackHeader, Progress } from "@/components/ui";
import { CHALLENGES } from "@/data/demo";
import { parkById } from "@/data/parks";
import { Medal } from "../../accueil/Home";

export function generateStaticParams() {
  return CHALLENGES.map((c) => ({ id: c.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = CHALLENGES.find((x) => x.id === id);
  if (!c) notFound();
  const pct = Math.round((c.done / c.total) * 100);
  const parks = c.parkIds.map((pid) => parkById(pid)!).filter(Boolean);

  return (
    <main>
      <BackHeader title="Détail du défi" href="/defis" />
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <span className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: c.color + "22", color: c.color }}>
            <Art kind={c.art} size={60} strokeWidth={4.5} />
            <span className="absolute -bottom-1 -right-1">
              <Medal size={36} />
            </span>
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">{c.title}</h1>
            <p className="text-sm text-navy/60">{c.description}</p>
            <p className="mt-2 font-semibold">
              {c.done} / {c.total}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-semibold text-navy/70">Progrès</span>
          <span className="rounded-full bg-ocean px-2 py-0.5 font-semibold text-teal-dark">{pct} %</span>
        </div>
        <Progress value={c.done / c.total} color={c.color} className="mt-2 h-3" />
      </div>

      <h2 className="mb-3 mt-7 font-display text-lg font-semibold">Parcs liés</h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {parks.map((p) => (
          <Link key={p.id} href={`/parcs/${p.id}`} className="w-28 shrink-0 text-center">
            <div className="h-24 overflow-hidden rounded-2xl">
              <Scene art={p.art} sky={p.sky} rounded="rounded-none" />
            </div>
            <p className="mt-1 text-xs font-semibold leading-tight">{p.name}</p>
          </Link>
        ))}
        {c.total - parks.length > 0 && (
          <span className="flex h-24 w-16 shrink-0 items-center justify-center rounded-2xl bg-white font-semibold text-navy/60">
            +{c.total - parks.length}
          </span>
        )}
      </div>

      <h2 className="mb-3 mt-7 font-display text-lg font-semibold">Récompense</h2>
      <div className="card flex items-center gap-4 bg-gradient-to-r from-white to-[#fff4dc] p-4">
        <Medal size={48} />
        <p className="flex-1 font-display text-lg font-semibold">{c.reward.badge}</p>
        <p className="font-display text-lg font-semibold text-peach">+ {c.reward.xp} XP</p>
      </div>
    </main>
  );
}
