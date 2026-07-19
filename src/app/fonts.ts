import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

// Self-hosted via next/font — no FOUT, subsetted and preloaded.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  // Not used above the fold — skip the render-blocking preload.
  preload: false,
});
