/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gray': '#FAFBFD',
        'dark-gray': '#0B0B0B',
        'light-gray': '#898989',
        'primary': '#FCB129'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        Riyadh: ['Riyadh', 'sans-serif']
      },
    },
  },
  plugins: [],
}
