import { notFound } from "next/navigation";
import { SOUVENIRS } from "@/data/demo";
import SouvenirView from "./SouvenirView";

export function generateStaticParams() {
  return [...SOUVENIRS.map((s) => ({ id: s.id })), { id: "nouveau" }];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "nouveau";
  const s = isNew ? SOUVENIRS[0] : SOUVENIRS.find((x) => x.id === id);
  if (!s) notFound();
  return <SouvenirView souvenirId={s.id} isNew={isNew} />;
}
