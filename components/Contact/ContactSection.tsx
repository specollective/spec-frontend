import React from 'react';
import contactImg from '../../public/ContactUsImg.svg'
import ContactForm from './ContactForm'
import Image from 'next/image'
import { Heading2 } from '../Typography/Heading'

export default function ContactSection() {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center bg-spec-orange py-20 gap-x-28'>
      <div className='font-dmserif font-normal text-2xl md:text-4xl leading-10 flex flex-col justify-center items-center mb-6'>
        <Heading2>Questions? Comments?</Heading2>
        <Heading2>Send us a message.</Heading2>
        <Image
          className="hidden md:block m-auto mt-12"
          src={contactImg}
          alt="contact-image"
          width={300}
          height={300}
        />
        <Image
          className="block md:hidden m-auto mt-8"
          src={contactImg}
          alt="contact-image"
          width={200}
          height={200}
        />
      </div>
      
      <div className="w-4/5 md:w-1/3">
        <ContactForm />
      </div>
    </div>
  )
}
