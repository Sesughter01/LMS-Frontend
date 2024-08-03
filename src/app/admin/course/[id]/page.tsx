"use client";

import SideMenu from "@/components/SideMenu";
import { menu } from "@/components/layouts/AdminLayouts/menu";
import { ChevronRight } from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { formatDate } from "@/shared/utils/dateUtils";
import courseService from "@/services/api/courses";
import { extractErrorMessage } from "@/shared/utils/helper";
import Spinner from "../../../../../utilComponents/Spinner/index";
import { fetchASingleCourseDetails, fetchAllCourseStudent } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CourseContentDetails from "./container/courseContentDetails";
import CoursesStatistics from "./container/coursesStatistics";
import StudentStatistics from "./container/studentStatistics";
import { FiSettings } from "react-icons/fi";
import { notFound } from 'next/navigation';

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"contents" | "statistics" | "students">("contents");

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [loadingCourse, setLoadingCourse] = useState(false);

  const [loadingDisabledCourse, setLoadingDisabledCourse] = useState(false);

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const handleTabChange = (tab: "contents" | "statistics" | "students") => {
    setActiveTab(tab);
  };

  const assignCourseToInstructor = async (courseId: number, action?: string) => {
    try {
      const id = Number(params.id);
      //   setAssignLoadingCourses(true);
      let coursesAssigned = await courseService.assignCourseToInstructor(id, courseId, action);
      //   populateInstructorCourses(id)
      // console.log(coursesAssigned)
      console.log(action);
      toast.success(
        <>
          <div>
            {action && action == "add" ? "Course Assigned!" : "Course Removed!"}
            <div style={customMessageStyle}>The course was successfully {action && action == "add" ? "assigned" : "removed"}</div>
          </div>
        </>
      );
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      //   setAssignLoadingCourses(false);
      //   closeAssignModal()
    }
  };

  const { singleCourse, fetchASingleCourseDetailsError } = useSelector((state: RootState) => state.courses);
  const { studentsInCourse } = useSelector((state: RootState) => state.courses);

  console.log(singleCourse);

  const course = singleCourse;


  useEffect(() => {
   if(fetchASingleCourseDetailsError && fetchASingleCourseDetailsError.message == "Request failed with status code 404"){
     notFound()
   }
  }, [fetchASingleCourseDetailsError]);
   
  useEffect(() => {
    const courseId = Number(id);
    dispatch(fetchASingleCourseDetails(courseId));
    dispatch(fetchAllCourseStudent(courseId));
  }, [id, dispatch]);

  return course ? (
    <section className="h-screen overflow-hidden font-montserrat flex bg-white py-5 px-5 gap-10">
      <div className="flex-shrink-0 relative w-[350px]" style={{ transition: ".2s" }}>
        <SideMenu logoUrl={logoUrl} secondaryColor={secondaryColor} menu={menu} />
      </div>
      <main className="overflow-auto w-full space-y-8 h-full">
        <h1 style={{ color: secondaryColor }} className="flex gap-2 font-base items-center font-semibold">
          <span className="cursor-pointer text-[#7A7A7A]">Course</span>
          <ChevronRight />
          <span className="cursor-pointer text-[#7A7A7A]">{course?.courseTitle}</span>
          <ChevronRight />
          <span className="cursor-pointer">Details</span>
        </h1>

        <div className="flex items-center  justify-start gap-4">
          <svg
            className="cursor-pointer"
            onClick={() => router.push("/admin/course")}
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="28"
            viewBox="0 0 34 28"
            fill="none"
          >
            <path
              d="M2.41797 14L31.5846 14M2.41797 14L14.918 1.5M2.41797 14L14.918 26.5"
              stroke="#1A183E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col gap-4 flex-grow">
            <h1 style={{ color: secondaryColor }} className="text-3xl font-normal">
              {course?.courseTitle}
            </h1>
            <div className="flex items-center justify-start gap-2">
              {course?.status == "published" ? (
                <span className="flex items-center gap-1 bg-[#388e3c] rounded bg-opacity-[0.3] text-center text-sm text-[#388E3C] font-medium px-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M7 1.8125C5.87512 1.8125 4.7755 2.14607 3.8402 2.77102C2.90489 3.39597 2.17591 4.28423 1.74544 5.32349C1.31496 6.36274 1.20233 7.50631 1.42179 8.60958C1.64124 9.71284 2.18292 10.7263 2.97833 11.5217C3.77374 12.3171 4.78716 12.8588 5.89043 13.0782C6.99369 13.2977 8.13726 13.185 9.17651 12.7546C10.2158 12.3241 11.104 11.5951 11.729 10.6598C12.3539 9.7245 12.6875 8.62488 12.6875 7.5C12.6859 5.99207 12.0862 4.54636 11.0199 3.48009C9.95364 2.41382 8.50793 1.81409 7 1.8125ZM5.55789 9.6875H8.44211C8.14844 10.6905 7.65625 11.5945 7 12.3065C6.34375 11.5945 5.85156 10.6905 5.55789 9.6875ZM5.35938 8.8125C5.21427 7.94352 5.21427 7.05648 5.35938 6.1875H8.64063C8.78573 7.05648 8.78573 7.94352 8.64063 8.8125H5.35938ZM2.1875 7.5C2.18712 7.05618 2.24841 6.61445 2.36961 6.1875H4.47289C4.34237 7.05763 4.34237 7.94237 4.47289 8.8125H2.36961C2.24841 8.38555 2.18712 7.94382 2.1875 7.5ZM8.44211 5.3125H5.55789C5.85156 4.30953 6.34375 3.40555 7 2.69352C7.65625 3.40555 8.14844 4.30953 8.44211 5.3125ZM9.52711 6.1875H11.6304C11.8732 7.04565 11.8732 7.95435 11.6304 8.8125H9.52711C9.65763 7.94237 9.65763 7.05763 9.52711 6.1875ZM11.2859 5.3125H9.34828C9.12501 4.43395 8.75006 3.60113 8.24031 2.85156C8.89156 3.02657 9.49897 3.33594 10.0235 3.75977C10.548 4.18361 10.978 4.71252 11.2859 5.3125ZM5.75969 2.85156C5.24994 3.60113 4.87499 4.43395 4.65172 5.3125H2.71414C3.02199 4.71252 3.452 4.18361 3.97652 3.75977C4.50103 3.33594 5.10844 3.02657 5.75969 2.85156ZM2.71414 9.6875H4.65172C4.87499 10.566 5.24994 11.3989 5.75969 12.1484C5.10844 11.9734 4.50103 11.6641 3.97652 11.2402C3.452 10.8164 3.02199 10.2875 2.71414 9.6875ZM8.24031 12.1484C8.75006 11.3989 9.12501 10.566 9.34828 9.6875H11.2859C10.978 10.2875 10.548 10.8164 10.0235 11.2402C9.49897 11.6641 8.89156 11.9734 8.24031 12.1484Z"
                      fill="#388E3C"
                    />
                  </svg>
                  Published
                </span>
              ) : (
                <span className="bg-[#7A7A7A] bg-opacity-30 font-medium text-[#7A7A7A] text-center text-sm px-1 rounded">Draft</span>
              )}
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/date.svg" alt="date-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Created: {formatDate(course?.createdAt)} .</h2>
              </div>
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/course.svg" alt="admin-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Course</h2>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button className="flex items-center gap-1 text-sm mr-4">
                  <FiSettings />
                  Menu
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-[#D9D9D9]">
          <div className="flex justify-between items-center px-8">
            {/* first button */}
            <div className="flex justify-start items-center gap-20">
              <span
                className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                  activeTab === "contents" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("contents")}
              >
                Content
              </span>

              <span
                className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                  activeTab === "statistics" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("statistics")}
              >
                Statistics
              </span>

              <span
                className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                  activeTab === "students" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("students")}
              >
                Students
              </span>
            </div>
          </div>
        </div>
        {activeTab === "contents" && <CourseContentDetails data={course} awaitSubmit={assignCourseToInstructor} instructor={course} />}

        {activeTab === "statistics" && <CoursesStatistics students={course?.students} modules={course?.modules} assessments={course?.assessments} />}

        {activeTab === "students" && <StudentStatistics students={studentsInCourse} />}
      </main>

      {/* Modal */}
    </section>
  ) : (
    <div className="flex justify-center items-center my-[30px]">
      <Spinner />
    </div>
  );
}

export default Page;
