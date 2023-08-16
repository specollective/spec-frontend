import React from "react";
import Image from "next/image";
import projectsImage from "../public/ProjectsImage.svg";


export default function Projects() {
	return (
		<div>
			<div className="flex flex-col-reverse md:flex md:flex-row m-12 md:m-10 pl-6 items-center justify-center ">
				<div id="container-left" className="md:w-1/2">
					<h1 className="font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 md:text-lg md:leading-7">
						PROJECTS
					</h1>
					<p className="font-dmserif font-normal leading-8 mb-6 text-2xl md:text-4xl md:leading-10">
						SPEC is organized as an open collective, which
						<span className="text-spec-turquiose">
							&nbsp;raises and spends funds transparently&nbsp;
						</span>
						to achieve its goals.
					</p>
					<p className="font-montserrat opacity-70 font-medium text-base leading-normal md:text-lg md:leading-7">
						Your donations help Research Associates &#40;RAs&#41; receive
						mentoring, career training, and professional development as they
						work on these current projects.
					</p>
				</div>
				
				{/* float-right ml-8 */}
				<div id="right-container" className="md:w-1/3">
					<Image
						className="m-auto text-left pt-12 block md:hidden"
						src={projectsImage}
						alt="Interacting with web browsers"
					/>
					<Image
            className="m-auto text-left pt-6 mb-6 hidden md:block"
            src={projectsImage}
						alt="Interacting with web browsers"
          />
				</div>
			</div>
		</div>
	);
}
