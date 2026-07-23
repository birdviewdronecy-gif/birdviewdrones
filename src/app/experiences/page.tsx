import type { Metadata } from "next";
import { experiences } from "@/content/experiences";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Vacation memories, birthdays, weddings, events, golden sunsets — Cyprus from the sky.",
};

export default function ExperiencesPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <div className="px-[var(--gutter-x)] pb-10">
        <Reveal>
          <p className="eyebrow">Occasions</p>
          <h1 className="display mt-4 max-w-[14ch] text-[clamp(2.8rem,6vw,5rem)]">
            Unforgettable moments above Cyprus
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
            Every flight is framed as an experience — not a rental. No technical
            knowledge required on guest flights.
          </p>
        </Reveal>
      </div>

      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {experiences.map((exp, i) => (
          <li
            key={exp.slug}
            id={exp.slug}
            className="scroll-mt-28 px-[var(--gutter-x)] py-12"
          >
            <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-12">
              <div className="lg:col-span-1">
                <span className="text-[11px] tracking-[0.16em] text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="lg:col-span-6">
                <h2 className="display text-3xl text-[var(--fg)] sm:text-4xl">
                  {exp.title}
                </h2>
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--accent-soft)]">
                  {exp.short}
                </p>
                <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
                  {exp.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--line)] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start lg:col-span-4 lg:justify-end">
                <Button href={`/book?experience=${exp.slug}`} cursorLabel="Book">
                  Inquire
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
