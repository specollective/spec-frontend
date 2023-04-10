import React from "react";
import Image from "next/image";
import training from "../public/TrainingImgCropped.svg";
import topButton from "../public/Back to Top.svg";

export default function Hero() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    // max-w-[90rem]
    <section className="pb-29 mx-auto flex max-w-[90rem] pl-[8rem]">
      <div id="top" className=" pr-[8rem]">
        {/* change width depending on scaling max-w[35rem]*/}
        <h1 className="mb-11 w-[35rem] pt-20 pb-[3rem] font-dmserif text-8xl">
          Paid training to promote equity and progress
        </h1>
        {/* scaling max-w-[25rem] */}
        <p className=" max-w-[25rem] font-montserrat text-3xl font-medium leading-10 text-spec-turquiose">
          SPEC provides paid learning opportunities by partnering with clients
          to build websites, hardware, art, and written content.
        </p>
      </div>
      {/* scaling min-h-[55rem] max-w-[45rem] */}
      <div className="relative">
        <Image
          src={training}
          alt="training-photo"
          className="mt-0 min-h-[55rem] max-w-[45rem]"
        />
        <button onClick={toTop}>
          <Image
            src={topButton}
            alt="back-to-top"
            className="absolute left-[630px] bottom-[185px] ml-auto w-16"
          />
        </button>
      </div>
    </section>
  );
}
