import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from '../components/FormDiv'
import ProjectsSection from "../components/ProjectsSection";
import Mission from '../components/Mission'
// import ProjectsAccordion from "../components/ProjectsAccordian";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <Mission />
      <ByTheNumbers />
      <FormDiv />
      {/* <Testimonials/> */}
      
      <Footer />

			<Footer />
		</>
	);
}
