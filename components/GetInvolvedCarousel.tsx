import React, { useState, useEffect } from "react";
import Image from "next/image";
import donate from "../public/DonateImg.svg";
import { useRouter } from "next/router";
// import { Carousel, initTE } from "tw-elements";
// initTE({ Carousel });
export default function GetInvolveCarousel() {
	// const router = useRouter();
	// useEffect(() => {
	// 	const use = async () => {
	// 		(await import("tw-elements")).default;
	// 	};
	// 	use();
	// }, []);
	const [activeSlide, setActiveSlide] = useState(0);

	const handleButtonClick = (index: number): void => {
		setActiveSlide(index);
	};

	return (
		<section className="sm:block lg:hidden">
			<div
				id="carouselExampleIndicators"
				className="relative"
				data-te-carousel-init
				data-te-carousel-slide>
				<div
					className="absolute px-4 pb-6 inset-x-0 -bottom-4 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
					data-te-carousel-indicators>
					<button
						data-te-target="#carouselIndicatorButton"
						data-te-slide-to="0"
						data-te-carousel-active
						className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
							activeSlide === 0 ? "spec-turquiose" : "spec-white"
						} bg-clip-padding p-0 -indent-[999px] duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
						aria-current="true"
						aria-label="Slide 1"></button>
					<button
						data-te-target="#carouselIndicatorButton"
						className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
							activeSlide === 1 ? "spec-turquiose" : "spec-white"
						} bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
						aria-current="true"
						data-te-slide-to="1"
						aria-label="Slide 2"></button>
					<button
						data-te-target="#carouselIndicatorButton"
						className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
							activeSlide === 2 ? "spec-turquiose" : "spec-white"
						} bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
						data-te-slide-to="2"
						aria-label="Slide 3"></button>
					<button
						data-te-target="#carouselIndicatorButton"
						className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
							activeSlide === 3 ? "spec-turquiose" : "spec-white"
						} bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
						data-te-slide-to="2"
						aria-label="Slide 4"></button>
				</div>

				<div className="bg-spec-sunshine px-5 pt-5 pb-14 relative w-full overflow-hidden after:clear-both after:block after:content-['']">
					<h1
						id="mobile-header"
						className="m-auto text-2xl font-dmserif  mt-3 w-2/3 md:w-2/3 md:text-3xl text-center">
						Ready to be a part of something bigger?
					</h1>
					<div
						className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
						data-te-carousel-item
						data-te-carousel-active>
						<div
							id="mobile-body"
							className="bg-spec-sunshine px-4 py-3 sm:block lg:hidden">
							<div
								id="slide1"
								className="m-auto flex md:w-6/12 min-w-fit flex-col mt-3 bg-spec-white px-4 py-6 md:px-5 rounded-tl-3xl rounded-br-3xl">
								{/* relative left-1/4 */}
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
										id="learn-more-hyperlink"
										className="font-montserrat font-medium tracking-wide underline"
										href="javascript:void(0)"
										// onClick={() => setDonationTable("table")}
									>
										<p className="whitespace-nowrap text-lg px-3">LEARN MORE</p>
									</a>
									<button
										type="button"
										id="mobile-donate-button"
										className="font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-lg font-semibold tracking-wider text-white">
										DONATE
									</button>
								</div>
							</div>

							{/* <div id="slide3"></div>
							<div id="slide4"></div> */}
						</div>
					</div>

					<div
						className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
						data-te-carousel-item>
						<div id="slide2">
							<h2 className="font-dmserif">Work with us</h2>
							<p>
								Join the SPEC team, where you can contribute to something
								meaningful
							</p>
						</div>
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
		</section>
	);
}
