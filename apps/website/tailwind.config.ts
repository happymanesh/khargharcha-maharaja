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
        saffron: {
          50: "#fff8f0",
          100: "#ffecd6",
          200: "#ffd4a8",
          300: "#ffb570",
          400: "#ff8c38",
          500: "#ff6b00",
          600: "#e85e00",
          700: "#c04b00",
          800: "#9a3d00",
          900: "#7d3300",
        },
        maroon: {
          50: "#fdf2f4",
          100: "#fce8eb",
          200: "#f9d0d8",
          300: "#f4a9b8",
          400: "#ed7590",
          500: "#e2456b",
          600: "#cc2850",
          700: "#ab1e42",
          800: "#8b1c3b",
          900: "#6b1234",
          950: "#800000",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        cream: "#fdf6e3",
        "deep-red": "#8B0000",
      },
      fontFamily: {
        marathi: ["'Noto Sans Devanagari'", "sans-serif"],
        display: ["'Cinzel'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "saffron-gradient": "linear-gradient(135deg, #ff6b00 0%, #ff8c38 50%, #fbbf24 100%)",
        "maroon-gradient": "linear-gradient(135deg, #8B0000 0%, #ab1e42 50%, #e2456b 100%)",
        "festival-gradient": "linear-gradient(135deg, #ff6b00 0%, #8B0000 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255,107,0,0.4)" },
          "50%": { boxShadow: "0 0 25px rgba(255,107,0,0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
