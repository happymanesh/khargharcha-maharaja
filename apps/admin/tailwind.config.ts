import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        saffron: { 50:"#fff8f0",100:"#ffecd6",400:"#ff8c38",500:"#ff6b00",600:"#e85e00" },
        maroon: { 50:"#fdf2f4",100:"#fce8eb",700:"#ab1e42",800:"#8b1c3b",950:"#800000" },
        gold: { 400:"#fbbf24",500:"#f59e0b" },
      },
      fontFamily: { body: ["'Inter'", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
