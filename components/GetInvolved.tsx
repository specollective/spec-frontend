import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
import { renderToString } from "react-dom/server";
import Image from "next/image";
import donate from "../public/DonateImg.svg";

export default function GetInvolved() {
	useEffect(() => {
		initTE({ Carousel });
	}, []);
	const getInvolvedCardData = [
		{
			title: "Work with us",
			body: "Join the SPEC team, where you can contribute to something meaningful and make a real impact",
			contactUs: "#",
		},
		{
			title: "Mentor",
			body: "Join our mentorship program and give back by sharing your expertise and guiding aspiring professionals on their journey",
			contactUs: "#",
		},
		{
			title: "Partner with us",
			body: "Let's collaborate and create value together by forming a strong partnership between our companies",
			contactUs: "#",
		},
	];

	// use if conditional to adjust padding if there is too much text
	const getInvolvedCards = getInvolvedCardData.map((cardData, index) => {
		let subcardClasses = "overflow-hidden ";

		if (index === 0) {
			subcardClasses += "rounded-tl-3xl rounded-br-3xl";
		} else if (index === 1) {
			subcardClasses += "rounded-br-3xl";
		} else if (index === 2) {
			subcardClasses += "rounded-tr-3xl rounded-bl-3xl";
		}
		return (
			<div key={cardData.title} className="p-3">
				<div className={subcardClasses}>
					<h1 className="bg-spec-lightTurquiose py-2 text-center font-dmserif text-lg font-bold">
						{cardData.title}
					</h1>
					<div className="montserrat flex h-48 w-64 flex-col bg-spec-white px-6 py-4 xl:w-72">
						<div>
							<p className="text-sm">{cardData.body}</p>
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

	const tableContents = [
		["$20", "Funds an hour of RA learning"],
		["$50", "Introduces a RA to a new skill"],
		["$100", "-"],
		["$1000", "Publishes an issue of JoER"],
		["$3000", "Funds a RA development project"],
	];

	// MOBILE CAROUSEL
	const [activeSlide, setActiveSlide] = useState(0);

	const handleButtonClick = (index: number): void => {
		setActiveSlide(index);
	};

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
								className="montserrat mt-8 text-sm font-medium leading-6 lg:text-base">
								Donate to SPEC today to <br></br> support our mission and
								impact.
							</p>

							<div
								id="container-for-anchor-button"
								className="mt-5 flex max-w-[15rem]  items-center justify-between">
								<a
									id="learn-more-hyperlink"
									className="montserrat font-semibold tracking-wide underline"
									href="javascript:void(0)"
									onClick={() => setDonationTable("table")}>
									<p className="whitespace-nowrap text-sm">LEARN MORE</p>
								</a>
								<button
									id="donate-button"
									type="button"
									className="montserrat max-w-28 mx-2 w-24 rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-xs font-semibold tracking-wider text-white">
									DONATE
								</button>
							</div>
						</div>
						{/* 3xl:scale-75 h-full md:scale-100 xl:scale-90 */}
						{donationTable === "Image" ? (
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
								<table className="montserrat h-[14rem] w-full table-auto border-collapse border-spacing-y-6 border text-sm">
									<thead>
										<tr className="">
											<th
												className="h-[2.5rem] rounded-tr-3xl rounded-tl-3xl border bg-spec-banana font-normal"
												colSpan={2}>
												The <strong>impact</strong> of your donation makes
											</th>
										</tr>
									</thead>
									<tbody className="my-2 space-y-2 ">
										{tableContents.map((row, index) => {
											const isEvenRow = index % 2 === 0;
											const rowColor = isEvenRow
												? "bg-spec-lemon"
												: "bg-spec-banana";
											const isLastRow = index === tableContents.length - 1;
											return (
												<tr key={index} className={`${rowColor} border`}>
													{row.map((cell, cellIndex) => (
														<td
															key={cellIndex}
															className={`px-4 ${
																isLastRow && cellIndex ? "rounded-br-3xl" : ""
															} ${
																cellIndex === 0 && isLastRow
																	? "rounded-bl-3xl"
																	: ""
															} ${cellIndex ? "text-right" : ""}`}>
															{cell}
														</td>
													))}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
					{/* </div> */}
					<div
						id="sub-cards"
						className="m-auto max-w-4xl mt-6 flex 2xl:w-9/12 w-11/12 shrink justify-evenly xl:w-10/12">
						{getInvolvedCards}
					</div>
				</div>
			</section>
			<div
				id="carouselExampleIndicators"
				className="relative"
				data-te-carousel-init
				data-te-carousel-slide
				data-te-interval="false">
				<div
					className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
					data-te-carousel-indicators>
					<button
						type="button"
						data-te-target="#carouselExampleIndicators"
						data-te-slide-to="0"
						data-te-carousel-active
						className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
						aria-current="true"
						aria-label="Slide 1"></button>
					<button
						type="button"
						data-te-target="#carouselExampleIndicators"
						data-te-slide-to="1"
						className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
						aria-label="Slide 2"></button>
					<button
						type="button"
						data-te-target="#carouselExampleIndicators"
						data-te-slide-to="2"
						className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
						aria-label="Slide 3"></button>
				</div>

				<div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
					<div
						className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
						data-te-carousel-item
						data-te-carousel-active>
						<div
							id="slide1"
							className="m-auto flex md:w-6/12 min-w-fit flex-col mt-3 bg-spec-white px-4 py-6 md:px-5 rounded-tl-3xl rounded-br-3xl">
							{/* relative left-1/4 */}
							{currentSlide === "slide1" ? (
								<div>
									<div
										id="s1-container1"
										className="flex justify-evenly md:pb-8 md:justify-center">
										{/* absolute top-1/2 right-14 md:left-11 md:text-3xl -translate-x-32 -translate-y-28 font-dmserif  transform w-40 text-2xl mt-16 */}
										<h2 className="font-dmserif w-40 text-3xl my-auto">
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
											Donate to SPEC today to support our mission and impact.
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
											className="font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-lg font-semibold tracking-wider text-white">
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
									<table className="montserrat h-[14rem] w-full table-auto border-collapse border-spacing-y-6  text-xs">
										<thead>
											<tr className="">
												{/* h-[2.5rem] rounded-tr-3xl rounded-tl-3xl border bg-spec-banana font-normal */}
												<th
													className="rounded-tr-3xl rounded-tl-3xl bg-spec-banana font-normal py-4 text-sm"
													colSpan={2}>
													The <strong>impact</strong> of your donation makes
												</th>
											</tr>
										</thead>
										<tbody className="my-2 space-y-2 ">
											{tableContents.map((row, index) => {
												const isEvenRow = index % 2 === 0;
												const rowColor = isEvenRow
													? "bg-spec-lemon"
													: "bg-spec-banana";
												const isLastRow = index === tableContents.length - 1;
												return (
													<tr
														key={index}
														className={`${rowColor} border border-spec-white`}>
														{row.map((cell, cellIndex) => (
															<td
																key={cellIndex}
																className={`px-4 ${
																	isLastRow && cellIndex ? "rounded-br-3xl" : ""
																} ${
																	cellIndex === 0 && isLastRow
																		? "rounded-bl-3xl"
																		: ""
																} ${cellIndex ? "text-right" : ""}`}>
																{cell}
															</td>
														))}
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
					<div
						className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
						data-te-carousel-item>
						<img
							src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
							className="block w-full"
							alt="Camera"
						/>
					</div>
					<div
						className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
						data-te-carousel-item>
						<img
							src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
							className="block w-full"
							alt="Exotic Fruits"
						/>
					</div>
				</div>
			</div>

			<section id="mobile-carousel" className="sm:block lg:hidden"></section>
		</div>
	);
}
