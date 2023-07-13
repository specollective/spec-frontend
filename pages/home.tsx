import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ByTheNumbers from "../components/byTheNumbers";
import React from "react";
import FormDiv from "../components/FormDiv";
import ProjectsSection from "../components/ProjectsSection";
import Mission from "../components/Mission";
import Projects from "../components/Projects";
import ProjectsAccordion from "../components/ProjectsAccordian";


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
			<Projects />
			<ProjectsSection/>
			<ByTheNumbers />
			<Testimonials />
			<FormDiv />
			<Footer />
		</>
	);
}
