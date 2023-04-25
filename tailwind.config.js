/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

console.log("Tailwind@@@@")
export default {
  content: [
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./mitosis-output/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", ...fontFamily.sans],
      },
      lineHeight: {
        title: "1.36",
        mobiletitle: "1.467",
      },
    },
  },
  plugins: [],
};
