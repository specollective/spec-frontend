import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from "../components/FormDiv";
// import ProjectsAccordion from "../components/ProjectsAccordian";

export default function Home() {
	// const GetInvolved = dynamic(() => import("../components/GetInvolved"), {
	// 	ssr: false,
	// });
	return (
		<>
			<Navbar />
			<Hero />
			{/* <ProjectsAccordion/> */}
			<ByTheNumbers />
			<FormDiv />
			{/* <Testimonials/> */}

			<Footer />

			<Footer />
		</>
	);
}
