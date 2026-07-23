"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Simple landing gate:
 * - Couple experience video plays on load
 * - One scroll: brand fully clears, large centered Flight Spots / Pricing cards
 */
export function HomeIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      void video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const brand = brandRef.current;
    const hint = hintRef.current;
    const tabs = tabsRef.current;
    if (!root || !brand || !tabs) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(brand, { opacity: 0, visibility: "hidden" });
      gsap.set(tabs, { opacity: 1, y: 0, scale: 1 });
      document.body.classList.add("nav-ready", "intro-complete");
      return;
    }

    document.body.classList.remove("nav-ready", "intro-complete");

    const ctx = gsap.context(() => {
      gsap.set(brand, { opacity: 1, y: 0, visibility: "visible" });
      gsap.set(hint, { opacity: 0.7 });
      gsap.set(tabs, { opacity: 0, y: 40, scale: 0.94 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
            onUpdate: (self) => {
              if (self.progress > 0.4) {
                document.body.classList.add("nav-ready");
              } else {
                document.body.classList.remove("nav-ready");
              }
              if (self.progress > 0.72) {
                document.body.classList.add("intro-complete");
              } else {
                document.body.classList.remove("intro-complete");
              }
            },
          },
        })
        // Brand + scroll hint fully leave the stage first
        .to(
          brand,
          {
            opacity: 0,
            y: -36,
            filter: "blur(8px)",
            ease: "none",
            duration: 0.38,
          },
          0,
        )
        .to(hint, { opacity: 0, ease: "none", duration: 0.2 }, 0)
        .set(brand, { visibility: "hidden" }, 0.38)
        // Then large centered cards enter
        .to(
          tabs,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            duration: 0.42,
          },
          0.42,
        );
    }, root);

    return () => {
      ctx.revert();
      document.body.classList.remove("nav-ready", "intro-complete");
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="home-intro relative z-0 h-[180vh] bg-[var(--bg-dark)]"
      aria-label="Bird View Drones introduction"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/experience-coral-bay-poster.jpg"
          aria-label="Couple enjoying a Bird View drone experience in Cyprus"
        >
          <source src="/videos/experience-coral-bay.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a]/85 via-[#0b0b0a]/35 to-[#0b0b0a]/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b0b0a_92%)]"
          aria-hidden
        />

        {/* Brand — slow entrance, then fully hidden before cards */}
        <div
          ref={brandRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <p className="hero-brand-in hero-brand-in-delay-1 mb-4 text-[10px] font-medium uppercase tracking-[0.32em] text-white/55 sm:text-[11px]">
            {site.location} · {site.product}
          </p>
          <h1 className="hero-brand-in hero-brand-in-delay-2 font-[family-name:var(--font-display)] text-[clamp(2.6rem,8.5vw,7rem)] leading-[0.92] tracking-[-0.02em] text-white">
            BirdView
            <br />
            <span className="italic text-[var(--accent-soft)]">Drones</span>
          </h1>
          <p
            ref={hintRef}
            className="hero-brand-in hero-brand-in-delay-3 mt-8 text-[10px] uppercase tracking-[0.28em] text-white/50"
          >
            Scroll
          </p>
        </div>

        {/* Category cards — large, centered, only after brand is gone */}
        <div
          ref={tabsRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-[var(--gutter-x)] py-24 sm:py-28"
        >
          <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
            {site.categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                scroll
                className="group relative flex min-h-[11.5rem] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-white/18 bg-black/50 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-500 hover:border-white/40 hover:bg-black/60 sm:min-h-[14rem] sm:rounded-[1.5rem] sm:p-7 md:min-h-[15.5rem] md:p-8"
                data-cursor={cat.label}
              >
                <span className="pointer-events-none absolute inset-0" aria-hidden>
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    className="object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
                    sizes="(max-width: 640px) 100vw, 420px"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
                </span>
                <span className="relative z-10 flex h-full flex-col justify-between gap-6">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
                      {cat.kicker}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-base text-white/85 transition group-hover:border-white/45 group-hover:bg-white/20 sm:h-11 sm:w-11">
                      →
                    </span>
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.85rem)] leading-[0.95] tracking-tight text-white">
                      {cat.label}
                    </span>
                    <span className="mt-3 block max-w-[28ch] text-[13px] leading-relaxed text-white/65 sm:text-[14px]">
                      {cat.description}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
