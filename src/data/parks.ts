// Données d'exemple : quelques vrais parcs avec des coordonnées approximatives.
// Les chiffres (notes, avis, nombre d'attractions) sont indicatifs.
// Aucun logo officiel : chaque parc a une illustration minimaliste (`art`).

import type { ArtKind } from "@/components/Art";

export type StampStatus = "decouvrir" | "wishlist" | "visite" | "prochain" | "defi";

export type Park = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string; // code ISO numérique (pour colorer le pays sur la carte)
  flag: string;
  lat: number;
  lon: number;
  art: ArtKind;
  sky: "sunset" | "day" | "dusk" | "night";
  rating: number;
  reviews: number;
  coasters: number;
  attractions: number;
  shows: number;
  restaurants: number;
  zones: number;
  cleanliness: number;
  opened: number;
  description: string;
  website: string;
  status: StampStatus; // statut de départ du profil de démonstration
};

export const PARKS: Park[] = [
  {
    id: "europa-park", name: "Europa-Park", city: "Rust", country: "Allemagne", countryCode: "276", flag: "🇩🇪",
    lat: 48.266, lon: 7.722, art: "castle", sky: "sunset", rating: 4.7, reviews: 12548,
    coasters: 14, attractions: 108, shows: 5, restaurants: 54, zones: 18, cleanliness: 4.6, opened: 1975,
    description: "Le plus grand parc d'Europe, organisé en quartiers qui font voyager de pays en pays.",
    website: "https://www.europapark.de", status: "prochain",
  },
  {
    id: "phantasialand", name: "Phantasialand", city: "Brühl", country: "Allemagne", countryCode: "276", flag: "🇩🇪",
    lat: 50.799, lon: 6.879, art: "dragon", sky: "dusk", rating: 4.6, reviews: 8947,
    coasters: 7, attractions: 40, shows: 4, restaurants: 25, zones: 6, cleanliness: 4.7, opened: 1967,
    description: "Des univers immersifs incroyablement détaillés et des coasters parmi les meilleurs du monde.",
    website: "https://www.phantasialand.de", status: "visite",
  },
  {
    id: "nigloland", name: "Nigloland", city: "Dolancourt", country: "France", countryCode: "250", flag: "🇫🇷",
    lat: 48.258, lon: 4.611, art: "loop", sky: "day", rating: 4.5, reviews: 4231,
    coasters: 6, attractions: 40, shows: 3, restaurants: 10, zones: 5, cleanliness: 4.7, opened: 1987,
    description: "Un parc familial chaleureux au cœur de la Champagne, avec de très beaux coasters.",
    website: "https://www.nigloland.fr", status: "wishlist",
  },
  {
    id: "disneyland-paris", name: "Disneyland Paris", city: "Marne-la-Vallée", country: "France", countryCode: "250", flag: "🇫🇷",
    lat: 48.872, lon: 2.776, art: "castle", sky: "day", rating: 4.6, reviews: 21877,
    coasters: 7, attractions: 59, shows: 8, restaurants: 60, zones: 10, cleanliness: 4.5, opened: 1992,
    description: "Deux parcs, des châteaux de conte de fées et la magie des grands classiques.",
    website: "https://www.disneylandparis.com", status: "visite",
  },
  {
    id: "parc-asterix", name: "Parc Astérix", city: "Plailly", country: "France", countryCode: "250", flag: "🇫🇷",
    lat: 49.136, lon: 2.573, art: "wooden", sky: "day", rating: 4.5, reviews: 9640,
    coasters: 8, attractions: 47, shows: 5, restaurants: 20, zones: 6, cleanliness: 4.4, opened: 1989,
    description: "Humour gaulois, grands huit vertigineux et l'un des meilleurs coasters en bois d'Europe.",
    website: "https://www.parcasterix.fr", status: "decouvrir",
  },
  {
    id: "efteling", name: "Efteling", city: "Kaatsheuvel", country: "Pays-Bas", countryCode: "528", flag: "🇳🇱",
    lat: 51.65, lon: 5.05, art: "fairy", sky: "dusk", rating: 4.7, reviews: 15320,
    coasters: 6, attractions: 45, shows: 4, restaurants: 30, zones: 5, cleanliness: 4.8, opened: 1952,
    description: "Un parc de contes et légendes, poétique et intemporel.",
    website: "https://www.efteling.com", status: "wishlist",
  },
  {
    id: "liseberg", name: "Liseberg", city: "Göteborg", country: "Suède", countryCode: "752", flag: "🇸🇪",
    lat: 57.695, lon: 11.992, art: "wheel", sky: "day", rating: 4.6, reviews: 6120,
    coasters: 9, attractions: 40, shows: 3, restaurants: 25, zones: 4, cleanliness: 4.7, opened: 1923,
    description: "Un jardin d'attractions au cœur de la ville, élu plusieurs fois plus beau parc du monde.",
    website: "https://www.liseberg.se", status: "decouvrir",
  },
  {
    id: "portaventura", name: "PortAventura", city: "Salou", country: "Espagne", countryCode: "724", flag: "🇪🇸",
    lat: 41.087, lon: 1.157, art: "hyper", sky: "sunset", rating: 4.5, reviews: 11230,
    coasters: 9, attractions: 42, shows: 6, restaurants: 30, zones: 6, cleanliness: 4.5, opened: 1995,
    description: "La Méditerranée, le Far West, la Chine et des coasters géants au bord de la mer.",
    website: "https://www.portaventuraworld.com", status: "visite",
  },
  {
    id: "gardaland", name: "Gardaland", city: "Castelnuovo del Garda", country: "Italie", countryCode: "380", flag: "🇮🇹",
    lat: 45.455, lon: 10.714, art: "mountain", sky: "day", rating: 4.4, reviews: 7400,
    coasters: 8, attractions: 38, shows: 4, restaurants: 20, zones: 6, cleanliness: 4.3, opened: 1975,
    description: "Le grand parc italien, au bord du lac de Garde.",
    website: "https://www.gardaland.it", status: "visite",
  },
  {
    id: "cedar-point", name: "Cedar Point", city: "Sandusky", country: "États-Unis", countryCode: "840", flag: "🇺🇸",
    lat: 41.482, lon: -82.683, art: "hyper", sky: "day", rating: 4.7, reviews: 18090,
    coasters: 17, attractions: 71, shows: 4, restaurants: 40, zones: 8, cleanliness: 4.4, opened: 1870,
    description: "« La capitale mondiale des roller coasters », sur une presqu'île du lac Érié.",
    website: "https://www.cedarpoint.com", status: "defi",
  },
  {
    id: "universal-studios-florida", name: "Universal Studios", city: "Orlando", country: "États-Unis", countryCode: "840", flag: "🇺🇸",
    lat: 28.474, lon: -81.468, art: "globe", sky: "day", rating: 4.6, reviews: 25110,
    coasters: 5, attractions: 30, shows: 6, restaurants: 30, zones: 7, cleanliness: 4.5, opened: 1990,
    description: "Entrer dans les films : des attractions immersives au cœur d'Orlando.",
    website: "https://www.universalorlando.com", status: "visite",
  },
  {
    id: "magic-kingdom", name: "Magic Kingdom", city: "Orlando", country: "États-Unis", countryCode: "840", flag: "🇺🇸",
    lat: 28.418, lon: -81.581, art: "castle", sky: "night", rating: 4.7, reviews: 30210,
    coasters: 4, attractions: 40, shows: 8, restaurants: 30, zones: 6, cleanliness: 4.7, opened: 1971,
    description: "Le château le plus célèbre du monde et des parades féeriques.",
    website: "https://disneyworld.disney.go.com", status: "defi",
  },
  {
    id: "epic-universe", name: "Epic Universe", city: "Orlando", country: "États-Unis", countryCode: "840", flag: "🇺🇸",
    lat: 28.47, lon: -81.445, art: "globe", sky: "dusk", rating: 4.8, reviews: 5400,
    coasters: 4, attractions: 25, shows: 4, restaurants: 20, zones: 5, cleanliness: 4.8, opened: 2025,
    description: "Le tout nouveau parc d'Orlando, avec des mondes entièrement immersifs.",
    website: "https://www.universalorlando.com", status: "wishlist",
  },
  {
    id: "six-flags-magic-mountain", name: "Six Flags Magic Mountain", city: "Valencia", country: "États-Unis", countryCode: "840", flag: "🇺🇸",
    lat: 34.425, lon: -118.597, art: "loop", sky: "sunset", rating: 4.4, reviews: 9800,
    coasters: 20, attractions: 45, shows: 2, restaurants: 20, zones: 9, cleanliness: 4.1, opened: 1971,
    description: "Le parc qui possède le plus de coasters au monde, en Californie.",
    website: "https://www.sixflags.com", status: "decouvrir",
  },
  {
    id: "beto-carrero", name: "Beto Carrero World", city: "Penha", country: "Brésil", countryCode: "076", flag: "🇧🇷",
    lat: -26.8, lon: -48.62, art: "wheel", sky: "day", rating: 4.6, reviews: 6200,
    coasters: 7, attractions: 100, shows: 8, restaurants: 25, zones: 9, cleanliness: 4.4, opened: 1991,
    description: "Le plus grand parc d'Amérique latine, entre plage et forêt.",
    website: "https://www.betocarrero.com.br", status: "decouvrir",
  },
  {
    id: "ferrari-world", name: "Ferrari World", city: "Abou Dabi", country: "Émirats arabes unis", countryCode: "784", flag: "🇦🇪",
    lat: 24.484, lon: 54.607, art: "rocket", sky: "sunset", rating: 4.5, reviews: 8800,
    coasters: 5, attractions: 40, shows: 2, restaurants: 15, zones: 4, cleanliness: 4.7, opened: 2010,
    description: "Sous un immense toit rouge, le coaster le plus rapide du monde.",
    website: "https://www.ferrariworldabudhabi.com", status: "wishlist",
  },
  {
    id: "tokyo-disney-resort", name: "Tokyo Disney Resort", city: "Urayasu", country: "Japon", countryCode: "392", flag: "🇯🇵",
    lat: 35.633, lon: 139.88, art: "castle", sky: "day", rating: 4.8, reviews: 19400,
    coasters: 5, attractions: 70, shows: 10, restaurants: 50, zones: 14, cleanliness: 4.9, opened: 1983,
    description: "Tokyo Disneyland et DisneySea, souvent cités comme les plus beaux parcs du monde.",
    website: "https://www.tokyodisneyresort.jp", status: "defi",
  },
  {
    id: "fuji-q", name: "Fuji-Q Highland", city: "Fujiyoshida", country: "Japon", countryCode: "392", flag: "🇯🇵",
    lat: 35.487, lon: 138.78, art: "mountain", sky: "day", rating: 4.3, reviews: 4100,
    coasters: 4, attractions: 30, shows: 1, restaurants: 10, zones: 4, cleanliness: 4.5, opened: 1968,
    description: "Des coasters extrêmes au pied du mont Fuji.",
    website: "https://www.fujiq.jp", status: "decouvrir",
  },
  {
    id: "dreamworld", name: "Dreamworld", city: "Gold Coast", country: "Australie", countryCode: "036", flag: "🇦🇺",
    lat: -27.864, lon: 153.316, art: "wave", sky: "day", rating: 4.2, reviews: 5200,
    coasters: 5, attractions: 40, shows: 3, restaurants: 12, zones: 6, cleanliness: 4.3, opened: 1981,
    description: "Le plus grand parc d'Australie, avec ses animaux et ses sensations fortes.",
    website: "https://www.dreamworld.com.au", status: "decouvrir",
  },
  {
    id: "gold-reef-city", name: "Gold Reef City", city: "Johannesburg", country: "Afrique du Sud", countryCode: "710", flag: "🇿🇦",
    lat: -26.236, lon: 28.013, art: "wooden", sky: "sunset", rating: 4.1, reviews: 3100,
    coasters: 5, attractions: 30, shows: 2, restaurants: 12, zones: 4, cleanliness: 4.0, opened: 1987,
    description: "Un parc sur le thème de la ruée vers l'or, à Johannesburg.",
    website: "https://www.goldreefcity.co.za", status: "decouvrir",
  },
];

export const parkById = (id: string) => PARKS.find((p) => p.id === id);

export const STATUS_META: Record<
  StampStatus,
  { label: string; short: string; ink: string; fill: string; soft: string }
> = {
  decouvrir: { label: "À découvrir", short: "À DÉCOUVRIR", ink: "#7a8094", fill: "#ffffff", soft: "#f4f5f8" },
  wishlist: { label: "Wishlist", short: "WISHLIST", ink: "#4f8fc0", fill: "#eaf4fb", soft: "#eaf4fb" },
  visite: { label: "Visité", short: "VISITÉ", ink: "#5f9e57", fill: "#eef7ec", soft: "#eef7ec" },
  prochain: { label: "Prochain voyage", short: "PROCHAIN VOYAGE", ink: "#e08a3c", fill: "#fef3e8", soft: "#fef3e8" },
  defi: { label: "Défi en cours", short: "DÉFI", ink: "#9a72c4", fill: "#f5eefc", soft: "#f5eefc" },
};

export const STATUS_ORDER: StampStatus[] = ["decouvrir", "wishlist", "visite", "prochain", "defi"];

// Distance à vol d'oiseau en km
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(s)));
}
