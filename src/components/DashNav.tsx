import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleModal } from "@/store/slices/modalSlice";
import { logoutUser } from "@/store/slices/authSlice";
import { Bars3BottomLeftIcon, XMarkIcon, BellIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import iconDashboard from "@/assets/radix-icons_dashboard.svg";
import iconApplication from "@/assets/mdi_application-edit-outline.svg";
import iconAssessment from "@/assets/healthicons_i-exam-qualification-outline.svg";
import iconCourses from "@/assets/carbon_course.svg";
import iconProfile from "@/assets/ant-design_form-outlined.svg";
import iconSupport from "@/assets/material-symbols_help-outline.svg";
import iconLogout from "@/assets/ic_baseline-log-out.svg";
import { usePathname } from "next/navigation";

// Notification type
interface Notification {
  id: number;
  message: string;
}

const NavLinks = [
  // Your navigation links here...
];

function classNames(...classes: string[]) {
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

  const dispatch = useDispatch();

  const handleLogOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(logoutUser());
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const fetchUnreadNotifications = async () => {
    // Fetch unread notifications from your service
    let unreadNotifications: Notification[] = []; // Replace with actual fetch
    setUnreadNotifications(unreadNotifications);
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
        {/* Welcome Message on the Left */}
        <li className="text-base flex gap-4 items-center">
          <h1 className="text-xl lg:text-2xl font-semibold">{currentPage}</h1>
        </li>

        {/* Notification Icon on the Right */}
        <li className="flex gap-3 items-center">
          <div className="relative">
            <Link href="/notifications" className="flex items-center justify-center w-10 h-10">
              <BellIcon className="h-6 w-6 text-black" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Bars3BottomLeftIcon
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-7 h-7 lg:hidden"
          />

          <Transition
            show={mobileMenuOpen}
            enter="transition ease-in-out duration-300 all"
            enterFrom="-translate-x-40 opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition ease-in-out duration-150 all"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-100 opacity-0"
            className="fixed inset-0 z-10"
          >
            <ul
              style={{ backgroundColor: secondaryColor }}
              className="fixed lg:hidden inset-0 text-white z-10 flex flex-col gap-3 font-medium"
            >
              <XMarkIcon
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 mb-4 ml-6 mt-5"
              />
              {NavLinks.map(({ name, link, icon, _icon, isAccord, items }) => (
                <li key={name}>
                  {isAccord ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger
                          className={classNames("hover:no-underline px-6 py-3 hover:bg-[#28255A]", pathname.includes(link) && "bg-[#28255A] font-medium text-white")}>
                          <div className="flex gap-2 text-sm items-center">
                            <Image
                              src={pathname.includes(link) ? _icon : icon}
                              alt="nav icon"
                              className="w-6 h-6"
                            />{" "}
                            {name}
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
                      href={
                        link === "/dashboard" || link === "/login"
                          ? link
                          : "/dashboard" + link
                      }
                      onClick={name === "Logout" ? handleLogOut : undefined}
                      className={classNames(
                        "px-6 py-3 flex gap-2 text-sm items-center hover:bg-opacity-20 hover:bg-white",
                        pathname.includes(link) &&
                          "bg-opacity-20 bg-white font-medium text-white"
                      )}
                    >
                      <Image
                        src={pathname.includes(link) ? _icon : icon}
                        alt="nav icon"
                        className="w-6 h-6"
                      />{" "}
                      {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>
  );
};

export default DashNav;
