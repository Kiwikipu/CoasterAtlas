import Link from "next/link";
import Scene from "@/components/Scene";
import { BackHeader } from "@/components/ui";
import { SOUVENIRS } from "@/data/demo";
import { parkById } from "@/data/parks";
import { formatDate } from "@/lib/dates";

export const metadata = { title: "Carnet de voyage · CoasterAtlas" };

export default function CarnetPage() {
  return (
    <main>
      <BackHeader title="Carnet de voyage" href="/atlas" />
      <p className="mb-4 text-navy/65">Revis chaque journée magique.</p>
      <Link href="/carnet/nouveau" className="mb-4 flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-peach/60 py-3 font-semibold text-peach hover:bg-white">
        + Créer un souvenir
      </Link>
      <div className="grid gap-4 sm:grid-cols-2">
        {SOUVENIRS.map((s) => {
          const p = parkById(s.parkId)!;
          return (
            <Link key={s.id} href={`/carnet/${s.id}`} className="card overflow-hidden transition hover:-translate-y-0.5">
              <div className="h-36">
                <Scene art={s.photos[0].art} sky={s.photos[0].sky} rounded="rounded-none" />
              </div>
              <div className="p-4">
                <p className="text-xs text-navy/50">{formatDate(s.date, true)}</p>
                <p className="font-display text-lg font-semibold">{p.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-navy/65">{s.note}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
