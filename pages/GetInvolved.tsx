import React from "react";
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

  const getInvolvedCards = getInvolvedCardData.map((cardData) => {
    return (
      <div key={cardData.title} className="m-4 w-80">
        <h1 className="2x:text-3xl rounded-tl-3xl bg-spec-lightTurquiose py-3 px-6 text-center font-dmserif text-xl lg:text-2xl xl:px-16">
          {cardData.title}
        </h1>
        <div className="montserrat rounded-br-3xl bg-spec-white px-5 py-6">
          <p className="mb-3">{cardData.body}</p>
          <a href={cardData.contactUs} className="underline">
            <p className="text-center text-sm font-semibold">CONTACT US</p>
          </a>
        </div>
      </div>
    );
  });
  return (
    <div id="background" className="bg-spec-sunshine px-40">
      <div>
        <h1
          id="header"
          className="py-10 text-center font-dmserif text-3xl xl:text-4xl 2xl:text-5xl"
        >
          Ready to be a part of something bigger?
        </h1>
        <div
          id="body-box"
          className=" m-auto flex w-10/12 justify-between gap-40 rounded-tl-3xl rounded-br-3xl bg-spec-white px-28"
        >
          <div id="body-left-content" className=" py-20 ">
            <h2
              id="body-box-header"
              className="font-dmserif text-4xl 2xl:w-3/5"
            >
              Join us in making a difference!
            </h2>
            <p
              id="body-subject"
              className="montserrat pt-8 text-base font-medium leading-6"
            >
              Donate to SPEC today to <br></br> support our mission and impact.
            </p>
            <div
              id="container-for-learn-more-and-donate"
              className="mt-5 flex gap-4 "
            >
              <a
                id="learn-more-hyperlink"
                className="py-2 font-montserrat font-semibold tracking-wide underline"
              >
                LEARN MORE
              </a>
              <a
                id="donate-button"
                href="#"
                className="montserrat w-30 rounded-br-3xl rounded-tl-3xl bg-spec-turquiose py-3 px-5 text-center text-base font-semibold tracking-wider text-white"
              >
                DONATE
              </a>
            </div>
          </div>
          <div id="img" className="flex-shrink-0">
            <Image
              className="3xl:scale-75 my-auto h-full scale-125 md:scale-75 xl:scale-100 2xl:scale-90"
              src={donate}
              alt="donate-image"
            />
          </div>
        </div>
        <div id="sub-cards" className="flex">
          {getInvolvedCards}
        </div>
      </div>
    </div>
  );
}

// background styling: color is "sunshine"

// Title - "Ready to be a part of something bigger?"
// styling: text size (sm, md, lg, xl, 2xl), margin top

// Main Card
// - Header: "Join us in making a difference!"
// - Text: "Donate to SPEC today to support our mission and impact"
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

// styling --> white background, border radius for top left and bottom right of card
// center elements, use padding
// heading text size (sm, md, lg, xl, 2xl)
// body text size (sm, md, lg, xl, 2xl)
// learn more hyperlink (should trigger image change)
// donate button (get styling from navbar)
// insert image, on right. sizing (sm, md, lg, xl, 2xl)
// price table, make 2 basic rows that will repeat with alternatiing colors
// color1: "banana" color2: "lemon"

// Sub Cards
// - Make one component
// - Make object to map through containing following information (see information in figma)
// - Title (in "lightTurquiose" background)
// (styling: text size (sm, md, lg, xl, 2xl))
// - Body (contains text in white background)
// styling: text size (sm, md, lg, xl, 2xl)
// - Contact us hyperlink
// styling: text size (sm, md, lg, xl, 2xl)

// STYLING MOBILE FIRST
// carousel, title stays same "read to be a part of something bigger?"
// pt 1, 2, 3, 4, 5
// pt1: body box
// pt2: price table
// pt3: subcard 1
// pt4: subcard 2
// pt5: subcard 3
