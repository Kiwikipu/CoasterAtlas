import type { Metadata } from "next";
import { getWorld } from "@/lib/world";
import AtlasView from "./AtlasView";

export const metadata: Metadata = { title: "Mon Atlas · CoasterAtlas" };

export default function Page() {
  return <AtlasView world={getWorld()} />;
}
