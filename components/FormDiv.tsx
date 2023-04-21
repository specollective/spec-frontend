import React from 'react';
import contactImg from '../public/ContactUsImg.svg'
import ContactForm from './ContactForm'
import Image from 'next/image'

export default function FormDiv() {
    return (
        <div className='flex w-screen justify-center items-center'>
            <div>
                <p>Questions? Comments?</p>
                <p>Send us a message.</p>
                <Image
                    className="m-auto "
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
