import { getWorld } from "@/lib/world";
import MapHome from "./MapHome";

export default function Page() {
  return <MapHome world={getWorld()} />;
}
