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
			<div className="flex justify-end h-1/2 lg:min-h-screen">
				<div
					id="top"
					className="w-1/2 md:w-5/12 ml-4">
					<h1 className="font-dmserif mt-8 md:mt-12 text-2xl md:text-5xl lg:text-6xl lg:leading-tight xl:text-7xl  2xl:text-8xl">
						Paid training to promote equity and progress
					</h1>
					<p
						id="browser-text"
						className="hidden mt-10 md:w-10/12 font-montserrat text-2xl font-medium text-spec-turquiose lg:block  lg:text-2xl xl:text-3xl 2xl:text-4xl 2xl:leading-normal">
						Through partnerships with clients, SPEC offers paid learning
						opportunities in website development, hardware creation, art, and
						writing.
					</p>
					<p
						id="mobile-text"
						className="w-11/12 mt-4 mb-6 block font-montserrat text-sm font-medium text-spec-turquiose md:text-2xl md:leading-8 lg:hidden">
						SPEC provides paid learning opportunities by partnering with clients
						to build websites, hardware, art, and written content.
					</p>
				</div>
				<div className="relative w-1/2 ">
					<div
						id="training-img-container"
						className="absolute inset-0 overflow-hidden ">
						<Image
							src="/TrainingImgCropped.svg"
							alt="training-photo"
							fill
							style={{ objectFit: "cover" }}
							sizes="(max-width: 640px) 50vw, 300px" 
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
