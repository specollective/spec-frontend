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
			<div className="flex pl-5 lg:ml-10">
				<div
					id="top"
					className="w-6/12 mt-10 md:mt-16 lg:mt-20 xl:mt-24 pl-14 md:pl-14">
					<h1 className="w-11/12 md:w-11/12 font-dmserif text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
						Paid training to promote equity and progress
					</h1>
					<p className="mt-5 w-10/12 font-montserrat text-base text-spec-turquiose md:mt-8 md:text-xl lg:mt-8 lg:text-2xl xl:text-3xl 2xl:text-4xl">
						SPEC provides paid learning opportunities by partnering with clients
						to build websites, hardware, art, and written content.
					</p>
				</div>
				<div className="w-6/12 relative top-1/2 inline w-2/3 sm:w-4/12 2xl:w-6/12">
					<Image
						src={training}
						alt="training-photo"
						className="float-right object-fill pl-5"
					/>
					<button onClick={toTop} className="invisible lg:visible">
						<Image
							src={topButton}
							alt="back-to-top"
							className="absolute right-10 bottom-28 xl:bottom-32 xl:-translate-y-1/2 scale-125 xl:scale-150"
							// className="absolute right-10 bottom-30 ml-auto w-full w-16 -translate-y-1/2"
						/>
					</button>
				</div>
			</div>
		</section>
	);
}
