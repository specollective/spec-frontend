import React from 'react';
import contactImg from '../../public/ContactUsImg.svg'
import ContactForm from './ContactForm'
import Image from 'next/image'
import { Heading2 } from '../Typography/Heading'
import HomeSection from '../HomeSection'

export default function ContactSection() {
  return (
    <div className="w-full bg-spec-orange">
      <HomeSection>
        <div className='flex flex-col md:flex-row justify-center items-center py-20 gap-x-28'>
          <div className='flex flex-col justify-center items-center mb-6'>
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
          <ContactForm />
        </div>
      </HomeSection>
    </div>
  )
}
