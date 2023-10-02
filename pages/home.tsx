import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MobileHero from '../components/MobileHero';
import Footer from '../components/Footer';
import ByTheNumbers from '../components/byTheNumbers';
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
    <div className="">
      <Navbar />
      <MobileHero
        backgroundImage="https://images.pexels.com/photos/3923721/pexels-photo-3923721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title="Sustainable Progress and Equality Collective"
        description="SPEC is a community-driven organization dedicated to meeting people where they are and empowering them to learn skills, build careers, and become leaders of sustainable social impact."
        buttonText="Get Started"
        onButtonClick={() => console.log('Button Clicked')}
      />
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
    </div>
  );
}
