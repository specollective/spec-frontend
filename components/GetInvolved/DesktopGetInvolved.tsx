import React from 'react'
import DonationTable from '../DonationTable'
import { getInvolvedData } from '../../constants/get-involved-data'
import { openDonatePage } from '../../utils/window'
import { Heading2, Heading3, Heading1 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import GetInvolvedCard from './GetInvolvedCard'
import HomeSection from '../HomeSection'

export default function DesktopGetInvolved() {
  return (
    <div className="hidden lg:block bg-spec-yellow pb-10">
      <div id="get-involved-section" className="relative -top-64"></div>
      <HomeSection>
        <div className="w-full mx-auto">
          <Heading2 className="text-center py-12">
            Ready to be a part of something bigger?
          </Heading2>

          <div className="bg-spec-white mx-auto rounded-tl-3xl rounded-br-3xl pt-16 pb-16 px-12 lg:pt-20 lg:pb-20 lg:px-16 shadow-xl">
            <div className="grid grid-cols-2 gap-12">
              <div className="col-span-1">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex">
                    <Heading1 className="">
                      Join us in making a difference!
                    </Heading1>
                  </div>

                  <div className="flex">
                    <Paragraph1 className="">
                      Donate to SPEC today to support <br></br> our mission and impact.
                    </Paragraph1>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="inline-block font-montserrat w-48 px-6 py-3 text-base rounded-br-3xl rounded-tl-3xl bg-spec-turquoise border-4 border-spec-turquoise text-center font-semibold tracking-wider text-white hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2"
                      onClick={openDonatePage}
                    >
                      DONATE
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-1 ">
                <div className="w-full">
                  <DonationTable />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16 pb-4 max-w-full">
            {getInvolvedData.map((cardData, index) => {
              return <GetInvolvedCard key={index} cardData={cardData} index={index} />
            })}
          </div>
        </div>
      </HomeSection>
    </div>
  );
}