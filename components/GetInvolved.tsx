import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
import { renderToString } from "react-dom/server";
import Image from "next/image";
import donate from "../public/DonateImg.svg";
import DonationTable from "./DonationTable";

export default function GetInvolved() {
	useEffect(() => {
		initTE({ Carousel });
	}, []);

	const getInvolvedData = [
		{
			title: "Work with us",
			body: "Join the SPEC team, where you can contribute to something meaningful and make a real impact.",
			contactUs: "#contact-form",
		},
		{
			title: "Mentor",
			body: "Become a SPEC mentor to share your expertise and guide aspiring professionals on their journey.",
			contactUs: "#contact-form",
		},
		{
			title: "Partner with us",
			body: "Let's collaborate and create value together by forming a strong partnership between our companies.",
			contactUs: "#contact-form",
		},
	];

	// use if conditional to adjust padding if there is too much text
	const getInvolvedCards = getInvolvedData.map((cardData, index) => {
		let subcardClasses = "overflow-hidden ";

		if (index === 0) {
			subcardClasses += "rounded-tl-3xl rounded-br-3xl";
		} else if (index === 1) {
			subcardClasses += "rounded-br-3xl";
		} else if (index === 2) {
			subcardClasses += "rounded-tr-3xl rounded-bl-3xl";
		}
		return (
			<div key={index} className="p-3">
				<div className={subcardClasses}>
					<h1 className="bg-spec-lightTurquiose py-2 text-center font-dmserif text-lg font-bold">
						{cardData.title}
					</h1>
					<div className="font-montserrat flex h-48 w-64 flex-col bg-spec-white px-6 py-4 xl:w-72">
						<div>
							<p className="font-montserrat">{cardData.body}</p>
						</div>
						<div className=" flex justify-end m-auto">
							<a
								href={cardData.contactUs}
								className="bottom-0 text-xs font-semibold underline">
								CONTACT US
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	});

	const getInvolvedSlides = getInvolvedData.map((slideData, index) => {
		return (
			<div
				key={index}
				className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none "
				data-te-carousel-item>
				<div className="w-full h-full">
					<div
						key={slideData.title}
						className="m-auto flex md:w-10/12 flex-col mt-3 px-4 md:px-5">
						<h1
							key={slideData.title}
							className="rounded-tl-3xl bg-spec-lightTurquiose py-8 text-center font-dmserif text-2xl font-bold md:text-3xl">
							{slideData.title}
						</h1>
						<div className="md:py-4 bg-spec-white rounded-br-3xl ">
							<p className="md:text-2xl text-lg px-12 mt-8 font-montserrat md:px-40 mb-10">
								{slideData.body}
							</p>
							<div className="flex justify-center mb-4 md:mb-4">
								<a
									href={slideData.contactUs}
									className="underline font-montserrat">
									CONTACT US
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});


	// MOBILE CAROUSEL
	const [activeSlide, setActiveSlide] = useState(0);

	const [donationTable, setDonationTable] = useState("Image");
	const [currentSlide, setCurrentSlide] = useState("slide1");

	return (
		<div id="container">
			<section
				id="background"
				className="hidden shrink bg-spec-sunshine px-40 py-10 lg:block">
				<div className="flex flex-col justify-evenly">
					<h1
						id="header"
						className="text-center font-dmserif text-2xl lg:text-4xl xl:text-5xl">
						Ready to be a part of something bigger?
					</h1>
					<div
						id="body-box"
						className="card-container max-w-4xl xl:justify-center 2xl:w-9/12 w-12/12 xl:w-11/12 m-auto mt-10 w-full flex items-center justify-around rounded-tl-3xl rounded-br-3xl bg-spec-white p-16 xl:mt-16 xl:w-full">
						<div id="body-left-content" className="w-5/12 max-w-sm">
							<h2
								id="body-left-header"
								className=" font-dmserif text-4xl xl:text-5xl">
								Join us in making a difference!
							</h2>
							<p
								id="body-left-text"
								className="font-montserrat mt-8 text-sm font-medium leading-6 lg:text-base">
								Donate to SPEC today to <br></br> support our mission and
								impact.
							</p>
							<div
								id="container-for-anchor-button"
								className="mt-5 flex max-w-[15rem] items-center justify-between">
								<div></div>
								<p>
									<a
										id="learn-more-hyperlink"
										className="font-montserrat font-semibold tracking-wide underline"
										href="javascript:void(0)"
										onClick={() => {
											const url = "https://docs.specollective.org/introduction/";
											window.open(url, '_blank');
										}}>
										LEARN MORE
										</a>
								</p>
								{/* <a
									id="learn-more-hyperlink"
									className="font-montserrat font-semibold tracking-wide underline"
									href="javascript:void(0)"
									onClick={() => setDonationTable("table")}>
									<p className="whitespace-nowrap text-sm">LEARN MORE</p>
								</a> */}
								<button
									id="donate-button"
									type="button"
									className="font-montserrat max-w-28 mx-2 w-40 h-14 rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-xs font-semibold tracking-wider text-white"
									onClick={() => {
										const url = "https://opencollective.com/spec";
    								window.open(url, '_blank');
									}}>
									DONATE
								</button>
							</div>
						</div>
						<div id="donation-table">
								<div className="flex justify-end">
                  <DonationTable />
							</div>
						</div>
						{/* {donationTable === "Image" ? (
							<div id="body-right-content" className="scale-90">
								<Image
									id="donate-image"
									className=""
									src={donate}
									alt="donate-image"
								/>
							</div>
						) : (
							<div id="donation-table">
								<div className="flex justify-end" data-closeable>
									<button
										type="button"
										onClick={() => setDonationTable("Image")}>
										<span aria-hidden="true" className="">
											&times;
										</span>
									</button>
                  </div>
                  <DonationTable />
							</div>
						)} */}
					</div>
					<div
						id="sub-cards"
						className="m-auto max-w-4xl mt-6 flex 2xl:w-9/12 w-11/12 shrink justify-evenly xl:w-10/12">
						{getInvolvedCards}
					</div>
				</div>
			</section>
			<section id="mobile" className="sm:visible lg:hidden">
				<div
					id="carouselExampleIndicators"
					className="relative"
					data-te-carousel-init
					data-te-carousel-slide
					data-te-interval="false">
					<div
						className="absolute px-4 pb-6 inset-x-0 -bottom-4 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
						data-te-carousel-indicators>
						<button
							type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="0"
							data-te-carousel-active
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 0 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px] duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-current="true"
							aria-label="Slide 1"
							onClick={() => setActiveSlide(0)}></button>
						<button
							type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="1"
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 1 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-label="Slide 2"
							onClick={() => setActiveSlide(1)}></button>
						<button
							type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="2"
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 2 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-label="Slide 3"
							onClick={() => setActiveSlide(2)}></button>
						<button
							type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="3"
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 3 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-label="Slide 4"
							onClick={() => setActiveSlide(3)}></button>
					</div>

					<div className="bg-spec-sunshine px-5 pt-5 pb-14 relative w-full overflow-hidden after:clear-both after:block after:content-['']">
						<h1
							id="mobile-header"
							className="m-auto text-2xl font-dmserif  my-3 w-2/3 md:w-2/3 md:text-3xl text-center">
							Ready to be a part of something bigger?
						</h1>
						<div>
							<div
								className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
								data-te-carousel-item
								data-te-carousel-active>
								<div
									id="slide1"
									className="m-auto flex md:w-6/12 min-w-fit flex-col mt-3 bg-spec-white px-4 py-6 md:px-5 rounded-tl-3xl rounded-br-3xl">
									{currentSlide === "slide1" ? (
										<div>
											<div
												id="s1-container1"
												className="flex justify-evenly md:pb-8 md:justify-center"
												// className="pl-20 mt-8 md:mt-2 w-10/12 md:w-7/12 md:pl-12"
												> 
												<h2 className="font-dmserif text-3xl my-auto">
													Join us in making a difference!
												</h2>
												<Image
													id="mobile-donate-image"
													alt="mobile-donate-image"
													src={donate}
													className="w-5/12 md:w-6/12"
												/>
											</div>
											<div
												id="s1-container2"
												className="pl-6 mt-8 md:mt-2 w-10/12 md:w-7/12 md:pl-12">
												<p className="mr-auto w-60 font-montserrat text-lg font-medium md:w-80">
													Donate to SPEC today to support our mission and
													impact.
												</p>
											</div>
											<div
												id="s1-container3"
												className=" mt-7 flex items-center justify-evenly md:px-5">
												<a
													id="mobile-learn-more-hyperlink"
													className="font-montserrat font-medium tracking-wide underline"
													href="javascript:void(0)"
													onClick={() => setCurrentSlide("table")}>
													<p className="whitespace-nowrap text-lg px-3">
														LEARN MORE
													</p>
												</a>
												<button
													type="button"
													id="mobile-donate-button"
													role="link"
													className="font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-lg font-semibold tracking-wider text-white"
													onClick={() => {
														const url = "https://opencollective.com/spec";
														window.open(url, '_blank');
													}}>
													DONATE
												</button>
											</div>
										</div>
									) : (
										<div id="mobile-donation-table">
											<div className="flex justify-end" data-closeable>
												<button
													type="button"
													onClick={() => setCurrentSlide("slide1")}>
													<span aria-hidden="true" className="">
														&times;
													</span>
												</button>
											</div>
										<DonationTable />
										</div>
									)}
								</div>
							</div>
							{getInvolvedSlides}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
