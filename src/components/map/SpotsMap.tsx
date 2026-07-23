"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import maplibregl, { type Map as MaplibreMap, type Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getSpot, mapRegion, spots, type Spot } from "@/content/spots";
import { SpotCard } from "@/components/map/SpotCard";

const STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Bird View — Paphos & Akamas",
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles © Esri",
      maxzoom: 19,
    },
    terrain: {
      type: "raster-dem",
      tiles: [
        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
      ],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 15,
    },
  },
  layers: [
    {
      id: "satellite",
      type: "raster",
      source: "satellite",
      paint: {
        "raster-saturation": -0.15,
        "raster-contrast": 0.08,
        "raster-brightness-min": 0.02,
      },
    },
  ],
  sky: {
    "sky-color": "#0b1a2e",
    "sky-horizon-blend": 0.6,
    "horizon-color": "#1a3348",
    "horizon-fog-blend": 0.7,
    "fog-color": "#0b0b0a",
    "fog-ground-blend": 0.4,
  },
};

function slugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/spots\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

function createBlipEl(spot: Spot, active: boolean): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `bv-blip${active ? " is-active" : ""}`;
  btn.setAttribute("aria-label", spot.name);
  btn.dataset.slug = spot.slug;
  btn.innerHTML = `
    <span class="bv-blip__pulse"></span>
    <span class="bv-blip__core">
      <span class="bv-blip__icon">✦</span>
    </span>
    <span class="bv-blip__label">${spot.blip}</span>
  `;
  return btn;
}

type SpotsMapProps = {
  /** When a spot is selected (map or grid), parent can highlight cards */
  onSelectionChange?: (spot: Spot | null) => void;
  /** Imperative select from grid cards */
  selectedSlug?: string | null;
};

export function SpotsMap({ onSelectionChange, selectedSlug }: SpotsMapProps) {
  const router = useRouter();
  const pathname = usePathname();
  const pathSlug = slugFromPath(pathname);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const readyRef = useRef(false);
  const lastFlewSlug = useRef<string | null>(null);
  const selectSpotRef = useRef<
    (spot: Spot, opts?: { fly?: boolean; syncUrl?: boolean }) => void
  >(() => {});
  const clearSpotRef = useRef<() => void>(() => {});

  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Spot | null>(() =>
    pathSlug ? (getSpot(pathSlug) ?? null) : null,
  );

  const cameraToOverview = useCallback((animate = true) => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    lastFlewSlug.current = null;
    const camera = {
      center: [mapRegion.center.lng, mapRegion.center.lat] as [number, number],
      zoom: mapRegion.defaultZoom,
      pitch: mapRegion.defaultPitch,
      bearing: mapRegion.defaultBearing,
      essential: true as const,
    };
    if (animate) {
      map.flyTo({ ...camera, duration: 1600 });
    } else {
      map.jumpTo(camera);
    }
  }, []);

  const cameraToSpot = useCallback((spot: Spot, force = false) => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    if (!force && lastFlewSlug.current === spot.slug) return;
    lastFlewSlug.current = spot.slug;
    map.flyTo({
      center: [spot.coordinates.lng, spot.coordinates.lat],
      zoom: 13.4,
      pitch: 62,
      bearing: map.getBearing() + 18,
      duration: 2200,
      essential: true,
    });
  }, []);

  const selectSpot = useCallback(
    (spot: Spot, opts?: { fly?: boolean; syncUrl?: boolean }) => {
      const { fly = true, syncUrl = true } = opts ?? {};
      setSelected(spot);
      onSelectionChange?.(spot);
      markersRef.current.forEach((mk) => {
        const el = mk.getElement();
        el.classList.toggle("is-active", el.dataset.slug === spot.slug);
      });
      if (fly) cameraToSpot(spot, true);
      if (syncUrl && pathSlug !== spot.slug) {
        router.push(`/spots/${spot.slug}`, { scroll: false });
      }
    },
    [cameraToSpot, onSelectionChange, pathSlug, router],
  );

  const clearSpot = useCallback(() => {
    setSelected(null);
    onSelectionChange?.(null);
    markersRef.current.forEach((mk) => {
      mk.getElement().classList.remove("is-active");
    });
    cameraToOverview(true);
    if (pathSlug) {
      router.push("/spots", { scroll: false });
    }
  }, [cameraToOverview, onSelectionChange, pathSlug, router]);

  selectSpotRef.current = selectSpot;
  clearSpotRef.current = clearSpot;

  // Sync from URL
  useEffect(() => {
    if (!ready) return;
    if (pathSlug) {
      const spot = getSpot(pathSlug);
      if (spot) {
        if (selected?.slug !== spot.slug) {
          setSelected(spot);
          onSelectionChange?.(spot);
          markersRef.current.forEach((mk) => {
            const el = mk.getElement();
            el.classList.toggle("is-active", el.dataset.slug === spot.slug);
          });
        }
        cameraToSpot(spot);
      }
    } else if (selected) {
      setSelected(null);
      onSelectionChange?.(null);
      lastFlewSlug.current = null;
      markersRef.current.forEach((mk) => {
        mk.getElement().classList.remove("is-active");
      });
      cameraToOverview(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathSlug, ready, cameraToSpot, cameraToOverview]);

  // Select from parent grid
  useEffect(() => {
    if (!ready || !selectedSlug) return;
    if (selected?.slug === selectedSlug) return;
    const spot = getSpot(selectedSlug);
    if (spot) selectSpot(spot, { fly: true, syncUrl: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSlug, ready]);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: [mapRegion.center.lng, mapRegion.center.lat],
      zoom: mapRegion.defaultZoom,
      pitch: mapRegion.defaultPitch,
      bearing: mapRegion.defaultBearing,
      maxBounds: mapRegion.bounds,
      minZoom: 9,
      maxZoom: 16.5,
      maxPitch: 75,
      // Free look: pan any direction + rotate north (bearing)
      dragPan: true,
      dragRotate: true,
      pitchWithRotate: true,
      touchPitch: true,
      touchZoomRotate: true,
      bearingSnap: 0,
      cooperativeGestures: false,
      attributionControl: false,
      hash: false,
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right",
    );
    map.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
        showZoom: true,
      }),
      "bottom-right",
    );

    mapRef.current = map;

    // Ensure handlers stay on (some builds leave rotate off by default on trackpads)
    map.dragPan.enable();
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
    map.touchZoomRotate.enableRotation();
    map.touchPitch.enable();
    map.keyboard.enable();

    map.on("load", () => {
      try {
        map.setTerrain({ source: "terrain", exaggeration: 1.55 });
      } catch {
        /* optional */
      }

      markersRef.current.forEach((m) => m.remove());
      markersRef.current = spots.map((spot) => {
        const el = createBlipEl(spot, false);
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          selectSpotRef.current(spot);
        });
        return new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([spot.coordinates.lng, spot.coordinates.lat])
          .addTo(map);
      });

      readyRef.current = true;
      setReady(true);
      // Fix canvas size after layout (map is no longer full-viewport exclusive)
      requestAnimationFrame(() => map.resize());
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSpotRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    const onResize = () => map.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      markersRef.current.forEach((mk) => mk.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      readyRef.current = false;
    };
  }, []);

  return (
    <div className="relative h-[min(62svh,560px)] w-full overflow-hidden bg-[#0b0b0a] text-[#f7f5ef] sm:h-[min(68svh,640px)]">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.45) 100%), linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 30%)",
        }}
      />

      {/* Top HUD — light, no competing list */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-[var(--gutter-x)] pt-20 sm:pt-24">
        <div className="max-w-md">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
            Interactive 3D · Paphos & Akamas
          </p>
          <h1 className="display mt-2 text-[clamp(1.6rem,3.5vw,2.4rem)] text-white">
            {selected ? selected.name : "Pick a flight spot"}
          </h1>
          <p className="mt-1 text-sm text-white/55">
            {selected
              ? selected.teaser
              : "Tap a blip on the map, or choose a card below."}
          </p>
          <p className="mt-2 hidden text-[10px] uppercase tracking-[0.12em] text-white/35 sm:block">
            Drag to pan · Ctrl/⌘+drag or right-drag to rotate north · two-finger
            on touch
          </p>
        </div>
      </div>

      {/* Selection panel — same SpotCard design as grid */}
      {selected && (
        <div className="absolute bottom-3 right-[var(--gutter-x)] z-20 w-[min(100%-1.5rem,360px)] sm:bottom-5">
          <SpotCard
            spot={selected}
            variant="panel"
            onClose={clearSpot}
          />
        </div>
      )}

      {!ready && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-[#0b0b0a]">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              Loading terrain
            </p>
            <p className="display mt-3 text-2xl text-white">Paphos & Akamas</p>
          </div>
        </div>
      )}

      <Link
        href="#spot-list"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to spot cards
      </Link>
    </div>
  );
}
