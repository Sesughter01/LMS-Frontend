import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Campaign = () => {
    return (
        <section>
            <article className='bg-blue-500 text-white flex flex-col items-center lg:flex-row justify-center gap-8 lg:gap-16 px-6 py-16'>
                <h1 className='text-3xl lg:text-4xl text-center lg:text-left font-semibold'>See how to get started  </h1>
                <div className='flex gap-6 '>
                    <Button className='bg-primary w-fit' asChild>
                        <Link href={'/signup'} className="px-8 py-4 text-base">
                            Proceed
                        </Link>
                    </Button>
                </div>
            </article>
        </section>
    )
}

export default Campaign