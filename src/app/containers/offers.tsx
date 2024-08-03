import Link from 'next/link'
import Image from 'next/image'

import bgImage from '@/assets/curves.svg'

import img1 from '@/assets/image 9.png'
import img2 from '@/assets/image 10.png'

const Offers = () => {
    return (
        <section className="relative flex flex-col lg:flex-row gap-16 justify-center text-white px-6 lg:px-24 pt-64 py-36">
            <Image src={bgImage} alt="curve image" className="object-cover object-top absolute inset-0 -z-10" fill />
            <div className='flex flex-col gap-8 grow '>
                <h1 className='text-3xl lg:text-4xl font-semibold'>Your search for the right <br /> tech talent ends here</h1>
                <p className='text-lg lg:text-xl'>Do you need Talents to work <br /> with you? We outsource qualified Techies here.</p>
            </div>
            <div className='w-full lg:w-1/2 '>
                <ul className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <li className='bg-white text-black rounded-lg px-10 py-16 flex flex-col gap-4 justify-between'>
                        <Image src={img1} alt='image' className="my-8" />
                        <div>
                            <h1 className='font-semibold text-2xl'>
                                Training on request
                            </h1>
                            <small>
                                Request custom training for your organization
                            </small>
                        </div>
                        <Link href={'/techies'} className='text-sm text-primary font-semibold mt-12'>
                            Learn more
                        </Link>
                    </li>
                    <li className='bg-white text-black rounded-lg px-10 py-16 flex flex-col gap-4 justify-between'>
                        <Image src={img2} alt='image' className="my-8" />
                        <div>
                            <h1 className='font-semibold text-2xl'>
                                Outsourcing
                            </h1>
                            <small>
                                Tap into our extensive database of ready-to-go trained tech expert
                            </small>
                        </div>
                        <Link href={'/techies'} className='text-sm text-primary font-semibold mt-12'>
                            Learn more
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Offers