// Données d'exemple : chiffres approximatifs, à vérifier avant une vraie mise en ligne.
import type { ArtKind } from "@/components/Art";

export type Coaster = {
  id: string;
  name: string;
  parkId: string;
  manufacturer: string;
  opened: number;
  type: string;
  height: number; // m
  speed: number; // km/h
  inversions: number;
  length: number; // m
  intensity: number; // sur 5
  rating: number;
  reviews: number;
  rank?: number;
  art: ArtKind;
  sky: "sunset" | "day" | "dusk" | "night";
  ridden: boolean; // déjà fait par le profil de démonstration
};

export const COASTERS: Coaster[] = [
  { id: "silver-star", name: "Silver Star", parkId: "europa-park", manufacturer: "Bolliger & Mabillard", opened: 2002, type: "Hyper Coaster", height: 73, speed: 127, inversions: 0, length: 1620, intensity: 4.5, rating: 4.8, reviews: 8956, rank: 15, art: "hyper", sky: "day", ridden: false },
  { id: "blue-fire", name: "Blue Fire", parkId: "europa-park", manufacturer: "Mack Rides", opened: 2009, type: "Launch Coaster", height: 38, speed: 100, inversions: 4, length: 1056, intensity: 4, rating: 4.7, reviews: 7120, art: "loop", sky: "dusk", ridden: false },
  { id: "wodan", name: "Wodan", parkId: "europa-park", manufacturer: "Great Coasters International", opened: 2012, type: "Coaster en bois", height: 40, speed: 100, inversions: 0, length: 1050, intensity: 4, rating: 4.6, reviews: 6400, art: "wooden", sky: "sunset", ridden: false },
  { id: "voltron-nevera", name: "Voltron Nevera", parkId: "europa-park", manufacturer: "Mack Rides", opened: 2024, type: "Launch Coaster", height: 33, speed: 90, inversions: 7, length: 1385, intensity: 4.5, rating: 4.8, reviews: 3200, art: "loop", sky: "sunset", ridden: false },
  { id: "taron", name: "Taron", parkId: "phantasialand", manufacturer: "Intamin", opened: 2016, type: "Launch Coaster", height: 30, speed: 117, inversions: 0, length: 1320, intensity: 4.5, rating: 4.9, reviews: 9100, rank: 8, art: "dragon", sky: "dusk", ridden: true },
  { id: "black-mamba", name: "Black Mamba", parkId: "phantasialand", manufacturer: "Bolliger & Mabillard", opened: 2006, type: "Inverted Coaster", height: 26, speed: 80, inversions: 4, length: 768, intensity: 4, rating: 4.6, reviews: 5200, art: "loop", sky: "night", ridden: true },
  { id: "big-thunder-mountain", name: "Big Thunder Mountain", parkId: "disneyland-paris", manufacturer: "Vekoma", opened: 1992, type: "Train de la mine", height: 22, speed: 60, inversions: 0, length: 1500, intensity: 2.5, rating: 4.9, reviews: 14100, art: "mountain", sky: "sunset", ridden: true },
  { id: "hyperspace-mountain", name: "Hyperspace Mountain", parkId: "disneyland-paris", manufacturer: "Vekoma", opened: 1995, type: "Launch Coaster", height: 32, speed: 70, inversions: 3, length: 1000, intensity: 3.5, rating: 4.5, reviews: 9800, art: "rocket", sky: "night", ridden: true },
  { id: "toutatis", name: "Toutatis", parkId: "parc-asterix", manufacturer: "Intamin", opened: 2023, type: "Launch Coaster", height: 51, speed: 107, inversions: 2, length: 1150, intensity: 4.5, rating: 4.8, reviews: 4300, art: "loop", sky: "day", ridden: false },
  { id: "baron-1898", name: "Baron 1898", parkId: "efteling", manufacturer: "Bolliger & Mabillard", opened: 2015, type: "Dive Coaster", height: 30, speed: 90, inversions: 2, length: 501, intensity: 4, rating: 4.6, reviews: 6100, art: "fairy", sky: "dusk", ridden: false },
  { id: "helix", name: "Helix", parkId: "liseberg", manufacturer: "Mack Rides", opened: 2014, type: "Launch Coaster", height: 41, speed: 100, inversions: 7, length: 1381, intensity: 4.5, rating: 4.8, reviews: 4800, rank: 12, art: "loop", sky: "day", ridden: false },
  { id: "shambhala", name: "Shambhala", parkId: "portaventura", manufacturer: "Bolliger & Mabillard", opened: 2012, type: "Hyper Coaster", height: 76, speed: 134, inversions: 0, length: 1650, intensity: 4.5, rating: 4.8, reviews: 7600, rank: 10, art: "hyper", sky: "sunset", ridden: true },
  { id: "red-force", name: "Red Force", parkId: "portaventura", manufacturer: "Intamin", opened: 2017, type: "Strata Coaster", height: 112, speed: 180, inversions: 0, length: 880, intensity: 5, rating: 4.6, reviews: 5100, art: "rocket", sky: "day", ridden: true },
  { id: "raptor", name: "Raptor", parkId: "gardaland", manufacturer: "Bolliger & Mabillard", opened: 2011, type: "Wing Coaster", height: 33, speed: 90, inversions: 3, length: 770, intensity: 4, rating: 4.5, reviews: 3900, art: "loop", sky: "day", ridden: true },
  { id: "steel-vengeance", name: "Steel Vengeance", parkId: "cedar-point", manufacturer: "Rocky Mountain Construction", opened: 2018, type: "Coaster hybride", height: 62, speed: 119, inversions: 4, length: 1740, intensity: 5, rating: 4.9, reviews: 9900, rank: 1, art: "wooden", sky: "sunset", ridden: false },
  { id: "velocicoaster", name: "VelociCoaster", parkId: "universal-studios-florida", manufacturer: "Intamin", opened: 2021, type: "Launch Coaster", height: 47, speed: 113, inversions: 4, length: 1440, intensity: 4.5, rating: 4.9, reviews: 11200, rank: 2, art: "dragon", sky: "day", ridden: true },
  { id: "formula-rossa", name: "Formula Rossa", parkId: "ferrari-world", manufacturer: "Intamin", opened: 2010, type: "Launch Coaster", height: 52, speed: 240, inversions: 0, length: 2070, intensity: 5, rating: 4.5, reviews: 6600, art: "rocket", sky: "sunset", ridden: false },
  { id: "fujiyama", name: "Fujiyama", parkId: "fuji-q", manufacturer: "TOGO", opened: 1996, type: "Hyper Coaster", height: 79, speed: 130, inversions: 0, length: 2045, intensity: 4, rating: 4.3, reviews: 3000, art: "mountain", sky: "day", ridden: false },
];

export const coasterById = (id: string) => COASTERS.find((c) => c.id === id);
export const coastersOfPark = (parkId: string) => COASTERS.filter((c) => c.parkId === parkId);
