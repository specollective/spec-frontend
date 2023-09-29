import React, { useEffect } from 'react';
import DonationTable from '../DonationTable';
import { getInvolvedData } from '../../constants/get-involved-data';
import { openDocumentationPage, openDonatePage } from '../../utils/window';

export default function DesktopGetInvolved() {
  const getInvolvedCards = getInvolvedData.map((cardData, index) => {
    let subcardClasses = "overflow-hidden ";

    if (index === 0) {
      subcardClasses += "rounded-tl-3xl rounded-br-3xl";
    } else if (index === 1) {
      subcardClasses += "rounded-br-3xl";
    } else if (index === 2) {
      subcardClasses += "rounded-tr-3xl rounded-bl-3xl";
    }

    return (
      <div key={index} className="p-3">
        <div className={subcardClasses}>
          <h1 className="bg-spec-lightTurquiose py-2 text-center font-dmserif text-lg font-bold">
            {cardData.title}
          </h1>
          <div className="font-montserrat flex flex-col h-48 w-64 bg-spec-white px-6 pb-6 pt-4 xl:w-72 relative justify-between">
            <p className="font-montserrat">
              {cardData.body}
            </p>
            <div className="flex justify-end mt-4 mx-auto">
              <a
                href={cardData.contactUs}
                className="text-xs font-semibold underline"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section id="container">
      <div
        id="background"
        className="hidden shrink bg-spec-sunshine px-40 py-10 lg:block"
      >
        <div className="flex flex-col justify-evenly">
          <h1
            id="header"
            className="text-center font-dmserif text-3xl lg:text-4xl xl:text-5xl">
            Ready to be a part of something bigger?
          </h1>
          <div
            id="body-box"
            className="card-container max-w-4xl xl:justify-center 2xl:w-9/12 w-12/12 xl:w-11/12 m-auto mt-10 w-full flex items-center justify-around rounded-tl-3xl rounded-br-3xl bg-spec-white py-16 xl:mt-16 xl:w-full">
            <div id="body-left-content" className="w-5/12 max-w-sm">
              <h2
                id="body-left-header"
                className="font-dmserif font-light tracking-wide text-4xl xl:text-4xl pr-12">
                Join us in making a difference!
              </h2>
              <p
                id="body-left-text"
                className="font-montserrat mt-8 text-sm font-medium leading-6 lg:text-base">
                Donate to SPEC today to support <br></br> our mission and
                impact.
              </p>
              <div
                id="container-for-anchor-button"
                className="mt-5 flex max-w-fit items-center justify-between">
                <p>
                  <a
                    id="learn-more-hyperlink"
                    className="font-montserrat text-sm mr-24 text-gray-400 font-semibold tracking-wide underline"
                    href="javascript:void(0)"
                    onClick={openDocumentationPage}>
                    LEARN MORE
                    </a>
                </p>
                <button
                  id="donate-button"
                  type="button"
                  className="font-montserrat w-28 h-12 rounded-br-3xl rounded-tl-3xl bg-spec-turquiose text-center text-xs font-semibold tracking-wider text-white"
                  onClick={openDonatePage}>
                  DONATE
                </button>
              </div>
            </div>
            <div id="donation-table">
              <div className="flex justify-end">
                <DonationTable />
              </div>
            </div>
          </div>

          <div
            id="sub-cards"
            className="m-auto max-w-4xl mt-6 flex 2xl:w-9/12 w-11/12 shrink justify-evenly xl:w-10/12">
            {getInvolvedCards}
          </div>
        </div>
      </div>
    </section>
  );
}

