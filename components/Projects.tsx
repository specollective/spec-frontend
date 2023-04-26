import React from "react";
import Image from "next/image";
import projectsImage from "../public/ProjectsImg.svg";

export default function Projects() {
	return (
		<div>
			<div className="flex flex-col-reverse md:flex-row items-center justify-center ml-20 ">
				<div id="container-left" className="md:pr-10 w-10/12 md:w-6/12">
					<h1 className="font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 md:text-lg md:leading-7">
						PROJECTS
					</h1>
					<p className="font-dmserif text-base font-normal leading-8 mb-6 md:text-4xl md:leading-10">
						SPEC is organized as an open collective, which
						<span className="text-spec-turquiose">
							&nbsp;raises and spends funds transparently&nbsp;
						</span>
						to achieve its goals.
					</p>
					<p className="font-montserrat opacity-70 font-medium text-base leading-nromal md:text-lg md:leading-7">
						Your donations help Research Associates &#40;RAs&#41; receive
						mentoring, career training, and professional development as they
						work on these current projects.
					</p>
				</div>
				<div id="right-container" className="w-7/12">
					<Image
						className="float-right scale-100 pl-10 ml-10"
						src={projectsImage}
						alt="Interacting with web browsers"
					/>
				</div>
			</div>
		</div>
	);
}
