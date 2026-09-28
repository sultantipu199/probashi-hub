import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saudi: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#006C35", // Official Saudi Green
          700: "#00552a",
          800: "#004220",
          900: "#002d16",
          950: "#001a0c",
        },
        probashi: {
          crimson: "#DC2626", // Emergency SOS red
          amber: "#F59E0B",   // Currency & warning gold
          slate: "#0F172A",   // Premium dark background
          card: "#1E293B",
          border: "#334155",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ticker": "ticker 25s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
