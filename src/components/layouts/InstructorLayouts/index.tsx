"use client";

import React, { useEffect, useState } from "react";
import { menu } from "./menu";
import withInstructor from "../../../components/hocs/withInstructor";
import { usePathname } from "next/navigation";
import InstructorSideMenu from "@/components/SideMenu/instructorSideMenu";
import CalendarComponent from "../AdminLayouts/utils/CalenderComponent";
import AdminCard, { AdminCardProps } from "../AdminLayouts/utils/AdminCards";
import { useDispatch, useSelector } from "react-redux";
import { InstructorDashboard } from "@/shared/types/instructor";
import { RootState } from "@/store/store";
import { getInstructorDashboard } from "@/store/slices/dashboardSlice";
import { Announcement } from "@/shared/types/announcement";
import DashboardService from "@/services/api/dashboard";
import Image from "next/image";
import { selectUser} from "@/store/slices/authSlice";

// Icons
const completeIcon = <img src="/icons/adminCard1.svg" alt="check-icon" />;
const highScore = <img src="/icons/adminCard2.svg" alt="trophy-icon" />;
const lowScore = <img src="/icons/adminCard3.svg" alt="thumbs-down icon" />;

const InstructorLayout = withInstructor(({ children }: any) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const instructorDashboard: InstructorDashboard | null = useSelector((state: RootState) => state.dashboard.instructorDashboard);
  const userDetails = useSelector((state: RootState) => selectUser(state));

  const [announcementsData, setAnnouncementsData] = useState<Announcement[]>([]);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  useEffect(() => {
    const fetchInstructorDashboard = async () => {
      try {
        await dispatch(getInstructorDashboard() as any);
      } catch (error) {
        console.error("Error fetching instructor dashboard:", error);
      }
    };

    fetchInstructorDashboard();
  }, [dispatch]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsData = await DashboardService.getAnnouncements();
        setAnnouncementsData(announcementsData as any);
        console.log(announcementsData, "announcementsData");
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const progressCardProps: AdminCardProps[] = [
    {
      icon: completeIcon,
      url: "/instructor/student",
      text: "Total Students",
      text2: `${instructorDashboard?.unique_students_enrolled || 0} Students`,
    },
    { icon: highScore, url: "", text: "Total Modules", text2: `${instructorDashboard?.total_modules || 0} Modules` },
    { icon: lowScore, url: "/instructor/assessment", text: "Total Assessments", text2: `${instructorDashboard?.total_assessments || 0} Assessments` },
  ];

  return (
    <div className="h-screen overflow-hidden flex bg-white py-5 px-5 gap-10">
      <div className="flex-shrink-0 relative w-[350px]" style={{ transition: ".2s" }}>
        <InstructorSideMenu logoUrl={logoUrl} secondaryColor={secondaryColor} menu={menu} />
      </div>

      <div className="overflow-auto w-full h-full">
        <div className="relative">{children}</div>
        {pathname === "/instructor" && (
          <div className=" w-full bg-white">
            <div className="space-y-4">
              <p className="font-semibold text-[25px]">Welcome, {userDetails?.profile?.firstName? userDetails.profile.firstName :"Instructor"}</p>

              {/* Announcement / Acrivity Card */}
              <div className="flex gap-4 items-center justify-start">
                {/* Announcement */}
                <div className="bg-white w-[647px] h-[166px] overflow-y-auto custom-scrollbar drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg">
                  <div className="p-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <p style={{ color: secondaryColor }} className="font-semibold text-lg">
                        Announcements
                      </p>
                      {/* <button style={{ borderColor: secondaryColor }} className="p-2 rounded border border-opacity-25">
                        <span style={{ color: secondaryColor }} className="font-medium text-sm">
                          Add Announcement
                        </span>
                      </button> */}
                    </div>
                    {announcementsData.map((announcement: any) => (
                      <div key={announcement.id} className="bg-[#F6F6F6] rounded-lg w-full">
                        <div className="flex py-2 items-start justify-between px-4 pb-8">
                          <div className="flex items-center justify-start gap-2">
                            <Image src={logoUrl} width={30} height={30} alt="Logo" />
                            <div className="flex flex-col">
                              <span style={{ color: secondaryColor }} className="font-semibold text-[15px]">
                                {announcement.title}
                              </span>
                              <span className="text-[#808080] text-[12px] font-medium">{announcement.announcement}</span>
                            </div>
                          </div>
                          <span className="text-[#808080] text-[12px] font-medium">{formatTime(announcement.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/*  */}
              <div className="flex gap-4 items-center justify-start">
                <div className="flex  flex-col  items-center gap-4">
                  {progressCardProps.map((props, index) => (
                    <AdminCard key={index} {...props} />
                  ))}
                </div>

                {/* distribution chart */}
                <div className="bg-white w-[400px] h-[327px] drop-shadow-lg border-2 border-gray-200 border-opacity-25 rounded-lg">
                  <div className=" py-3">
                    <p style={{ color: secondaryColor }} className="px-4 font-semibold text-lg">
                      Assigned Course
                    </p>

                    <div className="flex flex-col gap-1 mt-32 items-center justify-center text-center">
                      <p style={{ color: secondaryColor }} className="text-[15px] font-semibold">
                        You are yet to be assigned a course.
                      </p>
                      <p style={{ color: secondaryColor }} className="text-[11px] font-normal">
                        Once you’re assigned a course it will appear here.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calender */}
                <CalendarComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default InstructorLayout;
