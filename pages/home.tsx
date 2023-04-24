import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from '../components/FormDiv'


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ByTheNumbers />
      <FormDiv />

      
      <Footer />

    </>
  );
}
