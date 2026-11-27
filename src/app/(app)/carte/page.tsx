import type { Metadata } from "next";
import { getWorld } from "@/lib/world";
import Explore from "./Explore";

export const metadata: Metadata = { title: "Carte du monde · CoasterAtlas" };

export default function Page() {
  return <Explore world={getWorld()} />;
}
