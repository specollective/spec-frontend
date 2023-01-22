/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        spec: {
          yellow: "#FCD991",
          turquiose: '#0C9FAA',
          lightRed: '#F16A6E',
          black: '#1C1C1C',
        },
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        dmserif: ['DM Serif Text'],
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
