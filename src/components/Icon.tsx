// Petites icônes au trait (style doux et arrondi), dessinées à la main en SVG.

type Shape = string | { c: [number, number, number] } | { r: [number, number, number, number, number] };

const ICONS = {
  home: ["M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  globe: [{ c: [12, 12, 9.5] }, "M2.5 12h19", "M12 2.5c3 3 3.6 6.5 3.6 9.5s-.6 6.5-3.6 9.5c-3-3-3.6-6.5-3.6-9.5S9 5.5 12 2.5z"],
  plus: ["M12 5v14M5 12h14"],
  suitcase: [{ r: [3, 7, 18, 13, 2.5] }, "M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2", "M8 7v13M16 7v13"],
  user: [{ c: [12, 8, 4] }, "M4 21a8 8 0 0 1 16 0"],
  search: [{ c: [11, 11, 7] }, "m20 20-4-4"],
  heart: ["M12 20s-7-4.4-9-8.6C1.6 8.4 3.6 5 7 5c2 0 3.3 1.2 5 3 1.7-1.8 3-3 5-3 3.4 0 5.4 3.4 4 6.4C19 15.6 12 20 12 20z"],
  share: ["M12 3v12", "m7 8 5-5 5 5", "M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"],
  back: ["M15 18l-6-6 6-6"],
  chevron: ["M9 6l6 6-6 6"],
  down: ["M6 9l6 6 6-6"],
  bell: ["M6 9a6 6 0 0 1 12 0c0 6.5 3 8 3 8H3s3-1.5 3-8", "M10.3 20.5a2 2 0 0 0 3.4 0"],
  menu: ["M4 7h16M4 12h10M4 17h16"],
  star: ["M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"],
  pin: ["M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z", { c: [12, 9, 2.5] }],
  ticket: ["M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z", "M14 6v2M14 11v2M14 16v2"],
  bed: ["M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-8v6", { c: [6.5, 11.5, 1.6] }],
  car: ["M5 15l1.6-4.6A2 2 0 0 1 8.5 9h7a2 2 0 0 1 1.9 1.4L19 15", { r: [3, 15, 18, 4, 1.5] }, { c: [7, 19.5, 1.2] }, { c: [17, 19.5, 1.2] }],
  train: [{ r: [6, 3, 12, 14, 3] }, "M6 10h12", "M8.5 21l2-4M15.5 21l-2-4", { c: [9, 13.5, 0.6] }, { c: [15, 13.5, 0.6] }],
  check: ["M5 12.5l4.5 4.5L19 7"],
  camera: ["M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z", { c: [12, 13.5, 3.5] }],
  filter: ["M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1", { c: [15, 6, 2] }, { c: [9, 12, 2] }, { c: [17, 18, 2] }],
  x: ["M6 6l12 12M18 6 6 18"],
  calendar: [{ r: [3, 5, 18, 16, 2.5] }, "M3 10h18M8 3v4M16 3v4"],
  sun: [{ c: [12, 12, 4] }, "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"],
  download: ["M12 3v12", "m7 10 5 5 5-5", "M5 21h14"],
  printer: ["M7 9V3h10v6", { r: [3, 9, 18, 8, 2] }, "M7 14h10v7H7z"],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z", "M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"],
  trophy: ["M8 4h8v5a4 4 0 0 1-8 0z", "M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4", "M12 13v4M9 21h6M10 17h4v4"],
  map: ["M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z", "M9 4v14M15 6v14"],
  list: ["M9 6h11M9 12h11M9 18h11", "M4.5 6h.01M4.5 12h.01M4.5 18h.01"],
  pen: ["M4 20h4L19 9l-4-4L4 16z", "M13.5 6.5l4 4"],
  chat: ["M4 5h16v11H9l-5 4z", "M9 10.5h.01M12 10.5h.01M15 10.5h.01"],
  coaster: ["M3 19c3-9 5.5-12 8.5-6.5S17 15 21 6", "M6 19v-5M11.5 19v-6.5M17 19v-8"],
  parking: [{ r: [4, 3, 16, 18, 3] }, "M10 17V8h3a2.5 2.5 0 0 1 0 5h-3"],
  sparkles: ["M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z", "M19 15l.8 1.7L21.5 17.5l-1.7.8L19 20l-.8-1.7-1.7-.8 1.7-.8z"],
  locate: ["M3 11l18-8-8 18-2-8z"],
  clock: [{ c: [12, 12, 9] }, "M12 7v5l3 2"],
  info: [{ c: [12, 12, 9] }, "M12 11v5M12 8h.01"],
  gauge: ["M4 18a8 8 0 1 1 16 0", "M12 18l4-6"],
  height: ["M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"],
  loop: [{ c: [12, 10, 5] }, "M3 20h6c2 0 3-2 3-5M21 20h-6c-2 0-3-2-3-5"],
  ruler: ["M3 17L17 3l4 4L7 21z", "M7 13l2 2M10 10l2 2M13 7l2 2"],
  phone: ["M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"],
  food: ["M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10", "M17 21V3c-2 1-3 4-3 7h3"],
  music: ["M9 18V6l11-2v12", { c: [6.5, 18, 2.5] }, { c: [17.5, 16, 2.5] }],
  minus: ["M5 12h14"],
  expand: ["M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"],
  edit: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof ICONS;

export default function Icon({
  name,
  size = 22,
  className = "",
  strokeWidth = 1.8,
  filled = false,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
}) {
  const shapes: Shape[] = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes.map((s, i) =>
        typeof s === "string" ? (
          <path key={i} d={s} />
        ) : "c" in s ? (
          <circle key={i} cx={s.c[0]} cy={s.c[1]} r={s.c[2]} />
        ) : (
          <rect key={i} x={s.r[0]} y={s.r[1]} width={s.r[2]} height={s.r[3]} rx={s.r[4]} />
        ),
      )}
    </svg>
  );
}
