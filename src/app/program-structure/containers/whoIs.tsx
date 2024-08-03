import Image from 'next/image'


import img1 from '@/assets/Rectangle 54.png'

const WhoIs = () => {
    return (
        <section className='py-24 flex flex-col items-center'>
            <div>
                <ul className='flex items-center'>
                    <li className='w-1/2 shrink-0 px-16'>
                        <h1 className='text-4xl font-semibold'>
                            Who we are
                        </h1>
                        <p className="text-xl">
                            Ingryd is a premier tech talent outsourcing and training academy. At Ingryd, we pride ourselves on our ability to connect businesses with top tech talent,
                            providing innovative solutions to help business succeed in today’s digital landscape
                        </p>
                    </li>
                    <li className='flex w-1/2 shrink-0 relative'>
                        <Image src={img1} alt='image' className='aspect-video' />
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default WhoIs