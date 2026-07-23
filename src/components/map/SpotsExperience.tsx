"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSpot, mapRegion, spots, type Spot } from "@/content/spots";
import { SpotCard } from "@/components/map/SpotCard";

const SpotsMap = dynamic(
  () => import("@/components/map/SpotsMap").then((m) => m.SpotsMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[min(62svh,560px)] place-items-center bg-[#0b0b0a] text-[#f7f5ef] sm:h-[min(68svh,640px)]">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
            Loading 3D map
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl">
            {mapRegion.name}
          </p>
        </div>
      </div>
    ),
  },
);

function slugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/spots\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

/**
 * Flight Spots hub: map on top + persistent photo cards below.
 * Cards no longer flash-and-hide — map is shorter so the grid stays in view.
 */
export function SpotsExperience() {
  const router = useRouter();
  const pathname = usePathname();
  const pathSlug = slugFromPath(pathname);

  const [selected, setSelected] = useState<Spot | null>(() =>
    pathSlug ? (getSpot(pathSlug) ?? null) : null,
  );
  /** Signals map to fly when user picks a grid card */
  const [mapSelectSlug, setMapSelectSlug] = useState<string | null>(null);

  // One-time scroll to top on first enter only (no delayed re-scroll that hides cards)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (pathSlug) {
      setSelected(getSpot(pathSlug) ?? null);
    } else {
      setSelected(null);
    }
  }, [pathSlug]);

  const onSelectionChange = useCallback((spot: Spot | null) => {
    setSelected(spot);
    setMapSelectSlug(null);
  }, []);

  const onGridSelect = useCallback(
    (spot: Spot) => {
      setSelected(spot);
      setMapSelectSlug(spot.slug);
      router.push(`/spots/${spot.slug}`, { scroll: false });
      // Gentle scroll so map + panel are in view without hiding the card grid forever
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router],
  );

  return (
    <div className="bg-transparent text-[var(--fg)]">
      <SpotsMap
        onSelectionChange={onSelectionChange}
        selectedSlug={mapSelectSlug}
      />

      <section
        id="spot-list"
        className="border-t border-white/10 px-[var(--gutter-x)] py-14 sm:py-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            Locations · {mapRegion.name}
          </p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Flight spots
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
            Choose a card or tap a blip on the map — same places, same design,
            book from either.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => (
              <li key={spot.slug}>
                <SpotCard
                  spot={spot}
                  variant="grid"
                  active={selected?.slug === spot.slug}
                  onSelect={() => onGridSelect(spot)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
