import React, { useState } from "react";
import Image from "next/image";
import donate from "../public/DonateImg.svg";


export default function GetInvolveCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleButtonClick = (index: number): void => {
    setActiveSlide(index);
  }

  return (
    <section>
      <div
        id="carouselExampleIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide>

<div
    className="absolute px-4 py-3 sm:block lg:hidden inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
    data-te-carousel-indicators>
    <button
      data-te-target="#carouselIndicatorButton"
      data-te-slide-to="0"
      data-te-carousel-active
      className={`mx-[3px] box-content h-3 w-3 flex-initial cursor-pointer border border-solid border-black bg-${activeSlide === 0 ? 'spec-turquiose' : 'spec-white'} bg-clip-padding p-0 -indent-[999px] transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
      aria-current="true"
      aria-label="Slide 1"></button>
    <button
      data-te-target="#carouselIndicatorButton"
      className={`mx-[3px] box-content h-3 w-3 flex-initial cursor-pointer border border-solid border-black bg-${activeSlide === 1 ? 'spec-turquiose' : 'spec-white'} bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
      data-te-slide-to="1"
      aria-label="Slide 1"></button>
    <button
      data-te-target="#carouselIndicatorButton"
      className={`mx-[3px] box-content h-3 w-3 flex-initial cursor-pointer border border-solid border-black bg-${activeSlide === 2 ? 'spec-turquiose' : 'spec-white'} bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
      data-te-slide-to="2"
      aria-label="Slide 1"></button>
  </div>


<div
  className="bg-spec-sunshine px-5 py-5 relative w-full overflow-hidden after:clear-both after:block after:content-['']">
<h1 id="mobile-header" className="text-center font-dmserif">
          Ready to be a part of something bigger?
        </h1>
  <div
    className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
    data-te-carousel-item
    data-te-carousel-active>
<div
        id="mobile"
        className="bg-spec-sunshine px-4 py-3 sm:block lg:hidden"
      >
<div id="slide1" className="flex flex-col bg-spec-white px-10  sm:block lg:hidden">
            <div id="s1-container1" className="flex justify-around">
              <h2 className="w-2/5 font-dmserif text-2xl">
                Join us in making a difference!
              </h2>
              <Image
                id="mobile-donate-image"
                alt="mobile-donate-image"
                src={donate}
                className="w-6/12"
              />
            </div>
            <div id="s1-container2" className="mt-7 w-3/5">
              <p className="montserrat text-sm">
                Donate to SPEC today to support our mission and impact.
              </p>
            </div>
            <div
              id="s1-container3"
              className="mt-7 flex items-center justify-around "
            > 
               
               <a>LEARN MORE</a>
              <button
                type="button"
                id="mobile-donate-button"
                className="montserrat rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-3 py-2 text-center text-sm font-semibold tracking-wider text-white"
              >
                DONATE
              </button>
            </div>
          </div>
          </div>
  </div>

  <div
    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
    data-te-carousel-item>
    <img
      src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
      className="block w-full"
      alt="Camera" />
  </div>

  <div
    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
    data-te-carousel-item>
    <img
      src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
      className="block w-full"
      alt="Exotic Fruits" />
  </div>
  </div>
</div>
    </section>
  );
}
