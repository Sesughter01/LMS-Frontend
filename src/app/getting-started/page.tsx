/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import heroBanner from '@/assets/riskwes.png'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../context/AuthContext";
import { deleteCookie } from "cookies-next";

export default function page() {
  const router = useRouter();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const orgName = sessionStorage.getItem("orgName") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

    const { dispatch: authDispatch } = useAuth();

    const handleLogout = () => {
        sessionStorage.removeItem("secondaryColor");

        deleteCookie("account_type");
        deleteCookie("token");
        authDispatch({ type: "logout" });
        router.push("/login");
      };

    return (
        <div className='flex flex-col h-screen'>
            <nav>
                <ul className='flex justify-end p-8 gap-6 items-center'>
                    <li>{authUser && `${authUser.profile.firstName} ${authUser.profile.lastName}`}</li>
                    <li>
                        <Button variant="outline" onClick={handleLogout}>Logout</Button>
                    </li>
                </ul>
            </nav>
            <section className="flex flex-col grow justify-center py-8">
                <ul className="flex flex-col-reverse lg:flex-row items-center gap-4">
                    <li className="flex flex-col gap-10 px-8 lg:px-16">
                        <div>
                            <h1 className="text-3xl font-semibold">Welcome to the <b className='text-secondary'>INGRYD</b> platform!</h1>
                            <p>As you embark on your educational voyage, here&#39;s what awaits:</p>
                        </div>
                        <div>
                            <p>
                                <b>Pre-Assessment Phase: </b>
                                Begin with a foundational pre-assessment in computer science knowledge.
                                Following this, embark on a course-specific assessment tailored to your chosen subject.
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Score Milestones: </b>
                                Achieve an average score of 65% or higher, and you&#39;ll earn a coveted coupon code granting
                                you complimentary course enrollment. For those close to the mark, a spot on our waiting list beckons.
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Continuous Progress: </b>
                                Scores below 65% lead you toward our next student cohort, a golden opportunity to refine your skills.
                                Whether you&#39;re strengthening your understanding or diving deeper into a subject.
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Flexible Rewards: </b>
                                If you secure 65% in the basic assessment but not in the course-specific evaluation (or vice versa),
                                you&#39;ll still receive a valuable coupon code.
                            </p>
                        </div>
                        <div>
                            <Button asChild className='bg-[#1A183E] px-4 py-3'>
                                <Link href={"/dashboard"} className=''>Continue
                                    <ChevronRight />
                                </Link>
                            </Button>
                        </div>
                    </li>
                    <li className="px-10">
                        <Image src={heroBanner} alt="hero banner" className='' />
                    </li>
                </ul>
            </section>
            <footer>
                <ul className='flex flex-col md:flex-row justify-between items-center p-5 md:p-10 bg-secondary text-white'>
                    <li className="mb-3 md:mb-0">
                        <p className="text-center md:text-left">Copyright {new Date().getFullYear()} Ingryd | All Rights Reserved</p>
                    </li>
                    <li className="flex gap-3">
                        <a href="https://web.facebook.com/profile.php?id=100094777950769&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease-in-out', textDecoration: 'none', color: 'white' }}>
                            <FaFacebookSquare size={30} />
                        </a>
                        <a href="https://www.instagram.com/ingrydacademy/" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease-in-out', textDecoration: 'none', color: 'white' }}>
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://www.linkedin.com/company/ingrydacademy/" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease-in-out', textDecoration: 'none', color: 'white' }}>
                            <FaLinkedin size={30} />
                        </a>
                        <a href="https://twitter.com/INGRYDAcademy" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.3s ease-in-out', textDecoration: 'none', color: 'white' }}>
                            <FaSquareXTwitter size={30} />
                        </a>
                    </li>
                </ul>
            </footer>



        </div>
    )
}
