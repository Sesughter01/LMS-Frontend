import { Button } from '@/components/ui/button'
import React from 'react'

const Scholarship = () => {
    return (
        <section>
            <article className="bg-[#FEECFF] py-24">
                <ul className='flex flex-col lg:flex-row gap-8'>
                    <li className='flex flex-col gap-6 lg:w-1/2 shrink-0 px-6 lg:px-24'>
                        <h1 className='text-4xl font-semibold'>Can’t afford the academy?</h1>
                        <small className='text-xl'>
                            Don’t worry, here is how to qualify for INGRYD Scholars program
                        </small>

                        {/* <Button className="bg-primary w-fit">Enroll for Program</Button> */}
                    </li>
                    <li className='px-6 lg:px-24'>
                        <ul className='flex flex-col gap-2 text-lg marker:text-secondary marker:text-lg pl-8 list-disc'>
                            <li>
                                Sign up
                            </li>
                            <li>
                                Take assessment
                            </li>
                            <li>
                                Make cut off mark
                            </li>
                            <li>
                                Gain a fully funded
                                scholarship for 6 months
                            </li>
                        </ul>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default Scholarship