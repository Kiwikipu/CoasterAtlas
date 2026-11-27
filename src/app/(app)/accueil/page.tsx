import { redirect } from "next/navigation";

// L'accueil est maintenant la carte du monde, à la racine du site.
export default function Page() {
  redirect("/");
}
