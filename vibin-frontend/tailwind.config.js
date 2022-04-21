module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1ED760",
        "primary-dark": "#1DB954",
        secondary: "#3F3F3F",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
