import React from "react";
import Image from "next/image";
import training from "../public/TrainingImgCropped.svg";
import topButton from "../public/Back to Top.svg";

export default function Hero() {
	const toTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	return (
		<section className="">
			<div className="flex justify-end lg:min-h-screen">
				<div
					id="top"
					className="mb-1 ml-10 mt-4 w-1/2 pl-10 md:ml-20 md:mt-8 md:w-5/12 lg:mt-16 lg:pl-2 xl:ml-36">
					<h1 className="w-10/12 font-dmserif text-2xl md:text-5xl lg:w-9/12 lg:text-6xl lg:leading-tight xl:w-9/12 xl:text-7xl 2xl:w-11/12 2xl:text-8xl">
						Paid training to promote equity and progress
					</h1>
					<p
						id="browser-text"
						className="2xl:mb-18 mt-10 hidden font-montserrat text-2xl font-medium text-spec-turquiose lg:block lg:w-8/12 lg:text-2xl xl:w-8/12 xl:text-3xl 2xl:mt-16 2xl:w-9/12 2xl:text-4xl 2xl:leading-normal">
						Through partnerships with clients, SPEC offers paid learning
						opportunities in website development, hardware creation, art, and
						writing.
					</p>
					<p
						id="mobile-text"
						className="mt-4 block w-8/12 pb-20 font-montserrat text-sm font-medium text-spec-turquiose md:mt-8 md:w-9/12 md:text-2xl md:leading-8 lg:hidden">
						SPEC provides paid learning opportunities by partnering with clients
						to build websites, hardware, art, and written content.
					</p>
				</div>
				<div className="relative w-1/2">
					<div
						id="training-img-container"
						className="absolute inset-0 overflow-hidden ">
						<Image
							src={training}
							alt="training-photo"
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
				<button onClick={toTop} className="invisible lg:visible">
					<Image
						src={topButton}
						alt="back-to-top"
						className="fixed -bottom-2 right-10 xl:-translate-y-1/2 "
					/>
				</button>
			</div>
		</section>
	);
}
