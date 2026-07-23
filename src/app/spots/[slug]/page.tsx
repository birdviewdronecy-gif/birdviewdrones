import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpot, spots } from "@/content/spots";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return spots.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) return { title: "Spot" };
  return {
    title: `${spot.name} — Flight map`,
    description: `${spot.teaser} Book this Bird View Drones flight spot on the Paphos & Akamas map.`,
  };
}

/**
 * Same experience as /spots — layout renders the map.
 * This route only validates the slug and sets metadata so
 * /spots/aphrodites-rock deep-links into the map with that blip open.
 */
export default async function SpotOnMapPage({ params }: Props) {
  const { slug } = await params;
  if (!getSpot(slug)) notFound();
  return null;
}
