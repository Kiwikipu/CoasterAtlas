// Illustrations minimalistes (jamais de logo officiel), dessinées dans une boîte 100 × 100.
// Utilisées au centre des tampons, dans les vignettes de parcs et les badges.

export type ArtKind =
  | "castle" | "loop" | "wheel" | "wooden" | "hyper" | "mountain" | "dragon" | "fairy"
  | "rocket" | "globe" | "wave" | "pumpkin" | "trophy" | "star" | "flame" | "plane" | "flag";

const supports = (xs: number[], tops: number[]) =>
  xs.map((x, i) => `M${x} 86 V${tops[i]}`).join(" ");

const PATHS: Record<ArtKind, string[]> = {
  castle: [
    "M10 86 H90",
    "M20 86 V52 H31 V86 M69 86 V52 H80 V86 M31 86 V42 H69 V86",
    "M18 52 L25.5 34 L33 52 M67 52 L74.5 34 L82 52 M36 42 L50 17 L64 42",
    "M50 17 V8 L58 11 L50 14",
    "M43 86 V73 A7 7 0 0 1 57 73 V86 M47 54 h6 v7 h-6 Z",
  ],
  loop: [
    "M4 84 H36 C46 84 53 79 56 72 A23 23 0 1 0 44 72 C47 79 54 84 64 84 H96",
    "M50 26 V18 M28 84 V78 M72 84 V78",
    "M8 80 h12 v-5 h-12 Z",
  ],
  wheel: [
    "M50 46 m-29 0 a29 29 0 1 0 58 0 a29 29 0 1 0 -58 0",
    "M50 17 V75 M21 46 H79 M29.5 25.5 L70.5 66.5 M70.5 25.5 L29.5 66.5",
    "M50 46 L34 88 M50 46 L66 88 M28 88 H72",
    "M50 46 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0",
  ],
  wooden: [
    "M4 86 L30 28 C34 20 40 20 44 30 L58 72 C62 82 68 82 72 72 L80 54 C84 46 90 46 96 54",
    supports([14, 22, 30, 38, 46, 54, 78, 86], [64, 46, 28, 25, 38, 62, 58, 50]),
    "M14 64 L22 86 M22 46 L30 86 M30 28 L38 86 M38 25 L46 86 M46 38 L54 86",
  ],
  hyper: [
    "M4 86 L28 18 C32 8 40 8 44 20 L58 74 C62 84 70 84 74 72 C78 60 86 58 96 62",
    supports([16, 28, 40, 50, 80, 90], [52, 18, 12, 50, 62, 61]),
  ],
  mountain: [
    "M4 86 L36 32 L50 52 L64 28 L96 86 Z",
    "M28 46 L36 32 L44 45 L39 42 L35 47 Z M57 40 L64 28 L72 41 L67 38 L63 43 Z",
    "M14 76 C30 66 46 82 62 70 S86 64 94 70",
  ],
  dragon: [
    "M18 86 L24 52 L33 47 L37 28 L50 22 L57 38 L66 35 L72 56 L80 86 Z",
    "M36 60 L44 54 L52 62 M50 40 L56 46",
    "M2 72 C26 56 40 84 62 64 S88 46 98 56",
  ],
  fairy: [
    "M8 86 H92",
    "M24 86 V56 L50 32 L76 56 V86",
    "M50 32 L46 10 L60 22",
    "M44 86 V70 A6 6 0 0 1 56 70 V86 M30 60 h8 v8 h-8 Z M62 60 h8 v8 h-8 Z",
  ],
  rocket: [
    "M50 12 C63 24 65 46 61 66 H39 C35 46 37 24 50 12 Z",
    "M50 38 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0",
    "M40 56 L29 72 L40 69 M60 56 L71 72 L60 69",
    "M44 70 L50 88 L56 70",
  ],
  globe: [
    "M50 50 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0",
    "M50 20 C38 30 38 70 50 80 C62 70 62 30 50 20 M21 42 H79 M21 58 H79",
    "M8 62 C20 80 80 46 92 36 C96 30 84 28 70 32",
  ],
  wave: [
    "M4 48 C16 36 28 36 38 48 S60 60 72 48 S90 36 96 44",
    "M4 64 C16 52 28 52 38 64 S60 76 72 64 S90 52 96 60",
    "M4 80 C16 68 28 68 38 80 S60 92 72 80 S90 68 96 76",
    "M60 28 C66 18 76 18 80 26",
  ],
  pumpkin: [
    "M50 30 C24 30 14 46 16 62 C18 80 36 86 50 82 C64 86 82 80 84 62 C86 46 76 30 50 30 Z",
    "M50 30 C40 40 40 74 50 82 C60 74 60 40 50 30",
    "M50 30 C50 22 54 16 60 14",
    "M30 56 L38 50 L40 58 Z M70 56 L62 50 L60 58 Z M34 68 C44 76 56 76 66 68",
  ],
  trophy: [
    "M32 18 H68 V40 C68 52 60 60 50 60 C40 60 32 52 32 40 Z",
    "M32 24 H20 C20 38 26 44 34 44 M68 24 H80 C80 38 74 44 66 44",
    "M50 60 V72 M36 86 H64 V76 H36 Z",
  ],
  star: ["M50 12 L60 38 L88 39 L66 56 L74 84 L50 68 L26 84 L34 56 L12 39 L40 38 Z"],
  flame: [
    "M50 10 C54 28 74 38 74 60 C74 76 63 88 50 88 C37 88 26 76 26 60 C26 46 36 38 38 26 C44 34 46 40 46 46 C50 38 52 24 50 10 Z",
    "M50 56 C56 64 60 70 58 76 C56 82 44 82 42 76 C40 70 46 64 50 56 Z",
  ],
  plane: [
    "M84 18 C88 14 92 18 88 22 L66 44 L72 82 L64 86 L54 54 L36 72 L38 84 L32 88 L26 74 L12 68 L16 62 L28 64 L46 46 L14 36 L18 28 L56 34 Z",
  ],
  flag: ["M28 88 V12", "M28 14 C44 6 54 22 74 14 V46 C54 54 44 38 28 46"],
};

export function ArtGlyph({ kind, strokeWidth = 4 }: { kind: ArtKind; strokeWidth?: number }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {PATHS[kind].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

export default function Art({
  kind,
  size = 48,
  className,
  strokeWidth,
}: {
  kind: ArtKind;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <ArtGlyph kind={kind} strokeWidth={strokeWidth} />
    </svg>
  );
}
