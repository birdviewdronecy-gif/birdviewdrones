/** Antigravity A1 — public specs for the tech narrative */
export const tech = {
  product: "Antigravity A1",
  tagline: "World’s first 8K 360° camera drone",
  summary:
    "An integrated flying 360° camera system co-engineered with Insta360 — immersive FPV feeling with the ease of point-to-fly. No piloting skills required.",
  specs: [
    { label: "Capture", value: "8K 360° video" },
    { label: "Weight", value: "249 g class" },
    { label: "Immersion", value: "Vision goggles" },
    { label: "Control", value: "FreeMotion grip" },
    { label: "Flight", value: "Up to 39 min*" },
    { label: "Sensing", value: "360° awareness" },
  ],
  pillars: [
    {
      title: "See everything",
      body: "Dual 360° capture records the full sphere — look around freely while the aircraft holds the path. Reframe later. Relive Cyprus from any angle.",
    },
    {
      title: "Fly without fear",
      body: "Premade scenic paths and assisted control mean you enjoy the sky, not the sticks. Relax mode for golden light. Eagle mode when you want speed.",
    },
    {
      title: "Feel the cockpit",
      body: "Vision goggles deliver VR-quality immersion with head-tracked view — the closest thing to flying without leaving the ground.",
    },
  ],
  footnote:
    "*Flight time depends on battery configuration and conditions. Standard pack targets sub-250g class; high-capacity extends endurance.",
} as const;
