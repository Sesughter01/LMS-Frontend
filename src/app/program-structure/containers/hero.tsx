import Image from 'next/image'

import heroImage1 from '@/assets/prgmstruct.png';
import NavBar from '@/components/NavBar';

const Hero = () => {
    return (
        <section className='flex flex-col shrink-0 grow h-auto'>
            <NavBar />
            <div className='flex flex-col shrink-0 grow relative py-24'>

                <Image src={heroImage1} alt="hero image" className="object-cover absolute inset-0 -z-10" fill />
                <div className=' w-full lg:w-1/2 h-full shrink-0 grow text-white justify-center flex flex-col gap-4 px-6 lg:px-16 pt-36'>
                    <h1 className='text-4xl lg:text-5xl font-semibold'>
                        Program Structure
                    </h1>
                    <p className="text-lg">
                        This is how your curriculum will span with INGRYD
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Hero