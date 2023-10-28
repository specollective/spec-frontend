import Head from 'next/head'

export function AppHead() {
  return (
    <Head>
      <title>
        Sustainable Progress Equality Collective
      </title>
      <link rel="icon" type="image/png" href="/favicon-16x16.png" />
      <meta property="og:title" content="Sustainable Progress and Equality Collective" />
      <meta property="og:url" content="https://specollective.org/" />
      <meta
        property="og:image"
        content="https://spec-bucket.nyc3.cdn.digitaloceanspaces.com/spec-logo-old.png"
      />
      <meta
        property="og:description"
        content="Helping people learn skills, build careers, and become leaders of sustainable social impact."
      />
      <meta
        name="twitter:card"
        content="https://spec-bucket.nyc3.cdn.digitaloceanspaces.com/spec-logo-old.png"
      />
      <meta name="twitter:title" content="Sustainable Progress and Equality Collective" />
    </Head>
  )
}

export default AppHead;
