import React from 'react'

import imgLogo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className=" bg-secondary text-white ">
            <div className="container px-5 py-8 lg:py-0 mx-auto gap-16 lg:gap-48 flex md:items-center lg:justify-between md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 px-4 lg:mx-auto md:text-left">
                    <Image src={imgLogo} alt='logo' className='h-16 lg:h-24 w-auto' />
                    <p className="mt-4 text-gray-200">4A Akiogun street New Market Road, Oniru Lagos State</p>
                    <p className="mt-4 text-gray-200">08165883197</p>
                    <p className="mt-4 text-primary underline">support@ingrydacademy.com</p>

                </div>
                <div className="flex-grow flex justify-between lg:pt-32 flex-wrap md:text-left">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-medium tracking-widest mb-10">Quick Link</h2>
                        <nav className="list-none flex flex-col gap-6 mb-10">
                            <li>
                                <Link href={'/'} className="text-gray-200 hover:text-primary">Home</Link>
                            </li>
                            <li>
                                <Link href={'/about-us'} className="text-gray-200 hover:text-primary">About US</Link>
                            </li>
                            <li>
                                <Link href={'/employers'} className="text-gray-200 hover:text-primary">Employers</Link>
                            </li>
                            <li>
                                <Link href={'/techies'} className="text-gray-200 hover:text-primary">Techies</Link>
                            </li>
                            <li>
                                <Link href={'/partners'} className="text-gray-200 hover:text-primary">Partners</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-medium tracking-widest mb-10">Resources</h2>
                        <nav className="list-none flex flex-col gap-6 mb-10">
                            <li>
                                <Link href={'/program-structure'} className="text-gray-200 hover:text-primary">Progam Sturcture</Link>
                            </li>
                            <li>
                                <a className="text-gray-200 hover:text-primary"> Community</a>
                            </li>
                            <li>
                                <a className="text-gray-200 hover:text-primary">FAQs</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="font-medium tracking-widest mb-10">Legals</h2>
                        <nav className="list-none flex flex-col gap-6 mb-10">
                            <li>
                                <a className="text-gray-200 hover:text-primary">Privacy</a>
                            </li>
                            <li>
                                <a className="text-gray-200 hover:text-primary">Securtiy</a>
                            </li>
                            <li>
                                <a className="text-gray-200 hover:text-primary">Conditions</a>
                            </li>
                        </nav>
                    </div>

                </div>
            </div>
            <div className="py-8">
                <div className="container text-center">
                    <p>Copyright 2023 Ingryd | All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer