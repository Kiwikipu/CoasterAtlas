// Prépare la carte du monde côté serveur (une seule fois au build) :
// contours des pays, position des parcs et des petites illustrations.
import { geoCentroid, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { PARKS } from "@/data/parks";

export type WorldData = {
  width: number;
  height: number;
  countries: { id: string; d: string; tint: string }[];
  parks: Record<string, [number, number]>;
  deco: { kind: "balloon" | "boat" | "cloud" | "mountain" | "forest"; x: number; y: number }[];
};

const W = 1000;
const H = 520;

function tintFor(lon: number, lat: number) {
  if (lat > 35 && lon > -25 && lon < 45) return "#f9e1e7"; // Europe : rose poudré
  if (lon < -30 && lat > 12) return "#fbe6cd"; // Amérique du Nord : pêche crème
  if (lon < -30) return "#e6f0c6"; // Amérique du Sud : sauge citron
  if (lon >= -25 && lon < 52 && lat <= 35) return "#fbefc6"; // Afrique : sable doux
  if (lon > 110 && lat < -8) return "#ebe0f6"; // Océanie : lilas
  return "#d9edd4"; // Asie : sauge
}

let cache: WorldData | null = null;

export function getWorld(): WorldData {
  if (cache) return cache;
  const topo = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const all = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>;
  const features = all.features.filter((f) => f.id !== "010"); // sans l'Antarctique
  const fc: FeatureCollection<Geometry, { name: string }> = { type: "FeatureCollection", features };

  const projection = geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], fc);
  const path = geoPath(projection);
  const round = (d: string | null) => (d ?? "").replace(/(\d+\.\d)\d+/g, "$1");

  const countries = features.map((f: Feature<Geometry, { name: string }>) => {
    const [lon, lat] = geoCentroid(f);
    return { id: String(f.id ?? f.properties.name), d: round(path(f)), tint: tintFor(lon, lat) };
  });

  const pt = (lon: number, lat: number): [number, number] => {
    const p = projection([lon, lat]) ?? [0, 0];
    return [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];
  };

  const parks = Object.fromEntries(PARKS.map((p) => [p.id, pt(p.lon, p.lat)]));

  const deco: WorldData["deco"] = [
    { kind: "balloon", ...xy(pt(-38, 38)) },
    { kind: "boat", ...xy(pt(-140, 12)) },
    { kind: "boat", ...xy(pt(70, -25)) },
    { kind: "cloud", ...xy(pt(-20, 8)) },
    { kind: "cloud", ...xy(pt(160, 30)) },
    { kind: "cloud", ...xy(pt(-115, -30)) },
    { kind: "mountain", ...xy(pt(86, 31)) },
    { kind: "forest", ...xy(pt(-100, 57)) },
    { kind: "forest", ...xy(pt(100, 60)) },
    { kind: "balloon", ...xy(pt(120, -45)) },
  ];

  cache = { width: W, height: H, countries, parks, deco };
  return cache;
}

function xy([x, y]: [number, number]) {
  return { x, y };
}
