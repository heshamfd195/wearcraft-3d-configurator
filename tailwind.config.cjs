/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width:{
         mw1:'15%',
         mw2:"20%"

      },
      colors: {
        text: {},
        primary: {
          main: "#6B7280",
          dark: "#3B3B3B",
          light: "#F8F8F8",
          solid: "#111111",
        },
        secondary: {},
        bar: {
          transparent: "transparent",
        },
      },
    },

    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      mobile: { max: "1024px", min: "50px" },
      // => @media (min-width: 1024px) { ... }

      desktop: { max: "1800px", min: "1080px" },
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      serif: ["Roboto"],
    },
  },
  plugins: [],
};
