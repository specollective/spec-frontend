import localFont from "next/font/local";

// Overused Grotesk by RandomMaerks, SIL Open Font License 1.1 (see
// styles/fonts/OverusedGrotesk-OFL.txt). Self-hosted and preloaded through
// next/font, so no third-party font request is made. The file is the upstream
// variable font, subset to Latin (+ Latin Extended-A, punctuation, arrows)
// with the slant axis pinned upright: 40 KB instead of 92 KB.
export const gieeFont = localFont({
  src: "../styles/fonts/OverusedGrotesk-VF.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-giee",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
