
import React, {useState, useEffect} from "react";
import { Carousel, initTE } from "tw-elements";

import Image from "next/image";
import Yoline from "../public/yoline.png"
  
export default function Testimonials() {
//   useEffect(() => {
//     initTE({ Carousel });
// }, []);
  const testimonialData = [{profileImage:"../public/yoline.png", quoteBox:"Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit, .", name:"YOLINE BANERJEE"}, {profileImage:"", quoteBox:"Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit, .", name:"ILIA DE LEON"}, {profileImage:"", quoteBox:"Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit, .", name:"YOLINE BANERJEE"}]

  const [activeSlide, setActiveSlide] = useState(0);

  const testimoinalCards = testimonialData.map((testimonialCard, index)=>{{
    return(
      // <div key={index}
      // className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none "
      // data-te-carousel-item> 
      //   <div className="w-full h-full">

        <div id="borderBox" className="border-solid border-spec-turquiose border-8 py-8 my-8 font-montserrat text-base text-center w-1/3">

        <Image src={testimonialCard.profileImage} alt="Profile picture" className="rounded-full border-2" width={50} height={50} />
        {/* <Image src="" alt="Quote image"  /> */}
        <p id="quotations" className="py-6">{testimonialCard.quoteBox}</p>
        {/* <hr id="line" className="color-black w-10 "></hr> */}
        <div className="flex-grow border-t-4 border-spec-sunshine"></div>
        <p id="name" className="text-lg font-medium py-6">{testimonialCard.name}</p>
        </div>
      //   </div>
      // </div>
    )
  }})
  
  return (
     <div>
      <div id="carouselExampleIndicators"
					className="relative"
					data-te-carousel-init
					data-te-carousel-slide
					data-te-interval="false">
          <div className="absolute px-4 pb-6 inset-x-0 -bottom-4 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
						data-te-carousel-indicators>
              <button type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="0"
							data-te-carousel-active
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 0 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px] duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-current="true"
							aria-label="Slide 1"
							onClick={() => setActiveSlide(0)}></button>
               <button type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="0"
							data-te-carousel-active
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 0 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px] duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-current="true"
							aria-label="Slide 1"
							onClick={() => setActiveSlide(1)}></button>
               <button type="button"
							data-te-target="#carouselExampleIndicators"
							data-te-slide-to="0"
							data-te-carousel-active
							className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
								activeSlide === 0 ? "spec-turquiose" : "spec-white"
							} bg-clip-padding p-0 -indent-[999px] duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
							aria-current="true"
							aria-label="Slide 1"
							onClick={() => setActiveSlide(2)}></button>
            </div>


      </div>
      <div className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
								data-te-carousel-item
								data-te-carousel-active><div className="flex flex-row">{testimoinalCards}</div></div>
      
     </div>

      // <div className="min-w-screen min-h-screen bg-gray-200 flex border-Turquoise items-center justify-center px-5 py-5">
      //     <div className="w-full mx-auto rounded-lg bg-white border-4 border-Turquoise	 shadow-lg px-5 pt-5 pb-10 text-gray-800">
      //         <div className="w-full pt-1 pb-5">
      //             <div className="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
      //                 <img src="https://2981975561-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MgOxcb0zKpHZRBN4nWk%2Fuploads%2Fn50jyH1IEoAkI9SAH4sh%2Fyoline.png?alt=media&token=a57a116b-f5d8-4508-a76e-c7a59a9f12ff" alt=""></img>
      //             </div>
      //         </div>
      //         <div className="w-full mb-10">
      //             <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
      //             <p className="text-sm text-gray-600 text-center px-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati laudantium recusandae, debitis eum voluptatem ad, illo voluptatibus temporibus odio provident.</p>
      //             <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
      //         </div>
      //         <div className="w-full">
      //             <p className="text-md text-indigo-500 font-bold text-center">YOLINE BANERJEE</p>
      //             <p className="text-xs text-gray-500 text-center">@scott.windon</p>
      //         </div>
      //     </div>
      // </div>

    )
}