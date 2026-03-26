/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- THIS LINE IS CRITICAL
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}