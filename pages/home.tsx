import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import Testimonials from "../components/Testimonials"
import React from "react";
import FormDiv from '../components/FormDiv'
import dynamic from "next/dynamic";
// import ProjectsAccordion from "../components/ProjectsAccordian";


export default function Home() {
  const Testimonials = dynamic(() => import("../components/Testimonials"), {
    ssr: false,
  });
  return (
    <>
      <Navbar />
      <Hero />
      {/* <ProjectsAccordion/> */}
      <ByTheNumbers />
      <FormDiv />
      <Testimonials/> 
      
      <Footer />

    </>
  );
}
