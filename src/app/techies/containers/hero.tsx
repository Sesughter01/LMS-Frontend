import Image from 'next/image'
import heroImage1 from '@/assets/Rectangle 65.png';
import NavBar from '@/components/NavBar';

const Hero = () => {
    return (
        <section className='flex flex-col shrink-0 grow h-full min-h-screen'>
            <NavBar />
            <div className='flex flex-col shrink-0 grow h-full relative'>

                <Image src={heroImage1} alt="hero image" className="object-cover absolute inset-0 -z-10" fill />
                <div className='w-full lg:w-1/2 h-full shrink-0 grow bg-[#2A0839]/80 text-white justify-center flex flex-col gap-4 px-8 lg:px-16'>
                    <h1 className='text-4xl font-semibold'>
                        Transforming Learning
                        Into <span className='text-primary'>Experience</span>
                    </h1>
                    <p className="text-lg">
                        At INGRYD Academy, we&apos;re dedicated to more than just exceptional training. We recognize the pivotal moment of transitioning from education to employment. That&apos;s why we&apos;ve developed a distinct approach to job placements, bridging the gap between learning and real-world experience
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Hero