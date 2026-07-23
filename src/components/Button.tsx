import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "ghost" | "line";

const variants: Record<Variant, string> = {
  solid:
    "bg-[var(--accent)] text-[#0c0c0d] hover:bg-[var(--accent-soft)]",
  ghost:
    "bg-transparent text-[var(--fg)] border border-white/20 hover:border-white/45 hover:bg-white/5",
  line:
    "bg-transparent text-[var(--fg)] underline-offset-4 hover:underline decoration-1",
};

type Base = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  cursorLabel?: string;
};

type ButtonProps = Base &
  (
    | ({ href: string } & Omit<
        React.ComponentPropsWithoutRef<typeof Link>,
        "href" | "className" | "children"
      >)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({
  children,
  className,
  variant = "solid",
  cursorLabel = "Open",
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
    variants[variant],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    return (
      <Link
        href={href}
        className={classes}
        data-cursor={cursorLabel}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  const { type = "button", ...other } = buttonProps;

  return (
    <button
      type={type}
      className={classes}
      data-cursor={cursorLabel}
      {...other}
    >
      {children}
    </button>
  );
}
