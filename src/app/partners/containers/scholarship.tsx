import { Button } from '@/components/ui/button'
import React from 'react'

const Scholarship = () => {
    return (
        <section>
            <article className="bg-[#FEECFF] py-24">
                <ul className='flex gap-8'>
                    <li className='flex flex-col gap-6 w-1/2 shrink-0 px-24'>
                        <h1 className='text-3xl font-semibold'>INGRYD Scholarship Program</h1>
                        <small className='font-semibold text-sm'>
                            The INGRYD Academy scholarship offer not only access to best in house trainers
                            but also provides access to hands-on internships and projects during training.
                        </small>
                        <ul className='flex flex-col gap-2 text-sm marker:text-secondary marker:text-lg pl-8 list-disc'>
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
                        <Button className="bg-primary w-fit">Enroll for Program</Button>
                    </li>
                    <li className='px-24'>
                        <ul className='flex flex-col gap-4 bg-secondary rounded-md p-8 text-sm text-gray-300 font-light'>
                            <li>
                                Must be a graduate in computer sciences, business, and related courses.

                            </li>
                            <li>
                                Has completed youth service or currently serving (with some exceptions).
                            </li>
                            <li>
                                Be available for training for the entire duration of the training.
                            </li>
                            <li>
                                Must be willing to wait a three-month period after training for job placements.
                            </li>
                            <li>
                                Must be willing to attend the additional job fitness training.
                            </li>
                            <li>
                                Be of proven integrity, with sensitivity to confidentiality requirements.
                            </li>
                            <li>
                                Be a team player and self-motivated.
                            </li>
                        </ul>
                    </li>
                </ul>
            </article>
        </section>
    )
}

export default Scholarship