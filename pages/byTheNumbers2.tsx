import StatBox from './stat-box';

export default function ByTheNumbers() {
    return (
        <div className="flex flex-col p-8  justify-center items-center gap-y-3.5 md:w-full md:grid md:grid-cols-3 md:grid-rows-2 md:grid-flow-col md:gap-6 lg:gap-14 md:justify-items-center md:items-center md:p-16  bg-spec-lightTurquiose mt-6
        ">
            <div className="block p-2 md:hidden">
                <p className='text-base font-medium opacity-40 text-black  font-montserrat text-left mb-4'>BY THE NUMBERS</p>

                <p className='text-left text-black text-2xl font-normal leading-10 mb-8 font-dmserif font-wide antialiased'>
                    We are striving to <span className='text-teal-700'>create sustainable careers</span> for our contributors.
                </p>
                <p className='text-left text-black text-base font-montserrat font-medium leading-7 tracking-5 antialiased'>
                    SPEC was established based on the core values of sustainability, progress and equality.
                    These values combined, provide a recipe for building radically sustainable, equitable, transparent organizations.
                </p>
            </div>

            <StatBox
                className=" border border-spec-turquiose md:text-base md:border-none row-start-1 col-start-1 row-span-2 font-normal rounded-md bg-spec-white font-dmserif text-spec-turquiose "

                height="h-96"
                width="w-full"
            >
                <p className='text-7xl md:text-5xl lg:text-8xl'>90%</p>
                <p className='text-base text-black m-6 font-montserrat font-normal leading-7 md:text-sm lg:text-lg'>
                    of individuals inside the organization come from diverse backgrounds; that might include visible/invisible
                    disabilities, LGBTQ+, women, people of color.
                </p>
            </StatBox>

            <div className="hidden md:block row-start-1 col-start-2 row-span-2 col-span-2">
                <StatBox
                    className='text-left rounded-md font-dmserif text-spec-turquiose '
                    height="h-full"
                    width="w-3/5"
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
                className="border border-spec-turquiose md:border-none row-start-3 col-start-1 font-normal  rounded-md bg-spec-white font-dmserif text-spec-turquiose"

                height="h-full"
                width="w-full"
            >
                <p className='text-7xl md:text-8xl font-normal'>12</p>
                <p className='text-black m-4 font-montserrat leading-7 text-base md:text-lg'>Research Associates (RAs) went through this program</p>
            </StatBox>

            <StatBox
                className="border border-spec-turquiose md:border-none row-start-3 col-start-2 font-normal rounded-md bg-spec-white font-dmserif text-spec-turquiose"

                height="h-full"
                width="w-full"
            >
                <p className='text-7xl font-normal md:text-8xl'>7</p>
                <p className='text-black m-4 font-montserrat leading-7 text-base md:text-lg'>Research Associates placed at jobs; externally or through SPEC </p>
            </StatBox>

            <StatBox
                className="border border-spec-turquiose md:border-none row-start-3 col-start-3 md:my-4 font-normal  rounded-md bg-spec-white font-dmserif text-spec-turquiose "
                height="h-full"
                width="w-full"
            >
                <p className='text-7xl font-normal md:text-8xl'>3</p>
                <p className='text-black m-4 font-montserrat leading-7 text-base md:text-lg'>Client MVP projects successfully shipped</p>
            </StatBox>
        </div>
    );
}