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
        // Avartya Brand Palette
        brand: {
          primary: "#618264",       // Primary Brand Color
          secondary: "#79AC78",     // Secondary Green
          accent: "#A8DF8E",        // Accent Highlight
          lightbg: "#ECFDF5",       // Light Background
          sectionbg: "#D0E7D2",     // Section Background
          card: "#B0D9B1",          // Card Background
          olive: "#BACD92",         // Soft Olive Highlight
          peach: "#F5DAD2",         // Warm Soft Peach
          hover: "#75A47F",         // Hover State
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #FCFFE0 0%, #D0E7D2 50%, #B0D9B1 100%)",
        "footer-gradient": "linear-gradient(180deg, #618264 0%, #4a6b4d 100%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "leaf-sway": "leafSway 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        leafSway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(97, 130, 100, 0.12)",
        "card-hover": "0 8px 40px rgba(97, 130, 100, 0.22)",
        nav: "0 2px 20px rgba(97, 130, 100, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
