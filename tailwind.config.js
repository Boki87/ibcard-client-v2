/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A6FBF",
        telegramBlue: '#1C92D2',
      },
      screens: {
        standalone: { raw: "(display-mode: standalone)" }
      }
    },
  },
  plugins: [],
}

