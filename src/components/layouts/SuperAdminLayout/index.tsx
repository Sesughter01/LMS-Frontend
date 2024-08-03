"use client";

import React, { useEffect, useState } from "react";
import withSuperAdmin from "../../../components/hocs/withSuperAdmin";
import { menu } from "./menu";
import { usePathname } from "next/navigation";
import SuperAdminSideMenu from "@/components/SideMenu/superAdminSideMenu";
import { selectUser} from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const SuperAdminLayout = withSuperAdmin(({ children }: any) => {
  const pathname = usePathname();
  const userDetails = useSelector((state: RootState) => selectUser(state));

  return (
    <div className="h-screen overflow-hidden flex bg-white py-5 px-5 gap-10">
      <div className="flex-shrink-0  relative w-[350px]" style={{ transition: ".2s" }}>
        <SuperAdminSideMenu menu={menu} />
      </div>

      <div className="overflow-auto w-full h-full">
        <div className="relative">{children}</div>
        {pathname === "/super-admin" && (
          <div className=" w-full bg-white">
            <div className="space-y-4">
              <p className="text-[#1A183E] font-semibold text-[25px]">Welcome, {userDetails?.profile?.firstName? userDetails.profile.firstName :"Super Admin"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default SuperAdminLayout;
