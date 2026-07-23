import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-black/30 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-[var(--gutter-x)] py-14 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--fg)]">
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            {site.tagline}. {site.supportingTagline} — over Cyprus, on the{" "}
            {site.product}.
          </p>
        </div>

        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm uppercase tracking-[0.08em]">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-[var(--fg)]"
              >
                {site.email}
              </a>
            </li>
            <li className="uppercase tracking-[0.08em]">{site.domain}</li>
            <li className="uppercase tracking-[0.08em]">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-[var(--gutter-x)] py-5 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
