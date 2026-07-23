export type PricingTier = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  idealFor: string[];
  highlight?: boolean;
};

/**
 * Experience packages — inquire-first (phase 1).
 * Keep aligned with retail vs pro split from the business brief.
 */
export const pricingTiers: PricingTier[] = [
  {
    slug: "scenic-flight",
    name: "Scenic flight",
    tagline: "The essential bird’s-eye moment",
    description:
      "A guided flight on a premade scenic path — goggles on, no skills required. Ideal for first-timers who want pure view.",
    includes: [
      "Premade scenic path",
      "Vision goggles immersion",
      "Operator-guided session",
      "Spot of your choice (subject to conditions)",
    ],
    idealFor: ["Couples", "Families", "First-timers"],
  },
  {
    slug: "golden-sunset",
    name: "Golden sunset",
    tagline: "Fly as the sky turns gold",
    description:
      "Timed for golden hour over Cyprus. Soft light, calm paths, and a memory only altitude can give.",
    includes: [
      "Golden-hour timing",
      "Scenic or romance-oriented path",
      "Vision goggles immersion",
      "Optional 8K 360° capture package",
    ],
    idealFor: ["Romance", "Photography lovers", "Proposals"],
    highlight: true,
  },
  {
    slug: "celebration",
    name: "Celebration",
    tagline: "Birthdays, weddings, surprises",
    description:
      "Private aerial moments for the people you care about — framed as experience, not rental.",
    includes: [
      "Occasion-tailored briefing",
      "Choice of relax or eagle energy",
      "Group-friendly scheduling",
      "Optional memory capture",
    ],
    idealFor: ["Birthdays", "Weddings", "Private parties"],
  },
  {
    slug: "private-custom",
    name: "Private & custom",
    tagline: "Your date, spot, and mood",
    description:
      "Fully tailored flights for explorers and hosts who want a specific coastline, ridge, or sequence.",
    includes: [
      "Custom spot selection",
      "Flexible path design",
      "Priority scheduling where available",
      "Direct planning with our team",
    ],
    idealFor: ["Explorers", "Hosts", "Special requests"],
  },
];

export const pricingNotes = {
  headline: "Clear packages. No pilot license required.",
  body: "Every guest experience uses premade flight paths on the Antigravity A1. You fly the feeling — we handle the craft. Final pricing depends on date, spot, group size, and capture options.",
  cta: "Tell us your date and occasion — we’ll confirm availability and a precise quote.",
} as const;
