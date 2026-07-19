import Image from "next/image";
import { siteConfig } from "@/lib/site";
import horizontalNavy from "../../public/logos/launchnest-horizontal-navy.png";
import horizontalWhite from "../../public/logos/launchnest-horizontal-white.png";

type LogoProps = {
  /** "navy" renders the navy-on-white lockup; "white" renders the white-on-navy lockup. */
  variant?: "navy" | "white";
  /** Rendered height in pixels; width scales to the 3:1 lockup ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Full horizontal lockup: "LaunchNest" wordmark with the gold trajectory arrow
 * through the N, over the "BUILD · OPTIMIZE · LAUNCH" tagline.
 */
export function Logo({
  variant = "navy",
  height = 40,
  className,
  priority = false,
}: LogoProps) {
  const src = variant === "white" ? horizontalWhite : horizontalNavy;

  return (
    <Image
      src={src}
      alt={`${siteConfig.name} — ${siteConfig.tagline}`}
      height={height}
      width={Math.round(height * 3)}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
