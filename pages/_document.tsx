import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import nextI18NextConfig from "../next-i18next.config";

export default function Document(props: DocumentProps) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? nextI18NextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
