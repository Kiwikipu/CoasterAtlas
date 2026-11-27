// Petites briques d'interface partagées.
import Link from "next/link";
import Icon from "./Icon";

export function SectionTitle({ title, href, linkLabel = "Voir tout" }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-3 mt-7 flex items-baseline justify-between">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-teal-dark hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function Progress({ value, color = "#6cc3c1", className = "" }: { value: number; color?: string; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-navy/8 ${className}`} style={{ backgroundColor: "rgba(31,42,77,0.08)" }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, Math.max(0, value * 100))}%`, backgroundColor: color }} />
    </div>
  );
}

export function Rating({ value, reviews, size = "sm" }: { value: number; reviews?: number; size?: "sm" | "lg" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${size === "lg" ? "text-lg" : "text-sm"}`}>
      <Icon name="star" size={size === "lg" ? 20 : 15} filled className="text-[#f5b942]" strokeWidth={1} />
      <span className="font-semibold text-coral">{value.toLocaleString("fr-FR")}</span>
      {reviews !== undefined && <span className="text-navy/50">({reviews.toLocaleString("fr-FR")} avis)</span>}
    </span>
  );
}

export function Stat({ value, label, color = "text-navy" }: { value: React.ReactNode; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white px-2 py-3 text-center shadow-sm shadow-navy/5">
      <span className={`font-display text-xl font-semibold ${color}`}>{value}</span>
      <span className="text-[11px] leading-tight text-navy/55">{label}</span>
    </div>
  );
}

export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-peach to-coral font-display font-semibold text-white ring-2 ring-white"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {name.charAt(0)}
    </span>
  );
}

export function BackHeader({ title, href = "/accueil", action }: { title?: string; href?: string; action?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-2 flex items-center justify-between bg-cream/85 px-4 py-3 backdrop-blur">
      <Link href={href} aria-label="Retour" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm shadow-navy/10">
        <Icon name="back" />
      </Link>
      {title && <h1 className="font-display text-base font-semibold">{title}</h1>}
      <div className="flex h-10 min-w-10 items-center justify-end">{action}</div>
    </header>
  );
}

export function Chip({ children, active = false, onClick, color }: { children: React.ReactNode; active?: boolean; onClick?: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
        active ? "bg-navy text-white" : "bg-white text-navy/70 shadow-sm shadow-navy/5 hover:text-navy"
      }`}
      style={active && color ? { backgroundColor: color } : undefined}
    >
      {children}
    </button>
  );
}
