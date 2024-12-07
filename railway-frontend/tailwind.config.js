// tailwind.config.js
import("tailwindcss").Config;
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3E50",
        secondary: "#3498DB",
        accent: "#27AE60",
      },
    },
  },
  plugins: [],
};
