// Tampon passeport CoasterAtlas (décision n°006, voir docs/design-system.md)

export type StampStatus =
  | "decouvrir"
  | "wishlist"
  | "visite"
  | "prochain"
  | "defi";

const STYLES: Record<
  StampStatus,
  { label: string; icon: string; ink: string; fill: string; className?: string }
> = {
  decouvrir: { label: "À DÉCOUVRIR", icon: "🏰", ink: "#7a8094", fill: "#ffffff" },
  wishlist: { label: "WISHLIST", icon: "⭐", ink: "#4f8fc0", fill: "#eaf4fb" },
  visite: { label: "VISITÉ", icon: "🏰", ink: "#5f9e57", fill: "#eef7ec", className: "animate-stamp-drop" },
  prochain: { label: "PROCHAIN VOYAGE", icon: "✈️", ink: "#e08a3c", fill: "#fef3e8", className: "animate-stamp-pulse" },
  defi: { label: "DÉFI", icon: "🏆", ink: "#9a72c4", fill: "#f5eefc" },
};

export default function Stamp({
  status,
  size = 112,
}: {
  status: StampStatus;
  size?: number;
}) {
  const s = STYLES[status];
  const id = `arc-${status}`;
  return (
    <figure className="flex flex-col items-center gap-2">
      <div className={s.className} style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
          <defs>
            <path id={id} d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
          </defs>
          {/* Contour légèrement irrégulier, comme de l'encre */}
          <circle cx="60" cy="60" r="56" fill={s.fill} stroke={s.ink} strokeWidth="2.5" strokeDasharray="60 2 30 3 80 1.5" />
          <circle cx="60" cy="60" r="33" fill="none" stroke={s.ink} strokeWidth="1.2" opacity="0.7" />
          <text fill={s.ink} fontSize="10.5" fontWeight="700" letterSpacing="2.5" fontFamily="var(--font-poppins)">
            <textPath href={`#${id}`} startOffset="25%" textAnchor="middle">
              {s.label}
            </textPath>
          </text>
          <text x="60" y="70" fontSize="28" textAnchor="middle">
            {s.icon}
          </text>
        </svg>
      </div>
      <figcaption className="text-sm text-navy/70">{s.label.charAt(0) + s.label.slice(1).toLowerCase()}</figcaption>
    </figure>
  );
}
