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
        // Backgrounds
        base: "#08080D",
        surface: "#0D0D14",
        elevated: "#12121C",
        // Cards
        card: "#141420",
        "card-hover": "#191927",
        // Gold accents
        gold: {
          DEFAULT: "#F2C766",
          soft: "#E5B84B",
          deep: "#C99A34",
        },
        // Text
        cream: "#FFF7E5",
        muted: "#A7A7B5",
        // Secondary accent (used sparingly, intentional)
        accent: "#6E7CE0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderColor: {
        gold: "rgba(242,199,102,0.16)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(242,199,102,0.16), 0 20px 60px -20px rgba(242,199,102,0.20)",
        "card-lift": "0 24px 60px -24px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F2C766 0%, #E5B84B 100%)",
        "gold-soft": "linear-gradient(135deg, rgba(242,199,102,0.14) 0%, rgba(229,184,75,0.04) 100%)",
        "radial-fade": "radial-gradient(ellipse at top, rgba(242,199,102,0.08), transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
