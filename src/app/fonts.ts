import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (committed under src/fonts/).
 * Avoids next/font/google fetching Google at build time — that fetch
 * intermittently fails on Vercel with: Cannot read properties of null (reading '1').
 */
export const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "500 700",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "400 600",
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-jetbrains-mono",
  display: "swap",
  // Not used above the fold — skip the render-blocking preload.
  preload: false,
});
