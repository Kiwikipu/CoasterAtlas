import type { Metadata } from "next";
import { getWorld } from "@/lib/world";
import Home from "./Home";

export const metadata: Metadata = { title: "Accueil · CoasterAtlas" };

export default function Page() {
  return <Home world={getWorld()} />;
}
