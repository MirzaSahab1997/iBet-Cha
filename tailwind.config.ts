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
        brand: {
          green: "#22c55e",
          "green-dark": "#16a34a",
          blue: "#3b82f6",
          "blue-dark": "#2563eb",
          dark: "#0f172a",
          "dark-card": "#1e293b",
          "dark-muted": "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        phone: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
