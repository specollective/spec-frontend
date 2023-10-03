import React from 'react'
import DonationTable from '../DonationTable'
import { getInvolvedData } from '../../constants/get-involved-data'
import { openDocumentationPage, openDonatePage } from '../../utils/window'
import { Heading2, Heading3 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import GetInvolvedCard from './GetInvolvedCard'
import HomeSection from '../HomeSection'

export default function DesktopGetInvolved() {
  return (
    <div className="hidden lg:block bg-spec-sunshine pb-10">
      <div id="get-involved-section" className="relative -top-64"></div>
      <HomeSection>
        <div className="w-full mx-auto">
          <Heading2 className="text-center py-12">
            Ready to be a part of something bigger?
          </Heading2>

          <div className="bg-spec-white mx-auto rounded-tl-3xl rounded-br-3xl pt-24 pb-24 px-16 shadow-xl">
            <div className="grid grid-cols-2 gap-20">
              <div className="col-span-1">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex">
                    <Heading2 className="">
                      Join us in making a difference!
                    </Heading2>
                  </div>

                  <div className="flex">
                    <Paragraph1 className="">
                      Donate to SPEC today to support <br></br> our mission and impact.
                    </Paragraph1>
                  </div>

                  <div className="flex">
                    <div className="grid grid-cols-2 w-full">
                      <button
                        className="block col-span-1 font-montserrat w-full h-12 text-left text-base text-gray-400 font-semibold tracking-wide underline"
                        onClick={openDocumentationPage}
                      >
                        LEARN MORE
                      </button>
                      <button
                        type="button"
                        className="block col-span-1 font-montserrat w-full text-base rounded-br-3xl rounded-tl-3xl bg-spec-turquiose text-center font-semibold tracking-wider text-white"
                        onClick={openDonatePage}
                      >
                        DONATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="mx-auto">
                  <DonationTable />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6 pb-4">
            {getInvolvedData.map((cardData, index) => {
              return <GetInvolvedCard cardData={cardData} index={index} />
            })}
          </div>
        </div>
      </HomeSection>
    </div>
  );
}

