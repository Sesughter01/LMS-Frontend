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
import { ChevronLeft, ChevronRight, PlusIcon, TrashIcon } from 'lucide-react';


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
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createTraineeEducation } from '@/store/slices/onboardingSlice';
import uploadService from '@/services/api/upload';
import { setEducation } from '@/store/slices/studentSlice';

interface stageProp {
    onStageChange: (value: number) => void;
}

const Step3 = ({ onStageChange }: stageProp) => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [institutionName, setInstitutionName] = useState<string>('');
    const [yearOfGraduation, setYearOfGraduation] = useState<string>('');
    const [certificateObtained, setCertificateObtained] = useState<string>('');
    const [courseOfStudy, setCourseOfStudy] = useState<string>('');
    const [certificate, setCertificate] = useState<File | null>(null);
    const [isUpdatingDetails, setIsUpdatingDetails] = useState<boolean>(false);

    const authUser = useSelector((state: RootState) => state.auth.user);
    const singleStudent = useSelector((state: RootState) => state.student.singleStudent);

    useEffect(() => {
        if(singleStudent?.education?.length && !yearOfGraduation){
            setYearOfGraduation(singleStudent?.education[singleStudent?.education.length - 1]?.yearOfGraduation || "")
        }

        if(singleStudent?.education?.length && !courseOfStudy){
            setCourseOfStudy(singleStudent?.education[singleStudent?.education.length - 1]?.courseOfStudy || "")
        }

        if(singleStudent?.education?.length && !institutionName){
            setInstitutionName(singleStudent?.education[singleStudent?.education.length - 1]?.institutionName || "")
        }

        if(singleStudent?.education?.length && !certificateObtained){
            setCertificateObtained(singleStudent?.education[singleStudent?.education.length - 1]?.certificateObtained || "")
        }
    }, [singleStudent])
   
    const id = authUser?.id

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if(!institutionName || !yearOfGraduation || !certificateObtained || !courseOfStudy){
           toast.error('Ensure all inputs are filled to proceed.');
           return 
       }
        if(isNaN(yearOfGraduation)){
           toast.error('Invalid year of graduation!.');
           return
       }
       setIsUpdatingDetails(true)
      
        try {
            const formData = new FormData();
    
            // Append certificate file to FormData
            if (certificate) {
                formData.append('file', certificate);
            }

            // Send FormData to the server
            const certificateUrl = certificate && (await uploadService.UploadFiletoS3(formData));

          const resultAction = await dispatch(
            createTraineeEducation({
              traineeId: id,
              data: {
                institutionName,
                yearOfGraduation,
                certificateObtained,
                courseOfStudy,
                certificate: certificateUrl || null,
              },
            }) as any
          )
          // Unwrap the result using unwrapResult
          unwrapResult(resultAction);
           if(resultAction.payload){
            dispatch(setEducation(resultAction.payload))
          }
         
          // If the updateSingleTrainee request is successful, move to the next step
          toast.info('Updated Successfully')
          onStageChange(4);
        } catch (error: any) {
            console.log("error", error)
          setError(error.message || 'An error occurred');
          toast.error('Failed to update trainee education. Please try again.');
        }finally {
            setIsUpdatingDetails(false)
        }
      };

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
                <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(4)}>
                    <Image src={confirmation} alt="icon" className="w-12 aspect-square" />
                    <small className='text-gray-600 text-xs'>Confirmation</small>
                </div>
            </section>*/}
            <section className="grow flex flex-col gap-8">
                <article className="">
                    <h2 className="text-2xl leading-7 text-gray-900 mb-10">Education</h2>
                    <div>
                        <section className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="col-span-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Highest Qualification <span className="text-[#FF0000]">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <Select onValueChange = {(getValue) => setCertificateObtained(getValue)} >
                                        <SelectTrigger className="w-full border-gray-400 h-[60px]">
                                            <SelectValue placeholder={certificateObtained? certificateObtained: "Highest Qualification"} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-400">
                                            <SelectGroup>
                                                <SelectItem value="BSc" className="data-[highlighted]:bg-gray-100 cursor-pointer">BSc</SelectItem>
                                                <SelectItem value="PHD" className="data-[highlighted]:bg-gray-100 cursor-pointer">PHD</SelectItem>
                                                <SelectItem value="MSc" className="data-[highlighted]:bg-gray-100 cursor-pointer">MSc</SelectItem>
                                                <SelectItem value="Diploma" className="data-[highlighted]:bg-gray-100 cursor-pointer">Diploma</SelectItem>
                                                <SelectItem value="HND" className="data-[highlighted]:bg-gray-100 cursor-pointer">HND</SelectItem>
                                                <SelectItem value="Other" className="data-[highlighted]:bg-gray-100 cursor-pointer">Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="col-span-3 ">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year of Graduation <span className="text-[#FF0000]">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text" 
                                        name="yearOfGraduation"
                                        id="city"
                                        value={yearOfGraduation}
                                        onChange={(e) => setYearOfGraduation(e.target.value)}
                                        autoComplete="address-level2"
                                        className="block w-full h-[60px] px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Institution name <span className="text-[#FF0000]">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="institute"
                                        id="institute"
                                        value={institutionName}
                                        onChange={(e) => setInstitutionName(e.target.value)}
                                        autoComplete="address-level2"
                                        className="block w-full h-[60px] px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="col-span-3">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    Course of Study <span className="text-[#FF0000]">(required)</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="course"
                                        id="course"
                                        value={courseOfStudy}
                                        onChange={(e) => setCourseOfStudy(e.target.value)}
                                        autoComplete="address-level1"
                                        className="block w-full h-[60px] px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                        </section>
                        <section className="flex flex-col gap-6 mt-6">
                            <div className=" lg:w-1/2">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Degree certificate
                                     <span className="text-[#FF0000]">(required)</span>
                                </label>
                                <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 py-4 px-4 flex-col gap-4 ">

                                    <div className="flex items-center gap-2">
                                        <PhotoIcon className=" h-16 w-16 text-gray-300" aria-hidden="true" />
                                        <p className="font-medium leading-5 text-sm text-gray-600">Upload Pdf, jpg, jpeg, png files only. Max file size 2MB</p>
                                    </div>
                                    <div className="flex justify-between items-center rounded-md border border-gray-200 px-4 p-2">
                                        <input 
                                            id="file-upload" 
                                            name="file-upload" 
                                            type="file"
                                            onChange={(e) => setCertificate(e.target.files?.[0] || null)} 
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                                            file:text-sm file:font-semibold
                                                                            file:bg-violet-50 file:text-indigo-700
                                                                            hover:file:bg-violet-100 cursor-pointer" />
                                        <Button type="button" variant={'ghost'} size="icon" className="text-red-700">
                                            <TrashIcon className="w-4 h-4 " />
                                        </Button>
                                    </div>
                                </div>
                            </div>
{/*
                            <Button type="button" variant={"outline"} className="hover:bg-gray-100 w-fit flex gap-2 items-center">
                                <PlusIcon className="w-5 h-5" />
                                Add another educational background
                            </Button>*/}

                        </section>

                        <div className="mt-8 flex items-center gap-x-6">

                            <Button disabled={isUpdatingDetails} variant={'outline'} className='w-fit' onClick={() => onStageChange(3)}>
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
                    </div>
                </article>
            </section>
        </>
    )
}

export default Step3