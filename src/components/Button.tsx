import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-heading font-semibold text-sm tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  // Gold is reserved for CTAs.
  primary: "bg-gold text-navy hover:bg-[#B89421]",
  secondary:
    "bg-navy text-offwhite hover:bg-[#132a4d] border border-navy",
  ghost:
    "bg-transparent text-navy hover:bg-navy/5 border border-navy/20",
};

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `${base} ${sizes} ${variants[variant]} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
        <Arrow />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {type !== "submit" && <Arrow />}
    </button>
  );
}

function Arrow() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 6h12M9 1.5 13.5 6 9 10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
