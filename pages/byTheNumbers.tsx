import StatBox from './stat-box';
// todo:
// 1. install inter font(tried and failed)
// 2. card in each grid should be narrower
// 3. alignment on three bottom cards
export default function ByTheNumbers() {
    return (
        <div className="w-full grid grid-cols-3 grid-rows-2 grid-flow-col gap-16 justify-items-center items-center p-16  bg-spec-lightTurquiose mt-6">

            <StatBox
                className="row-start-1 col-start-1 row-span-2 my-2 md:my-0  font-normal rounded-md bg-spec-white font-dmserif text-spec-turquiose"

                height="h-96"
                width="w-full"
            >
                <p className='text-8xl font-normal mb-5'>90%</p>
                <p className='text-black m-6 font-montserrat font-normal leading-7'>
                    of individuals inside the organization come from diverse backgrounds; that might include visible/invisible
                    disabilities, LGBTQ+, women, people of color.
                </p>
            </StatBox>

            <div className="row-start-1 col-start-2 row-span-2 col-span-2 ">
                <StatBox
                    className='text-left rounded-md font-dmserif text-spec-turquiose'
                    height="h-full"
                    width="w-2/3"
                >
                    <h2 className="text-lg font-medium opacity-40 text-black text-left font-montserrat mb-8">
                        <p>BY THE NUMBERS</p>
                    </h2>
                    <p className='text-left text-black text-4xl font-normal leading-10 mb-8 font-dmserif font-wide antialiased'>
                        We are striving to <span className='text-teal-700'>create sustainable careers</span> for our contributors.
                    </p>
                    <p className='text-left text-black text-lg font-montserrat font-medium leading-7 tracking-5 antialiased'>
                        SPEC was established based on the core values of sustainability, progress and equality.
                        These values combined, provide a recipe for building radically sustainable, equitable, transparent organizations.
                    </p>

                </StatBox>
            </div>
            <StatBox
                className="row-start-3 col-start-1 font-normal md:my-0  rounded-md bg-spec-white font-dmserif text-spec-turquiose"

                height="h-full"
                width="w-full"
            >
                <p className='text-8xl font-normal'>12</p>
                <p className='text-black m-4 font-montserrat leading-7'>Research Associates (RAs) went through this program</p>
            </StatBox>

            <StatBox
                className="row-start-3 col-start-2 font-normal md:my-0  rounded-md bg-spec-white font-dmserif text-spec-turquiose"

                height="h-full"
                width="w-full"
            >
                <p className='text-8xl font-normal'>7</p>
                <p className='text-black m-4 font-montserrat leading-7'>Research Associates placed at jobs; externally or through SPEC </p>
            </StatBox>

            <StatBox
                className="row-start-3 col-start-3 my-4 font-normal md:my-0 rounded-md bg-spec-white font-dmserif text-spec-turquiose"
                height="h-full"
                width="w-full"
            >
                <p className='text-8xl font-normal'>3</p>
                <p className='text-black m-4 font-montserrat leading-7'>Client MVP projects successfully shipped</p>
            </StatBox>
        </div>
    );
}