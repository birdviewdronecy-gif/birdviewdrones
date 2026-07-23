import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { featuredSpots, spots } from "@/content/spots";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { HomeIntro } from "@/components/home/HomeIntro";

/**
 * Landing page — intro + early story (01–02) + closing CTA.
 * All surfaces stay on the black-gloss system.
 */
export function HomeExperience() {
  const gallery = [...spots, ...spots];

  return (
    <>
      <HomeIntro />

      <section
        id="film"
        className="border-y border-[var(--line)] px-[var(--gutter-x)] py-[clamp(4rem,10vh,7rem)]"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="eyebrow">The flight</p>
            <h2 className="display mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.4rem)]">
              Goggles on. Takeoff. From above. Pure joy.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              A Coral Bay moment — put on the 360° goggles, watch the drone
              rise, fly the coast, and celebrate the closest thing to flying.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-10 overflow-hidden border border-[var(--line)] bg-black/50">
              <video
                className="aspect-video w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/images/experience-coral-bay-poster.jpg"
              >
                <source
                  src="/videos/experience-coral-bay.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              ~24s · Coral Bay, Cyprus · 360° experience film
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="experience"
        className="px-[var(--gutter-x)] py-[clamp(5rem,12vh,9rem)]"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">01 — The sensation</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">
                You don&apos;t pilot.
                <br />
                You <span className="text-[var(--accent-soft)]">fly</span>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={1}>
              <p className="text-lg leading-[1.7] text-[var(--muted)] sm:text-xl">
                Premade flight paths carry you over Cyprus while Vision goggles
                put you in the sky. Look left — coastline. Look right — open
                sea. Go gentle for golden hour, or open the throttle and feel
                like an eagle.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-0 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Relax path",
                  d: "Scenic lines timed for light and view. Sit back. Breathe.",
                },
                {
                  n: "02",
                  t: "Eagle mode",
                  d: "Full-speed energy — the closest thing to true flight.",
                },
                {
                  n: "03",
                  t: "Look around",
                  d: "360° world. Head-tracked immersion. Reframe forever.",
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={(i + 1) as 1 | 2 | 3}>
                  <div className="border-t border-[var(--line)] py-6 pr-4">
                    <p className="text-[11px] tracking-[0.16em] text-[var(--accent-soft)]">
                      {item.n}
                    </p>
                    <h3 className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-[var(--fg)]">
                      {item.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {item.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src="/images/spots/aphrodites-rock.jpg"
          alt="Coastal rock formations from the air"
          fill
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex min-h-[70svh] items-end px-[var(--gutter-x)] pb-14">
          <Reveal>
            <p className="eyebrow">Landscapes of Cyprus</p>
            <h2 className="display mt-4 max-w-[18ch] text-[clamp(2.2rem,5.5vw,4.5rem)]">
              An island written for the sky.
            </h2>
          </Reveal>
        </div>
      </section>

      <section
        id="spots"
        className="overflow-hidden py-[clamp(4rem,10vh,7rem)]"
      >
        <div className="mb-10 flex items-end justify-between px-[var(--gutter-x)]">
          <Reveal>
            <p className="eyebrow">02 — Flight spots</p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.4rem)]">
              Best views, from altitude
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link
              href="/spots"
              className="hidden text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] sm:inline"
              data-cursor="Map"
            >
              Open flight map →
            </Link>
          </Reveal>
        </div>

        <div className="relative">
          <div className="marquee-track pl-[var(--gutter-x)]">
            {gallery.map((spot, i) => (
              <Link
                key={`${spot.slug}-${i}`}
                href={`/spots/${spot.slug}`}
                className="group relative block w-[min(72vw,420px)] shrink-0 overflow-hidden border border-white/10"
                data-cursor="View"
                style={{
                  height:
                    i % 3 === 1
                      ? "min(52vw, 320px)"
                      : i % 3 === 2
                        ? "min(42vw, 260px)"
                        : "min(48vw, 290px)",
                }}
              >
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/65">
                    {spot.region}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-white">
                    {spot.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 px-[var(--gutter-x)] sm:hidden">
          <Link
            href="/spots"
            className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]"
          >
            Open flight map →
          </Link>
        </div>
      </section>

      <section className="relative min-h-[80svh] overflow-hidden">
        <Image
          src="/images/spots/troodos-sunset.jpg"
          alt="Golden sunset over Cyprus mountains"
          fill
          className="object-cover opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex min-h-[80svh] flex-col items-center justify-center px-[var(--gutter-x)] text-center">
          <Reveal>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="display mt-5 max-w-[14ch] text-[clamp(2.6rem,7vw,5.5rem)]">
              Experience the golden sunset
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[var(--muted)]">
              Tell us your date, spot, and occasion. We craft the flight.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/book" cursorLabel="Book">
                Book now
              </Button>
              <Button
                href={`mailto:${site.email}`}
                variant="ghost"
                cursorLabel="Mail"
              >
                {site.email}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sr-only">
        <h2>Featured spots</h2>
        <ul>
          {featuredSpots().map((s) => (
            <li key={s.slug}>
              <a href={`/spots/${s.slug}`}>{s.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
