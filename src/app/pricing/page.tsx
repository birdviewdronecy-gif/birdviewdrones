import type { Metadata } from "next";
import Link from "next/link";
import { pricingNotes, pricingTiers } from "@/content/pricing";
import { site } from "@/content/site";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Bird View Drones experience packages in Cyprus — scenic flights, golden sunsets, celebrations. Inquire for your date.",
};

export default function PricingPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <div className="px-[var(--gutter-x)] pb-12">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.8rem,6vw,5rem)]">
            {pricingNotes.headline}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
            {pricingNotes.body}
          </p>
        </Reveal>
      </div>

      <ul className="border-y border-[var(--line)]">
        {pricingTiers.map((tier, i) => (
          <li
            key={tier.slug}
            id={tier.slug}
            className={`scroll-mt-24 border-b border-[var(--line)] px-[var(--gutter-x)] py-12 last:border-b-0 ${
              tier.highlight ? "bg-white/[0.03]" : ""
            }`}
          >
            <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-12">
              <div className="lg:col-span-1">
                <span className="text-[11px] tracking-[0.16em] text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                  {tier.tagline}
                </p>
                <h2 className="display mt-3 text-[clamp(2rem,3.5vw,3rem)]">
                  {tier.name}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-[var(--muted)]">
                  {tier.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tier.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--line)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  Includes
                </p>
                <ul className="mt-4 space-y-3">
                  {tier.includes.map((line) => (
                    <li
                      key={line}
                      className="border-t border-[var(--line)] pt-3 text-sm leading-relaxed text-[var(--fg)]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <Button href="/book" className="mt-8" cursorLabel="Book">
                  Inquire
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="px-[var(--gutter-x)] py-16">
        <div className="panel-gloss mx-auto flex max-w-[1400px] flex-col gap-8 p-8 sm:flex-row sm:items-end sm:justify-between sm:p-12">
          <div className="relative z-[1]">
            <p className="eyebrow">Next step</p>
            <h2 className="display mt-3 max-w-[18ch] text-[clamp(1.8rem,3vw,2.6rem)]">
              {pricingNotes.cta}
            </h2>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Prefer email?{" "}
              <a
                className="text-[var(--accent-soft)] underline-offset-4 hover:underline"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </p>
          </div>
          <div className="relative z-[1] flex flex-wrap gap-3">
            <Button href="/book" cursorLabel="Book">
              Book a flight
            </Button>
            <Button href="/spots" variant="ghost" cursorLabel="Map">
              Browse spots
            </Button>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1400px] text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
          Pro training and commercial work live on the{" "}
          <Link
            href="/pro"
            className="text-[var(--fg)] underline-offset-2 hover:underline"
          >
            Pro
          </Link>{" "}
          track — separate from guest experiences.
        </p>
      </section>
    </div>
  );
}
