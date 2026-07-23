export type Experience = {
  slug: string;
  title: string;
  short: string;
  description: string;
  idealFor: string[];
  icon: "vacation" | "birthday" | "wedding" | "events" | "sunset" | "training";
};

export const experiences: Experience[] = [
  {
    slug: "vacation-memories",
    title: "Vacation memories",
    short: "A spot of your choosing",
    description:
      "Turn a favourite corner of Cyprus into an aerial memory. You choose the place — we handle the flight so you can soak in the view.",
    idealFor: ["Couples", "Families", "Solo travellers"],
    icon: "vacation",
  },
  {
    slug: "birthday-surprises",
    title: "Birthday surprises",
    short: "Celebrate from the sky",
    description:
      "Make a birthday unforgettable with a private aerial experience — calm scenic paths or an eagle-speed thrill.",
    idealFor: ["Friends", "Partners", "Family"],
    icon: "birthday",
  },
  {
    slug: "weddings",
    title: "Weddings",
    short: "Your day, from above",
    description:
      "Add a cinematic bird’s-eye moment to the celebration — golden light, coastline, and a memory only you will have.",
    idealFor: ["Couples", "Wedding parties"],
    icon: "wedding",
  },
  {
    slug: "events",
    title: "Events",
    short: "Gatherings with altitude",
    description:
      "Private parties, group outings, and special occasions — share the closest thing to flying with everyone there.",
    idealFor: ["Groups", "Corporate", "Private parties"],
    icon: "events",
  },
  {
    slug: "golden-sunset",
    title: "Golden sunset",
    short: "Experience the golden hour",
    description:
      "Fly as the sky turns gold over Cyprus. Premade paths timed for the best light — pure magic from above.",
    idealFor: ["Romance", "Photography lovers", "First-timers"],
    icon: "sunset",
  },
  {
    slug: "drone-training",
    title: "Drone training",
    short: "Learn with confidence",
    description:
      "Step up from passenger to pilot. Structured training for those who want skills — not only the experience.",
    idealFor: ["Beginners", "Enthusiasts", "Pros"],
    icon: "training",
  },
];
