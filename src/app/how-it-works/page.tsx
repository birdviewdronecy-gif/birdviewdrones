import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "No technical knowledge required. Premade flight paths on the Antigravity A1.",
};

const steps = [
  {
    n: "01",
    title: "Choose your experience",
    body: "Vacation memory, birthday, wedding, event, or golden sunset — tell us the mood and the moment.",
  },
  {
    n: "02",
    title: "Pick a spot",
    body: "Browse Cyprus from above. Each location is chosen for how it feels at altitude.",
  },
  {
    n: "03",
    title: "Put on the goggles",
    body: "Vision immersion drops you into the sky. Look around. Breathe. You're flying.",
  },
  {
    n: "04",
    title: "Relax — or eagle",
    body: "Premade paths for pure view, or full-speed energy. Leave with a memory only the sky can give.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <div className="px-[var(--gutter-x)] pb-16">
        <Reveal>
          <p className="eyebrow">Process</p>
          <h1 className="display mt-4 max-w-[14ch] text-[clamp(2.8rem,6vw,5rem)]">
            You enjoy the sky. We handle the rest.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
            Built around the {site.product} so anyone can experience Cyprus from
            above.
          </p>
        </Reveal>
      </div>

      <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {steps.map((s) => (
          <li key={s.n} className="px-[var(--gutter-x)] py-12">
            <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-12">
              <p className="text-[11px] tracking-[0.16em] text-[var(--accent-soft)] lg:col-span-2">
                {s.n}
              </p>
              <h2 className="display text-3xl text-[var(--fg)] lg:col-span-4">
                {s.title}
              </h2>
              <p className="max-w-md leading-relaxed text-[var(--muted)] lg:col-span-5">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="px-[var(--gutter-x)] py-16">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="display text-3xl">Relax mode · Eagle mode</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border-t border-[var(--line)] pt-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--fg)]">
                Relax
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Smooth scenic paths timed for light — soak in Cyprus without
                thinking about sticks or menus.
              </p>
            </div>
            <div className="border-t border-[var(--line)] pt-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--fg)]">
                Eagle
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--muted)]">
                Full-speed energy for guests who want the closest thing to true
                flight.
              </p>
            </div>
          </div>
          <Button href="/book" className="mt-12" cursorLabel="Book">
            Book experience
          </Button>
        </div>
      </div>
    </div>
  );
}
