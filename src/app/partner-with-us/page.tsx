"use client"

import Image from 'next/image'

import Link from 'next/link'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import Logo from '@/assets/logo.png'
import Logo_dark from '@/assets/logo-dark.png'
import cta_image from '@/assets/Group 710.png'
import cta_bg from '@/assets/Group 96.png'

import { ChevronLeft } from 'lucide-react'


export default function PartnerPage() {

  // const dispatch = useDispatch();
  const router = useRouter();




  return (
    <>
      <main className="flex w-full h-screen">
        <ul className='grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full bg-secondary w-full'>
          <li className='hidden lg:flex flex-col h-full bg-secondary text-white place-content-center'>
            <section className='flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden'>
              <Image src={cta_bg} alt='bg image' className='absolute inset-4 object-contain' fill />
              <Image src={Logo} alt='Company Logo' className='h-20 w-auto' />
              <p className='text-center text-2xl'>Helping forward-thinking companies build <br /> top-level teams by recruiting and training </p>
              <Image src={cta_image} alt='group img' className='p-24 ' />
            </section>

          </li>
          <li className='flex flex-col h-full py-28 bg-white lg:rounded-tl-3xl lg:rounded-bl-3xl'>
            <div className='flex gap-6 lg:gap-8 w-full px-2 lg:px-16 mb-14'>
              <Link href={'/'} className=''><ChevronLeft className='bg-foreground rounded-full w-8 h-8 text-white mt-2 cursor-pointer' /> </Link>
              <div className='flex flex-col gap-4'>
                <h1 className='text-4xl font-bold'>Partner with us</h1>
                <p className='text-[#3E3243] text-xl'>Send us a message</p>
              </div>
            </div>
            <section className='flex flex-col gap-8 px-8 lg:pl-32 w-full lg:max-w-[560px] '>


              {/* The form starts here */}
              <form className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2 '>
                  <small className='text-sm font-semibold'>Organization Name</small>
                  <input type="text" id="org" className='outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black ' placeholder='Enter your email'
                  />
                </div>
                <div className='flex flex-col gap-2 '>
                  <small className='text-sm font-semibold'>Email</small>
                  <input type="text" id="email" className='outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black ' placeholder='Enter your email'
                  />
                </div>
                <div className='flex flex-col gap-2 '>
                  <small className='text-sm font-semibold'>Phone Number</small>
                  <input type="text" id="number" className='outline-2 outline-transparent text-base border px-3 py-4 rounded-md border-gray-300 focus:outline-black ' placeholder='Input your password'
                  />
                </div>
                <div className='flex flex-col gap-2 '>
                  <small className='text-sm font-semibold'>Your message</small>
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <button type="submit" className='p-3 rounded-md bg-primary text-xsm text-center text-white' >Send Message</button>

              </form>

            </section>

          </li>

        </ul>

      </main>

    </>
  )
}
