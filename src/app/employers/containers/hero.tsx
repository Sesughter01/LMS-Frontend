import Image from 'next/image'
import heroImage1 from '@/assets/hero1.png';
import imgConfetti from '@/assets/confetti-1.png';
import NavBar from '@/components/NavBar';

const Hero = () => {
    return (
        <section className='flex flex-col shrink-0 grow h-full min-h-screen'>
            <NavBar />
            <div className='flex flex-col shrink-0 grow h-full relative'>

                <Image src={heroImage1} alt="hero image" className="object-cover absolute inset-0 -z-10" fill />
                <div className='w-full h-full shrink-0 grow text-white justify-center flex flex-col gap-4 px-6 lg:px-24'>
                    <h1 className='text-4xl lg:text-5xl font-semibold text-primary'>
                        Employers
                    </h1>
                    <p className="text-2xl lg:text-4xl">
                        Your search for the <br />
                        right tech talent ends here
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Hero