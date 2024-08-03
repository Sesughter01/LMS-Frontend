import Image from 'next/image'
import { Button } from '@/components/ui/button'

import img1 from '@/assets/Rectangle 5.png'

const Empowering = () => {
    return (
        <section>
            <article className='flex flex-col items-center gap-12 py-24'>
                <h1 className='text-4xl lg:text-center leading-10 font-semibold'>
                    Empowering <br /> Diverse Aspirations
                </h1>
                <div className="flex justify-between items-center flex-wrap w-full">
                    <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6 lg:pl-24 flex flex-col px-6 gap-8">

                        <ul className='glex flex-col gap-6 text-sm list-disc pl-4'>
                            <li>INGRYD Academy serves as a guiding light for various individuals and organizations,
                                each with their unique aspirations:
                            </li>

                            <li>Graduates: As young talents step into the world beyond education, INGRYD provides
                                the launchpad for their tech careers, offering the skills and insights needed to thrive.
                            </li>
                            <li>Undergraduates: We offer guidance to aspiring tech enthusiasts still navigating the world of academia, with the skills
                                and insights that will empower them seamlessly transition from education to the dynamic landscape of technology.
                            </li>
                            <li>Unemployed Individuals: INGRYD is a beacon of hope, offering resources and courses to empower unemployed individuals
                                to regain their footing and secure promising opportunities.
                            </li>
                            <li>Companies: We partner with companies to empower their workforce. We provide a pool of trained talents and tailor-made
                                training programs to align organizations’ team with cutting-edge tech advancements.
                            </li>
                        </ul>
                    </div>
                    <Image alt="image" className="w-1/2 hidden lg:flex object-cover object-center md:mt-0 mt-12" src={img1} />
                </div>
            </article>
        </section>
    )
}

export default Empowering