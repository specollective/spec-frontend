import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
import { renderToString } from "react-dom/server";
import Image from "next/image";
import Vector from "../public/Vector.png"

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
  
  return (
    <div className="w-1/2 m-auto p-10">
      <div
        id="carouselTestimonialsIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
      >
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="0"
            data-te-carousel-active
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true"
            aria-label="Slide 1"></button>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="1"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 2"></button>
          <button
            type="button"
            data-te-target="#carouselTestimonialsIndicators"
            data-te-slide-to="2"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 3"></button>
        </div>

        {/* <!--Carousel items--> */}
        <div
          className="flex justify-evenly w-full overflow-hidden after:clear-both after:block after:content-['']">
          {/* <!--First item--> */}
          <div
            className=" -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            data-te-carousel-active
          >
             <img className=" float-center w-28 h-28   object-cover rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"></img>
            <div className="border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
           
            <blockquote>
            <Image
              className=" "
              src={Vector}
              alt="linkedin-logo"
              width={35}
              height={33}
              priority
            />
              <p className="text-2xl font-montserrat p-6  text-gray-900 dark:text-black">Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit,</p>
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="content-center text-2xl font-bold py-6">EXAMPLE NAME</p>
            </div>
          </div>
          {/* <!--Second item--> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
             <img className="w-28 h-28  ml-39 mt-39 object-cover rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"></img>
            <div className="border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
           
            <blockquote>
            <svg aria-hidden="true" className="w-10 h-10 text-black dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
              <p className="text-2xl font-montserrat p-6  text-gray-900 dark:text-black">Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit,</p>
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-2xl font-bold py-6">EXAMPLE NAME</p>
            </div>
          </div>
          {/* <!--Third item--> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
             <img className="w-28 h-28  ml-39 mt-39 object-cover rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"></img>
            <div className="border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
           
            <blockquote>
            <svg aria-hidden="true" className="w-10 h-10 text-black dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
              <p className="text-2xl font-montserrat p-6  text-gray-900 dark:text-black">Sagittis viverra integer et mauris, sapien enim. Eget quis congue suspendisse elit. Nisi bibendum nisl diam nulla velit,</p>
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-2xl font-bold py-6">EXAMPLE NAME</p>
            </div>
          </div>
        </div>

        {/* <!--Carousel controls - prev item--> */}
        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselTestimonialsIndicators"
          data-te-slide="prev">
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </span>
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Previous
          </span>
        </button>
        {/* <!--Carousel controls - next item--> */}
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselTestimonialsIndicators"
          data-te-slide="next">
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
    </div>
  )
}