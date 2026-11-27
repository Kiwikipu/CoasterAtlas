// Profil et contenus de démonstration (voyages, souvenirs, défis, nouveautés).
import type { ArtKind } from "@/components/Art";

export const USER = {
  firstName: "Aurore",
  title: "Coaster Explorer",
  home: { name: "Strasbourg", lat: 48.573, lon: 7.752 }, // position de démo pour « Parcs proches de toi »
  objective2027: 12,
};

export type Ticket = { label: string; detail: string; ref: string };
export type ChecklistItem = { id: string; label: string; done: boolean };

export type Trip = {
  id: string;
  parkId: string;
  start: string; // AAAA-MM-JJ
  end: string;
  travellers: string;
  tickets: Ticket[];
  hotel: { name: string; stars: number; checkIn: string; checkOut: string; address: string; phone: string; art: ArtKind };
  parking: { name: string; price: string; info: string[]; walk: string };
  transport: { mode: string; detail: string };
  checklist: ChecklistItem[];
  notes: string;
};

const CHECKLIST = [
  "Billets téléchargés", "Hôtel confirmé", "Parking vérifié", "Horaires vérifiés", "Météo consultée",
  "Application du parc installée", "Batteries chargées", "Ponchos", "Pièce d'identité", "Réservation restaurant",
];

export const TRIPS: Trip[] = [
  {
    id: "disneyland-paris-2027", parkId: "disneyland-paris", start: "2027-02-13", end: "2027-02-15",
    travellers: "2 adultes",
    tickets: [
      { label: "Disneyland Paris", detail: "2 adultes · 2 parcs · 3 jours", ref: "DLP-2027-4471" },
    ],
    hotel: { name: "Hôtel du Lac Enchanté", stars: 4, checkIn: "15h00", checkOut: "11h00", address: "Marne-la-Vallée, France", phone: "+33 1 00 00 00 00", art: "castle" },
    parking: { name: "Parking visiteurs", price: "30 € / jour", info: ["Réservation non nécessaire", "Gratuit pour les clients de l'hôtel"], walk: "10 min de l'entrée" },
    transport: { mode: "Train", detail: "TGV Strasbourg → Marne-la-Vallée Chessy, 2 h 30" },
    checklist: CHECKLIST.map((label, i) => ({ id: `dlp-${i}`, label, done: i < 3 })),
    notes: "Faire Big Thunder Mountain dès l'ouverture. Parade à 17h30.",
  },
  {
    id: "europa-park-2027", parkId: "europa-park", start: "2027-04-14", end: "2027-04-16",
    travellers: "2 adultes, 2 enfants",
    tickets: [
      { label: "Europa-Park", detail: "2 adultes · 2 enfants · 2 jours", ref: "Réf. 7283910201" },
      { label: "Rulantica", detail: "2 adultes · 2 enfants · 1 jour", ref: "Réf. 8829912201" },
    ],
    hotel: { name: "Hôtel Bell Rock", stars: 4, checkIn: "15h00", checkOut: "11h00", address: "Europa-Park-Str. 4-6, 77977 Rust, Allemagne", phone: "+49 7822 77-6688", art: "castle" },
    parking: { name: "Parking visiteurs", price: "10 € / jour", info: ["Réservation non nécessaire", "Paiement sur place"], walk: "2 min de l'entrée, allée des Peupliers" },
    transport: { mode: "Voiture", detail: "Strasbourg → Rust, 50 min par l'A5" },
    checklist: CHECKLIST.map((label, i) => ({ id: `ep-${i}`, label, done: i < 8 })),
    notes: "Voltron Nevera en premier ! Dîner à l'Ammolite le samedi.",
  },
];

export type Souvenir = {
  id: string;
  parkId: string;
  date: string;
  attractions: number;
  distanceKm: number;
  weather: number;
  favorite: string;
  favoriteRating: number;
  note: string;
  photos: { art: ArtKind; sky: "sunset" | "day" | "dusk" | "night" }[];
};

export const SOUVENIRS: Souvenir[] = [
  { id: "europa-park-2026", parkId: "europa-park", date: "2026-08-12", attractions: 18, distanceKm: 17.2, weather: 32, favorite: "Voltron Nevera", favoriteRating: 4.9, note: "Une journée incroyable en famille ! Trois tours de Voltron d'affilée.", photos: [{ art: "loop", sky: "sunset" }, { art: "castle", sky: "day" }, { art: "hyper", sky: "dusk" }, { art: "wooden", sky: "sunset" }] },
  { id: "disneyland-paris-2026", parkId: "disneyland-paris", date: "2026-05-05", attractions: 14, distanceKm: 15.8, weather: 24, favorite: "Big Thunder Mountain", favoriteRating: 4.9, note: "Le feu d'artifice sur le château, inoubliable.", photos: [{ art: "castle", sky: "night" }, { art: "mountain", sky: "sunset" }, { art: "rocket", sky: "night" }] },
  { id: "universal-2025", parkId: "universal-studios-florida", date: "2025-07-18", attractions: 16, distanceKm: 19.4, weather: 34, favorite: "VelociCoaster", favoriteRating: 5, note: "VelociCoaster est entré direct dans mon top 3.", photos: [{ art: "dragon", sky: "day" }, { art: "globe", sky: "day" }] },
  { id: "gardaland-2025", parkId: "gardaland", date: "2025-04-10", attractions: 12, distanceKm: 11.3, weather: 21, favorite: "Raptor", favoriteRating: 4.5, note: "Petit détour par le lac de Garde après le parc.", photos: [{ art: "mountain", sky: "day" }, { art: "loop", sky: "day" }] },
  { id: "phantasialand-2024", parkId: "phantasialand", date: "2024-11-02", attractions: 15, distanceKm: 9.6, weather: 9, favorite: "Taron", favoriteRating: 5, note: "Taron sous la pluie, toujours aussi génial.", photos: [{ art: "dragon", sky: "dusk" }, { art: "loop", sky: "night" }] },
  { id: "portaventura-2024", parkId: "portaventura", date: "2024-10-22", attractions: 13, distanceKm: 14.1, weather: 26, favorite: "Shambhala", favoriteRating: 4.8, note: "Red Force : 180 km/h, je tremble encore.", photos: [{ art: "hyper", sky: "sunset" }, { art: "rocket", sky: "day" }] },
];

export type Challenge = {
  id: string;
  title: string;
  description: string;
  art: ArtKind;
  color: string;
  total: number;
  done: number;
  parkIds: string[]; // parcs liés (affichés dans le détail)
  reward: { badge: string; xp: number };
};

export const CHALLENGES: Challenge[] = [
  { id: "parcs-disney", title: "Tous les parcs Disney", description: "Visite tous les parcs Disney dans le monde.", art: "castle", color: "#9a72c4", total: 12, done: 8, parkIds: ["disneyland-paris", "magic-kingdom", "tokyo-disney-resort"], reward: { badge: "Badge Or", xp: 500 } },
  { id: "coasters-europe", title: "Tous les coasters d'Europe", description: "Ride 100 coasters en Europe.", art: "wooden", color: "#e08a3c", total: 100, done: 68, parkIds: ["europa-park", "phantasialand", "parc-asterix", "efteling", "liseberg", "portaventura", "gardaland"], reward: { badge: "Badge Europe", xp: 800 } },
  { id: "maitre-sensations", title: "Maître des sensations", description: "Ride 20 coasters de plus de 100 km/h.", art: "flame", color: "#f28b82", total: 20, done: 15, parkIds: ["cedar-point", "ferrari-world", "portaventura"], reward: { badge: "Badge Flamme", xp: 600 } },
  { id: "tour-du-monde", title: "Tour du monde", description: "Visite des parcs dans 25 pays différents.", art: "globe", color: "#3f9e9c", total: 25, done: 12, parkIds: ["beto-carrero", "dreamworld", "gold-reef-city", "fuji-q"], reward: { badge: "Badge Globe-trotter", xp: 1000 } },
  { id: "aquatique", title: "Été aquatique", description: "Réalise 3 attractions aquatiques cet été.", art: "wave", color: "#4f8fc0", total: 3, done: 3, parkIds: ["europa-park"], reward: { badge: "Badge Vague", xp: 200 } },
];

export const NEWS: { kicker: string; title: string; place: string; art: ArtKind; tint: string; href: string }[] = [
  { kicker: "Nouveau coaster", title: "Voltron Nevera", place: "Europa-Park", art: "loop", tint: "#efe8fb", href: "/coasters/voltron-nevera" },
  { kicker: "Événement", title: "Halloween", place: "Phantasialand", art: "pumpkin", tint: "#fdeedd", href: "/parcs/phantasialand" },
  { kicker: "Nouveau parc", title: "Epic Universe", place: "Orlando, USA", art: "globe", tint: "#fde8ea", href: "/parcs/epic-universe" },
];

export const BADGES: { label: string; art: ArtKind; color: string; unlocked: boolean }[] = [
  { label: "Châteaux", art: "castle", color: "#8ec5e8", unlocked: true },
  { label: "Trophée", art: "trophy", color: "#f7b57a", unlocked: true },
  { label: "Globe-trotter", art: "globe", color: "#a8d5a2", unlocked: true },
  { label: "Nuit magique", art: "star", color: "#c9a7e8", unlocked: true },
  { label: "Flamme", art: "flame", color: "#f28b82", unlocked: false },
  { label: "Fondateur", art: "rocket", color: "#fbd27a", unlocked: false },
];
