"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Logo from '@/assets/logo.png';
import cta_image from '@/assets/Group 710.png';
import cta_bg from '@/assets/Group 96.png';
// import emailIcon from '@/icons/Email.png'; // Make sure to add the email icon asset
import { Button } from '@/components/ui/button';
import { resendEmail, verifyEmail, mockResendEmail, mockVerifyEmail } from '@/services/AuthService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/slices/authSlice';
import { extractErrorMessage } from '@/shared/utils/helper';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(searchParams.get('email'));
  const [token, setToken] = useState(searchParams.get('token'));

  const resendVerifyLink = async () => {
    try {
      setLoading(true);
      const response = await resendEmail(email);
      toast.success("Verification link resent", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (err) {
      const errMsg = extractErrorMessage(err) || "Couldn't resend link at this moment";
      toast.error(errMsg, {
        position: toast.POSITION.TOP_RIGHT
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verify = async () => {
      if (token !== null && email !== null) {
        try {
          setLoading(true);
          await verifyEmail(token, email);
          toast.success("Successfully verified Email", {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(clearUser());
          router.replace(`/login`);
        } catch (err) {
          toast.error("We couldn't verify your email, try again", {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(clearUser());
          router.replace(`/login`);
        } finally {
          setLoading(false);
        }
      }
    };

    verify();
  }, [token, email]);

  if (loading && token) {
    return (
      <main className="flex w-full h-screen">
        <ul className='grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full bg-secondary w-full'>
          <li className='hidden lg:flex flex-col h-full bg-secondary text-white place-content-center'>
            <section className='flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden'>
              <Image src={cta_bg} alt='bg image' className='absolute inset-4 object-contain' fill />
              <Image src={Logo} alt='Company Logo' className='h-20 w-auto' />
              <p className='text-center text-lg'>Helping forward-thinking companies build <br /> top-level teams by recruiting and training </p>
              <Image src={cta_image} alt='group img' className='p-16' />
            </section>
          </li>
          <li className='flex flex-col h-full place-content-center items-center bg-white lg:rounded-tl-3xl lg:rounded-bl-3xl'>
            <section className='flex flex-col gap-8 max-w-[380px] text-center'>
              <h1 className="text-3xl font-semibold">Verifying Your Email</h1>
              <div>
                <p>Hold on while we verify your email...</p>
              </div>
            </section>
          </li>
        </ul>
      </main>
    );
  }

  return (
    <main className="flex w-full h-screen">
      <ul className='grid grid-flow-row lg:grid-cols-2 grid-rows-1 h-full bg-secondary w-full'>
        <li className='hidden lg:flex flex-col h-full bg-secondary text-white place-content-center'>
          <section className='flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden'>
            <Image src={cta_bg} alt='bg image' className='absolute inset-4 object-contain' fill />
            <Image src={Logo} alt='Company Logo' className='h-20 w-auto' />
            <p className='text-center text-lg'>Helping forward-thinking companies build <br /> top-level teams by recruiting and training </p>
            <Image src={cta_image} alt='group img' className='p-16' />
          </section>
        </li>
        <li className='flex flex-col h-full place-content-center items-center bg-white lg:rounded-tl-3xl lg:rounded-bl-3xl'>
          <section className='flex flex-col gap-8 max-w-[380px] text-center'>
            <Image src="/icons/Email.png" alt="Email Icon" className="h-12 w-auto mx-auto" width={180} height={180}/>
            <h1 className="text-3xl font-semibold">Verify Your Email Address</h1>
            <p className="text-gray-700">To confirm your email address, please click on the link in the email we sent you.</p>
            <p className="text-gray-700">Can’t find the email? Check your junk or spam folder.</p>
            <p className="text-gray-700">Still can’t find the email?</p>
            {/* <Button type='button' variant={'ghost'} onClick={resendVerifyLink} disabled={!email} className={`hover:text-underline hover:text-primary/20 ${!email ? "text-white" : "text-primary"}`}> */}
            <Button type='button'  onClick={resendVerifyLink} disabled={!email} className={`className='bg-primary  hover:text-underline hover:text-primary/20 ${!email ? "text-primary" : "text-white"}`}>
              Resend Link
            </Button>
            <p className="text-gray-700">Need help? <Link href="/contact" className="text-primary underline">Contact Us</Link></p>
          </section>
        </li>
      </ul>
    </main>
  );
}
