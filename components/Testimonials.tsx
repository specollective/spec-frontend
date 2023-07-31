import React, { useState, useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
// import { renderToString } from "react-dom/server";
import Image from "next/image";
import upQuotationMarks from '../public/upQuotationMarks.svg'
import DownQuotation from './DownQuotation'
import UpQuotation from "./UpQuotation";
import Ilia from "../public/testimonials/Ilia.svg"
import Alicia from "../public/testimonials/Alicia.svg"
import Yoline from "../public/testimonials/Yoline.svg"
import Victoria from "../public/testimonials/Victoria.svg"
import { renderToString } from "react-dom/server";


export default function Testimonials() {
  useEffect(() => {
		initTE({ Carousel });
	}, []);
  
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => setClamped(!clamped);
  const [activeSlide, setActiveSlide] = useState(0);

  //create a constant that will hold the styles for the p tag in the carousel

  const quoteStyle = `
  text-md 
  md:text-lg 
  font-montserrat 
  font-light 
  italic 
  mb-4 p-6  
  text-gray-900 
  dark:text-black 
  sm:text-ellipsis 
  sm:overflow-hidden 
  line-clamp-4
  `

  //create a constant that will hold the tailwind classes for cards in the carousel

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
 



  return (
   
    <div className="w-full m-auto p-10">
      <div
        id="carouselTestimonialsIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
      >
          {/* <!--Carousel indicators--> */}


        {/* <!--Carousel items--> */}
        <div
          className="flex justify-evenly w-full md:h-104 overflow-hidden after:clear-both after:block after:content-['']">
          {/* <!--First item--> */}
          <div
            className="flex md:-mr-[80%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            data-te-carousel-active
          >
            <div className={testimonialCardStyle}>
              <div className="flex justify-center">
              <Image
              className="z-10 flex justify-center -mt-14 rounded-full"
              src={Victoria}
              alt="Victoria"
              priority
            />
            </div>
            <blockquote>
             <DownQuotation/>
            <p className={quoteStyle}>During my time at SPEC, I learned so much about the foundations of software engineering, agile, and open source development. I joined SPEC for it&apos;s mission to empower individuals to learn as you go and contribute to world-changing initiatives through the open sharing economy. With a small but mighty team, the genuine care that everyone has to do good by people is what keeps me motivated to continue contributing, growing, and learning</p>
            <div className="visible md:hidden">
              <UpQuotation/>
            </div> 
            
            </blockquote> 
              <div className=" flex-shrink border-t-2 pt-8 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="content-center text-xl font-medium tracking-widest font-poppins">VICTORIA LO</p>
              {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>

          {/* <!--Second item--> */}
          <div
            className="relative md:-mr-[80%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
      

            <div className={testimonialCardStyle}>
             
            <div className="flex justify-center">
              <Image
              className="z-10 w-28 h-28 flex justify-center -mt-14 rounded-full "
              src={Ilia}
              alt="Ilia"
              priority
                />
            </div>
            
            <blockquote>
             <DownQuotation/>
                <p className={quoteStyle}>SPEC has been a perfect next step in my UX design journey. It&apos;s such a great space for me to explore the different areas within UX design, to figure out where I excel. On top of discovery within this new field for me, being 100% supported and encouraged to continue learning has been amazing. SPEC is going to change the world, and I am happy to contribute my small piece!
                </p>

                <div className="visible md:hidden">
                    <UpQuotation/>
                </div>  
           
            </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-medium tracking-widest py-6">ILIA DE LEON</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
          {/* <!--Third item--> */}
          <div
            className="md:-mr-[80%] hidden w-full md:h-104 transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
            
            <div className={testimonialCardStyle}>
             <div className="flex justify-center">
              <Image
              className=" z-10 w-28 h-28 flex justify-center -mt-14 rounded-full"
              src={Yoline}
              alt="Yoline"
              priority
              />  
            </div>
            <blockquote>
                <DownQuotation />
                
                <p className={quoteStyle}>As an RA for SPEC, I had the opportunity to dive deep into the world of coding and gain valuable skills that have had a lasting impact on my personal and professional growth. But beyond just the technical knowledge, what truly stood out to me was the incredibly supportive and kind community of people at SPEC. I felt welcomed from day one and was always encouraged to ask questions, seek guidance, and push myself to learn more. The experience of working with such a talented and supportive group of individuals has had a profound impact on me, and I&apos;m grateful for the time I spent at SPEC.</p>
                
              <div className="visible md:hidden">
                <UpQuotation/>
              </div>
           
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-medium tracking-widest py-6">YOLINE BANERJEE</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
             {/* <!--Fourth item--> */}
          <div
            className="relative hidden float-left md:-mr-[80%] w-full md:h-104 transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          >
      
            <div className={testimonialCardStyle}>
             <div className="flex justify-center">
              <Image
              className="z-10 w-28 h-28 flex justify-center -mt-14 rounded-full"
              src={Alicia}
              alt="Alicia"
              priority
                /> 
            </div>
            <blockquote>
                <DownQuotation />
                <p className={quoteStyle}>I joined SPEC during a transitionary period of my life. Being able to work on multiple projects and in various roles all while being mentored helped me identify what my next career choice should be. Now that I have found gainful employment outside of SPEC I am happy to still feel included and connected to the team.</p>

              <div className="visible md:hidden">
                   <UpQuotation/>
              </div> 
           
          </blockquote> 
              <div className=" flex-shrink border-t-2 ml-20 mr-20 w-30 border-spec-sunshine "></div>
              <p id="name" className="text-xl font-medium tracking-widest py-6">ALICIA BONG</p>
               {/* <p id="title" className="content-center text-lg font-normal py-6">Research Associate</p> */}
            </div>
          </div>
        </div>

    <div
    className=" absolute left-0 right-0 z-2 h-12 flex list-none justify-center p-1.5"
    data-te-carousel-indicators>
    <button
      type="button"
      data-te-target="#carouselTestimonialsIndicators"
      data-te-slide-to="0"
      data-te-carousel-active
      className="mx-[3px] box-content h-[10px] w-[10px] md:h-[10px] md:w-[10px] flex-initial cursor-pointer border-2  border-solid border-black rounded-full bg-white p-0 -indent-[999px]  transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-current="true"
      aria-label="Slide 1"></button>
    <button
      type="button"
      data-te-target="#carouselTestimonialsIndicators"
      data-te-slide-to="1"
      className="mx-[3px] box-content h-[10px] w-[10px] md:h-[10px] md:w-[10px] flex-initial cursor-pointer border-2  border-solid border-black rounded-full bg-white p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 2"></button>
    <button
      type="button"
      data-te-target="#carouselTestimonialsIndicators"
      data-te-slide-to="2"
      className="mx-[3px] box-content h-[10px] w-[10px] md:h-[10px] md:w-[10px] flex-initial cursor-pointer border-2  border-solid border-black rounded-full bg-white p-0 -indent-[999px] transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 3"></button>
      <button
      type="button"
      data-te-target="#carouselTestimonialsIndicators"
      data-te-slide-to="3"
      className="mx-[3px] box-content h-[10px] w-[10px] md:h-[10px] md:w-[10px] flex-initial cursor-pointer border-2  border-solid border-black rounded-full bg-white p-0 -indent-[999px]  transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
      aria-label="Slide 4"></button>
  </div>
      </div>
    </div>
  )
}