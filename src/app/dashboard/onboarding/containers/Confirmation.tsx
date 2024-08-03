import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button';

import iconSuccess from '@/assets/complete-anim.gif'


import personalInfo from '@/assets/onboarding/personal-active.svg';
import addressActive from '@/assets/onboarding/address-active.svg';
import educationActive from '@/assets/onboarding/education-active.svg';
import confirmationActive from '@/assets/onboarding/confirmation-active.svg';
import { ChevronRight } from 'lucide-react';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';


interface stageProp {
    onStageChange: (value: number) => void;
}

const Step3 = ({ onStageChange }: stageProp) => {
    const router = useRouter();

    return (
        <>
           {/* <section className='flex gap-4 text-center' >
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(1)}>
                    <Image src={personalInfo} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Personal <br />Information</small>
                </div>
                <span className='bg-blue-500 h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(2)}>
                    <Image src={addressActive} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Address</small>
                </div>
                <span className='bg-blue-500 h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(3)}>
                    <Image src={educationActive} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Education</small>
                </div>
                <span className='bg-blue-500 h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center'>
                    <Image src={confirmationActive} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Confirmation</small>
                </div>
            </section>*/}
            <section className="grow flex flex-col gap-8">
                <article className='flex flex-col gap-8 items-center'>
                    <div className='flex flex-col items-center'>
                        <Image src={iconSuccess} alt='success animation' className='h-[200px] w-auto' />
                        <h1 className='text-3xl text-center'>
                            Congratulations,<br />
                            onboarding successful!
                        </h1>
                    </div>
                    <p>
                    We’re glad to have you onboard. Next step is to take the
                    proceed to Dashboard. Select a course/s and enroll
                    </p>
                    {/* <p>
                        We’re glad to have you onboard. Next step is to take the
                        pre-assessment. A few things you should know:
                    </p> */}
                    {/* <ul className='flex flex-col gap-5  list-disc'>
                        <li>The pre-assessment evaluate students knowledge and skills</li>
                        <li>Achieve an average score of 50% or higher for a coupon code</li>
                        <li>The coupon code grants free course admission </li>
                        <li>Score below 50%, and you will have to pay for the course</li>
                    </ul> */}
                    <Button className='bg-secondary' onClick={() => { router.push("/dashboard") }}>
                        Go To Dashboard
                        <ChevronRight />
                    </Button>

                </article>

            </section>
        </>
    )
}

export default Step3