import Image from "next/image";
import { brandAssets } from "@/lib/site";
import horizontalNavy from "../../public/logos/launchnest-horizontal-navy.png";
import horizontalWhite from "../../public/logos/launchnest-horizontal-white.png";

type LogoProps = {
  /** "navy" for light backgrounds (header); "white" for dark backgrounds (footer). */
  variant?: "navy" | "white";
  /** Rendered height in pixels; width scales to the lockup aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

const LOCKUP_ASPECT = brandAssets.horizontalNavy.width / brandAssets.horizontalNavy.height;

/**
 * Full horizontal lockup: LaunchNest wordmark with gold trajectory arrow
 * through the N, over the BUILD · OPTIMIZE · LAUNCH tagline.
 */
export function Logo({
  variant = "navy",
  height = 40,
  className,
  priority = false,
}: LogoProps) {
  const asset = variant === "white" ? brandAssets.horizontalWhite : brandAssets.horizontalNavy;
  const src = variant === "white" ? horizontalWhite : horizontalNavy;

  return (
    <Image
      src={src}
      alt={asset.alt}
      height={height}
      width={Math.round(height * LOCKUP_ASPECT)}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
