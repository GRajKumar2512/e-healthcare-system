/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2DD393",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
