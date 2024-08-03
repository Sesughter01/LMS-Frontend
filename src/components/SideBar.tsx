"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Logo from "@/assets/logo.png";
import imgPrp from "@/assets/defaultAvatar.jpg";

//icons
import iconDashboard from "@/assets/radix-icons_dashboard.svg";
import _iconDashboard from "@/assets/radix-icons_dashboard.svg";
import iconApplication from "@/assets/mdi_application-edit-outline.svg";
import _iconApplication from "@/assets/mdi_application-edit-outline.svg";
import iconAssessment from "@/assets/healthicons_i-exam-qualification-outline.svg";
import _iconAssessment from "@/assets/healthicons_i-exam-qualification-outline.svg";
import iconCourses from "@/assets/carbon_course.svg";
import _iconCourses from "@/assets/carbon_course.svg";
import iconProfile from "@/assets/ant-design_form-outlined.svg";
import _iconProfile from "@/assets/ant-design_form-outlined.svg";
import iconSupport from "@/assets/material-symbols_help-outline.svg";
import _iconSupport from "@/assets/material-symbols_help-outline.svg";
import iconLogout from "@/assets/ic_baseline-log-out.svg";
import _iconLogout from "@/assets/ic_baseline-log-out.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { RootState } from "@/store/store";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MapPin, School, User } from "lucide-react";
import { Button } from "./ui/button";

import { useAuth } from "../../context/AuthContext";
import { deleteCookie } from 'cookies-next';


const NavLinks = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: iconDashboard,
    _icon: _iconDashboard,
    isAccord: false,
  },
  {
    name: "Courses",
    link: "/courses",
    icon: iconCourses,
    _icon: _iconCourses,
    isAccord: false,
  },
  {
    name: "Assessment",
    link: "/assessment",
    icon: iconAssessment,
    _icon: _iconAssessment,
    isAccord: false,
  },
  {
    name: "Payment",
    link: "/history",
    icon: iconCourses,
    _icon: _iconCourses,
    isAccord: false,
  },
  // {
  //     name: 'My Profile',
  //     link: '/profile',
  //     icon: iconProfile,
  //     _icon: _iconProfile,
  //     isAccord: false
  // },
  // {
  //   name: "My Application",
  //   link: "/application",
  //   icon: iconApplication,
  //   _icon: _iconApplication,
  //   isAccord: false,
  // },
  {
      name: 'Help & Support',
      link: '#',
      icon: iconSupport,
      _icon: _iconSupport,
      isAccord: true,
      items: [
        {
            name: 'Support',
            link: '/support'
        },
        {
            name: 'FAQs',
            link: '/faqs'
        }
      ]
  },
  {
    name: "Logout",
    // link: "/login",
    icon: iconLogout,
    _icon: _iconLogout,
    isAccord: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface SideBarProps {
  logoUrl: any;
  secondaryColor: string;
}

const SideBar: React.FC<SideBarProps> = ({ logoUrl, secondaryColor }) => {
  const authUser = useSelector((state: RootState) => state.auth.user);

  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const {dispatch: authDispatch} = useAuth();

  const handleLogOut = async (e: any) => {
    
    e.preventDefault();
    
    // Clear sessionStorage values
    sessionStorage.removeItem("secondaryColor");
    sessionStorage.removeItem("logoUrl");
    sessionStorage.removeItem("orgId");
    sessionStorage.removeItem("orgName");

    deleteCookie("account_type")
    deleteCookie("token")

    authDispatch({ type: "logout" });

    await dispatch(logoutUser());

    // router.push("/login");
    window.location.href = "/login";
  };

  return (
    <section className="hidden lg:block w-[23%] sticky -top-0 grow-0 shrink-0 h-screen p-4">
      <nav
        style={{ backgroundColor: secondaryColor }}
        className="flex flex-col bg-[#1A183E] text-white rounded-3xl shadow-lg shadow-slate-500 justify-between h-full"
      >
        <div className="flex flex-col gap-10">
          {/*<Image src={logoUrl} width={100} height={100} alt="company logo" className="place-self center h-16 w-auto my-4 object-contain mt-8" />*/}
            <Image
            src="/images/logo.avif"
            width={50}
            height={50}
            alt="Company Logo"
            className="place-self center h-16 w-auto my-4 object-contain mt-8"
          />
          <div className="flex justify-between gap-2 px-4 items-center">
            <div className="flex items-center gap-2">
              <Image 
              src={authUser?.profile.avatarImageUrl || imgPrp} 
              alt="profile image" 
              className="w-10 aspect-square rounded-full object-cover" 
              width={100}
              height={100}
              />
              <p>
                {authUser?.profile.firstName} {authUser?.profile.lastName}
              </p>
            </div>
            <DropdownMenu>
              {/* Sakirat Edit */}
              <DropdownMenuTrigger>
                <Button type="button" className="bg-[#2C2884]">
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='bg-white w-full'>
                                {/* <DropdownMenuLabel>My Profile</DropdownMenuLabel> */}
                                <DropdownMenuSeparator />
                                {/* <DropdownMenuItem className='flex gap-2 pr-24 data-[highlighted]:bg-gray-100 cursor-pointer items-center'><User /> Personal</DropdownMenuItem> */}
                                {/* <DropdownMenuItem className='flex gap-2 pr-24 data-[highlighted]:bg-gray-100 cursor-pointer items-center'><MapPin /> Address</DropdownMenuItem> */}
                                {/* <DropdownMenuItem className='flex gap-2 pr-24 data-[highlighted]:bg-gray-100 cursor-pointer items-center'><School /> Education</DropdownMenuItem> */}
                                <DropdownMenuItem className='flex gap-2 pr-24 data-[highlighted]:bg-gray-100 cursor-pointer items-center'>View Profile</DropdownMenuItem>
                                <DropdownMenuItem className='flex gap-2 pr-24 data-[highlighted]:bg-gray-100 cursor-pointer items-center'>Payments</DropdownMenuItem>
                            </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ul className="flex flex-col gap-3 font-medium mr-14">
            {NavLinks.map(({ name, link, icon, _icon, isAccord,items }) => (
              <li key={name}>
                {isAccord ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger
                        className={classNames(
                          "hover:no-underline px-6 py-3 hover:bg-white hover:bg-opacity-20  rounded-tr-full rounded-br-full ",
                          pathname.includes(link) && "bg-opacity-20 bg-white font-medium text-white"
                        )}
                      >
                        <div className="flex gap-2 text-sm items-center ">
                          <Image src={pathname.includes(link) ? _icon : icon} alt="nav icon" className="w-6 h-6" /> {name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="ml-8">
                        {
                          items?.map((item, index) => (
                              // eslint-disable-next-line react/jsx-key
                              <Link href={'' + item.link} className='px-6 py-3 flex gap-2 text-sm items-center rounded-full hover:bg-[#28255A]'>
                                  {item.name}
                              </Link>
                          ))
                        }
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    href={link === "/dashboard" || link === "/login" ? link : "/dashboard" + link}
                    onClick={name === "Logout" ? handleLogOut : undefined}
                    className={classNames(
                      "px-6 py-3 flex gap-2 text-sm items-center hover:bg-opacity-20 hover:bg-white rounded-tr-full rounded-br-full ",
                      pathname.endsWith(link) && "bg-opacity-20 bg-white font-medium text-white"
                    )}
                  >
                    <Image src={pathname.includes(link) ? _icon : icon}
                     alt="nav icon" 
                     className="w-6 h-6" 
                     /> {name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* <div className='mb-8 hover:bg-gray-100 font-medium'>
                    <Link href={'/'} className='flex gap-2 px-6 py-3 items-center hover:text-primary' onClick={(e) => handleLogOut(e)}><Image src={iconLogout} alt="icon dashboard" className='w-6 h-6' /> Log out</Link>
                </div> */}
      </nav>
    </section>
  );
};

export default SideBar;
