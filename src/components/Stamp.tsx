// Tampon passeport CoasterAtlas (décision n°006, voir docs/design-system.md)
// Effet d'encre : contour légèrement irrégulier grâce à un filtre SVG.
import { useId } from "react";
import { ArtGlyph, type ArtKind } from "./Art";
import { STATUS_META, type StampStatus } from "@/data/parks";

export type { StampStatus };

const DEFAULT_ART: Record<StampStatus, ArtKind> = {
  decouvrir: "castle",
  wishlist: "star",
  visite: "castle",
  prochain: "plane",
  defi: "flag",
};

export default function Stamp({
  status,
  size = 112,
  art,
  label,
  sublabel,
  caption = false,
  animate = true,
  rotate = 0,
  className = "",
}: {
  status: StampStatus;
  size?: number;
  art?: ArtKind;
  label?: string;
  sublabel?: string;
  caption?: boolean;
  animate?: boolean;
  rotate?: number;
  className?: string;
}) {
  const s = STATUS_META[status];
  const id = useId().replace(/:/g, "");
  const anim = !animate ? "" : status === "prochain" ? "animate-stamp-pulse" : "";
  const text = (label ?? s.short).toUpperCase();
  const fontSize = text.length > 16 ? 8.5 : 10.5;
  return (
    <figure className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={anim} style={{ width: size, height: size, transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
        <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
          <defs>
            <path id={`arc-${id}`} d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" />
            <filter id={`ink-${id}`} x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="2.2" />
            </filter>
          </defs>
          <circle cx="60" cy="60" r="57" fill={s.fill} />
          <g filter={`url(#ink-${id})`} color={s.ink}>
            <circle cx="60" cy="60" r="55" fill="none" stroke={s.ink} strokeWidth="2.6" />
            <circle cx="60" cy="60" r="32" fill="none" stroke={s.ink} strokeWidth="1.3" opacity="0.75" />
            <text fill={s.ink} fontSize={fontSize} fontWeight="700" letterSpacing="2.2" fontFamily="var(--font-poppins), sans-serif">
              <textPath href={`#arc-${id}`} startOffset="25%" textAnchor="middle">
                {text}
              </textPath>
            </text>
            {sublabel && (
              <text x="60" y="106" textAnchor="middle" fill={s.ink} fontSize="7.5" fontWeight="700" letterSpacing="1" fontFamily="var(--font-poppins), sans-serif">
                {sublabel.toUpperCase()}
              </text>
            )}
            <circle cx="22" cy="78" r="1.6" fill={s.ink} />
            <circle cx="98" cy="78" r="1.6" fill={s.ink} />
            <g transform="translate(41 41) scale(0.38)">
              <ArtGlyph kind={art ?? DEFAULT_ART[status]} strokeWidth={5.5} />
            </g>
          </g>
        </svg>
      </div>
      {caption && <figcaption className="text-sm text-navy/70">{s.label}</figcaption>}
    </figure>
  );
}
