export type Spot = {
  slug: string;
  name: string;
  region: string;
  teaser: string;
  whyFromAir: string;
  tags: Array<"sunset" | "adventure" | "romance" | "family" | "coast" | "mountains">;
  image: string;
  videoSrc: string;
  posterSrc: string;
  /** WGS84 — used by the interactive flight map */
  coordinates: { lng: number; lat: number };
  /** Short map blip label */
  blip: string;
  featured?: boolean;
};

/**
 * Drone flight spots — Paphos coast + Akamas National Park.
 * Coordinates are approximate launch/view centres for map blips.
 */
export const spots: Spot[] = [
  {
    slug: "aphrodites-rock",
    name: "Aphrodite’s Rock",
    region: "Paphos coast",
    blip: "Myth",
    teaser: "Mythic shoreline. Turquoise geometry only the sky can reveal.",
    whyFromAir:
      "From altitude the rock becomes a punctuation mark in an endless coastal line — foam, stone, and gold light composing themselves below you.",
    tags: ["coast", "romance", "sunset"],
    image: "/images/spots/aphrodites-rock.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/aphrodites-rock.jpg",
    coordinates: { lng: 32.6267, lat: 34.6636 },
    featured: true,
  },
  {
    slug: "paphos-harbour",
    name: "Paphos Harbour",
    region: "Paphos",
    blip: "Harbour",
    teaser: "Castle, marina geometry, and the old town edge from above.",
    whyFromAir:
      "The harbour becomes a perfect crescent of boats and stone — civic Paphos drawn as a map you can fly.",
    tags: ["coast", "family", "romance"],
    image: "/images/spots/cape-greco.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/cape-greco.jpg",
    coordinates: { lng: 32.4075, lat: 34.7539 },
    featured: true,
  },
  {
    slug: "coral-bay",
    name: "Coral Bay",
    region: "Peyia / Paphos",
    blip: "Coral",
    teaser: "Iconic bay curves and shallow turquoise shelves.",
    whyFromAir:
      "The full horseshoe of Coral Bay only reads from altitude — a postcard that moves when you bank.",
    tags: ["coast", "family", "sunset"],
    image: "/images/spots/coral-bay.jpg",
    videoSrc: "/videos/spots/coral-bay-teaser.mp4",
    posterSrc: "/images/spots/coral-bay-poster.jpg",
    coordinates: { lng: 32.37, lat: 34.855 },
    featured: true,
  },
  {
    slug: "blue-lagoon",
    name: "Blue Lagoon",
    region: "Akamas National Park",
    blip: "Lagoon",
    teaser: "The jewel of Akamas — crystal water against wild scrub.",
    whyFromAir:
      "Follow the northern tip where lagoon meets open sea — pure adventure energy over protected coast.",
    tags: ["coast", "adventure", "romance"],
    image: "/images/spots/akamas-peninsula.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/akamas-peninsula.jpg",
    coordinates: { lng: 32.313, lat: 35.055 },
    featured: true,
  },
  {
    slug: "lara-beach",
    name: "Lara Beach",
    region: "Akamas National Park",
    blip: "Lara",
    teaser: "Wild turtle coast. Untouched sand and scrub from the sky.",
    whyFromAir:
      "One of Cyprus’s freest edges — dunes, tracks, and open water with almost no human geometry.",
    tags: ["coast", "adventure", "family"],
    image: "/images/spots/akamas-peninsula.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/akamas-peninsula.jpg",
    coordinates: { lng: 32.305, lat: 34.95 },
    featured: true,
  },
  {
    slug: "avakas-gorge",
    name: "Avakas Gorge",
    region: "Akamas foothills",
    blip: "Gorge",
    teaser: "A limestone cut through the hills — drama in relief.",
    whyFromAir:
      "From above the gorge is a dark ribbon through pale rock and green scrub — terrain that begs for altitude.",
    tags: ["adventure", "mountains", "family"],
    image: "/images/spots/troodos-sunset.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/troodos-sunset.jpg",
    coordinates: { lng: 32.345, lat: 34.92 },
    featured: false,
  },
  {
    slug: "latchi",
    name: "Latchi Harbour",
    region: "Polis / Akamas gateway",
    blip: "Latchi",
    teaser: "Gateway to Akamas — boats, bay light, mountain backdrop.",
    whyFromAir:
      "The harbour sits between sea and the rise toward Akamas — a calm launch into wilder air.",
    tags: ["coast", "family", "sunset"],
    image: "/images/spots/cape-greco.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/cape-greco.jpg",
    coordinates: { lng: 32.39, lat: 35.04 },
    featured: false,
  },
  {
    slug: "akamas-ridge",
    name: "Akamas Ridge",
    region: "Akamas National Park",
    blip: "Ridge",
    teaser: "Spine of the peninsula — scrub, tracks, dual-coast views.",
    whyFromAir:
      "Feel like an eagle over one of the island’s freest landscapes — raw Cyprus, unfiltered, wind in every frame.",
    tags: ["adventure", "coast", "sunset"],
    image: "/images/spots/akamas-peninsula.jpg",
    videoSrc: "",
    posterSrc: "/images/spots/akamas-peninsula.jpg",
    coordinates: { lng: 32.32, lat: 35.02 },
    featured: true,
  },
];

/** Map framing — zoomed-out overview of Paphos coast → Latchi / Akamas gateway */
export const mapRegion = {
  name: "Paphos & Akamas",
  /** Midway Paphos harbour ↔ Latchi so the whole corridor reads at once */
  center: { lng: 32.39, lat: 34.9 } as const,
  /**
   * Soft maxBounds — wide enough that pitched 3D view can still pan
   * left/right and rotate bearing without locking on one axis.
   */
  bounds: [
    [31.85, 34.35],
    [33.05, 35.45],
  ] as [[number, number], [number, number]],
  /** Zoomed out so Paphos + Latchi area is visible together */
  defaultZoom: 10.35,
  defaultPitch: 48,
  defaultBearing: -22,
};

export function getSpot(slug: string): Spot | undefined {
  return spots.find((s) => s.slug === slug);
}

export function featuredSpots(): Spot[] {
  return spots.filter((s) => s.featured);
}
