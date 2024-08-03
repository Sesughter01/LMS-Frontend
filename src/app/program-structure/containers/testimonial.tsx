import { QuoteIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Quote = () => {
    return (
        <section>
            <article className='flex flex-col items-center py-24 px-64 gap-8'>
                <h1 className='text-4xl font-semibold'>What student say</h1>
                <QuoteIcon className='w-10' />
                <ul>
                    <li className='flex flex-col items-center gap-4 text-center'>
                        <p className=''>Success in business is not just about having the best technology but having the best people who can leverage that technology.
                            At ingrdy, we believe in connecting businesses with top-tire tech talent to help them achieve their goals and stay ahead of the competition</p>
                        <div className='flex gap-2 items-center'>
                            <Image src={''} alt='test image' className='h-8 aspect-square rounded-full bg-gray-200' />
                            <small>Juan Dennis</small>
                        </div>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default Quote