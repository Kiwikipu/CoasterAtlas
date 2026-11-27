import { notFound } from "next/navigation";
import { TRIPS } from "@/data/demo";
import TripView from "./TripView";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ id: t.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!TRIPS.find((t) => t.id === id)) notFound();
  return <TripView tripId={id} />;
}
