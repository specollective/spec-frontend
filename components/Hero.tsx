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
			<div className="flex">
				<div
					id="top"
					className="w-2/3 mt-6 pl-8 md:mt-10 md:ml-12 md:pl-10 lg:mt-[6rem]  2xl:w-6/12">
					<h1 className="mt-3 font-dmserif text-xl md:text-3xl lg:text-5xl xl:text-7xl 2xl:text-8xl">
						Paid training to promote equity and progress
					</h1>
					<p className="mt-2 w-8/12 font-montserrat text-xs text-spec-turquiose md:mt-5 md:w-4/5 md:text-base lg:mt-8 lg:text-xl xl:text-2xl 2xl:text-3xl">
						SPEC provides paid learning opportunities by partnering with clients
						to build websites, hardware, art, and written content.
					</p>
				</div>
				<div className="">
					<Image
						src={training}
						alt="training-photo"
						className="float-right relative wobject-fill scale-75 "
					/>
					<button onClick={toTop} className="invisible lg:visible">
						{/* absolute right-10 bottom-32 ml-auto w-full w-16 -translate-y-1/2  */}
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
