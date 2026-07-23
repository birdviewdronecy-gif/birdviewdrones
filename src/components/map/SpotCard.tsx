"use client";

import Image from "next/image";
import { type Spot } from "@/content/spots";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type SpotCardProps = {
  spot: Spot;
  /** grid | panel — same visual language, panel adds detail + book */
  variant?: "grid" | "panel";
  active?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
  className?: string;
};

/**
 * Shared flight-spot card used in the grid below the map
 * and as the map selection panel (same design system).
 */
export function SpotCard({
  spot,
  variant = "grid",
  active = false,
  onSelect,
  onClose,
  className,
}: SpotCardProps) {
  const isPanel = variant === "panel";

  const body = (
    <>
      <div
        className={cn(
          "relative overflow-hidden",
          isPanel ? "aspect-[16/10] shrink-0" : "aspect-[16/10]",
        )}
      >
        <Image
          src={spot.image}
          alt={spot.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes={isPanel ? "400px" : "(max-width: 640px) 100vw, 33vw"}
          priority={isPanel}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.14em] text-white/70">
          {spot.region}
        </p>
        {isPanel && onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-2 top-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/85 backdrop-blur-sm hover:bg-black/75"
            aria-label="Close spot"
          >
            Esc
          </button>
        )}
      </div>

      <div className={cn("p-5", isPanel && "flex flex-1 flex-col overflow-y-auto")}>
        <p className="display text-xl text-white sm:text-[1.35rem]">{spot.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{spot.teaser}</p>

        {isPanel && (
          <>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                Why from the air
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {spot.whyFromAir}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {spot.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-white/50"
                >
                  {t}
                </span>
              ))}
            </div>

            {spot.videoSrc ? (
              <video
                className="mt-5 w-full rounded-lg"
                controls
                playsInline
                poster={spot.posterSrc || undefined}
              >
                <source src={spot.videoSrc} type="video/mp4" />
              </video>
            ) : null}

            <div className="mt-auto border-t border-white/10 pt-4">
              <Button href={`/book?spot=${spot.slug}`} className="w-full">
                Book this spot
              </Button>
            </div>
          </>
        )}

        {!isPanel && (
          <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-white/35 transition group-hover:text-[var(--accent-soft)]">
            {active ? "Selected on map" : "View on map →"}
          </p>
        )}
      </div>
    </>
  );

  if (isPanel) {
    return (
      <article
        className={cn(
          "group flex max-h-[min(72svh,580px)] w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0f0f0e]/92 shadow-2xl backdrop-blur-xl",
          className,
        )}
      >
        {body}
      </article>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group block w-full overflow-hidden rounded-2xl border bg-white/[0.03] text-left transition",
        active
          ? "border-[var(--accent-soft)]/50 bg-white/[0.06]"
          : "border-white/10 hover:border-white/25",
        className,
      )}
    >
      {body}
    </button>
  );
}
