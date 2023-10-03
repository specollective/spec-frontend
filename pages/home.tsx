import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MobileHero from '../components/MobileHero';
import Footer from '../components/Footer';
import ByTheNumbers from '../components/ByTheNumbers';
import React from 'react';
import ContactSection from '../components/Contact/ContactSection';
import Mission from '../components/Mission';
import Background from '../components/Background';
import HowWeWork from '../components/HowWeWork';
import WhatWeDo from '../components/WhatWeDo';
import OurServices from '../components/OurServices';

const GetInvolved = dynamic(() => import("../components/GetInvolved/GetInvolved"), {
   ssr: false,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
   ssr: false,
});

export default function Home() {
  return (
    <>
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
