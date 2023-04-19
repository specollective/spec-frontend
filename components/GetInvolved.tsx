import React, { useState } from "react";
import Image from "next/image";
import donate from "../public/DonateImg.svg";

export default function GetInvolved() {
  const getInvolvedCardData = [
    {
      title: "Work with us",
      body: "Join the SPEC team, where you can contribute to something meaningful and make a real impact",
      contactUs: "#",
    },
    {
      title: "Mentor",
      body: "Join our mentorship program and give back by sharing your expertise and guiding aspiring professionals on their journey",
      contactUs: "#",
    },
    {
      title: "Partner with us",
      body: "Let's collaborate and create value together by forming a strong partnership between our companies",
      contactUs: "#",
    },
  ];

  // use if conditional to adjust padding if there is too much text
  const getInvolvedCards = getInvolvedCardData.map((cardData, index) => {
    let subcardClasses = "overflow-hidden ";

    if (index === 0) {
      subcardClasses += "rounded-tl-3xl rounded-br-3xl";
    } else if (index === 1) {
      subcardClasses += "rounded-br-3xl";
    } else if (index === 2) {
      subcardClasses += "rounded-tr-3xl rounded-bl-3xl";
    }
    return (
      <div key={cardData.title} className="p-3">
        <div className={subcardClasses}>
          <h1 className="bg-spec-lightTurquiose py-2 text-center font-dmserif text-lg font-bold">
            {cardData.title}
          </h1>
          <div className="montserrat flex h-48 w-64 flex-col bg-spec-white px-6 py-4 xl:w-72">
            <div>
              <p className="text-sm">{cardData.body}</p>
            </div>
            <div className="m-auto">
              <a
                href={cardData.contactUs}
                className="bottom-0 text-xs font-semibold underline"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const tableContents = [
    ["$20", "Funds an hour of RA learning"],
    ["$50", "Introduces a RA to a new skill"],
    ["$100", "-"],
    ["$1000", "Publishes an issue of JoER"],
    ["$3000", "Funds a RA development project"],
  ];

  // const donationTable = function showDonationTable() {
  //   const getInvolvedImage = document.getElementById("donate-image");
  //   const div = document.createElement("div");
  //   const sampleText = document.createElement("p");
  //   const text = document.createTextNode("helloworld");
  //   sampleText.appendChild(text);
  //   div.appendChild(sampleText);

  //   return false;
  // };

  const [donationTable, setDonationTable] = useState("Image");

  return (
    <div id="container">
      <div
        id="background"
        className="hidden shrink bg-spec-sunshine px-40 py-10 lg:block"
      >
        <div className="flex flex-col justify-evenly">
          <h1
            id="header"
            className="text-center font-dmserif text-2xl lg:text-4xl xl:text-5xl"
          >
            Ready to be a part of something bigger?
          </h1>
          <div
            id="body-box"
            className="card-container w-12/12 m-auto mt-10 flex max-w-5xl items-center justify-around rounded-tl-3xl rounded-br-3xl bg-spec-white p-16 xl:mt-16 xl:w-full"
          >
            <div id="body-left-content" className="w-5/12 max-w-sm">
              <h2
                id="body-left-header"
                className=" font-dmserif text-4xl xl:text-5xl"
              >
                Join us in making a difference!
              </h2>
              <p
                id="body-left-text"
                className="montserrat mt-8 text-sm font-medium leading-6 lg:text-base"
              >
                Donate to SPEC today to <br></br> support our mission and
                impact.
              </p>

              <div
                id="container-for-anchor-button"
                className="mt-5 flex max-w-[15rem]  items-center justify-between"
              >
                <a
                  id="learn-more-hyperlink"
                  className="montserrat font-semibold tracking-wide underline"
                  href="javascript:void(0)"
                  onClick={() => setDonationTable("table")}
                >
                  <p className="whitespace-nowrap text-sm">LEARN MORE</p>
                </a>
                <button
                  id="donate-button"
                  type="button"
                  className="montserrat max-w-28 mx-2 w-24 rounded-br-3xl rounded-tl-3xl bg-spec-turquiose px-5 py-3 text-center text-xs font-semibold tracking-wider text-white"
                >
                  DONATE
                </button>
              </div>
            </div>
            {/* 3xl:scale-75 h-full md:scale-100 xl:scale-90 */}
            {donationTable === "Image" ? (
              <div id="body-right-content" className="scale-90">
                <Image
                  id="donate-image"
                  className=""
                  src={donate}
                  alt="donate-image"
                />
              </div>
            ) : (
              <div id="donation-table">
                <div className="callout" data-closeable>
                  <button
                    type="button"
                    onClick={() => setDonationTable("Image")}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <table className="montserrat">
                  <thead>
                    <tr>
                      <td className=" bg-spec-banana">
                        The impact of your donation makes
                      </td>
                    </tr>
                  </thead>
                  <tbody className="">
                    {tableContents.map((row, index) => {
                      const isEvenRow = index % 2 === 0;
                      const rowColor = isEvenRow
                        ? "bg-spec-lemon"
                        : "bg-spec-banana";
                      return (
                        <tr key={index} className={rowColor}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* </div> */}
          <div
            id="sub-cards"
            className="m-auto mt-6 flex w-11/12 shrink justify-evenly xl:w-10/12"
          >
            {getInvolvedCards}
          </div>
        </div>
      </div>
      <div
        id="mobile"
        className="bg-spec-sunshine px-4 py-3 sm:block lg:hidden"
      >
        <h1 id="mobile-header" className="text-center font-dmserif">
          Ready to be a part of something bigger?
        </h1>
        <div id="mobile-body">
          <div id="slide1" className="flex flex-col bg-spec-white px-6 py-5">
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
              <a
                className="monteserrat text-xs font-semibold tracking-wide underline"
                href="javascript:void(0)"
                onClick={() => setDonationTable("table")}
              >
                LEARN MORE
              </a>
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
    </div>
  );
}

// - Learn more hyperlink
// - When clicked, image should turn into price table w/close button
// - PRICE TABLE:
// - First Row: "The *impact* your donation makes:"
// - row2: "$20" ----- "Funds an hour of RA learning"
// - row3: "$50" ----- "Introduces a RA to a new skills"
// - row4: "$100" ----- "..."
// - row5: "$1000" ----- "Publishes an issue of JoER"
// - row6: "$3000" ----- "Funds a RA development project"
// - "Donate" button
// - Image

// STYLING MOBILE FIRST
// carousel, title stays same "ready to be a part of something bigger?"
// pt 1, 2, 3, 4, 5
// pt1: body box
// pt2: price table
// pt3: subcard 1
// pt4: subcard 2
// pt5: subcard 3

// creating price table
// clicking learn more works
