import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from '../components/FormDiv'
import Mission from '../components/Mission'
// import ProjectsAccordion from "../components/ProjectsAccordian";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mission />
      {/* <ProjectsAccordion/> */}
      <ByTheNumbers />
      <FormDiv />
      {/* <Testimonials/> */}
      
      <Footer />

    </>
  );
}
