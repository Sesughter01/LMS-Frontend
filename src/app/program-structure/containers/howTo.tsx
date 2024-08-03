import Image from 'next/image'
import { Button } from '@/components/ui/button'

import img1 from '@/assets/Rectangle 5.png'

const HowTo = () => {
    return (
        <section>
            <article className='flex flex-col gap-12 py-24'>
                <div className="flex justify-between items-center flex-wrap w-full px-6 lg:px-0">
                    <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6 lg:pl-24 flex flex-col gap-8">
                        <h1 className='text-3xl font-semibold'>
                            Unveiling Our <br />
                            Training Programs
                        </h1>
                        <small>
                            In a world where technology reigns supreme, the demand for skilled professionals is unrelenting.
                            Our training programs are more than just courses;
                            they are gateways to a world of opportunity. We specialize in
                            training young talents in the following programmes:
                        </small>
                        <ul className='grid grid-cols-2 gap-6 text-sm list-disc pl-4'>
                            <li>Product Management</li>
                            <li>Java</li>
                            <li>Data Science</li>
                            <li>Cyber Security</li>
                            <li>React</li>
                            <li>Linux</li>
                            <li>Node Js</li>
                            <li>IT solution sale</li>
                            <li>Dev Ops</li>
                        </ul>
                    </div>
                    <Image alt="image" className="w-1/2 hidden lg:flex object-cover object-center md:mt-0 mt-12" src={img1} />
                </div>
            </article>
        </section>
    )
}

export default HowTo