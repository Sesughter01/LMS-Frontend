"use client";

import SideBar from "@/components/SideBar";
import DashNav from "@/components/DashNav";
import { usePathname } from "next/navigation";

import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import OnboardingTemplate from "./components/OnboardingTemplate";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAStudentById } from '@/store/slices/studentSlice';

const Page = () => {
  const pathname = usePathname();
  const dispatch = useDispatch()

  const authUser = useSelector((state: RootState) => state.auth.user);
  const userData = useSelector((state: RootState) => state.user);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationName = sessionStorage.getItem("orgName") || "";


  console.log("Auth Profile Data", authUser);
  // console.log("User Form Data", userData.user);

  // Old Way PB was doing it Start

  // useEffect(() => {
  //    dispatch(fetchAStudentById(authUser.id));
  // }, [authUser])

  // Old Way PB was doing it End

  // Refactored UseEffect Hook to only retrieve authUser Id if its not null or in session
  useEffect(() => {
    if (authUser && authUser.id) {
      dispatch(fetchAStudentById(authUser.id));
    }
  }, [authUser]);

  return (
    <section className="flex w-full min-h-screen h-auto">
      <SideBar logoUrl={logoUrl} secondaryColor={secondaryColor} />
      <main className="grow shrink-0 max-w-full lg:max-w-[77%] flex flex-col gap-6">
        <DashNav
          secondaryColor={secondaryColor}
          currentPage={`Welcome to ${organizationName}, ${authUser?.profile.firstName}`}
        />
        <section className="grow px-4 lg:px-8 flex flex-col gap-8 pb-12">
          <p className="text-xl">Please complete your profile</p>

          <OnboardingTemplate />
        </section>
      </main>
    </section>
  );
};

export default Page;
