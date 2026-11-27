"use client";

import { useState } from "react";
import Stamp from "@/components/Stamp";
import { PARKS } from "@/data/parks";
import { useAtlas } from "@/lib/store";

export default function WaitlistForm() {
  const { waitlist, joinWaitlist } = useAtlas();
  const [form, setForm] = useState({ firstName: "", email: "", country: "", park: "" });
  const [error, setError] = useState("");

  if (waitlist) {
    return (
      <div className="flex flex-col items-center py-4 text-center animate-fade-up">
        <div className="animate-big-stamp">
          <Stamp status="defi" art="rocket" label="Atlaster Fondateur" sublabel="Bêta 2027" size={150} animate={false} />
        </div>
        <p className="mt-4 font-display text-xl font-semibold">Bienvenue {waitlist.firstName} !</p>
        <p className="mt-1 text-navy/70">Tu fais partie des premiers Atlasters. Ton badge Fondateur t&apos;attend au lancement.</p>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-navy/10 bg-white px-4 py-3 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/30";

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.firstName.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
          setError("Indique ton prénom et une adresse email valide.");
          return;
        }
        setError("");
        joinWaitlist({ firstName: form.firstName.trim(), email: form.email.trim() });
      }}
    >
      <input className={input} placeholder="Prénom" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} aria-label="Prénom" autoComplete="given-name" />
      <input className={input} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label="Email" autoComplete="email" />
      <input className={input} placeholder="Pays" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} aria-label="Pays" autoComplete="country-name" />
      <select className={`${input} ${form.park ? "" : "text-navy/45"}`} value={form.park} onChange={(e) => setForm({ ...form, park: e.target.value })} aria-label="Ton parc préféré">
        <option value="">Ton parc préféré</option>
        {PARKS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm font-semibold text-coral">{error}</p>}
      <button className="mt-1 rounded-full bg-[#5b7fd1] py-3.5 font-display font-semibold text-white shadow-md shadow-[#5b7fd1]/30 transition hover:brightness-95">
        🚀 Devenir Atlaster Fondateur
      </button>
      <p className="text-center text-sm text-navy/60">
        Déjà plus de <strong>1 250</strong> Atlasters inscrits !
      </p>
      <p className="text-center text-[11px] text-navy/40">Version de démonstration : l&apos;inscription reste dans ton navigateur pour l&apos;instant.</p>
    </form>
  );
}
