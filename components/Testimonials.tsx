import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
import Image from "next/image";
import DownQuotation from './DownQuotation'
import UpQuotation from "./UpQuotation";
import ReadMore from "./ReadMore";
import { testimonialsData } from "../constants/testimonials-data";


export default function Testimonials() {
  useEffect(() => {
		initTE({ Carousel });
	}, []);
  

 
  const testimonialCardStyle = `
  -z-10 
  border-solid 
  rounded 
  border-spec-turquiose 
  border-2 
  py-8 
  my-8 
  font-montserrat 
  items-center 
  text-base 
  text-center 
  w-full 
  md:w-1/2
  `
  const buttonClassStyle = `
  mx-[3px] 
  box-content
  h-[10px] 
  w-[10px] 
  md:h-[10px] 
  md:w-[10px] 
  flex-initial 
  cursor-pointer 
  border-2  
  border-solid 
  border-black
  rounded-full 
  bg-green-600
  p-0 
  -indent-[999px] 
  opacity-20
  transition-opacity 
  duration-[600ms] 
  ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
  motion-reduce:transition-none
  `

  return (
    <div 
    className="w-full m-auto p-10"
    >
      <div
        id="carouselTestimonialsIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
        data-te-ride="carousel"
        >
        {/* <!--Carousel items--> */}
        <div 
        className="flex justify-around ml-20 md:h-104 p-1.5 w-full overflow-hidden after:clear-both after:block after:content-['']"
        >
          {/* <!--First item--> */}
          <div
            className="flex justify-center md:-mr-[80%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            data-te-carousel-active
          >
            <div className={testimonialCardStyle}>
              <div className="flex justify-center">
                <Image
                  // className="z-10 flex justify-center -mt-14 rounded-full"
                  src={"/Victoria.svg"}
                  alt="Victoria"
                  height={120}
                  width={120}
                  priority
                />
              </div>
              <blockquote className="mb-8">
                  <ReadMore description={testimonialsData[0].quote} limit={250}/>    
              </blockquote> 
              <div className=" flex-shrink border-t-2 pt-8 ml-20 mr-20 w-30 border-spec-sunshine "></div>
                <p id="name" className="content-center text-xl font-medium tracking-widest font-poppins">VICTORIA LO</p>
            </div>
          </div>
          {/* <!--Second item--> */}
          <div
            className="flex justify-center md:-mr-[80%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
            <div className={testimonialCardStyle}>
            <div className="flex justify-center">
              <Image
              // className="z-10 w-28 h-28 flex justify-center -mt-14 rounded-full "
                  src={"/Ilia.svg"}
                  alt="Ilia"
                  height={150}
                  width={150}
              priority
                />
            </div>
            <blockquote>
                   <ReadMore description={testimonialsData[1].quote} limit={250}/> 
            </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-medium tracking-widest py-6">ILIA DE LEON</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
          {/* <!--Third item--> */}
          <div
            className="flex justify-center md:-mr-[80%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
            <div className={testimonialCardStyle}>
             <div className="flex justify-center">
              <Image
              // className=" z-10 w-28 h-28 flex justify-center -mt-14 rounded-full"
                  src={"/Yoline.svg"}
                  height={150}
                  width={150}
              alt="Yoline"
              priority
              />  
            </div>
            <blockquote>
                <ReadMore description={testimonialsData[2].quote} limit={250}/> 
            </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-medium tracking-widest py-6">YOLINE BANERJEE</p>
            </div>
          </div>
             {/* <!--Fourth item--> */}
          <div
            className="flex justify-center md:-mr-[80%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none float-left "
            data-te-carousel-item
          >
            <div className={testimonialCardStyle}>
             <div className="flex justify-center">
              <Image
              // className="z-10 w-28 h-28 flex justify-center -mt-14 rounded-full"
              src={"/Alicia.svg"}
                  alt="Alicia"
                  width={150}
                  height={150}
                /> 
            </div>
            <blockquote>
                <ReadMore description={testimonialsData[3].quote} limit={250}/> 
            </blockquote> 
            
              <div className="flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine"></div>
              <p id="name" className="text-xl font-medium tracking-widest py-6">ALICIA BONG</p>
            </div>
          </div>
        </div>
        {/* Carousel indicators */}
        <div
          className="flex justify-center md:h-104 p-1.5 absolute left-0 right-0 z-2 h-12 list-none"
          data-te-carousel-indicators>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="0"
            data-te-carousel-active
            className={buttonClassStyle}
            aria-current="true"
            aria-label="Slide 1"></button>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="1"
            className={buttonClassStyle}
            aria-label="Slide 2"></button>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="2"
            className={buttonClassStyle}
            aria-label="Slide 3"></button>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="3"
            className={buttonClassStyle}
            aria-label="Slide 4"></button>
        </div>
      </div>
    </div>
    
  )
}