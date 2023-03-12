/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "oxford-blue": "#00072D",
        "penn-blue": "#001C55",
        "royal-blue": "#0A2372",
        "bice-blue": "#0E6BA8",
        "non-photo-blue": "#A6E1FA"
      }
    },
  },
  plugins: [],
}