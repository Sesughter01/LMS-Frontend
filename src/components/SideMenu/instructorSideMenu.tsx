"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import Admin from "../layouts/InstructorLayouts/icons/admin.png";
import logo from "../layouts/InstructorLayouts/icons/ingryd-logo.png";
import vector from "../layouts/InstructorLayouts/icons/Vector.png";
import { useRouter, usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useAuth } from "../../../context/AuthContext";
import { deleteCookie } from 'cookies-next';
import Image from "next/image";

export type MenuItem = {
  label: string;
  icon?: any;
  iconStyle?: "fill";
  href?: string;
  exact?: boolean;
  allowedType?: string;
  children?: MenuItem[];
  onClick?: () => void;
};

type Menu = {
  items: MenuItem[];
};

interface SideMenuProps {
  menu: MenuItem[];
  logoUrl: string;
  secondaryColor: string;
}

export function Menu({ items }: Menu) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <ul className={`${styles.menu}`}>
        {items.map((item: any, index: number) => {
          let isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <li key={`menu-item-${index}`} className={`${styles.menuItem} ${isActive && styles.active}`}>
              {item.href ? (
                <Link href={item.href}>
                  <div className="flex items-center gap-2 py-1 px-6">
                    <img src={item.icon.src} alt={item.label} />
                    {item.label}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-2 py-1 px-6" onClick={item.onClick}>
                  <img src={item.icon.src} alt={item.label} />
                  {item.label}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const InstructorSideMenu: React.FC<SideMenuProps> = ({ menu, logoUrl, secondaryColor }) => {
  const router = useRouter();
  const {dispatch: authDispatch} = useAuth();
  
  const handleLogout = () => {
    // Log to console to check if this function is being called
    console.log("Logout button clicked");


    // Clear sessionStorage values
    sessionStorage.removeItem("secondaryColor");
    sessionStorage.removeItem("logoUrl");
    sessionStorage.removeItem("orgId");
    sessionStorage.removeItem("orgName");

    // Log the current values in sessionStorage after removal
    console.log("After logout:", sessionStorage);

    // You might want to perform additional logout actions here, such as redirecting to the login page
    // or clearing user-related data in Redux or context.

    deleteCookie("account_type")
    deleteCookie("token")
    authDispatch({ type: "logout" });


    const timer = setTimeout(() => {
      router.push("/login");
    }, 0);

    return () => clearTimeout(timer);
  };

  // Update the menu array to include the onClick handler for the "Logout" item
  const updatedMenu = menu.map((item) => (item.label === "Logout" ? { ...item, onClick: handleLogout } : item));

  return (
    <div style={{ backgroundColor: secondaryColor }} className={`flex flex-col ${styles.sidemenu}`}>
      <div className={`flex w-full mb-5 items-center justify-center`}>
        <Link href="/">
          {/*<img src={logoUrl} className="w-40 pt-5" alt="logo" />*/}
          <Image
            src="/images/logo.avif"
            width={50}
            height={50}
            alt="Company Logo"
            className="place-self center h-16 w-auto my-4 object-contain mt-8"
          />
      </Link>
      </div>
      <div className={`flex justify-between items-center px-6 py-6`}>
        <div className="flex items-center gap-2">
          <p className="text-white text-base font-medium">Instructor</p>
        </div>
        {/* <div className="px-2 py-2 bg-[#2C2884]">
           <img src={vector.src} className="w-2.5  text-white" alt="dropdown" />
        </div> */}
      </div>
      <nav className="mt-5">
        <Menu items={updatedMenu} />
      </nav>
      <p className={`text-sm text-white text-center font-medium pb-5 bg-${secondaryColor}`}>
        Powered by <span className="font-bold">Ingryd</span>
      </p>
    </div>
  );
};

export default InstructorSideMenu;
