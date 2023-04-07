import React from "react";
import Image from "next/image";
import training from "../public/TrainingImgCropped.svg";
import topButton from "../public/Back to Top.svg";

export default function Hero() {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="pb-29 flex pl-32">
      <div id="top" className="pr-[70px]">
        <h1 className="mb-11 w-[35rem] pt-20 font-dmserif text-8xl">
          Paid training to promote equity and progress
        </h1>
        <p className="w-96 font-montserrat text-3xl font-medium leading-10 text-spec-turquiose">
          SPEC provides paid learning opportunities by partnering with clients
          to build websites, hardware, art, and written content.
        </p>
      </div>
      <div className="relative min-w-[743px]">
        <Image src={training} alt="training-photo" />
        <button onClick={toTop}>
          <Image
            src={topButton}
            alt="back-to-top"
            className="absolute left-[630px] bottom-[185px] w-16"
          />
        </button>
      </div>
    </section>
  );
}
