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
			<div className="lg:min-h-screen flex justify-end">
				<div
					id="top"
					className="w-1/2 ml-10 mt-4 mb-1 md:ml-20 md:mt-8 md:w-5/12 lg:mt-16 xl:ml-36 pl-10 lg:pl-2">
					<h1 className="font-dmserif text-2xl w-10/12 md:text-5xl lg:text-6xl xl:text-7xl lg:w-9/12 2xl:text-8xl 2xl:w-11/12 xl:w-9/12 lg:leading-tight">
						Paid training to promote equity and progress
					</h1>
					<p
						id="browser-text"
						className="font-montserrat text-spec-turquiose hidden lg:block text-2xl font-medium lg:w-8/12 lg:text-2xl xl:text-3xl mt-10 xl:w-8/12 2xl:text-4xl 2xl:w-9/12 2xl:mt-16 2xl:leading-normal 2xl:mb-18">
						Through partnerships with clients, SPEC offers paid learning
						opportunities in website development, hardware creation, art, and
						writing.
					</p>
					<p
						id="mobile-text"
						className="font-medium text-sm block lg:hidden font-montserrat text-spec-turquiose w-8/12 mt-4 pb-20 md:text-2xl md:w-9/12 md:mt-8 md:leading-8">
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
						className="fixed right-10 -bottom-2 xl:-translate-y-1/2 "
					/>
				</button>
			</div>
		</section>
	);
}
