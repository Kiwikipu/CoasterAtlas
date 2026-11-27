import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COASTERS, coasterById } from "@/data/coasters";
import CoasterDetail from "./CoasterDetail";

export function generateStaticParams() {
  return COASTERS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = coasterById((await params).id);
  return { title: c ? `${c.name} · CoasterAtlas` : "Coaster · CoasterAtlas" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const c = coasterById((await params).id);
  if (!c) notFound();
  return <CoasterDetail coasterId={c.id} />;
}
