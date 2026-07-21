import Image from "next/image";
import { brandAssets } from "@/lib/site";
import monogram from "../../public/logos/launchnest-monogram.png";

type MonogramProps = {
  size?: number;
  className?: string;
};

/**
 * Square N monogram with gold upward arrow on navy — favicon and compact brand mark.
 */
export function Monogram({ size = 40, className }: MonogramProps) {
  return (
    <Image
      src={monogram}
      alt={brandAssets.monogram.alt}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
