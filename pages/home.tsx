import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from '../components/FormDiv'
// import ProjectsAccordion from "../components/ProjectsAccordian";



const Testimonials = dynamic(() => import("../components/Testimonials"), {
    ssr: false,
  });
  
  export default function Home() {
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
  )
}
