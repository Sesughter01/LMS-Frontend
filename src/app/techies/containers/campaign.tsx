import { Button } from '@/components/ui/button'

const Campaign = () => {
    return (
        <section>
            <article className='bg-blue-500 text-white flex justify-center gap-16 py-16'>
                <h1 className='text-3xl'>Join our team</h1>
                <div className='flex flex-col gap-6 '>
                    <p className='text-lg'>will you like to partner with us or <br /> support our talented techies growth </p>
                    <Button className='bg-primary w-fit'>Send us a message</Button>
                </div>
            </article>
        </section>
    )
}

export default Campaign