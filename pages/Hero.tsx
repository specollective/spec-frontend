import React from "react";
import Image from "next/image";
import training from "../public/TrainingImgCropped.svg";
import topButton from "../public/Back to Top.svg";

export default function Hero() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    // pb-29 flex pl-[8rem]
    <section className="flex w-full justify-end md:justify-end">
      {/* w-1/3 pr-[8rem] */}
      <div id="top" className="w-3/12 pl-8 md:pt-24">
        {/* change width depending on scaling max-w[35rem]*/}
        {/* mb-11  pt-20 pb-[3rem] font-dmserif text-5xl */}
        <h1 className="mt-3 font-dmserif text-3xl md:text-6xl">
          Paid training to promote equity and progress
        </h1>
        {/* scaling max-w-[25rem] */}
        {/* font-montserrat text-xl font-medium text-spec-turquiose */}
        <p className="mt-4 w-8/12 font-montserrat text-sm text-spec-turquiose sm:text-xl md:mt-11 md:w-4/5 md:text-2xl">
          SPEC provides paid learning opportunities by partnering with clients
          to build websites, hardware, art, and written content.
        </p>
      </div>
      {/* relative */}
      <div className="relative w-8/12 md:w-7/12 md:pl-20">
        {/* mt-0 h-2/3 w-2/3 */}
        <Image
          src={training}
          alt="training-photo"
          className="top-1/2 aspect-auto h-auto w-full md:min-h-[50rem] md:min-w-[40rem]"
        />
        <button onClick={toTop}>
          <Image
            src={topButton}
            alt="back-to-top"
            className="invisible absolute bottom-0 right-0 ml-auto w-full w-16 -translate-y-1/2 md:visible md:mr-28 md:mb-20"
          />
        </button>
      </div>
    </section>
  );
}
