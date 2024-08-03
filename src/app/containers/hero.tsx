import Image from 'next/image'
import heroImage1 from '@/assets/hero1.png';
import imgConfetti from '@/assets/confetti-1.png';
import NavBar from '@/components/NavBar';

const Hero = () => {
    return (
        <section className='flex flex-col shrink-0 grow h-full min-h-screen'>
            <NavBar />
            <div className='flex flex-col shrink-0 grow h-full relative px-6'>

                <Image src={heroImage1} alt="hero image" className="object-cover absolute inset-0 -z-10" fill />
                <div className='w-full h-full shrink-0 grow text-white items-center justify-center flex flex-col gap-4 text-center'>
                    <h1 className='text-3xl lg:text-6xl font-bold'>
                        Building the next generation of <br /> Africa most competitive <span className='text-blue-500'>Talent</span>
                    </h1>
                    <p className="text-lg lg:text-xl">We help forward-thinking companies build top-level teams <br /> by recruiting and training skilled tech talents</p>
                </div>

            </div>
        </section>
    )
}

export default Hero