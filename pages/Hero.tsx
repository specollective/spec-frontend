import React from "react";
import Image from "next/image";
import training from "../public/TrainingImgCropped.svg";
import topButton from "../public/Back to Top.svg";

export default function Hero() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    // justify-end md:justify-end
    // flex justify-between
    <section className="flex ">
      <div
        id="top"
        className="md:pl-18 w-2/5 pl-8 md:mt-10 md:ml-12 lg:mt-[6rem] xl:pl-[16rem] 2xl:w-6/12"
      >
        <h1 className="xl:text-5x mt-3 font-dmserif text-base md:text-3xl lg:text-5xl 2xl:text-7xl">
          Paid training to promote equity and progress
        </h1>
        <p className="mt-2 w-8/12 font-montserrat text-xs text-spec-turquiose sm:text-xl md:mt-5 md:w-4/5 md:text-lg lg:mt-8 lg:text-2xl xl:text-3xl 2xl:text-4xl">
          SPEC provides paid learning opportunities by partnering with clients
          to build websites, hardware, art, and written content.
        </p>
      </div>
      {/* relative top-1/2 flex h-full w-3/5 md:pl-20 lg:p-0 */}
      <div className="relative top-1/2 h-full w-3/5 md:pl-8 2xl:w-6/12 2xl:p-0">
        {/* top-1/2 aspect-auto h-auto w-full md:min-h-[50rem] md:min-w-[40rem] */}
        <Image src={training} alt="training-photo" className="float-right" />
        {/* invisible absolute bottom-0 right-0 ml-auto w-full w-16 -translate-y-1/2 md:visible md:mr-28 md:mb-20 */}
        <button onClick={toTop} className="invisible lg:visible">
          <Image
            src={topButton}
            alt="back-to-top"
            className="absolute right-10 bottom-32 ml-auto w-full w-16 -translate-y-1/2 "
          />
        </button>
      </div>
    </section>
  );
}
