/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [require('tw-elements/dist/plugin')],
  theme: {
    extend: {
      colors: {
        spec: {
          yellow: '#FCD991',
          turquiose: '#0C9FAA',
          lightTurquiose: '#92CDD1',
          lightRed: '#F16A6E',
          black: '#1C1C1C',
          white: '#FEFFFF',
          sunshine: '#FCD991',
          lemon: '#FFEECC',
          banana: '#FFF7E5',
          orange: '#FFC692'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        dmserif: ['DM Serif Text']
      }
    }  
  }
}