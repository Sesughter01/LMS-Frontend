import Image from 'next/image'

import { Button } from '@/components/ui/button';
import heroImage1 from '@/assets/Rectangle 6.png';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className='flex flex-col shrink-0 grow h-full min-h-screen'>
            <NavBar />
            <div className='flex flex-col shrink-0 grow h-full relative'>

                <Image src={heroImage1} alt="hero image" className="object-cover absolute inset-0 -z-10" fill />
                <div className=' w-full lg:w-1/2 h-full shrink-0 grow text-white justify-center flex flex-col gap-4 px-6 lg:px-16'>
                    <h1 className='text-5xl lg:text-5xl font-semibold'>
                        Partnering for Success
                    </h1>
                    <p className="text-xl">
                        At INGRYD Academy, we partner with industry leaders, startups, and organizations to empower
                        tech professionals, offering opportunities to work on meaningful projects.
                    </p>
                    <Button className="bg-primary w-fit mt-8" asChild>
                        <Link href={'/partner-with-us'} className='px-8 py-6 text-base'>
                            Partner with us
                        </Link>
                    </Button>
                </div>

            </div>
        </section>
    )
}

export default Hero