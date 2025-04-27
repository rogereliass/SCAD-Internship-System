/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#EB2026",
          secondary: "#FFDD02",
          dark: "#050608",
          light: "#EFEFEF",
        }
      },
    },
    plugins: [],
  }
  