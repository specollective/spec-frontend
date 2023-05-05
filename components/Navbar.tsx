import React from 'react'
import Image from 'next/image'
import logo from '../public/spec-logo.svg'

export default function Navbar() {
    return (
        <div className='flex justify-between items-center border-b mx-20 mt-10'>

            <div className='flex space-x-2 mb-6'>
                <Image
                    className="m-auto lg:m-0 lg:inline text-left"
                    src={logo}
                    alt="spec-logo"
                    width={60}
                    height={80}
                />
                <p className='text-2xl leading-9 font-medium pt-2 tracking-wider'>Sustainable Progress & Equality Collective</p>
            </div>

            <div className='flex justify-center items-center space-x-8 font-montserrat leading-5 text-lg mb-6'>
                <a href='https://docs.specollective.org/introduction/' target='_blank' rel="noreferrer" className='font-medium text-center hover:underline hover:font-semibold tracking-wide'>Documentation</a>
                <a href='https://opencollective.com/spec' target='_blank' rel="noreferrer" className='font-bold border border-spec-turquiose border-4 bg-spec-turquiose tracking-wide text-center py-5 px-10 text-sm p-4 text-white rounded-br-2xl rounded-tl-2xl font-montserrat w-3/4 hover:text-black hover:bg-white hover:border-spec-turquiose'>
                    DONATE</a>
            </div>
        </div>
    )
}