/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode support
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind scans all relevant files
  theme: {
    extend: {
      colors: {
        lightBlue: "#b3e5fc", // Custom light blue for light mode
      },
    },
  },
  plugins: [],
};
