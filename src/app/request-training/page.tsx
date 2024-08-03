"use client"

import Image from 'next/image'

import Link from 'next/link'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import Logo from '@/assets/logo.png'
import Logo_dark from '@/assets/logo-dark.png'
import cta_image from '@/assets/Group 710.png'
import cta_bg from '@/assets/Group 96.png'
import { login } from '@/services/AuthService'
import { extractErrorMessage } from '@/shared/utils/helper'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '@/store/slices/authSlice'
import { RootState } from '@/store/store'
import { UserTypes } from '@/lib/constants'
import { setUserProgrammes } from '@/store/slices/programmeSlice'
import { ChevronLeft } from 'lucide-react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function LoginPage() {

  // const dispatch = useDispatch();
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoBack = () => {
    router.back(); // This will go back to the previous page in the browser's history.
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    //router.push(`/getting-started`);
    try {
      setIsSubmitting(true);
      const response = await login(email, password);

      toast.success(`successfully logged in`);


      dispatch(setUser(response));
      dispatch(setUserProgrammes(response?.userProgrammes))

      if (!response.isEmailVerified) {
        router.push(`/signup/verify-email?email=${response.email}`);
        return;
      }

      if (response.accountType === UserTypes.TRAINEE) {
        if (!response.isOnboarded) {
          // router.push(`/dashboard/onboarding`);
          router.push(`/getting-started`);
          return;
        } else {
          router.push(`/dashboard`);
          return;
        }

      }

      toast.success(`successfully logged in but system does not yet support your account type`)
      //router.push(`/${response?.data.role}/dashboard`);

    } catch (error: any) {
      const errorMsg = extractErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex w-full max-h-screen h-screen">
        <ul className='grid grid-flow-row lg:grid-cols-2 grid-rows-1 max-h-full h-full bg-[#1A183E] w-full'>
          <li className='hidden lg:flex flex-col h-full bg-[#1A183E] text-white place-content-center'>
            <section className='flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden'>
              <Image src={cta_bg} alt='bg image' className='absolute inset-4 object-contain' fill />
              <Image src={Logo} alt='Company Logo' className='h-20 w-auto' />
              <p className='text-center text-xl'>Helping forward-thinking companies build <br /> top-level teams by recruiting and training </p>
              <Image src={cta_image} alt='group img' className='p-24 ' />
            </section>

          </li>
          <li className='flex flex-col h-full overflow-y-scroll py-16 bg-white lg:rounded-tl-3xl lg:rounded-bl-3xl'>
            <div className='flex items-center gap-2 lg:gap-2 w-full px-2 lg:px-8'>
              <Link onClick={handleGoBack} href='#' className=''><ChevronLeft className='w-6 h-6 cursor-pointer' /> </Link>
              <div className='flex flex-col gap-0'>
                <p className='text-gray-600 text-lg'>Back to home</p>
              </div>
            </div>
            <section className='flex flex-col gap-8 px-8 lg:pl-16 w-full mt-10'>
              <p className='text-[#3E3243] text-2xl'>Request for training</p>


              {/* The form starts here */}
              <form>
                <div className="">

                  <div className="border-b border-gray-900/10 pb-12">

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            name="phone"
                            type="phone"
                            autoComplete="phone"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="training" className="block text-sm font-medium leading-6 text-gray-900">
                          Type of training requested *
                        </label>
                        <div className="mt-2">
                          <Select>
                            <SelectTrigger className="w-full text-gray-900 shadow-sm ring-1 ring-inset border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-inset focus:border-indigo-600 sm:text-sm sm:leading-6">
                              <SelectValue placeholder="Type of training requested" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-gray-900 shadow-sm ">
                              <SelectGroup>
                                <SelectItem value="category1" className="data-[highlighted]:bg-gray-100 cursor-pointer">Type1</SelectItem>
                                <SelectItem value="category2" className="data-[highlighted]:bg-gray-100 cursor-pointer">Type2</SelectItem>
                                <SelectItem value="category3" className="data-[highlighted]:bg-gray-100 cursor-pointer">Type3</SelectItem>
                                <SelectItem value="category4" className="data-[highlighted]:bg-gray-100 cursor-pointer">Type4</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                          Expected start date *
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            name="date"
                            id="date"
                            autoComplete="date"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>


                    </div>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Desired progamming language *</legend>
                        <div className="mt-4 flex gap-4 flex-wrap">
                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check1"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check1" className="font-medium text-sm text-gray-900">
                              ReactJS
                            </label>
                          </div>


                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check2"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check2" className="font-medium text-sm text-gray-900">
                              Javascript
                            </label>
                          </div>

                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check3"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check3" className="font-medium text-sm text-gray-900">
                              Java
                            </label>
                          </div>

                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check4"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check4" className="font-medium text-sm text-gray-900">
                              NodeJS
                            </label>
                          </div>

                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check5"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check5" className="font-medium text-sm text-gray-900">
                              C# .Net
                            </label>
                          </div>

                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check6"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check6" className="font-medium text-sm text-gray-900">
                              NextJS
                            </label>
                          </div>

                          <div className="flex gap-2 h-6 items-center">
                            <input
                              id="check7"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="check7" className="font-medium text-sm text-gray-900">
                              Python
                            </label>
                          </div>


                        </div>
                      </fieldset>

                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-6">
                      <div className="col-span-3">
                        <label htmlFor="organization" className="block text-sm font-medium leading-6 text-gray-900">
                          Organization
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="organization"
                            id="organization"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="trainee_number" className="block text-sm font-medium leading-6 text-gray-900">
                          Number of persons being trained
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="trainee_number"
                            id="trainee_number"
                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

                <div className="mt-6 flex items-center">

                  <button
                    type="submit"
                    className="flex items-center gap-4 rounded-md bg-[#1A183E] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1A183E]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit Form
                    <ChevronRightIcon className='w-4 h-4' />
                  </button>
                </div>
              </form>

            </section>

          </li>

        </ul>

      </main>



    </>
  )
}