import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#000020",
          100: '#171A4A',
          200: '#2F2C79',
          300: '#675CB0',
          400: "#009BD3",
        },
        secondary: {
          DEFAULT: "#FF7800",
          100: '#FF8C00',
          200: '#FFA347',
        },
        black: {
          DEFAULT: "#000000"
        },
        danger: {
          DEFAULT: '#FF0E0E',
        },
        logoCargo: {
          DEFAULT: '#E95A0C',
        },
        logoLink: {
          DEFAULT: '#4D7DE7',
        }
      },
      fontFamily: {
        sans: ['Kufam', 'sans-serif'], // Usar Kufam como fuente principal
      },
    },
  },
  plugins: [],
} satisfies Config;
