/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryLogoText: ["Racing Sans One", "cursive"],
        secondaryLogoText: ["Roboto", "sans-serif"],
      },
      fontSize: {
        small: "18px",
        medium: "24px",
        large: "36px",
        xLarge: "48px",
        logoLarge: "72px",
      },
      colors: {
        primaryHeading: "#EAEAEA",
        primaryText: "#000000",
        secondaryText: "#FFFFFF",
        tertiaryText: "#E9E9E9",
        primaryBG: "#5E2E53",
        weirdBG: "#5E2E5350",
        secondaryBG: "#E9E9E9",
        cardBG: "#E1A1E980",
        searchBG: "#C4C4C430",
        logoText: "#E856EB",
        primaryLogoStroke: "#000000",
        secondaryLogoStroke: "#431567",
        logoBar: "#913693",
        placeholderText: "#999999",
      },
    },
  },
  plugins: [],
};
