import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GetInvolved from "../components/GetInvolved";

import Footer from "../components/Footer";
import { getIn } from "formik";

import ByTheNumbers from "./byTheNumbers";
import React from "react";

import dynamic from "next/dynamic";

export default function Home() {
	return (
		<>
			<Navbar />
			<ByTheNumbers />
			<Hero />
			<GetInvolved />
			<Footer />
		</>
	);
}
