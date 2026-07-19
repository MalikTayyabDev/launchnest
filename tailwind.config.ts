import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — exact hex values, do not substitute.
        navy: "#0B1F3A", // Deep Navy — primary, headers, backgrounds, authority
        gold: "#C9A227", // Signal Gold — accent/CTAs only, keep under 10% of any layout
        slate: "#4A5568", // Slate Gray — body text, secondary UI
        offwhite: "#F4F5F7", // Off-White — section backgrounds, breathing room
        confirm: "#1E8E5A", // Confirm Green — success/status states only
      },
      fontFamily: {
        // Wired to next/font CSS variables (see src/app/layout.tsx)
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
