import React from "react";
import Image from "next/image";
import training from "../public/TrainingImgCropped.svg";
import topButton from "../public/Back to Top.svg";

export default function Hero() {
	const toTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<section className="">
			<div className="flex justify-end mb-5">
				<div
					id="top"
					className="w-1/2 ml-10 mt-4 mb-1 md:ml-20 md:mt-8 md:w-5/12 lg:mt-16 xl:ml-36"
					// className="w-1/2 pl-8 md:mt-10 md:ml-12 md:pl-10 lg:mt-[6rem]  2xl:w-6/12"
				>
					<h1
						className="font-dmserif text-2xl w-10/12 md:text-5xl md:w-full lg:text-6xl xl:text-7xl lg:w-9/12 2xl:text-8xl 2xl:w-11/12 xl:w-9/12 lg:leading-tight"
						// className="mt-3 font-dmserif text-lg md:text-3xl lg:text-5xl xl:text-7xl 2xl:text-8xl"
					>
						Paid training to promote equity and progress
					</h1>
					<p
						id="browser-text"
						className="font-montserrat text-spec-turquiose hidden lg:block text-2xl font-medium lg:w-8/12 lg:text-2xl xl:text-3xl mt-10 xl:w-8/12 2xl:text-4xl 2xl:w-9/12 2xl:mt-16 2xl:leading-normal"
						// className="mt-2 w-8/12 font-montserrat text-xs text-spec-turquiose md:mt-5 md:w-4/5 md:text-base lg:mt-8 lg:text-xl xl:text-2xl 2xl:text-3xl"
					>
						Through partnerships with clients, SPEC offers paid learning
						opportunities in website development, hardware creation, art, and
						writing.
					</p>
					<p
						id="mobile-text"
						className="font-medium text-sm block lg:hidden font-montserrat text-spec-turquiose w-10/12 mt-4 md:text-2xl md:w-10/12 md:mt-8 md:leading-8">
						SPEC provides paid learning opportunities by partnering with clients
						to build websites, hardware, art, and written content.
					</p>
				</div>
				{/* <div className="relative top-1/2 inline h-full w-3/5 md:pl-8 2xl:w-6/12"> */}
				<div className="relative w-1/2  lg:min-w-max">
					<div
						id="training-img-container"
						className="absolute inset-0 overflow-hidden ">
						<Image
							src={training}
							alt="training-photo"
							// className="h-full scale-200 object-cover overflow-hidden float-right"
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
				<button onClick={toTop} className="invisible lg:visible">
					<Image
						src={topButton}
						alt="back-to-top"
						className="absolute right-10 bottom-28 xl:bottom-32 xl:-translate-y-1/2 scale-125 xl:scale-150"
					/>
				</button>
			</div>
		</section>
	);
}
