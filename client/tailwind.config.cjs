/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      slate: colors.slate,
      primary: "#FE343F",
      "primary-hover": "#c40e17",
      secondary: "#383A3E",
      "secondary-hover": "#4e4f52",
      card: "#26292D",
      transparent: "rgb(0,0,0,0)",
    },
    extend: {
      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
        "3xl": "1536px",
        "4xl": "1700px",
      },
    },
  },
  plugins: [],
  important: true,
};
