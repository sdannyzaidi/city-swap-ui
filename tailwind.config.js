module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      transitionProperty: {
        size: "height, width",
      },
      colors: {
        primary: {},
        secondary: {},
        black: {},
        red: { 50: "#FFF3F5", 100: "#FCE0E0", 400: "#F44336" },
        orange: { 400: "#F57C00" },
        yellow: { 100: "#FFF3E0", 400: "#FF9800" },
      },
    },
  },
  plugins: [],
};
