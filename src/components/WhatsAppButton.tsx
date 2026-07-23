"use client";

import { site } from "@/content/site";

/**
 * Floating WhatsApp CTA (Horizonte-style).
 * Set `site.whatsapp` to digits-only international number (e.g. "35799123456").
 */
export function WhatsAppButton() {
  const digits = site.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hi ${site.shortName}! I'd like to book a flight experience in Cyprus.`,
  );
  const href = digits
    ? `https://wa.me/${digits}?text=${message}`
    : `https://wa.me/?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab group fixed bottom-5 right-5 z-[95] flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105 hover:shadow-[0_10px_32px_rgba(37,211,102,0.55)] sm:bottom-7 sm:right-7"
      aria-label="Chat on WhatsApp"
      data-cursor="WhatsApp"
      title={
        digits
          ? "Chat on WhatsApp"
          : "WhatsApp (add your number in site.whatsapp)"
      }
    >
      <span className="sr-only">WhatsApp</span>
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 text-white"
        fill="currentColor"
        aria-hidden
      >
        <path d="M16.01 3C9.39 3 4 8.38 4 14.99c0 2.1.55 4.15 1.6 5.96L4 29l8.24-1.55A12 12 0 0 0 16.01 27C22.63 27 28 21.62 28 15S22.63 3 16.01 3zm0 21.9c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-4.89.92.93-4.76-.24-.39A9.86 9.86 0 0 1 6.1 15c0-5.45 4.45-9.89 9.91-9.89S25.92 9.55 25.92 15 21.47 24.9 16.01 24.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
