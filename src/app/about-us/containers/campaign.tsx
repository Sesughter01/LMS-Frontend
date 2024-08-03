import { Button } from '@/components/ui/button'

const Campaign = () => {
    return (
        <section>
            <article className='bg-blue-500 text-white flex flex-col lg:flex-row justify-center gap-8 lg:gap-16 px-6 py-16'>
                <h1 className='text-4xl font-semibold'>Join our team</h1>
                <div className='flex flex-col gap-6 '>
                    <p className='text-lg'>will you like to partner with us or <br /> support our talented techies growth </p>
                    <Button className='bg-primary w-fit'>Send us a message</Button>
                </div>
            </article>
        </section>
    )
}

export default Campaign