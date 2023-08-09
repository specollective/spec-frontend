import React from 'react';
import Image from 'next/image'
import missionImg from '../public/MissionImg.svg'

export default function Mission() {
  return (
    <div className='flex flex-col md:flex md:flex-row mx-20 md:mx-44 items-center justify-center'>
      <div className='md:w-1/2 md:pl-10'>
        <p className='font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 
    md:text-lg md:leading-7'>
          OUR MISSION
        </p>
        <h1 className='font-dmserif text-2xl font-normal leading-8 mb-6 md:text-4xl md:leading-10'> We are on a mission to <span className='text-spec-turquiose'>provide diverse peoples the resources and opportunities </span> essential to learn skills, build careers, and become leaders of sustainable social impact.
        </h1>
        <p className='font-montserrat opacity-70 font-medium text-base leading-normal md:text-lg md:leading-7'>
          We  understand that for many people from underserved communities, they can&apos;t give back or help others until they are able to access essential goods and services, learn professional skills, and achieve physical and financial security. 
        </p>
      </div>
      <div className='md:w-1/2'>
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
      
    </div>
  )
}
