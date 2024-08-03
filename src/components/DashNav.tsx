import { GetAllUnreadNotifications } from "@/services/api/notifications";
import { BellIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Bell, MapPin, School, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleModal } from '@/store/slices/modalSlice';
import ProfileModal from './ProfileModal';
import imgPrp from "@/assets/defaultAvatar.jpg";

import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

import { Transition } from "@headlessui/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
import { usePathname } from "next/navigation";
import { logoutUser } from "@/store/slices/authSlice";

const NavLinks = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: iconDashboard,
    _icon: _iconDashboard,
    isAccord: false,
  },
  {
    name: "My Application",
    link: "/application",
    icon: iconApplication,
    _icon: _iconApplication,
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
    name: "Courses",
    link: "/courses",
    icon: iconCourses,
    _icon: _iconCourses,
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
  //     name: 'Help & Support',
  //     link: '#',
  //     icon: iconSupport,
  //     _icon: _iconSupport,
  //     isAccord: true,
  //     items: [
  //         {
  //             name: 'FAQs',
  //             link: '/faqs'
  //         },
  //         // {
  //         //     name: 'Suport',
  //         //     link: '/support'
  //         // }
  //     ]
  // },
  {
    name: "Logout",
    link: "/login",
    icon: iconLogout,
    _icon: _iconLogout,
    isAccord: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface DashNavProps {
  secondaryColor: string;
  currentPage?: string;
}

const DashNav: React.FC<DashNavProps> = ({ currentPage, secondaryColor }) => {
  const pathname = usePathname();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const authUser = useSelector((state: RootState) => state.auth.user);

  console.log("USER CURRENT STATE : ", authUser)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [unreadNotifications, setunreadNotiifcations] = useState<Notification[]>();

  const dispatch = useDispatch();

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    await dispatch(logoutUser());
    // Clear sessionStorage values
    sessionStorage.removeItem("secondaryColor");
    sessionStorage.removeItem("logoUrl");
    sessionStorage.removeItem("orgId");
    sessionStorage.removeItem("orgName");
    // router.push("/login");
    window.location.href = "/login";
  };

  const fetchUnreadNotifications = async () => {
    let unreadNotifications = await GetAllUnreadNotifications();
    setunreadNotiifcations(unreadNotifications);
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  const handleViewProfile = () => {
    dispatch(toggleModal(true));
  };

  return (
    <nav>
      <ul className="flex justify-between items-center px-4 lg:px-8 py-4 lg:pt-6">
        <li className="flex gap-3 items-center">
          <Bars3BottomLeftIcon onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-7 h-7 lg:hidden" />

          {/* Mobile Dropdown */}
          <Transition
            show={mobileMenuOpen}
            enter="transition ease-in-out duration-300 all"
            enterFrom="-translate-x-40 opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition ease-in-out duration-150 all"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-100 opacity-0"
            className={" fixed inset-0 z-10"}
          >
            <ul style={{ backgroundColor: secondaryColor }} className="fixed lg:hidden inset-0 text-white z-10 flex flex-col gap-3 font-medium">
              <XMarkIcon onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-9 h-9 mb-4 ml-6 mt-5" />
              {NavLinks.map(({ name, link, icon, _icon, isAccord, items }) => (
                <li key={name}>
                  {isAccord ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger
                          className={classNames(
                            "hover:no-underline px-6 py-3 hover:bg-[#28255A] ",
                            pathname.includes(link) && "bg-[#28255A] font-medium text-white"
                          )}
                        >
                          <div className="flex gap-2 text-sm items-center ">
                            <Image src={pathname.includes(link) ? _icon : icon} alt="nav icon" className="w-6 h-6" /> {name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="ml-8">
                          {items?.map((item, index) => (
                            <Link
                              key={index}
                              href={"" + item.link}
                              className="px-6 py-3 flex gap-2 text-sm items-center rounded-full hover:bg-[#28255A]"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={link === "/dashboard" || link === "/login" ? link : "/dashboard" + link}
                      onClick={name === "Logout" ? handleLogOut : undefined}
                      className={classNames(
                        "px-6 py-3 flex gap-2 text-sm items-center hover:bg-opacity-20 hover:bg-white",
                        pathname.includes(link) && "bg-opacity-20 bg-white font-medium text-white"
                      )}
                    >
                      <Image 
                      src={pathname.includes(link) ? _icon : icon} 
                      alt="nav icon" 
                      className="w-6 h-6" 
                      /> {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Transition>

          <h1 className="text-xl lg:text-2xl font-semibold">{currentPage}</h1>
        </li>
        <li className="text-base flex gap-4 items-center">
          {/* <button
                        type="button"
                        className="relative p-1 text-gray-700 focus:outline-none"
                    >
                        {unreadNotifications && unreadNotifications.length > 0 && <span className="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white bg-primary border-2 border-gray-200 rounded-full top-0 right-0">2</span>}
                        <Bell className="h-8 w-8" />
                    </button> */}
            <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {/* <Image
                  src={authUser?.profile.avatarImageUrl || imgPrp}
                  alt="profile image"
                  className="w-10 aspect-square border border-gray-500 rounded-full object-cover"
                  width={100}
                  height={100}
                /> */}
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align='end' className='bg-white w-full'>
                                
                            </DropdownMenuContent> */}

              <DropdownMenuContent align='end' className='bg-white w-full'>
                {/* <DropdownMenuItem onSelect={handleViewProfile}>View Profile</DropdownMenuItem> */}
                <DropdownMenuItem >
                   <Link href="/dashboard/profile">View Profile</Link>
                  
                  </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => alert('Payments')}>Payments</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => alert('Logout')}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isModalOpen && <ProfileModal />}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default DashNav;
