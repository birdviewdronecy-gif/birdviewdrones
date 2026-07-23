"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Premium floating island nav + refined dropdown.
 * Home: revealed after intro scroll (`nav-ready` on body).
 */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [navReady, setNavReady] = useState(!isHome);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setNavReady(true);
      return;
    }
    const sync = () => {
      setNavReady(document.body.classList.contains("nav-ready"));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      window.addEventListener("mousedown", onPointer);
    }, 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  const barVisible = navReady || menuOpen;

  return (
    <div
      ref={panelRef}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4 sm:pt-5",
        barVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-[26rem]",
          !barVisible && "pointer-events-none",
        )}
      >
        {/* Island bar */}
        <div className="nav-island relative flex h-12 items-center justify-between gap-4 rounded-full px-2 pl-5 pr-2 sm:h-[3.25rem]">
          <span className="nav-island__glow" aria-hidden />
          <Link
            href="/"
            className="relative z-[1] flex items-baseline gap-2"
            data-cursor="Home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-[family-name:var(--font-display)] text-[1.15rem] leading-none tracking-tight text-white sm:text-[1.25rem]">
              {site.shortName}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
              Cyprus
            </span>
          </Link>

          <button
            type="button"
            className={cn(
              "relative z-[1] flex h-9 items-center gap-2 rounded-full px-4 text-[11px] font-medium tracking-[0.06em] transition",
              menuOpen
                ? "bg-white text-[#0b0b0a]"
                : "bg-white/10 text-white hover:bg-white/15",
            )}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            data-cursor={menuOpen ? "Close" : "Menu"}
          >
            {menuOpen ? "Close" : "Menu"}
            <span className="relative flex h-2 w-3 flex-col justify-between" aria-hidden>
              <span
                className={cn(
                  "block h-px w-full origin-center transition duration-300",
                  menuOpen
                    ? "translate-y-[3.5px] rotate-45 bg-[#0b0b0a]"
                    : "bg-white",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full transition duration-300",
                  menuOpen ? "opacity-0" : "bg-white",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full origin-center transition duration-300",
                  menuOpen
                    ? "-translate-y-[3.5px] -rotate-45 bg-[#0b0b0a]"
                    : "bg-white",
                )}
              />
            </span>
          </button>
        </div>

        {/* Dropdown card */}
        <div
          id="site-menu"
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+0.65rem)] origin-top transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen
              ? "visible scale-100 opacity-100"
              : "pointer-events-none invisible scale-[0.97] opacity-0",
          )}
          aria-hidden={!menuOpen}
        >
          <div className="nav-island relative overflow-hidden rounded-[1.35rem] p-2">
            <span className="nav-island__glow" aria-hidden />
            <div className="relative z-[1] px-3 pb-2 pt-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                {site.tagline}
              </p>
            </div>
            <nav className="relative z-[1] flex flex-col gap-0.5 px-1 pb-1">
              {site.nav.map((item, i) => {
                const current =
                  item.href === "/spots"
                    ? pathname.startsWith("/spots")
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-3 transition-colors",
                      current
                        ? "bg-white text-[#0b0b0a]"
                        : "text-white/80 hover:bg-white/[0.08] hover:text-white",
                    )}
                    data-cursor="Go"
                  >
                    <span className="font-[family-name:var(--font-display)] text-[1.35rem] leading-none tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] tabular-nums tracking-[0.12em]",
                        current ? "text-black/35" : "text-white/30",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                );
              })}
            </nav>
            <div className="relative z-[1] mx-1 mb-1 mt-1 flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-3">
              <a
                href={`mailto:${site.email}`}
                className="text-[11px] text-white/50 transition hover:text-white"
                data-cursor="Mail"
              >
                {site.email}
              </a>
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0c0c0d] transition hover:bg-[var(--accent-soft)]"
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
