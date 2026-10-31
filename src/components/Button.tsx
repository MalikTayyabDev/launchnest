import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-heading text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

const sizes = "px-6 py-3";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy hover:bg-[#B89421]",
  secondary: "bg-navy text-offwhite hover:bg-[#132a4d]",
  ghost:
    "bg-transparent text-navy border border-navy/15 hover:border-navy/40 hover:bg-navy/[0.03]",
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
    <svg width="14" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 6h12M9 1.5 13.5 6 9 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
