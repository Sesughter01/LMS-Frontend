"use client"

import Image from 'next/image'

import Link from 'next/link'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Logo from '@/assets/logo.png'
import cta_image from '@/assets/Group 710.png'
import cta_bg from '@/assets/Group 96.png'
import { setNewPassword } from '@/services/AuthService'
import { toast } from 'react-toastify'


export default function LoginPage() {

    // const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState(searchParams.get('token'))
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validate, setValidate] = useState('')

    const validateInput = () => {
        if (password.length < 8) {
            setValidate("Password is too short");

        } else if (password !== confirmPassword) {
            setValidate("Passwords don't match");
        }
        else {
            setValidate("")
        }
    }

    useEffect(() => {
        validateInput()
    }, [password, confirmPassword])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        if (validate) {
            toast.warning(validate, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if (!validate) {
            try {
                setIsSubmitting(true);
                const response = await setNewPassword(password, token);
                toast.success("Password reset successfull. Redirecting you to the login page", {
                        position: toast.POSITION.TOP_RIGHT
                 });      
                setTimeout(() => {
                    router.push(`/login`);
                }, 5000)
            } catch (err) {
               console.log("err", err)
                toast.error(err?.response?.data?.message || "Couldn't resend link at this moment", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } finally {
                setIsSubmitting(false);
            }
        }

    };

    return (
        <>
            <main className="flex w-full h-screen">
                <ul className='grid grid-flow-row grid-cols-2 grid-rows-1 h-full bg-secondary'>
                    <li className='flex flex-col h-full bg-secondary text-white place-content-center'>
                        <section className='flex flex-col gap-8 px-24 py-24 items-center relative overflow-hidden'>
                            <Image src={cta_bg} alt='bg image' className='absolute inset-4 object-contain' fill />
                            <Image src={Logo} alt='Company Logo' className='h-20 w-auto' />
                            <p className='text-center text-lg'>Helping forward-thinking companies build <br /> top-level teams by recruiting and training </p>
                            <Image src={cta_image} alt='group img' className='p-16' />
                        </section>

                    </li>
                    <li className='flex flex-col h-full place-content-center items-center bg-white rounded-tl-3xl rounded-bl-3xl'>
                        <section className='flex flex-col gap-8 min-w-[380px]'>
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-2xl font-bold'>Reset password</h1>
                                <small className='text-gray-500'>Set a new password  for your account</small>
                            </div>

                            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                                <div className='flex flex-col gap-2 '>
                                    <small className='text-xs font-semibold'>New Password</small>
                                    <input type="password" id="new-password" className='outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300' placeholder='Input your password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <small className='text-xs font-semibold'>Confirm Password</small>
                                    <input type="password" id="conf-password" className='outline-0 text-sm border px-3 py-2 rounded-sm border-gray-300' placeholder='Input your password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <button type="submit" className='p-3 rounded-md bg-primary text-xs text-center mt-4 text-white' disabled={isSubmitting}>{isSubmitting ? 'Please wait...' : 'Reset Password'}</button>

                            </form>

                        </section>

                    </li>

                </ul>

            </main>

        </>
    )
}
