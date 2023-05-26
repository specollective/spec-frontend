import React from 'react';
import contactImg from '../public/ContactUsImg.svg'
import ContactForm from './ContactForm'
import Image from 'next/image'

export default function FormDiv() {
    return (
        <div className='flex flex-col md:flex-row w-screen justify-center items-center bg-spec-orange p-20 gap-x-28'>
            <div className='font-dmserif font-normal text-2xl md:text-4xl leading-10 flex flex-col justify-center items-center'>
                <p>Questions? Comments?</p>
                <p>Send us a message.</p>
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
    )
}
