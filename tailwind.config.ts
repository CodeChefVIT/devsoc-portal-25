import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'cc-primary': "#FF6D33",
        'cc-dark': "#1E1D1D",
        'cc-plain': "#F7F3F0",
        'cc-link': "#2800FF",
        'cc-alert': "#3DFFD4"

      },
      fontFamily: {
        inter: ["Inter", "serif"],
        monomaniac: ["Monomaniac One", "serif"],
        yerk: ["Yerk", "serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
