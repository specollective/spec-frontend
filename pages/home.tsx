import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from "../components/FormDiv";
import Mission from "../components/Mission";
import Background from "../components/Background";
import HowWeWork from "../components/HowWeWork";
import WhatWeDo from "../components/WhatWeDo";
import OurServices from "../components/OurServices";

const GetInvolved = dynamic(() => import("../components/GetInvolved"), {
	ssr: false,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
	ssr: false,
});

export default function Home() {
	return (
		<>
      <Navbar />
      <Hero />
      <GetInvolved />
      <Mission />
      <Background />
      <HowWeWork />
      <WhatWeDo />
			<OurServices />
      <ByTheNumbers />
			<Testimonials />
      <FormDiv />
      <Footer />
		</>
	);
}
