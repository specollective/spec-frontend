import React, { useState } from 'react';
import Image from 'next/image'
import logo from '../public/spec-logo.svg'
import menu from '../public/menuSign.svg'
import close from '../public/menuClose.svg'

export default function Navbar() {
    const [displayMenu, setDisplayMenu] = useState(false)
    function toggleMenu() {
        setDisplayMenu(!displayMenu)
    }
    return (
        <div>
            <div className='flex space-x-2 justify-between items-center border-b border-black px-4 py-3'>
                <div className='flex space-x-2'>
                    <Image
                        src={logo}
                        alt="spec-logo"
                        width={40}
                        height={50}
                    />
                    <p className='text-2xl leading-9 font-semibold tracking-wider'>SPEC</p>
                </div>
                <div onClick={toggleMenu}>
                    <Image className='w-9' src={displayMenu ? close : menu} alt={displayMenu ? 'close menu' : 'menu'} />

                </div>

            </div>
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
                    <a href='#' className='font-medium text-center hover:underline hover:font-semibold tracking-wide'>Documentation</a>
                    <a href='#' className='font-bold border border-spec-turquiose border-4 bg-spec-turquiose tracking-wide text-center py-5 px-10 text-sm p-4 text-white rounded-br-2xl rounded-tl-2xl font-montserrat w-3/4 hover:text-black hover:bg-white hover:border-spec-turquiose'>
                        DONATE</a>
                </div>
            </div>
        </div>
    )
}