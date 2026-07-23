import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight map — Paphos & Akamas",
  description:
    "Interactive 3D map of drone flight spots across Paphos and Akamas National Park. Orbit the coast, pick a blip, book your experience — all on one page.",
};

/** Map + booking UI lives in layout (shared with /spots/[slug]). */
export default function SpotsPage() {
  return null;
}
