import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import vector from "../layouts/AdminLayouts/icons/Vector.png";
import { logoutUser } from "@/store/slices/authSlice";
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
  isOpen: boolean; // Added isOpen prop
}

export function Menu({ items }: Menu) {
  return (
    <div>
      <ul className={`${styles.menu}`}>
        {items.map((item: any, index: number) => {
          return (
            <li key={`menu-item-${index}`} className={`${styles.menuItem}`}>
              {item.href ? (
                <Link href={item.href}>
                  <div className="flex items-center gap-2 py-1 px-6">
                    <img src={item.icon.src} alt={item.label} />
                    {item.label}
                  </div>
                </Link>
              ) : (
                <div
                  className="flex items-center gap-2 py-1 px-6"
                  onClick={item.onClick} // Add onClick handler here
                >
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

const SideMenu: React.FC<SideMenuProps> = ({ menu, logoUrl, secondaryColor, isOpen }) => {

  const {dispatch: authDispatch} = useAuth();

  const handleLogout = () => {
    sessionStorage.removeItem("secondaryColor");
    sessionStorage.removeItem("logoUrl");
    sessionStorage.removeItem("orgId");
    sessionStorage.removeItem("orgName");
    
    deleteCookie("account_type")
    deleteCookie("token")
    authDispatch({ type: "logout" });
  };

   const updatedMenu = menu.map((item) => (item.label === "Logout" ? { ...item, onClick: handleLogout } : item));


  return (
    <div style={{  backgroundColor: secondaryColor, position: 'fixed', width: '20vw',  overflow: 'auto' }} className={`${styles.sidemenu} ${isOpen ? styles.open : ""}`}>
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
          <p className="text-white text-base font-medium">Admin</p>
        </div>
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

export default SideMenu;
