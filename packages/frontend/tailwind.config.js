/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF84E2",
        background: "#F2F2EE",
        green: "#25A094",
        yellow: "#FDC900",
        twitter: "#1DA1F2",
      },
      fontFamily: {
        sans: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
