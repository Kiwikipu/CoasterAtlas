"use client";

import Link from "next/link";
import { useState } from "react";
import { USER } from "@/data/demo";
import Icon, { type IconName } from "./Icon";
import { LogoMark, Wordmark } from "./Logo";
import { Avatar } from "./ui";

const MENU: { href: string; label: string; icon: IconName }[] = [
  { href: "/accueil", label: "Accueil", icon: "home" },
  { href: "/carte", label: "Carte du monde", icon: "globe" },
  { href: "/parcs", label: "Tous les parcs", icon: "pin" },
  { href: "/coasters", label: "Coasters", icon: "coaster" },
  { href: "/atlas", label: "Mon Atlas", icon: "map" },
  { href: "/passeport", label: "Mon passeport", icon: "book" },
  { href: "/defis", label: "Défis", icon: "trophy" },
  { href: "/carnet", label: "Carnet de voyage", icon: "camera" },
  { href: "/voyages", label: "Mes voyages", icon: "suitcase" },
  { href: "/bienvenue", label: "Revoir l'accueil Atlaster", icon: "sparkles" },
  { href: "/", label: "Le site CoasterAtlas", icon: "info" },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="flex items-center justify-between pt-4">
        <button onClick={() => setOpen(true)} aria-label="Ouvrir le menu" className="relative -ml-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-white">
          <Icon name="menu" size={24} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
        </button>
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-white">
            <Icon name="bell" size={23} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-cream bg-coral" />
          </button>
          <Link href="/atlas" aria-label="Mon profil">
            <Avatar name={USER.firstName} size={42} />
          </Link>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[70] bg-navy/25 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <aside className="h-full w-72 max-w-[85%] overflow-y-auto bg-cream p-5 shadow-xl animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center gap-2">
              <LogoMark size={44} />
              <Wordmark className="text-xl" />
            </div>
            <nav className="flex flex-col gap-1">
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 font-semibold hover:bg-white">
                  <Icon name={m.icon} size={20} className="text-teal-dark" />
                  {m.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
