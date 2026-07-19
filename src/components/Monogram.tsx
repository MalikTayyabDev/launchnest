import Image from "next/image";
import monogram from "../../public/logos/launchnest-monogram.png";

type MonogramProps = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Square "LN" monogram: navy rounded square with the letters and a gold
 * trajectory arrow. Used for the mobile nav toggle and social share.
 */
export function Monogram({ size = 40, className, title = "LaunchNest" }: MonogramProps) {
  return (
    <Image
      src={monogram}
      alt={title}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
