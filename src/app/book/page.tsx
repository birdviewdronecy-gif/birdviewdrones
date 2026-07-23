import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Book",
  description: "Inquire about a Bird View Drones experience in Cyprus.",
};

export default function BookPage() {
  return (
    <div className="min-h-[100svh] pt-20 sm:pt-24">
      <div className="mx-auto grid max-w-[1100px] gap-12 px-[var(--gutter-x)] pb-20 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Book</p>
          <h1 className="display mt-4 text-[clamp(2.6rem,5vw,4.2rem)]">
            Tell us about your flight
          </h1>
          <p className="mt-5 max-w-sm leading-relaxed text-[var(--muted)]">
            Date, spot, occasion — we&apos;ll craft the path. Prefer email?{" "}
            <a
              className="text-[var(--accent-soft)] underline-offset-4 hover:underline"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </p>
        </Reveal>
        <div className="panel-gloss p-6 sm:p-8">
          <div className="relative z-[1]">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
