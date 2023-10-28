import dynamic from 'next/dynamic'
import AppHead from '../components/AppHead'
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

type HomeProps = {
  title: string;
  heroContent: string;
};

// Langing page for app.
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

export async function getServerSideProps() {
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