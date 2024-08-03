import Link from 'next/link'
import Image from 'next/image'

import img1 from '@/assets/image 9.png'
import img2 from '@/assets/image 10.png'

const Offers = () => {
    return (
        <section className='flex flex-col gap-16 justify-center items-center bg-secondary text-white px-24 py-36'>
            <div className='flex gap-16'>
                <h1 className='text-3xl font-semibold whitespace-nowrap'>What we offer</h1>
                <p className='text-lg'>Ingryd offers outsourced training and tech staffing services to businesses looking to enhance their employment skills and augment their workforce</p>
            </div>
            <div className=''>
                <ul className='grid grid-cols-3 gap-16 px-24'>
                    <li className='bg-white text-black rounded-lg px-10 py-8 flex flex-col justify-between'>
                        <div className='flex flex-col'>
                            <Image src={img1} alt='image' className="my-2" />
                            <h1 className='font-semibold text-xl'>
                                Staffing
                            </h1>
                            <small>
                                Our tech staffing services offers companies access to a larger pool of talent, flexibility,
                                reduced risk cost effectiveness and expertise they need to stay competitive and innovative
                            </small>
                        </div>
                        <Link href={''} className='text-sm text-primary font-semibold mt-12'>
                            Request staffing
                        </Link>
                    </li>
                    <li className='bg-white text-black rounded-lg px-10 py-8 flex flex-col justify-between'>
                        <div className='flex flex-col'>
                            <Image src={img2} alt='image' className="my-2" />
                            <h1 className='font-semibold text-xl'>
                                Outsourced training
                            </h1>
                            <small>
                                Our company specializes in providing high quality outsourced training services for businesses
                                looking to up-skill their employees in the ever-evolving world of technology.
                            </small>
                        </div>
                        <Link href={''} className='text-sm text-primary font-semibold mt-12'>
                            Request training
                        </Link>
                    </li>
                    <li className='bg-white text-black rounded-lg px-10 py-8 flex flex-col justify-between'>
                        <div className='flex flex-col'>
                            <Image src={img2} alt='image' className="my-2" />
                            <h1 className='font-semibold text-xl'>
                                Employee matching
                            </h1>
                            <small>
                                Our employee matching platform is a robust platform designed to support both training and outsourcing.
                                You get assess to thousands of trained talent with a subscription on our platform
                            </small>
                        </div>
                        <Link href={''} className='text-sm text-primary font-semibold mt-12'>
                            Suscribe to our platform
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Offers