"use client";

import Link from "next/link";
import { useState } from "react";
import Art from "@/components/Art";
import Icon from "@/components/Icon";
import { BackHeader, Progress } from "@/components/ui";
import { CHALLENGES } from "@/data/demo";

export default function ChallengesPage() {
  const [tab, setTab] = useState<"cours" | "finis">("cours");
  const list = CHALLENGES.filter((c) => (tab === "cours" ? c.done < c.total : c.done >= c.total));
  return (
    <main>
      <BackHeader title="Défis" href="/atlas" />
      <p className="mb-4 text-navy/65">Pour te dépasser et débloquer des badges uniques.</p>
      <div className="mb-4 grid grid-cols-2 rounded-full bg-white p-1 shadow-sm shadow-navy/5">
        {(
          [
            ["cours", "En cours"],
            ["finis", "Terminés"],
          ] as const
        ).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full py-2 text-sm font-semibold transition ${tab === k ? "bg-[#fdeceb] text-coral" : "text-navy/55"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {list.map((c) => (
          <Link key={c.id} href={`/defis/${c.id}`} className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: c.color + "22", color: c.color }}>
              <Art kind={c.art} size={40} strokeWidth={5} />
            </span>
            <div className="flex-1">
              <p className="font-display font-semibold">{c.title}</p>
              <p className="text-sm text-navy/55">
                {c.done} / {c.total}
              </p>
              <Progress value={c.done / c.total} color={c.color} className="mt-1.5" />
            </div>
            <Icon name="chevron" className="text-navy/30" />
          </Link>
        ))}
      </div>
    </main>
  );
}
