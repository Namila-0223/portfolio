/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#181818",
        border: "#333",
        'border-light': "#555",
        accent: {
          DEFAULT: "#ff4925",
          dark: "#bd2608",
          glow: "#ff492540",
        },
        muted: "#8f8f8f",
        subtle: "#cacaca",
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        geist: ['Geist', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
