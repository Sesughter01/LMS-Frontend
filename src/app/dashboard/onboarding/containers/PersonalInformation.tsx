"use client"

import { ChevronLeft, ChevronRight, ChevronsUpDown} from 'lucide-react';
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button';

import Image from 'next/image'

import imgPfp from '@/assets/prp_img.jpg'

import personalInfo from '@/assets/onboarding/personal-active.svg';
import address from '@/assets/onboarding/address.svg'
import addressActive from '@/assets/onboarding/address-active.svg';
import education from '@/assets/onboarding/education.svg'
import educationActive from '@/assets/onboarding/education-active.svg';
import confirmation from '@/assets/onboarding/confirmation.svg'
import confirmationActive from '@/assets/onboarding/confirmation-active.svg';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useDispatch, useSelector } from 'react-redux';
import { updateSingleTrainee } from '@/store/slices/onboardingSlice';
import { RootState } from '@/store/store';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import uploadService from '@/services/api/upload';
import { setUser } from '@/store/slices/authSlice';


interface stageProp {
    onStageChange: (value: number) => void;
}


const Step1 = ({ onStageChange }: stageProp) => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
    const [identificationFile, setIdentificationFile] = useState<File | null>(null);
    const [ssceCertificateFile, setSSCECertificateFile] = useState<File | null>(null);
    const [nyscCertificateFile, setNYSCCertificateFile] = useState<File | null>(null);
    const [isUpdatingDetails, setIsUpdatingDetails] = useState<boolean>(false);

    const authUser = useSelector((state: RootState) => state.auth.user);
    // console.log("authUser", authUser)
    // Calculate the date 16 years ago from today
  const today = new Date();
  const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0];


    const id = authUser?.id

    const handleContinue = async () => {
        setIsUpdatingDetails(true)
        try {
            const formData1 = new FormData();
            const formData2 = new FormData();
            const formData3 = new FormData();
    
           
            // Append identification file to FormData
            if (identificationFile) {
                formData1.append('file', identificationFile);
            }
    
            // Append SSCE certificate file to FormData
            if (ssceCertificateFile) {
                formData2.append('file', ssceCertificateFile);
            }
    
            // Append NYSC certificate file to FormData
            if (nyscCertificateFile) {
                formData3.append('file', nyscCertificateFile);
            }
    
            // Send FormData to the server
            const identificationUrl = identificationFile && (await uploadService.UploadFiletoS3(formData1));
            const ssceCertificateUrl = ssceCertificateFile && (await uploadService.UploadFiletoS3(formData2));
            const nyscCertificateUrl = nyscCertificateFile && (await uploadService.UploadFiletoS3(formData3));

            // console.log("identificationUrl", identificationUrl)
            // console.log("ssceCertificateUrl", ssceCertificateUrl)
            // console.log("nyscCertificateUrl", nyscCertificateUrl)


    
            const resultAction = await dispatch(
                updateSingleTrainee({
                    traineeId: id,
                    data: {
                        title,
                        dateOfBirth,
                        gender,
                        // firstName,
                        // lastName,
                        // phoneNumber,
                        // documents: identificationUrl ? [identificationUrl] : [],
                         ...(identificationUrl ? { identificationUrl: [identificationUrl]} : {}),
                        ...(ssceCertificateUrl ? { ssceCertifcate: ssceCertificateUrl } : {}),
                        ...(nyscCertificateUrl ? { nyscCertificate: nyscCertificateUrl } : {}),
                    },
                }) as any
            );
    
            // Unwrap the result using unwrapResult
            unwrapResult(resultAction);
            // console.log('resultAction5555555555555', resultAction)
            toast.info('Updated Successfully')
            if(resultAction.payload){
                dispatch(setUser(resultAction.payload))
                 onStageChange(2);    
              }
    
            // If the updateSingleTrainee request is successful, move to the next step
        } catch (error: any) {
            console.log("errroe that occured", error)
            // toast.error(`${error.name} `);
            toast.error(`An error ocurred. Try again later `);
        }finally {
            setIsUpdatingDetails(false)
        }
    };
    
    useEffect(() => {
        // authUser?.profile?.firstName && setFirstName(authUser.profile.firstName)
        // authUser?.profile?.lastName && setLastName(authUser.profile.lastName)
        // authUser?.profile?.phoneNumber && setPhoneNumber(authUser.profile.phoneNumber)
        authUser?.profile?.title && setTitle(authUser.profile.title)
        authUser?.profile?.gender && setGender(
            authUser.profile.gender.toLowerCase().startsWith("m") ? "Male" :
            authUser.profile.gender.toLowerCase().startsWith("f") ? "Female" :
            "Other"
        );
        authUser?.profile?.dateOfBirth && setDateOfBirth(authUser.profile.dateOfBirth)
        authUser?.profile?.avatarImageUrl && setProfilePhotoUrl(authUser.profile.avatarImageUrl);
        console.log("fttttttttttthd",  authUser)
    }, [authUser])

      const idProfilePhotoUrlRef = useRef<any>(null);
      const nyscCertificateFileRef = useRef<any>(null);
      const ssceCertificateFileRef = useRef<any>(null);
      const idCertificateFileRef = useRef<any>(null);

      const removeUploadedFile = (fT: string) => {
        //   console.log("fttttttttttt", fT)
        if (fT == "idProfilePhotoUrlRef") {
            idProfilePhotoUrlRef.current.value = '';
        }else if (fT == "ssceCertificateFileRef") {
           nyscCertificateFileRef.current.value = '';
        }else if (fT == "ssceCertificateFileRef") {
            // console.log("ssce")
          ssceCertificateFileRef.current.value = '';
        }else{
            idCertificateFileRef.current.value = '';
        }
      }
  
    return (
        <>

            {/*<section className='flex gap-4 text-center' >
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(1)}>
                    <Image src={personalInfo} alt="icon" className="w-12 aspect-square" />
                    <small className='text-blue-500 text-xs'>Personal <br />Information</small>
                </div>
                <span className='bg-[#ACACAC] h-[2px] grow rounded-full my-5'></span>
                <div className='flex flex-col gap-3 items-center cursor-pointer' onClick={() => onStageChange(2)}>
                    <Image src={address} alt="icon" className="w-12 aspect-square" />
                    <small className='text-gray-600 text-xs'>Address</small>
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

                <div className='flex flex-col gap-4'>
                    <h2 className="text-base lg:text-2xl">Profile photo</h2>
                    {/* <div className="relative rounded-full border border-gray-200 h-36 w-36  aspect-square bg-gray-300"> */}
                        {/* <Image src={imgPfp} alt="profile image" className="rounded-full" fill /> */}
                    {/* </div> */}
                    <div className="relative rounded-full border border-gray-200 h-36 w-36 aspect-square bg-gray-300">
                            {profilePhotoUrl && <Image src={profilePhotoUrl} alt="profile image" className="rounded-full" fill />}
                            <input
                             ref={idProfilePhotoUrlRef}
                             id="profilePhotoUrl" 
                             name="profilePhotoUrl"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setProfilePhoto(file);
                                if (file) {
                                setProfilePhotoUrl(URL.createObjectURL(file));
                                }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            />

                           <button 
                                className="absolute top-2 right-0 px-2 py-1 bg-white rounded text-sm" 
                                onClick={() => removeUploadedFile("idProfilePhotoUrlRef")}
                                >
                                <span className="absolute inline-flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-red-200 text-xs font-bold text-foreground bg-gray-200 border-4 border-white rounded-full top-0 right-0">
                                    <TrashIcon className="w-6 h-6" />
                                </span>
                            </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-base lg:text-2xl mb-6">Personal Information</h2>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <Select value={title} onValueChange = {(getValue) => setTitle(getValue)} >
                                    <SelectTrigger  className="w-full border-gray-400 h-[60px]">
                                    <SelectValue placeholder="Title" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-400">
                                        <SelectGroup>
                                            <SelectItem value="Mr" className="data-[highlighted]:bg-gray-100 cursor-pointer">Mr</SelectItem>
                                            <SelectItem value="Mrs" className="data-[highlighted]:bg-gray-100 cursor-pointer">Mrs</SelectItem>
                                            <SelectItem value="Miss" className="data-[highlighted]:bg-gray-100 cursor-pointer">Miss</SelectItem>
                                            <SelectItem value="Dr." className="data-[highlighted]:bg-gray-100 cursor-pointer">Dr.</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="title"
                                    id="title"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    max={sixteenYearsAgo} // Set the max attribute to 16 years ago
                                    className="block w-full h-[60px] rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </label>
                            <div className="mt-2">
                                <Select value={gender} onValueChange = {(getValue) => setGender(getValue)}>
                                    <SelectTrigger className="w-full border-gray-400 h-[60px]">
                                    <SelectValue placeholder="Gender" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-400">
                                        <SelectGroup>
                                            <SelectItem value="Male" className="data-[highlighted]:bg-gray-100 cursor-pointer">Male</SelectItem>
                                            <SelectItem value="Female" className="data-[highlighted]:bg-gray-100 cursor-pointer">Female</SelectItem>
                                            <SelectItem value="Other" className="data-[highlighted]:bg-gray-100 cursor-pointer">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}
                    </div>
                </div>

                <div>
                    <h2 className="text-base lg:text-2xl mb-6">File Uploads</h2>
                    <div className='flex flex-col gap-6'>
                        <div className="lg:w-1/2">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Identification (Int&apos;l passort, driver&apos;s licence, national ID...) <span className="text-primary">*</span>
                            </label>
                            <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 py-4 px-4 flex-col gap-4 ">

                                <div className="flex gap-2">
                                    <Select>
                                        <SelectTrigger className="w-full border-0 p-0 gap-2">
                                            <PhotoIcon className=" h-16 w-16 text-gray-300" aria-hidden="true" />
                                            <p className="font-medium leading-5 text-sm text-left text-gray-600">Click to select file type, then upload PDF, JPG, PNG <br/> files only. Max file size is 2MB</p>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-400">
                                            <SelectGroup>
                                                <SelectItem value="InternationalPassport" className="data-[highlighted]:bg-gray-100 cursor-pointer">International Passport</SelectItem>
                                                <SelectItem value="DrivingLicense" className="data-[highlighted]:bg-gray-100 cursor-pointer">Driving License</SelectItem>
                                                <SelectItem value="NationalId" className="data-[highlighted]:bg-gray-100 cursor-pointer">National ID Card</SelectItem>
                                                <SelectItem value="VotersCard" className="data-[highlighted]:bg-gray-100 cursor-pointer">Voter’s Card.</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* documents value */}
                                <div className="flex justify-between items-center rounded-md border border-gray-200 px-4 p-2">
                                    <input 
                                    ref={idCertificateFileRef}
                                        id="identificationFile" 
                                        name="identificationFile"
                                        type="file"
                                        onChange={(e) => setIdentificationFile(e.target.files?.[0] || null)} 
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                                            file:text-sm file:font-semibold
                                                                            file:bg-violet-50 file:text-indigo-700
                                                                            hover:file:bg-violet-100 cursor-pointer" />
                                     <Button 
                                        type="button" 
                                        variant={'ghost'} size="icon" 
                                        onClick={() => removeUploadedFile("idCertificateFileRef")}
                                        className={!identificationFile? "text-gray-300 cursor-not-allowed hover:text-gray-300 ": "text-red-700"}>
                                        <TrashIcon className="w-5 h-5"/>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* <Collapsible>
                            <CollapsibleTrigger>
                                <Button variant="ghost" className="flex gap-3 px-0 text-lg">
                                    <span className="">Did you school in Nigeria?</span>
                                    <ChevronsUpDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className='py-8'>

                                <div className="lg:w-1/2">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        SSCE certificate  <span className="text-primary">*</span>
                                    </label>
                                    <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 py-4 px-4 flex-col gap-4 ">

                                        <div className="flex items-center gap-2">
                                            <PhotoIcon className=" h-16 w-16 text-gray-300" aria-hidden="true" />
                                            <p className="font-medium leading-5 text-sm text-gray-600">Upload Pdf, jpg, jpeg, png files only. Max file size 2MB</p>
                                        </div>
                                        /* ssceCertifcate value 
                                        <div className="flex justify-between items-center rounded-md border border-gray-200 px-4 p-2">
                                            <input 
                                                ref={ssceCertificateFileRef}
                                                id="file-upload" 
                                                name="ssceCertificateFile" 
                                                type="file"
                                                onChange={(e) => setSSCECertificateFile(e.target.files?.[0] || null)} 
                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                                            file:text-sm file:font-semibold
                                                                            file:bg-violet-50 file:text-indigo-700
                                                                            hover:file:bg-violet-100 cursor-pointer" />
                                            <Button 
                                                type="button" 
                                                variant={'ghost'} size="icon" 
                                                onClick={() => removeUploadedFile("ssceCertificateFileRef")}
                                                className={!ssceCertificateFile? "text-gray-300 cursor-not-allowed hover:text-gray-300 ": "text-red-700"}>
                                                <TrashIcon className="w-5 h-5"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </CollapsibleContent>
                        </Collapsible>

                        <Collapsible>
                            <CollapsibleTrigger>
                                <Button variant="ghost" className="flex gap-3 px-0 text-lg">
                                    <span className="">Have you completed your NYSC?</span>
                                    <ChevronsUpDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className='py-8'>

                                <div className="lg:w-1/2">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        NYSC certificate  <span className="text-primary">*</span>
                                    </label>
                                    <div className="mt-2 flex rounded-lg border border-dashed border-gray-900/25 py-4 px-4 flex-col gap-4 ">

                                        <div className="flex items-center gap-2">
                                            <PhotoIcon className=" h-16 w-16 text-gray-300" aria-hidden="true" />
                                            <p className="font-medium leading-5 text-sm text-gray-600">Upload Pdf, jpg, jpeg, png files only. Max file size 2MB</p>
                                        </div>
                                        nyscCertificate value *
                                        <div className="flex justify-between items-center rounded-md border border-gray-200 px-4 p-2">
                                            <input 
                                                ref={nyscCertificateFileRef}
                                                id="file-upload" 
                                                name="nyscCertificateFile" 
                                                type="file"
                                                onChange={(e) => setNYSCCertificateFile(e.target.files?.[0] || null)} 
                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                                            file:text-sm file:font-semibold
                                                                            file:bg-violet-50 file:text-indigo-700
                                                                            hover:file:bg-violet-100 cursor-pointer" />
                                            <Button 
                                                type="button" 
                                                variant={'ghost'} size="icon" 
                                                onClick={() => removeUploadedFile("nyscCertificateFileRef")}
                                                className={!nyscCertificateFile? "text-gray-300 cursor-not-allowed hover:text-gray-300 ": "text-red-700"}>
                                                <TrashIcon className="w-5 h-5"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                            </CollapsibleContent>
                        </Collapsible> */}



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
            </section>
        </>
    )
}

export default Step1