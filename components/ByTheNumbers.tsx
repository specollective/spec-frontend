import StatBox from '../pages/stat-box'
import { Heading4, Heading0, Heading2 } from './Typography/Heading'
import { Paragraph1  } from './Typography/Paragraph'
import HomeSection from './HomeSection'

export default function ByTheNumbers() {
  return (
    <div className="bg-spec-lightTurquiose px-6 md:px-16 py-16">
      <HomeSection>
        <div className="w-full grid grid-rows-2 gap-6 lg:mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="col-span-2 lg:col-span-1 order-last lg:order-first">
              <StatBox
                className="border border-spec-turquiose md:border-none row-start-3 col-start-1 font-normal rounded-md bg-spec-white"
                height="h-full"
                width="w-full"
              >
                <Heading0 className="font-dmserif text-spec-turquiose">
                  $290k
                </Heading0>
                <Paragraph1>
                  Funds transparently raise and distributed
                </Paragraph1>
              </StatBox>
            </div>
            <div className="md:col-span-2">
              <Heading4>
                BY THE NUMBERS
              </Heading4>
              <Heading2>
                We are striving to <span className='text-spec-white'>create sustainable careers</span> for our contributors.
              </Heading2>
              <Paragraph1>
                SPEC was established based on the core values of sustainability, progress and equality, and we believe these combined values are the recipe for building radically sustainable, equitable, and transparent organizations.
              </Paragraph1>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <StatBox
                className="border border-spec-turquiose md:border-none row-start-3 col-start-1 font-normal rounded-md bg-spec-white"
                height="h-full"
                width="w-full"
              >
                <Heading0 className="font-dmserif text-spec-turquiose">
                  28
                </Heading0>
                <Paragraph1 className="text-center">
                  Successful career placements
                </Paragraph1>
              </StatBox>
            </div>
            <div className="col-span-1">
              <StatBox
                className="border border-spec-turquiose md:border-none row-start-3 col-start-2 font-normal rounded-md bg-spec-white"
                height="h-full"
                width="w-full"
              >
                <Heading0 className="font-dmserif text-spec-turquiose">
                  15
                </Heading0>
                <Paragraph1 className="text-center">
                  Projects developed and completed
                </Paragraph1>
              </StatBox>
            </div>
            <div className="col-span-1">
              <StatBox
                className="border border-spec-turquiose md:border-none row-start-3 col-start-2 font-normal rounded-md bg-spec-white"
                height="h-full"
                width="w-full"
              >
                <Heading0 className="font-dmserif text-spec-turquiose">
                  7
                </Heading0>
                <Paragraph1 className="text-center">
                  Parnterships and collaborations
                </Paragraph1>
              </StatBox>
            </div>
          </div>
        </div>
      </HomeSection>
    </div>
  );
}
