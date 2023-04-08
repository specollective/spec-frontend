import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ByTheNumbers from './byTheNumbers'
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <ByTheNumbers />
      <Hero />
    </>
  );
}
