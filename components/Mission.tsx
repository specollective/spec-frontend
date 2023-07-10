import React from 'react';
import Image from 'next/image'
import missionImg from '../public/MissionImg.svg'
import bpImg from '../public/BPImage.svg'

export default function Mission() {
    return (
        <div>
            <div className='flex flex-col md:flex md:flex-row m-20 items-center justify-center'>
                <div className='md:w-1/3'>
                    <Image
                        className="m-auto text-left mb-6 hidden md:block"
                        src={missionImg}
                        alt="two people talking"
                        width={300}
                        height={200}
                    />
                    <Image
                        className="m-auto text-left mb-6 block md:hidden"
                        src={missionImg}
                        alt="two people talking"
                        width={300}
                        height={100}
                    />
                </div>
                <div className='md:w-1/2 md:pl-10'>
                    <p className='font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 
                md:text-lg md:leading-7'>OUR MISSION</p>
                    <h1 className='font-dmserif text-2xl font-normal leading-8 mb-6 md:text-4xl md:leading-10'>Empower individuals to become globally-minded <span className='text-spec-turquiose'>change agents</span> by helping them learn the <span className='text-spec-turquiose'>essential skills</span> required to build sustainable careers.
                    </h1>
                    <p className='font-montserrat opacity-70 font-medium text-base leading-normal md:text-lg md:leading-7'>
                        We understand that for many people from underserved communities, they can&apos;t give back or help others until they are able to access essential goods and services,
                        learn professional skills, and achieve physical and financial security.
                    </p>
                </div>





            </div>


            <div className='flex flex-col md:flex md:flex-row m-20 items-center justify-center '>
                <div className='md:w-1/3 md:order-last'>
                    <Image
                        className="m-auto text-left mb-6 hidden md:block md:order-last"
                        src={bpImg}
                        alt="two person talking"
                        width={300}
                        height={200}
                    />
                    <Image
                        className="m-auto text-left mb-6 block md:hidden"
                        src={bpImg}
                        alt="people talking"
                        width={300}
                        height={100}
                    />
                </div>
                <div className='md:w-1/2'>

                    <p className='font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 
                md:text-lg md:leading-7'>OUR BACKGROUND</p>
                    <h1 className='font-dmserif text-2xl font-normal leading-8 mb-6 md:text-4xl md:leading-10'>Uncovering a Cultural Gap:  <span className='text-spec-turquiose'>The Buffalo Project’s 10-Year data analysis reveals alarming lack of diversity awareness</span> among students.</h1>
                    <p className='font-montserrat opacity-70 font-medium text-base leading-normal mb-4 md:text-lg md:leading-7'>
                        This illustrates that students  were not being adequately taught the importance of intercultural competencies and cross-cultural communication.</p>
                    <p className='font-montserrat opacity-70 font-medium text-base leading-normal mb-4 md:text-lg md:leading-7'>
                        The Buffalo Project, led by Dr. Rhianna C. Rogers, worked with community stakeholders and WNY data to engage in a participatory action research study of perceptions of culture in the region.
                    </p>

                    <a href='https://thebuffaloproject.wixsite.com/tbpinternship' target='_blank' rel='noreferrer' className='underline font-montserrat font-medium text-base leading-normal mb-4 md:text-lg md:leading-7'>LEARN MORE ABOUT THE BUFFALO PROJECT</a>

                </div>
            </div>
        </div>
    )
}
