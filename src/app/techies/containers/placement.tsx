import Image from "next/image"
import img1 from '@/assets/Rectangle 1.png'
import { Button } from "@/components/ui/button"

const Placement = () => {
    return (
        <section>
            <article className='relative flex flex-col py-48 items-center text-white px-6 lg:px-48'>
                <Image src={img1} alt="image" className="object-cover absolute inset-0 -z-10" fill />
                <div className='flex flex-col gap-6 items-center text-center'>
                    <h1 className='text-4xl font-semibold'>
                        Our placement program
                    </h1>
                    <p className="text-lg">
                        Ingryd placement program is designed to match high performing graduates with top global jobs. We ensure that you are positioned for guaranteed success post Academy.
                    </p>
                    <Button className="bg-primary w-fit">
                        Get Started
                    </Button>
                </div>
            </article>
        </section>
    )
}

export default Placement