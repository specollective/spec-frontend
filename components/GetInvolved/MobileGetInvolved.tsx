import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel, initTE } from 'tw-elements';
import { getInvolvedData } from '../../constants/get-involved-data';
import { openDonatePage } from '../../utils/window';

export default function MobileCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState('slide1');
  
  useEffect(() => {
    initTE({ Carousel });
  }, []);

  const getInvolvedSlides = getInvolvedData.map((slideData, index) => {
    return (
      <div
        key={index}
        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none "
        data-te-carousel-item
      >
        <div className="w-full h-full">
          <div
            key={slideData.title}
            className="m-auto flex md:w-10/12 flex-col mt-3 px-4 md:px-5">
            <h1
              key={slideData.title}
              className="rounded-tl-3xl bg-spec-lightTurquiose py-8 text-center font-dmserif text-2xl font-bold md:text-3xl">
              {slideData.title}
            </h1>
            <div className="flex flex-col md:py-4 bg-spec-white rounded-br-3xl justify-between" style={{"height": "258px"}}>
              <p className="md:text-2xl text-lg px-12 mt-8 font-montserrat md:px-40">
                  {slideData.body}
              </p>
              <div className="flex justify-center mt-2 mb-2">
                <a href={slideData.contactUs} className="underline font-montserrat">
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section id="mobile" className="sm:visible lg:hidden">
      <div
        id="carouselExampleIndicators"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
        data-te-interval="false"
      >
        <div
          className="absolute px-4 pb-6 inset-x-0 -bottom-4 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators
        >
          <button
            type="button"
            data-te-target="#carouselExampleIndicators"
            data-te-slide-to="0"
            data-te-carousel-active
            className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
              activeSlide === 0 ? "spec-turquiose" : "spec-white"
            } bg-clip-padding p-0 -indent-[999px] duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
            aria-current="true"
            aria-label="Slide 1"
            onClick={() => setActiveSlide(0)}
          >
          </button>
          <button
            type="button"
            data-te-target="#carouselExampleIndicators"
            data-te-slide-to="1"
            className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
              activeSlide === 1 ? "spec-turquiose" : "spec-white"
            } bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
            aria-label="Slide 2"
            onClick={() => setActiveSlide(1)}
          >
          </button>
          <button
            type="button"
            data-te-target="#carouselExampleIndicators"
            data-te-slide-to="2"
            className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
              activeSlide === 2 ? "spec-turquiose" : "spec-white"
            } bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
            aria-label="Slide 3"
            onClick={() => setActiveSlide(2)}
          >
          </button>
          <button
            type="button"
            data-te-target="#carouselExampleIndicators"
            data-te-slide-to="3"
            className={`mx-[3px] box-content h-2.5 w-2.5 flex-initial cursor-pointer border border-solid border-black bg-${
              activeSlide === 3 ? "spec-turquiose" : "spec-white"
            } bg-clip-padding p-0 -indent-[999px]transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none rounded-full`}
            aria-label="Slide 4"
            onClick={() => setActiveSlide(3)}
          >
          </button>
        </div>

        <div className="bg-spec-sunshine px-5 pt-5 pb-14 relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <h1
            id="mobile-header"
            className="m-auto text-2xl font-dmserif  my-3 w-2/3 md:w-2/3 md:text-3xl text-center">
            Ready to be a part of something bigger?
          </h1>
          <div>
            <div
              className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-te-carousel-item
              data-te-carousel-active
            >
              <div
                id="slide1"
                className="m-auto flex md:w-6/12 min-w-fit flex-col mt-3 bg-spec-white px-4 py-6 md:px-5 rounded-tl-3xl rounded-br-3xl">
                {currentSlide === "slide1" ? (
                  <div>
                    <div
                      id="s1-container1"
                      className="flex justify-evenly md:pb-8 md:justify-center"
                    >
                      <h2 className="font-dmserif text-3xl pl-6">
                        Join us in making a difference!
                      </h2>
                      <Image
                        id="mobile-donate-image"
                        alt="mobile-donate-image"
                        src="/DonateImg.svg"
                        className="w-5/12 md:w-6/12"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div
                      id="s1-container2"
                      className="pl-6 mt-8 md:mt-2 w-10/12 md:w-7/12 md:pl-12">
                      <p className="mr-auto w-60 font-montserrat text-lg font-medium md:w-80">
                        Donate to SPEC today to support our mission and
                        impact.
                      </p>
                    </div>
                    <div
                      id="s1-container3"
                      className=" mt-7 flex items-center justify-evenly md:px-5">
                      <a
                        id="mobile-learn-more-hyperlink"
                        className="font-montserrat font-medium tracking-wide underline"
                        href="javascript:void(0)"
                        onClick={() => setCurrentSlide("table")}>
                        <p className="whitespace-nowrap text-lg px-3">
                          LEARN MORE
                        </p>
                      </a>
                      <button
                        type="button"
                        id="mobile-donate-button"
                        role="link"
                        className="font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-lg font-semibold tracking-wider text-white"
                        onClick={openDonatePage}>
                        DONATE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div id="mobile-donation-table">
                    <div className="flex justify-end" data-closeable>
                      <button
                        type="button"
                        onClick={() => setCurrentSlide("slide1")}>
                        <span aria-hidden="true" className="">
                          &times;
                        </span>
                      </button>
                    </div>
                  <DonationTable />
                  </div>
                )}
              </div>
            </div>
            {getInvolvedSlides}
          </div>
        </div>
      </div>
    </section>
  )
}