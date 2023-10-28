import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import MainHero from '../components/MainHero'
import Footer from '../components/Footer'
import ByTheNumbers from '../components/ByTheNumbers'
import React from 'react'
import ContactSection from '../components/Contact/ContactSection'
import Mission from '../components/Mission'
import Background from '../components/Background'
import HowWeWork from '../components/HowWeWork'
import WhatWeDo from '../components/WhatWeDo'
import OurServices from '../components/OurServices'
import { createClient} from 'contentful'
import { HOME_PAGE_DATA } from '../constants/home-page-data'

const GetInvolved = dynamic(() => import("../components/GetInvolved/GetInvolved"), {
   ssr: false,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
   ssr: false,
});

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

type HomeProps = {
  title: string;
  heroContent: string;
};

export default function Home({ title, heroContent }: HomeProps) {
  return (
    <>
      <AppHead />
      <Navbar />
      <MainHero title={title} content={heroContent} />
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

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  })

  let data;
  try {
    data = await client.getEntry('5MnimUS5Kj9xVEwGV8Av7b')
  } catch(e) {
    console.log(e);
    data = HOME_PAGE_DATA;
  }

  return { props: data.fields };
}