import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button';


import personalInfo from '@/assets/onboarding/personal-active.svg';
import address from '@/assets/onboarding/address.svg'
import addressActive from '@/assets/onboarding/address-active.svg';
import education from '@/assets/onboarding/education.svg'
import educationActive from '@/assets/onboarding/education-active.svg';
import confirmation from '@/assets/onboarding/confirmation.svg'
import confirmationActive from '@/assets/onboarding/confirmation-active.svg';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { createTraineeAddress } from '@/store/slices/onboardingSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setAddress } from '@/store/slices/studentSlice';

interface stageProp {
    onStageChange: (value: number) => void;
}

const Step2 = ({ onStageChange }: stageProp) => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [country, setCountry] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [localGovernment, setLocalGovernment] = useState<string>('');
    const [isUpdatingDetails, setIsUpdatingDetails] = useState<boolean>(false);

    const authUser = useSelector((state: RootState) => state.auth.user);
    const singleStudent = useSelector((state: RootState) => state?.student?.singleStudent);

    console.log("singleStudentAddress(((((", singleStudent)

     useEffect(() => {
        if(singleStudent?.address?.street && !street){
            setStreet(singleStudent?.address?.street || "")
        }

        if(singleStudent?.address?.country && !country){
            setCountry(singleStudent?.address?.country || "")
        }

        if(singleStudent?.address?.city && !city){
            setCity(singleStudent?.address?.city || "")
        }

        if(singleStudent?.address?.state && !state){
            setState(singleStudent?.address?.state || "")
        }

        if(singleStudent?.address?.localGovernment && !localGovernment){
            setLocalGovernment(singleStudent?.address?.localGovernment || "")
        }
    }, [singleStudent])

    // console.log("singleStudent", singleStudent)
    const id = authUser?.id

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault(); 
       setIsUpdatingDetails(true)
       if(!country || !street || !city || !state || !localGovernment){
           toast.error('Ensure all inputs are filled to proceed.');
           setIsUpdatingDetails(false)
           return 
       }
        try {
          const resultAction = await dispatch(
            createTraineeAddress({
              traineeId: id,
              data: {
                street,
                country,
                city,
                state,
                localGovernment,
              },
            }) as any
          );
      
          unwrapResult(resultAction);
          console.log("gyeuvuie", resultAction)
          if(resultAction.payload){
            dispatch(setAddress(resultAction.payload))
           }

      
          // If the updateSingleTrainee request is successful, move to the next step
           toast.info('Updated Successfully')
          onStageChange(3);
        } catch (error: any) {
            console.log("bberrrrrrrrrrrr", error)
          setError(error.message || 'An error occurred');
          toast.error('Failed to Create trainee address. Please try again.');
        }finally{
             setIsUpdatingDetails(false)
        }
      };
      

    return (
        <>
          {/*  <section className='flex gap-4 text-center' >
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(1)}>
                    <Image src={personalInfo} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Personal <br />Information</small>
                </div>
                <span className='bg-blue-500 h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(2)}>
                    <Image src={addressActive} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Address</small>
                </div>
                <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(3)}>
                    <Image src={education} alt="icon" className="w-12 aspect-square" />
                    <small className='text-gray-600 text-xs'>Education</small>
                </div>
                <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(4)}>
                    <Image src={confirmation} alt="icon" className="w-12 aspect-square" />
                    <small className='text-gray-600 text-xs'>Confirmation</small>
                </div>
            </section>*/}
            <section className="grow flex flex-col gap-8">
                <article className="">
                    <h2 className="text-2xl leading-7 text-gray-900 mb-10">Address</h2>
                    <form>
                        <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Residential address <span className="text-primary">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        autoComplete="street-address"
                                        className="block w-full px-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 ">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City <span className="text-primary">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        autoComplete="address-level2"
                                        className="block w-full px-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country of Reesidence <span className="text-primary">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <Select value={country} onValueChange = {(getValue) => setCountry(getValue)} >
                                        <SelectTrigger className="w-full border-gray-400">
                                            <SelectValue placeholder="Country of Residence" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-400">
                                            <SelectGroup>
                                                <SelectItem value="Nigeria" className="data-[highlighted]:bg-gray-100 cursor-pointer">Nigeria</SelectItem>
                                                <SelectItem value="Germany" className="data-[highlighted]:bg-gray-100 cursor-pointer">Germany</SelectItem>
                                                <SelectItem value="Canada" className="data-[highlighted]:bg-gray-100 cursor-pointer">Canada</SelectItem>
                                                <SelectItem value="Spain" className="data-[highlighted]:bg-gray-100 cursor-pointer">Spain</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State of Origin <span className="text-primary">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        autoComplete="address-level1"
                                        className="block w-full px-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="loc-gov" className="block text-sm font-medium leading-6 text-gray-900">
                                    Local Government <span className="text-primary">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="loc-gov"
                                        id="loc-gov"
                                        value={localGovernment}
                                        onChange={(e) => setLocalGovernment(e.target.value)}
                                        className="block w-full px-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </section>

                        <div className="mt-8 flex items-center gap-x-6">

                            <Button disabled={isUpdatingDetails}  variant={'outline'} className='w-fit' onClick={() => onStageChange(1)}>
                                Back
                                <ChevronLeft className='w-3 h-3' />
                            </Button>
                            <Button disabled={isUpdatingDetails} className='bg-secondary w-fit' onClick={handleContinue}>
                               {isUpdatingDetails && "Updating..."}

                                {!isUpdatingDetails && 
                                 <> 
                                     Continue <ChevronRight className='w-3 h-3' />
                                 </>
                                 }
                            </Button>
                        </div>
                    </form>
                </article>
            </section>
        </>
    )
}

export default Step2