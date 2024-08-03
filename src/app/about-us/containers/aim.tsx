
import Image from 'next/image'
import imgCurve from '@/assets/curves2.svg'

const Aim = () => {
    return (
        <section className='bg-[#FEECFF] lg:h-screen text-center lg:text-left relative flex flex-col lg:grid lg:grid-flow-row lg:grid-rows-3'>
            <div className='hidden lg:flex bg-secondary h-1/2 top-0 absolute w-full -z-0'></div>
            {/* <div className='bg-[#FEECFF] h-1/2 bottom-0 absolute w-full -z-0'></div> */}
            <Image src={imgCurve} alt="curve image" className="hidden lg:flex object-contain object-center absolute inset-0 -z-0" fill />
            <article className='bg-secondary lg:bg-transparent text-white px-6 lg:px-36 py-24 z-10'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-36 grow lg:items-center'>
                    <h1 className='text-3xl lg:text-5xl font-semibold'>Our Mission</h1>
                    <p className='text-lg lg:text-2xl'>To produce highly trained tech talent with the right expertise,<br />
                        culture and work readiness to support the increasing demand from business globally</p>
                </div>
            </article>
            <article className='bg-white lg:bg-transparent px-6 lg:px-36 py-24 grow z-10'>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-36 text-foreground lg:items-center'>
                    <h1 className='text-3xl lg:text-5xl font-semibold'>Our Vision</h1>
                    <p className='text-lg lg:text-2xl'>To become the go to partner globally for <br /> business seeking top tech talent to drive innovative solutions.</p>
                </div>
            </article>
            <article className='bg-[#FEECFF] lg:px-36 py-16 px-6 flex flex-col '>
                <div className='flex flex-col gap-8 lg:gap-12 justify-center items-center my-auto'>
                    <h1 className='text-3xl lg:text-5xl font-semibold'>Core Values</h1>
                    <ul className='grid lg:grid-cols-3 gap-16 text-base lg:text-lg'>
                        <li><b className='text-lg lg:text-2xl'>Passion</b> fuels excellence and drive impact. It’s a core value that inspires us to achieve greatness and make a meaningful difference</li>
                        <li><b className='text-lg lg:text-2xl'>Vision</b> enables us to see beyond the present and create a better future. It empowers us to set ambitious goals and make lasting change</li>
                        <li><b className='text-lg lg:text-2xl'>Integrity</b> is a core value that guides us to do what’s right, even when it’s hard. It builds trust, respect, and credibility, and also help us to make positive impact</li>
                    </ul>
                </div>
            </article>
        </section>
    )
}

export default Aim