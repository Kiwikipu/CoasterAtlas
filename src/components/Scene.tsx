// Vignette illustrée d'un parc (remplace les photos : ciel pastel + illustration minimaliste).
import { useId } from "react";
import { ArtGlyph, type ArtKind } from "./Art";

export type Sky = "sunset" | "day" | "dusk" | "night";

const SKIES: Record<Sky, { stops: string[]; sun: string; hillBack: string; hillFront: string; ink: string }> = {
  sunset: { stops: ["#c9a7e8", "#f7b57a", "#fde4c4"], sun: "#fff4dc", hillBack: "#b89ac9", hillFront: "#8f76ad", ink: "#2c2350" },
  day: { stops: ["#8ec5e8", "#c4e3f3", "#eef8fb"], sun: "#fbd27a", hillBack: "#bfe2b9", hillFront: "#93c98c", ink: "#1f2a4d" },
  dusk: { stops: ["#7d7fc4", "#c9a7e8", "#f8cbc4"], sun: "#ffe6c8", hillBack: "#9b88c4", hillFront: "#6f5f9f", ink: "#211a44" },
  night: { stops: ["#1f2a4d", "#36407a", "#5b5f9e"], sun: "#fdf1c7", hillBack: "#3a4580", hillFront: "#2a3366", ink: "#fbd27a" },
};

export default function Scene({
  art,
  sky = "day",
  className = "",
  rounded = "rounded-2xl",
}: {
  art: ArtKind;
  sky?: Sky;
  className?: string;
  rounded?: string;
}) {
  const id = useId().replace(/:/g, "");
  const s = SKIES[sky];
  return (
    <svg
      viewBox="0 0 200 140"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${rounded} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.stops[0]} />
          <stop offset="0.55" stopColor={s.stops[1]} />
          <stop offset="1" stopColor={s.stops[2]} />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill={`url(#sky-${id})`} />
      {sky === "night" &&
        [[20, 18], [44, 34], [70, 14], [150, 22], [178, 40], [120, 10], [96, 30]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 0.9 : 1.3} fill="#fff" opacity="0.8" />
        ))}
      <circle cx="158" cy="38" r="16" fill={s.sun} opacity={sky === "day" ? 0.95 : 0.9} />
      <g fill="#fff" opacity={sky === "night" ? 0.12 : 0.6}>
        <ellipse cx="40" cy="30" rx="18" ry="5" />
        <ellipse cx="52" cy="26" rx="10" ry="5" />
        <ellipse cx="120" cy="50" rx="14" ry="3.5" />
      </g>
      <path d="M0 108 C40 92 70 100 104 96 S170 86 200 98 V140 H0 Z" fill={s.hillBack} />
      <g transform="translate(57 32) scale(0.86)" color={s.ink} opacity="0.92">
        <ArtGlyph kind={art} strokeWidth={3.6} />
      </g>
      <path d="M0 122 C50 110 90 124 130 116 S180 112 200 118 V140 H0 Z" fill={s.hillFront} />
    </svg>
  );
}
