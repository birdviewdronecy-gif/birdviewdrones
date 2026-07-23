export const site = {
  name: "Bird View Drones",
  /** Display mark used on the immersive intro */
  brandMark: "BirdView Drones",
  shortName: "Bird View",
  domain: "birdviewdrones.cy",
  url: "https://birdviewdrones.cy",
  tagline: "Experience Cyprus From Above",
  supportingTagline: "The closest thing to flying",
  description:
    "Immersive Antigravity A1 drone experiences across Cyprus. Feel the sky — 8K 360° capture, Vision goggles, premade flight paths. No technical knowledge required.",
  product: "Antigravity A1",
  location: "Cyprus",
  email: "hello@birdviewdrones.cy",
  /**
   * WhatsApp number — digits only, country code, no + or spaces.
   * Example Cyprus: "35799123456"
   * Leave empty until the real number is ready; the FAB still builds a wa.me URL.
   */
  whatsapp: "" as string,
  bookingMode: "inquire" as "inquire" | "calendar",
  /** Primary category gate (Horizonte-style tabs on the home intro) */
  categories: [
    {
      href: "/spots",
      label: "Flight Spots",
      kicker: "Explore Cyprus",
      description:
        "Coastlines, lagoons, and wild ridges — pick a place written for the sky.",
      image: "/images/spots/akamas-peninsula.jpg",
    },
    {
      href: "/pricing",
      label: "Pricing",
      kicker: "Packages",
      description:
        "Simple experience packages for memories, sunsets, and celebrations.",
      image: "/images/spots/troodos-sunset.jpg",
    },
  ],
  /**
   * Full site navigation — used by the top bar menu + footer.
   * Flight Spots opens the 3D map hub + spot list; detail via map blips or cards.
   */
  nav: [
    { href: "/spots", label: "Flight Spots" },
    { href: "/pricing", label: "Pricing" },
    { href: "/experiences", label: "Experiences" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/pro", label: "Pro" },
    { href: "/book", label: "Book" },
  ],
} as const;
