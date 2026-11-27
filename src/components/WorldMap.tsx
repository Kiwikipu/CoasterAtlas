"use client";

// Carte du monde pastel, interactive : zoom (molette, pincement, boutons), déplacement,
// tampons passeport cliquables. Les pays visités se colorent en vert sauge.

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { WorldData } from "@/lib/world";
import { PARKS, STATUS_META, type StampStatus } from "@/data/parks";
import { useAtlas, useStats } from "@/lib/store";
import { ArtGlyph, type ArtKind } from "./Art";
import Icon from "./Icon";

export type WorldMapHandle = { focus: (parkId: string, k?: number) => void; reset: () => void };

type View = { k: number; x: number; y: number };

const ICON_FOR: Record<StampStatus, ArtKind | null> = {
  decouvrir: null,
  wishlist: "star",
  visite: null,
  prochain: "plane",
  defi: "trophy",
};

const WorldMap = forwardRef<WorldMapHandle, {
  world: WorldData;
  interactive?: boolean;
  fill?: boolean; // remplit tout l'espace (recadrage) au lieu d'afficher la carte entière
  stampPx?: number;
  filter?: Set<StampStatus>;
  selected?: string | null;
  onSelect?: (parkId: string | null) => void;
  showControls?: boolean;
  initial?: View;
  className?: string;
}>(function WorldMap(
  { world, interactive = true, fill = false, stampPx = 15, filter, selected = null, onSelect, showControls = true, initial, className = "" },
  ref,
) {
  const { statuses, justStamped } = useAtlas();
  const { countryCodes } = useStats();
  const svgRef = useRef<SVGSVGElement>(null);
  const [view, setView] = useState<View>(initial ?? { k: 1, x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);
  const [unit, setUnit] = useState(1); // unités SVG par pixel écran
  const drag = useRef<{ pointers: Map<number, { x: number; y: number }>; moved: number; lastDist?: number }>({
    pointers: new Map(),
    moved: 0,
  });

  const W = world.width;
  const H = world.height;

  // Taille réelle à l'écran, pour garder des tampons de taille constante
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const update = () => {
      const ctm = svg.getScreenCTM();
      if (ctm && ctm.a) setUnit(1 / ctm.a);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  const clampView = useCallback(
    (v: View): View => {
      const k = Math.min(10, Math.max(1, v.k));
      const minX = W - W * k - W * 0.15;
      const minY = H - H * k - H * 0.15;
      return { k, x: Math.min(W * 0.15, Math.max(minX, v.x)), y: Math.min(H * 0.15, Math.max(minY, v.y)) };
    },
    [W, H],
  );

  const toSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current!;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const zoomAt = useCallback(
    (factor: number, px: number, py: number, animate = false) => {
      setAnimating(animate);
      setView((v) => {
        const k = Math.min(10, Math.max(1, v.k * factor));
        const r = k / v.k;
        return clampView({ k, x: px - (px - v.x) * r, y: py - (py - v.y) * r });
      });
    },
    [clampView],
  );

  useImperativeHandle(ref, () => ({
    focus: (parkId: string, k = 4) => {
      const p = world.parks[parkId];
      if (!p) return;
      setAnimating(true);
      setView(clampView({ k, x: W / 2 - p[0] * k, y: H * 0.36 - p[1] * k }));
    },
    reset: () => {
      setAnimating(true);
      setView({ k: 1, x: 0, y: 0 });
    },
  }));

  // Molette (écouteur non passif pour bloquer le défilement de la page)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !interactive) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = toSvg(e.clientX, e.clientY);
      zoomAt(Math.exp(-e.deltaY * 0.0022), p.x, p.y);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [interactive, toSvg, zoomAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    const d = drag.current;
    d.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    d.moved = 0;
    d.lastDist = undefined;
    setAnimating(false);

    const move = (ev: PointerEvent) => {
      const prev = d.pointers.get(ev.pointerId);
      if (!prev) return;
      d.pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (d.pointers.size === 1) {
        const dx = ev.clientX - prev.x;
        const dy = ev.clientY - prev.y;
        d.moved += Math.abs(dx) + Math.abs(dy);
        setView((v) => clampView({ ...v, x: v.x + dx * unit, y: v.y + dy * unit }));
      } else if (d.pointers.size === 2) {
        const [a, b] = [...d.pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (d.lastDist) {
          const mid = toSvg((a.x + b.x) / 2, (a.y + b.y) / 2);
          zoomAt(dist / d.lastDist, mid.x, mid.y);
        }
        d.lastDist = dist;
        d.moved += 10;
      }
    };
    const up = (ev: PointerEvent) => {
      d.pointers.delete(ev.pointerId);
      d.lastDist = undefined;
      if (d.pointers.size === 0) {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      }
    };
    if (d.pointers.size === 1) {
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    }
  };

  const clickPark = (id: string) => {
    if (drag.current.moved > 6) return;
    onSelect?.(id);
  };

  const r = stampPx * unit; // rayon du tampon en unités SVG à zoom 1
  const showLabels = view.k >= 7;
  const visibleParks = PARKS.filter((p) => !filter || filter.has(statuses[p.id]));

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio={fill ? "xMidYMid slice" : "xMidYMid meet"}
        className={`block h-full w-full select-none ${interactive ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
        onPointerDown={onPointerDown}
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as Element).getAttribute("data-bg")) {
            if (drag.current.moved <= 6) onSelect?.(null);
          }
        }}
        role="img"
        aria-label="Carte du monde des parcs"
      >
        <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="#e6f3f8" data-bg="1" />
        <g
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
            transition: animating ? "transform 0.7s cubic-bezier(0.3, 0.8, 0.3, 1)" : "none",
          }}
        >
          {/* océan : quelques vaguelettes */}
          <g stroke="#cfe6f0" strokeWidth={1.2} fill="none" strokeLinecap="round" data-bg="1">
            {[[90, 300], [430, 420], [700, 330], [880, 470], [250, 120], [560, 470]].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y} q6 -5 12 0 t12 0`} data-bg="1" />
            ))}
          </g>

          {world.countries.map((c) => {
            const visited = countryCodes.has(c.id);
            return (
              <path
                key={c.id}
                d={c.d}
                fill={visited ? "#b9dfb2" : c.tint}
                stroke={visited ? "#a9d7a1" : c.tint}
                strokeWidth={0.5 / view.k + 0.15}
                style={{ transition: "fill 0.9s ease" }}
                data-bg="1"
              />
            );
          })}

          {world.deco.map((d, i) => (
            <Deco key={i} {...d} />
          ))}

          {visibleParks.map((p) => {
            const [x, y] = world.parks[p.id];
            const st = statuses[p.id];
            const m = STATUS_META[st];
            const isSel = selected === p.id;
            const scale = (isSel ? 1.25 : 1) / view.k;
            const icon = st === "visite" || st === "decouvrir" ? p.art : ICON_FOR[st];
            return (
              <g
                key={p.id}
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  transition: animating ? "transform 0.7s cubic-bezier(0.3, 0.8, 0.3, 1)" : "transform 0.15s",
                }}
                className={onSelect ? "cursor-pointer" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  clickPark(p.id);
                }}
                role={onSelect ? "button" : undefined}
                aria-label={`${p.name}, ${m.label}`}
              >
                <g className={justStamped === p.id ? "map-stamp-drop" : st === "prochain" ? "map-stamp-pulse" : ""}>
                  <circle r={r * 1.18} fill="#1f2a4d" opacity="0.08" cy={r * 0.12} />
                  <circle r={r} fill={m.fill} stroke={m.ink} strokeWidth={r * 0.13} strokeDasharray={`${r * 2.6} ${r * 0.18} ${r * 1.4} ${r * 0.22}`} />
                  <circle r={r * 0.72} fill="none" stroke={m.ink} strokeWidth={r * 0.05} opacity="0.6" />
                  {icon && (
                    <g transform={`translate(${-r * 0.5} ${-r * 0.5}) scale(${r / 100})`} color={m.ink}>
                      <ArtGlyph kind={icon} strokeWidth={7} />
                    </g>
                  )}
                </g>
                {(showLabels || isSel) && (
                  <text
                    y={r * 2.1}
                    textAnchor="middle"
                    fontSize={r * 0.78}
                    fontWeight={700}
                    fill="#1f2a4d"
                    stroke="#ffffff"
                    strokeWidth={r * 0.28}
                    paintOrder="stroke"
                    fontFamily="var(--font-poppins), sans-serif"
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {interactive && showControls && (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
          {[
            { icon: "plus" as const, label: "Zoomer", f: () => zoomAt(1.6, W / 2 - 0, H / 2, true) },
            { icon: "minus" as const, label: "Dézoomer", f: () => zoomAt(1 / 1.6, W / 2, H / 2, true) },
            { icon: "globe" as const, label: "Voir le monde entier", f: () => { setAnimating(true); setView({ k: 1, x: 0, y: 0 }); } },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.f}
              aria-label={b.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy shadow-md shadow-navy/10 transition hover:bg-white active:scale-95"
            >
              <Icon name={b.icon} size={19} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default WorldMap;

// Petites illustrations discrètes : le monde n'est jamais vide
function Deco({ kind, x, y }: WorldData["deco"][number]) {
  const common = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "balloon":
      return (
        <g transform={`translate(${x} ${y})`} opacity="0.85" data-bg="1">
          <path d="M0 -14 C9 -14 12 -6 9 0 L3 7 H-3 L-9 0 C-12 -6 -9 -14 0 -14 Z" fill="#f7b57a" />
          <path d="M0 -14 C4 -10 4 2 2 7 M0 -14 C-4 -10 -4 2 -2 7" stroke="#fff" strokeWidth="1" fill="none" />
          <rect x="-2.5" y="9" width="5" height="4" rx="1" fill="#c99a6a" />
          <path d="M-3 7 L-2.5 9 M3 7 L2.5 9" stroke="#c99a6a" strokeWidth="0.8" />
        </g>
      );
    case "boat":
      return (
        <g transform={`translate(${x} ${y})`} opacity="0.85" data-bg="1" {...common}>
          <path d="M-10 4 H10 L7 9 H-7 Z" fill="#8ec5e8" />
          <path d="M0 3 V-12 L9 1 Z" fill="#fff" stroke="#c9a7e8" strokeWidth="0.8" />
          <path d="M-1 1 L-8 1 L-1 -8 Z" fill="#fde2dc" />
          <path d="M-14 12 q4 -2.5 8 0 t8 0 t8 0 t8 0" stroke="#bfdcea" strokeWidth="1" fill="none" />
        </g>
      );
    case "cloud":
      return (
        <g transform={`translate(${x} ${y})`} fill="#ffffff" opacity="0.9" data-bg="1">
          <ellipse cx="0" cy="0" rx="13" ry="4.5" />
          <ellipse cx="4" cy="-3.5" rx="7" ry="5" />
          <ellipse cx="-5" cy="-2" rx="5" ry="3.5" />
        </g>
      );
    case "mountain":
      return (
        <g transform={`translate(${x} ${y})`} opacity="0.8" data-bg="1" {...common}>
          <path d="M-14 6 L-4 -8 L1 -2 L6 -10 L16 6 Z" fill="#cfe3c8" stroke="#a9c99f" strokeWidth="0.8" />
          <path d="M-6 -5 L-4 -8 L-2 -5 Z M4 -7 L6 -10 L8 -7 Z" fill="#fff" />
        </g>
      );
    case "forest":
      return (
        <g transform={`translate(${x} ${y})`} opacity="0.8" data-bg="1">
          {[-8, 0, 8].map((dx, i) => (
            <g key={i} transform={`translate(${dx} ${i === 1 ? -2 : 0})`}>
              <path d="M0 -9 L5 2 H-5 Z" fill="#a8d5a2" />
              <rect x="-0.8" y="2" width="1.6" height="3" fill="#b8987a" />
            </g>
          ))}
        </g>
      );
  }
}
