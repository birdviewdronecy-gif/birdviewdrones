"use client";

import { useEffect, useState } from "react";

const FRAMES = ["BIRD VIEW", "FROM ABOVE", "CYPRUS", "TAKEOFF"];

/** Slow, deliberate opening sequence before the page is revealed */
const FRAME_MS = 900;
const EXIT_MS = 1100;
const HOLD_AFTER_LAST_MS = 500;

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [frame, setFrame] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      document.body.classList.add("is-ready");
      return;
    }

    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setFrame(i % FRAMES.length);
      if (i >= FRAMES.length) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          setExit(true);
          window.setTimeout(() => {
            setVisible(false);
            document.body.classList.add("is-ready");
          }, EXIT_MS);
        }, HOLD_AFTER_LAST_MS);
      }
    }, FRAME_MS);

    return () => window.clearInterval(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] grid place-items-center bg-[#0b0b0a] text-[#f7f5ef] transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exit ? "-translate-y-full duration-[1100ms]" : "translate-y-0 duration-700"
      }`}
      aria-hidden
    >
      <div className="text-center">
        <p className="preloader-kicker text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
          Bird View Drones
        </p>
        <p
          key={frame}
          className="preloader-frame mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-5xl"
        >
          {FRAMES[frame]}
        </p>
      </div>
    </div>
  );
}
