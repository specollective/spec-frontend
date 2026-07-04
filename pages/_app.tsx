import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next/pages";
import { Montserrat, DM_Serif_Text, Poppins } from "next/font/google";
import nextI18NextConfig from "../next-i18next.config";

// Fonts are self-hosted via next/font (downloaded at build time) instead of
// loaded from fonts.googleapis.com at runtime. Serving them from Google's CDN
// transmits every visitor's IP address to Google, which EU case law treats as
// a GDPR violation absent consent. Weights mirror the old stylesheet URLs.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dmserif",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${montserrat.variable} ${dmSerifText.variable} ${poppins.variable}`}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
