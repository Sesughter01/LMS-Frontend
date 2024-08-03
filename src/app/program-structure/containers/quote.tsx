import { QuoteIcon } from 'lucide-react'
import React from 'react'

const Quote = () => {
    return (
        <section>
            <article className='flex flex-col items-center py-16 px-64 gap-8 bg-blue-500 text-white text-center'>
                <QuoteIcon className='w-10' />
                <p className=''>Success in business is not just about having the best technology but having the best people who can leverage that technology.
                    At ingrdy, we believe in connecting businesses with top-tire tech talent to help them achieve their goals and stay ahead of the competition</p>
            </article>
        </section>
    )
}

export default Quote