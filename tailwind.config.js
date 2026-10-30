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
          // Darker turquoise for text/links on white — #0C9FAA is only ~3.2:1
          // against white, below the 4.5:1 WCAG AA minimum for body-size text.
          'turquoise-dark': '#067A83',
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
          slate: '#55677B', // darkened from #5F7387 so small text clears 4.5:1 on paper
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
          'cyan-bright': '#4FC0DE', // Lightened cyan for small text on giee-ink (cyan is only ~3.7:1 there)
          // Working aliases used across the GIEE components
          ink: '#0F3D6E', // = Ecosystem Deep Blue
          'ink-soft': '#353A40', // Charcoal — body / narrative prose
          slate: '#626A74', // Medium grey — taglines, sub-institutional lockups (darkened from #6E7681 to clear 4.5:1 on paper)
          paper: '#F7F9FB',
          'paper-2': '#EAF0F4',
          line: '#E2E6EA', // light grey hair-lines
          accent: '#1B7A4E', // = Growth Emerald Green (subtitle / callout color)
          white: '#FFFFFF',
          black: '#0A0A0A',
          // v3 redesign (2026) — "Swiss pebbles". Navy ground, cream type,
          // six continent colours carried by the glass pieces.
          navy: '#111322', // ink, navy panels, primary buttons
          cream: '#F1ECDB', // type on navy; top of the page ground
          ground: '#FAF8F1', // page background
          'ink-2': '#3F4152', // secondary copy on cream
          'ink-3': '#45475A', // tertiary copy
          muted: '#55576A', // captions, helper text (≥ 6:1 on ground)
          rule: '#D5D3CC', // hairlines between rows and cells
          field: '#EFEDE6', // form panel
          'field-line': '#CFCDC6', // input borders
          error: '#B3261E',
          warm: '#2A1F08', // body copy on the orange belief cards
          orange: '#F1A73E',
          'orange-2': '#F8CE86',
          'orange-3': '#FCE9C6',
          royal: '#2F4AF4', // focus ring on cream
          'navy-muted': '#A9B1DC', // footer labels on navy
          'navy-dim': '#B4BADF', // footer fine print on navy
        }
      },
      fontFamily: {
        // Self-hosted via next/font in _app.tsx; the CSS variables are set on
        // the app wrapper. Named fallbacks cover contexts outside the wrapper.
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        dmserif: ['var(--font-dmserif)', 'DM Serif Text', 'serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        // GIEE Brand Standards — Section 3 Typography Architecture.
        // Primary titles & identity headers: high-contrast serif (deep blue).
        'giee-serif': ['Georgia', 'Times New Roman', 'serif'],
        // Subtitles, callouts, body & taglines: balanced, highly readable sans-serif.
        'giee-sans': ['Arial', 'Helvetica', 'sans-serif'],
        // v3 redesign: Overused Grotesk (SIL OFL), self-hosted via next/font in
        // components/gieeFont.ts. The variable is set by GieeLayout.
        giee: ['var(--font-giee)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },
      transitionTimingFunction: {
        // GIEE v3: the soft "settle" curve used for hovers and reveals.
        giee: 'cubic-bezier(.16,1,.3,1)',
      },
      lineHeight: {
        'tight-heading': '1.1',
        'snug-heading': '1.25',
        'body': '1.625',
      }
    }
  }
}
