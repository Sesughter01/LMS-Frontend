"use client"



import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import iconBar from '@/assets/Group 845.svg'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { selectUser } from "@/store/slices/authSlice";
import Logo from '@/assets/logo.png'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserTypes } from "@/lib/constants";
import { useAuth } from "../../context/AuthContext";

// import Logo from "@/assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Employers", href: "/employers" },
  { name: "Techies", href: "/techies" },
  { name: "Partners", href: "/partners" },
  { name: "Program Structure", href: "/program-structure" },
];


const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userAuthDetails, setUserAuthDetails] = useState<any>(null)
    const {computed: {homePath}, state: {isAuthenticated }} = useAuth();
    const userDetails = useSelector((state: RootState) => selectUser(state));

    useEffect(() => {
        if(userDetails){
            setUserAuthDetails(userDetails)
        }else{
            setUserAuthDetails(false)
        }
    }, [userDetails])

     console.log("userDetails", userDetails)


    return (
      <header className="flex flex-col z-50">
        <nav
          className="bg-black text-white flex items-center justify-between px-6 py-6 lg:py-10 lg:px-16"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                            className="h-16 w-auto max-h-16 object-contain"
                            src={Logo}
                            alt="logo"
                        />
            </a>
          </div>

          <div className=" lg:hidden relative inline-block ">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Image src={iconBar} className="w-6 h-6" alt="icon" />
            </button>
            {
              <Transition
                show={mobileMenuOpen}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="lg:hidden fixed bg-black p-8 flex flex-col gap-10 inset-0">
                  <div className="inline-flex items-center justify-end rounded-md ">
                    <XMarkIcon
                      className="w-8 h-8"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                  </div>
                  {navigation.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm leading-6 text-center hover:text-primary"
                    >
                      {item.name}
                    </a>
                  ))}

                  <div className="flex flex-col gap-6">
                    {!isAuthenticated ?
                      <>
                        <Button
                            asChild
                            variant={"outline"}
                            className="border-primary text-primary hover:text-primary"
                        >
                            <Link href="/login" className="">
                                Sign In
                            </Link>
                        </Button>
                        <Button asChild className="bg-primary">
                            <Link href="/signup" className="">
                                Sign up
                            </Link>
                        </Button>
                      </>: 
                        <Button asChild className="bg-primary">
                            <Link href={homePath} className="">
                                Dashboard
                            </Link>
                        </Button>   
                    }
                    
                  </div>
                </div>
              </Transition>
            }
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item,index) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm leading-6 hover:text-primary ${index === navigation.length - 1 ? 'mr-4' : ''}`}
                // className="text-sm leading-6 hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6">
            {!isAuthenticated ? 
            <>
              <Button
              asChild
              variant={"outline"}
              className="border-primary text-primary hover:text-primary px-4 py-2 min-w-[80px]"
            >
              <Link href="/login" className="whitespace-nowrap">
                Sign In
              </Link>
            </Button>
            <Button asChild className="bg-primary px-4 py-2 min-w-[80px]">
              <Link href="/signup" className="whitespace-nowrap">
                Sign up
              </Link>
            </Button>
            </>: 
            <Button asChild className="bg-primary px-4 py-2 min-w-[80px]">
              <Link href={homePath} className="whitespace-nowrap">
                Dashboard
              </Link>
            </Button>
        }
          
          </div>
        </nav>

      </header>
    );
}

export default NavBar;
