import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
import { renderToString } from "react-dom/server";
import Image from "next/image";

export default function Testimonials() {
  useEffect(() => {
		initTE({ Carousel });
	}, []);
  
  const testimonialData = [
    {
      profileImage:"",
      quoteBox:"Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit, .",
      name:"YOLINE BANERJEE"
    },
    {
      profileImage: "",
      quoteBox:"Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit, .",
      name:"ILIA DE LEON"}, {profileImage:"", quoteBox:"Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit, .", name:"YOLINE BANERJEE"
    }
  ]

  const [activeSlide, setActiveSlide] = useState(0);
  const testimonialCards = testimonialData.map((testimonialCard, index) => {{
    return (
      <div
        key={index}
        className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item
      >
        <div className="w-full h-full">
          <div id="borderBox" className="border-solid border-spec-turquiose border-8 py-8 my-8 font-montserrat text-base text-center w-1/3">
            <Image src={testimonialCard.profileImage} alt="Profile picture" className="rounded-full border-2" width={50} height={50} />
            {/* <Image src="" alt="Quote image"  /> */}
            <p id="quotations" className="py-6">{testimonialCard.quoteBox}</p>
            {/* <hr id="line" className="color-black w-10 "></hr> */}
            <div className="flex-grow border-t-4 border-spec-sunshine"></div>
            <p id="name" className="text-lg font-medium py-6">{testimonialCard.name}</p>
          </div>
        </div>
      </div>
    )
  }})

  return (
    <div className="flex justify-center items-center">
      {testimonialCards}
    </div>
  )
}