import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PARKS, parkById } from "@/data/parks";
import ParkDetail from "./ParkDetail";

export function generateStaticParams() {
  return PARKS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const park = parkById((await params).id);
  return { title: park ? `${park.name} · CoasterAtlas` : "Parc · CoasterAtlas" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const park = parkById((await params).id);
  if (!park) notFound();
  return <ParkDetail parkId={park.id} />;
}
