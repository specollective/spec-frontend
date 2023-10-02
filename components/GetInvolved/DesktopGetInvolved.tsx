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
          <Heading2 className="text-center py-8">
            Ready to be a part of something bigger?
          </Heading2>
      
          <div className="bg-spec-white mx-auto rounded-tl-3xl rounded-br-3xl px-24 shadow-xl">
            <div className="grid grid-cols-5 py-14">
              <div className="col-span-2 flex flex-col justify-between">
                <Heading2 className="pb-2">
                  Join us in making a difference!
                </Heading2>

                <Paragraph1 className="py-10">
                  Donate to SPEC today to support <br></br> our mission and impact.
                </Paragraph1>
                
                <div className="grid grid-cols-2">
                  <a
                    className="block col-span-1 font-montserrat text-sm mr-24 text-gray-400 font-semibold tracking-wide underline"
                    href="javascript:void(0)"
                    onClick={openDocumentationPage}
                  >
                    LEARN MORE
                  </a>
                  <button
                    type="button"
                    className="block col-span-1 font-montserrat w-28 h-12 rounded-br-3xl rounded-tl-3xl bg-spec-turquiose text-center text-xs font-semibold tracking-wider text-white"
                    onClick={openDonatePage}
                  >
                    DONATE
                  </button>
                </div>
              </div>

              <div className="col-span-3">
                <DonationTable />
              </div>
            </div>
          </div>

          <div className="flex justify-evenly mt-6">
            {getInvolvedData.map((cardData, index) => {
              return <GetInvolvedCard cardData={cardData} index={index} />
            })}
          </div>
        </div>
      </HomeSection>
    </div>
  );
}

