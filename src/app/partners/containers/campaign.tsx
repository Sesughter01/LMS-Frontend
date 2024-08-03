import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Campaign = () => {
    return (
        <section>
            <article className='bg-blue-500 text-white flex flex-col items-center lg:flex-row justify-center gap-8 lg:gap-16 px-6 py-16'>
                <h1 className='text-5xl lg:text-4xl text-center lg:text-left font-semibold'>Partner with us</h1>
                <div className='flex gap-6 flex-col'>
                    <p className='text-2xl'>will you like to partner with us or <br /> support our talented techies growth </p>
                    <Button className='bg-primary w-fit' asChild>
                        <Link href={'/partner-with-us'} className="">
                            Send us a Message
                        </Link>
                    </Button>
                </div>
            </article>
        </section>
    )
}

export default Campaign