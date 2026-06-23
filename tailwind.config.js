/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        spec: {
          yellow: '#FCD991',
          turquoise: '#0C9FAA',
          lightTurquoise: '#92CDD1',
          lightRed: '#F16A6E',
          black: '#1C1C1C',
          white: '#FEFFFF',
          lemon: '#FFEECC',
          banana: '#FFF7E5',
          orange: '#FFC692',
          gray: '#454546',
        },
        glqf: {
          ink: '#0F2A44',
          'ink-soft': '#3A4F66',
          slate: '#5F7387',
          paper: '#FAF7F2',
          'paper-2': '#F0EBE0',
          line: '#D8D2C5',
          accent: '#A8501C',
          white: '#FFFFFF',
          black: '#0A0A0A',
        },
        giee: {
          // Primary palette
          blue: '#0F3D6E', // Ecosystem Deep Blue — primary type, headings, borders
          green: '#1B7A4E', // Growth Emerald Green — secondary type, organic, metrics
          // Secondary accent palette
          red: '#C41E3A', // Impact Crimson Red — critical governance, short-term milestones
          amber: '#E08B2D', // Foresight Amber Orange — transitional milestones, focal points
          gold: '#C9A227', // Horizon Gold — strategic stars, long-term goals
          cyan: '#1AA3C7', // Clearwater Cyan Blue — data points, system pathways
          // Working aliases used across the GIEE components
          ink: '#0F3D6E', // = Ecosystem Deep Blue
          'ink-soft': '#353A40', // Charcoal — body / narrative prose
          slate: '#6E7681', // Medium grey — taglines, sub-institutional lockups
          paper: '#F7F9FB',
          'paper-2': '#EAF0F4',
          line: '#E2E6EA', // light grey hair-lines
          accent: '#1B7A4E', // = Growth Emerald Green (subtitle / callout color)
          white: '#FFFFFF',
          black: '#0A0A0A',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        dmserif: ['DM Serif Text'],
        poppins: ['Poppins']
      },
      lineHeight: {
        'tight-heading': '1.1',
        'snug-heading': '1.25',
        'body': '1.625',
      }
    }
  }
}
