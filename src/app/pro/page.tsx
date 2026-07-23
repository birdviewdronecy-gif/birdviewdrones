import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pro services",
  description:
    "Drone training and professional services with Bird View Drones in Cyprus.",
};

export default function ProPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <div className="px-[var(--gutter-x)] pb-16">
        <Reveal>
          <p className="eyebrow">Pro</p>
          <h1 className="display mt-4 max-w-[12ch] text-[clamp(2.8rem,6vw,5rem)]">
            Train. Level up. Work with us.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
            Separate from guest experiences — for people who want skills or
            commercial collaboration.
          </p>
        </Reveal>
      </div>

      <div className="grid border-y border-[var(--line)] lg:grid-cols-2">
        <article className="border-b border-[var(--line)] px-[var(--gutter-x)] py-14 lg:border-b-0 lg:border-r">
          <p className="eyebrow">01</p>
          <h2 className="display mt-3 text-3xl">Drone training</h2>
          <p className="mt-4 max-w-md leading-relaxed text-[var(--muted)]">
            Move from passenger to pilot with structured sessions. Ideal after
            you&apos;ve tasted the sky — or if you&apos;re starting with a clear
            goal.
          </p>
          <ul className="mt-6 space-y-2 text-sm uppercase tracking-[0.08em] text-[var(--muted)]">
            <li>· Foundations & safe operation</li>
            <li>· Hands-on with modern platforms</li>
            <li>· Path tailored to your goals</li>
          </ul>
        </article>
        <article className="bg-white/[0.03] px-[var(--gutter-x)] py-14">
          <p className="eyebrow">02</p>
          <h2 className="display mt-3 text-3xl">Commercial services</h2>
          <p className="mt-4 max-w-md leading-relaxed text-[var(--muted)]">
            Mapping, media, and B2B work can live here as offerings firm up. For
            now, inquire and tell us what you need.
          </p>
          <ul className="mt-6 space-y-2 text-sm uppercase tracking-[0.08em] text-[var(--muted)]">
            <li>· Aerial media (planned)</li>
            <li>· Mapping / inspection (planned)</li>
            <li>· Event partnerships (planned)</li>
          </ul>
        </article>
      </div>

      <div className="px-[var(--gutter-x)] py-14">
        <Button href="/book?experience=drone-training" cursorLabel="Book">
          Inquire about pro
        </Button>
      </div>
    </div>
  );
}
