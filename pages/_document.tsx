import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import nextI18NextConfig from "../next-i18next.config";

export default function Document(props: DocumentProps) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? nextI18NextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        {/* Fonts are self-hosted via next/font in _app.tsx — do not load them
            from fonts.googleapis.com, which leaks visitor IPs to Google. */}
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
