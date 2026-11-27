"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon, { type IconName } from "./Icon";

const LEFT: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Mon Voyage", icon: "home" },
  { href: "/carte", label: "Explorer", icon: "globe" },
];
const RIGHT: { href: string; label: string; icon: IconName }[] = [
  { href: "/atlas", label: "Atlas", icon: "book" },
  { href: "/passeport", label: "Profil", icon: "user" },
];

// Le bouton central : tout CoasterAtlas en un clic
const ACTIONS: { href: string; label: string; icon: IconName; color: string; bg: string }[] = [
  { href: "/coasters", label: "Ajouter un coaster", icon: "coaster", color: "#9a72c4", bg: "#f2ebfb" },
  { href: "/parcs/europa-park#avis", label: "Écrire un avis", icon: "chat", color: "#4f8fc0", bg: "#e8f2fa" },
  { href: "/visite", label: "Je visite un parc", icon: "pin", color: "#3f9e9c", bg: "#e3f4f3" },
  { href: "/carte?statut=wishlist", label: "Ma wishlist", icon: "heart", color: "#f28b82", bg: "#fdeceb" },
  { href: "/carnet/nouveau", label: "Ajouter un souvenir", icon: "camera", color: "#e08a3c", bg: "#fef0e2" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const item = (l: (typeof LEFT)[number]) => {
    const active = l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/");
    return (
      <Link
        key={l.href}
        href={l.href}
        className={`flex flex-1 flex-col items-center gap-0.5 py-1 text-[11px] font-semibold transition ${active ? "text-teal-dark" : "text-navy/45 hover:text-navy/70"}`}
      >
        <Icon name={l.icon} size={23} filled={active && false} strokeWidth={active ? 2 : 1.7} />
        {l.label}
      </Link>
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-cream/85 backdrop-blur-sm animate-fade-up" onClick={() => setOpen(false)}>
          <p className="absolute inset-x-0 bottom-[350px] text-center font-display text-lg font-semibold">Tout CoasterAtlas en un clic !</p>
          <div className="absolute bottom-[54px] left-1/2" onClick={(e) => e.stopPropagation()}>
            {ACTIONS.map((a, i) => {
              const angle = Math.PI - (i * Math.PI) / (ACTIONS.length - 1);
              const x = Math.cos(angle) * 128;
              const y = -Math.sin(angle) * 120 - 92;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                  style={{ left: x, top: y }}
                >
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-navy/10 animate-pop-in"
                    style={{ color: a.color, backgroundColor: a.bg, "--tx": `${-x}px`, "--ty": `${-y}px`, animationDelay: `${i * 35}ms` } as React.CSSProperties}
                  >
                    <Icon name={a.icon} size={28} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-navy">{a.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
        <div className="flex w-full max-w-md items-center rounded-[28px] bg-white/95 px-2 py-2 shadow-[0_8px_30px_-10px_rgba(31,42,77,0.3)] backdrop-blur">
          {LEFT.map(item)}
          <div className="flex flex-1 justify-center">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu d'actions"}
              aria-expanded={open}
              className={`-mt-8 flex items-center justify-center rounded-full text-white shadow-lg shadow-lilac/50 ring-4 ring-cream transition-all duration-300 ${open ? "bg-navy" : "bg-gradient-to-br from-lilac to-lilac-dark hover:brightness-105"}`}
              style={{ width: 60, height: 60 }}
            >
              <Icon name={open ? "x" : "globe"} size={open ? 26 : 30} strokeWidth={open ? 2.4 : 1.8} />
            </button>
          </div>
          {RIGHT.map(item)}
        </div>
      </nav>
    </>
  );
}
