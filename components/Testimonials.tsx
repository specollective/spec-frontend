import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
// import { renderToString } from "react-dom/server";
import Image from "next/image";
import upQuotationMarks from '../public/upQuotationMarks.svg'
import downQuotationMarks from '../public/downQuotationMark.svg'
import Ilia from "../public/testimonials/ilia.svg"
import Alicia from "../public/testimonials/alicia.svg"
import Yoline from "../public/testimonials/Yoline.svg"
import Victoria from "../public/testimonials/victoria.svg"
import Vector from "../public/Vector.png"


export default function Testimonials() {
  useEffect(() => {
		initTE({ Carousel });
	}, []);
  
 
  const [activeSlide, setActiveSlide] = useState(0);
  
   const weburl = "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
  return (
  
    <div className="w-full m-auto p-10">
      <div
        id="carouselTestimonialsIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
      >

        {/* <!--Carousel items--> */}
        <div
          className="flex justify-evenly w-full overflow-hidden after:clear-both after:block after:content-['']">
          {/* <!--First item--> */}
          <div
            className="flex content-center -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            data-te-carousel-active
          >
           
            <div className="-z-10 border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
              <div className="flex justify-center">
              <Image
              className=" z-10 flex justify-center -mt-14 rounded-full"
              src={Victoria}
              alt="Victoria"
              priority
            />
            </div>
           
            <blockquote>
            <Image
              className="ml-10"
              src={downQuotationMarks}
              alt="Quotation Mark"
              priority
            />
            <p className="text-lg font-montserrat font-light italic p-10  text-gray-900 dark:text-black sm:text-ellipsis sm:overflow-hidden">During my time at SPEC, I learned so much about the foundations of software engineering, agile, and open source development. I joined SPEC for it&apos;s mission to empower individuals to learn as you go and contribute to world-changing initiatives through the open sharing economy. With a small but mighty team, the genuine care that everyone has to do good by people is what keeps me motivated to continue contributing, growing, and learning</p>
                
            <Image
              className="lg:hidden float-right mr-10"
              src={upQuotationMarks}
              alt="upQuote"
              priority
            />
            </blockquote> 
              
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="content-center text-xl font-semibold py-6">VICTORIA LO</p>
              {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
            
          </div>

          {/* <!--Second item--> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
            <div className="border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
            <div className="flex justify-center">
              <Image
              className=" z-10 w-28 h-28 flex justify-center -mt-14 rounded-full "
              src={Ilia}
              alt="Ilia"
              priority
                />
            </div>
            
            <blockquote>
               <Image
              className="ml-10"
              src={downQuotationMarks}
              alt="Quotation Mark"
              priority
            />
                <p className="text-lg font-montserrat font-light italic p-6  text-gray-900 dark:text-black">SPEC has been a perfect next step in my UX design journey. It&apos;s such a great space for me to explore the different areas within UX design, to figure out where I excel. On top of discovery within this new field for me, being 100% supported and encouraged to continue learning has been amazing. SPEC is going to change the world, and I am happy to contribute my small piece!
                </p>
                    
            <Image
              className="lg:hidden float-right mr-10"
              src={upQuotationMarks}
              alt="upQuote"
              priority
            />
            </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-semibold py-6">ILIA DE LEON</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
          {/* <!--Third item--> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
            <div className="border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
             <div className="flex justify-center">
              <Image
              className=" z-10 w-28 h-28 flex justify-center -mt-14 rounded-full"
              src={Yoline}
              alt="Yoline"
              priority
              />  
            </div>
            <blockquote>
            <Image
              className="ml-10"
              src={downQuotationMarks}
              alt="downQuote"
              priority
            />
                <p className="text-lg font-montserrat font-light italic p-6  text-gray-900 dark:text-black">As an RA for SPEC, I had the opportunity to dive deep into the world of coding and gain valuable skills that have had a lasting impact on my personal and professional growth. But beyond just the technical knowledge, what truly stood out to me was the incredibly supportive and kind community of people at SPEC. I felt welcomed from day one and was always encouraged to ask questions, seek guidance, and push myself to learn more. The experience of working with such a talented and supportive group of individuals has had a profound impact on me, and I&apos;m grateful for the time I spent at SPEC.</p>
                
            <Image
              className="lg:hidden float-right mr-10"
              src={upQuotationMarks}
              alt="upQuote"
              priority
            />
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-semibold py-6">YOLINE BANERJEE</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
             {/* <!--Fourth item--> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
            <div className="border-solid rounded border-spec-turquiose border-2 py-8 my-8 font-montserrat items-center text-base text-center w-1/2">
             <div className="flex justify-center">
              <Image
              className="z-10 w-28 h-28 flex justify-center -mt-14 rounded-full"
              src={Alicia}
              alt="Alicia"
              priority
                /> 
            </div>
            <blockquote>
              <Image
              className="ml-10"
              src={downQuotationMarks}
              alt="downQuote"
              priority
            />
                <p className="text-lg font-montserrat font-light italic p-6  text-gray-900 dark:text-black">I joined SPEC during a transitionary period of my life. Being able to work on multiple projects and in various roles all while being mentored helped me identify what my next career choice should be. Now that I have found gainful employment outside of SPEC I am happy to still feel included and connected to the team.</p>
                    
            <Image
              className="lg:hidden float-right mr-10"
              src={upQuotationMarks}
              alt="upQuote"
              priority
            />
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-semibold py-6">ALICIA BONG</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
        </div>

        {/* <!--Carousel controls - prev item--> */}
        <button
          className=" lg:visible absolute bottom-0 left-0 top-0 z-[1] w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselTestimonialsIndicators"
          data-te-slide="prev">
         
        </button>
        {/* <!--Carousel controls - next item--> */}
        <button
          className=" lg:visible absolute bottom-0 right-0 top-0 z-[1] w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselTestimonialsIndicators"
          data-te-slide="next">

        </button>
      </div>
    </div>
  )
}