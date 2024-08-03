"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import logo from "../layouts/SuperAdminLayout/icons/ingryd-logo.png";
import vector from "../layouts/SuperAdminLayout/icons/Vector.png";
import { useRouter, usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useAuth } from "../../../context/AuthContext";
import { deleteCookie } from 'cookies-next';

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

const SuperAdminSideMenu: React.FC<SideMenuProps> = ({ menu }) => {
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

  const updatedMenu = menu.map((item) =>
    item.label.toLowerCase() === "logout" ? { ...item, onClick: handleLogout } : item
  );

  return (
    <div className={`flex flex-col ${styles.sidemenu}`}>
      <div className="flex w-full mb-5 items-center justify-center">
        <Link href="/">
          <img src={logo.src} className="w-40 pt-5" alt="logo" />
        </Link>
      </div>
      <div className="flex justify-between items-center px-6 py-6">
        <div className="flex items-center gap-2">
          {/* <img src={Admin.src} className="w-10" alt="admin-person" /> */}
          <p className="text-white text-base font-medium">Super Admin</p>
        </div>
        <div className="px-2 py-2 bg-[#2C2884]">
          <img src={vector.src} className="w-2.5  text-white" alt="dropdown" />
        </div>
      </div>
      <nav className="mt-5">
        <Menu items={updatedMenu} />
      </nav>
      <p className="text-sm text-white text-center font-medium pb-5">
        Powered by <span className="font-bold">Ingryd</span>
      </p>
    </div>
  );
};

export default SuperAdminSideMenu;
