import Image from 'next/image';
import { getInvolvedData } from '../../constants/get-involved-data';
import { openDonatePage, openDocumentationPage } from '../../utils/window';
import Slider from '../Slider';

export default function MobileCarousel() {
  const slideHeightClass = "h-[500px] md:h-[600px]";

  const getInvolvedSlides = getInvolvedData.map((slideData, index) => {
    return (
      <div
        key={index}
        className={`w-full flex-shrink-0 ${slideHeightClass}`}
      >
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
    );
  });

  const mainSlide = (
    <div className={`w-full flex-shrink-0 ${slideHeightClass} px-4`}>
      <h1
        id="mobile-header"
        className="mx-auto text-3xl font-dmserif my-3 md:text-3xl text-center"
      >
        Ready to be a part of something bigger?
      </h1>
      <div>
        <div
          className=""
        >
          <div
            id="slide1"
            className="m-auto flex md:w-6/12 min-w-fit flex-col mt-3 bg-spec-white px-4 py-6 md:px-5 rounded-tl-3xl rounded-br-3xl"
          >
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
                  Donate to SPEC today to support our mission and impact.
                </p>
              </div>
              <div
                id="s1-container3"
                className=" mt-7 flex items-center justify-evenly md:px-5">
                <a
                  id="mobile-learn-more-hyperlink"
                  className="font-montserrat font-medium tracking-wide underline"
                  onClick={openDocumentationPage}
                >
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
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-spec-sunshine visible md:hidden">
      <Slider slides={[mainSlide, ...getInvolvedSlides] as any} />
    </div>
  )
}