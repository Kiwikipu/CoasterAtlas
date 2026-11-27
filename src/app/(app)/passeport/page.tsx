"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import Stamp from "@/components/Stamp";
import { Avatar, BackHeader } from "@/components/ui";
import { SOUVENIRS, USER } from "@/data/demo";
import { PARKS } from "@/data/parks";
import { formatDate, useAtlas, useStats } from "@/lib/store";

export default function PassportPage() {
  const { statuses, visitedAt } = useAtlas();
  const stats = useStats();
  const [shared, setShared] = useState(false);

  const visited = PARKS.filter((p) => statuses[p.id] === "visite" || SOUVENIRS.some((s) => s.parkId === p.id)).map((p) => {
    const date = visitedAt[p.id] ?? SOUVENIRS.find((s) => s.parkId === p.id)?.date ?? "2024-06-01";
    return { p, date };
  });
  visited.sort((a, b) => b.date.localeCompare(a.date));
  const years = [...new Set(visited.map((v) => v.date.slice(0, 4)))];

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`J'ai ${stats.parks} tampons dans mon passeport CoasterAtlas ! 🌍🎢`);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {}
  };

  return (
    <main>
      <BackHeader
        title="Mon passeport"
        href="/atlas"
        action={
          <button onClick={share} aria-label="Partager" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm shadow-navy/10">
            <Icon name={shared ? "check" : "share"} />
          </button>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        <section className="relative overflow-hidden rounded-[1.75rem] bg-[#fbf3e6] p-5 shadow-[0_10px_30px_-14px_rgba(31,42,77,0.35)]">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(0deg,transparent_0_26px,#eadfc9_26px_27px)]" />
          <div className="relative flex items-center gap-4">
            <Avatar name={USER.firstName} size={72} />
            <div>
              <p className="font-display text-2xl font-semibold">{USER.firstName}</p>
              <p className="text-sm text-navy/60">{USER.title}</p>
              <p className="mt-1 font-mono text-[11px] tracking-widest text-navy/40">ATLASTER N° 000 042</p>
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-3 gap-2">
            {[
              [stats.parks, "parcs visités"],
              [stats.coasters, "coasters faits"],
              [stats.countries, "pays visités"],
            ].map(([v, l]) => (
              <div key={l as string}>
                <p className="font-display text-2xl font-semibold">{v}</p>
                <p className="text-xs text-navy/55">{l}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-5 flex flex-wrap justify-center gap-x-1 gap-y-2">
            {visited.map(({ p, date }, i) => (
              <Stamp key={p.id} status="visite" art={p.art} label={p.name} sublabel={formatDate(date)} size={104} rotate={[-9, 7, -3, 10, -6, 4][i % 6]} animate={false} />
            ))}
          </div>
          {visited.length === 0 && (
            <p className="relative py-10 text-center text-navy/60">
              Ton passeport est vide pour l&apos;instant.{" "}
              <Link href="/visite" className="font-semibold text-teal-dark underline">
                Pose ton premier tampon
              </Link>
            </p>
          )}
        </section>

        <section className="card p-5">
          <h2 className="mb-3 font-display text-lg font-semibold">Ta frise des visites</h2>
          {years.map((y) => (
            <div key={y} className="mb-2">
              <p className="mb-2 font-display text-sm font-semibold text-navy/50">{y}</p>
              <ol className="relative ml-2 border-l-2 border-dashed border-navy/10">
                {visited
                  .filter((v) => v.date.startsWith(y))
                  .map(({ p, date }) => (
                    <li key={p.id} className="relative mb-3 flex items-center gap-3 pl-4">
                      <span className="absolute -left-[7px] h-3 w-3 rounded-full border-2 border-white bg-sage-dark" />
                      <div className="flex-1">
                        <p className="text-xs text-navy/50">{formatDate(date)}</p>
                        <Link href={`/parcs/${p.id}`} className="font-semibold hover:underline">
                          {p.name}
                        </Link>
                        <p className="text-xs text-navy/55">{p.country}</p>
                      </div>
                      <Stamp status="visite" art={p.art} label={p.name} size={52} animate={false} />
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
