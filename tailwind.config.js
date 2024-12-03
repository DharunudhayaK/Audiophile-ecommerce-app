/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        "mobile-sm": "320px",
        "mobile-md": "375px",
        "mobile-lg": "425px",
        "tablet-sm": "768px",
        "tablet-md": "820px",
        "tablet-lg": "1024px",
        "laptop-sm": "1280px",
        "laptop-md": "1366px",
        "laptop-lg": "1440px",
        "laptop-xl": "1536px",
        "desktop-sm": "1600px",
        "desktop-md": "1920px",
        mobile: { min: "320px", max: "425px" },
        tablet: { min: "425px", max: "1024px" },
        laptop: { min: "1024px", max: "1536px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
