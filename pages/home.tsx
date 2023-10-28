import Head from 'next/head'
import dynamic from 'next/dynamic'

import Navbar from '../components/Navbar'
import MobileHero from '../components/MainHero'
import Footer from '../components/Footer'
import ByTheNumbers from '../components/ByTheNumbers'
import React, { useEffect } from 'react'
import ContactSection from '../components/Contact/ContactSection'
import Mission from '../components/Mission'
import Background from '../components/Background'
import HowWeWork from '../components/HowWeWork'
import WhatWeDo from '../components/WhatWeDo'
import OurServices from '../components/OurServices'

const GetInvolved = dynamic(() => import("../components/GetInvolved/GetInvolved"), {
   ssr: false,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
   ssr: false,
});

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token

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

export default function Home() {
  return (
    <>
      <AppHead />
      <Navbar />
      <MobileHero />
      <Mission />
      <Background />
      <HowWeWork />
      <WhatWeDo />
      <OurServices />
      <GetInvolved />
      <ByTheNumbers />
      <Testimonials />
      <ContactSection />
      <Footer />
    </>
  );
}
