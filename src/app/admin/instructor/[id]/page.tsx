"use client";

import SideMenu from "@/components/SideMenu";
import { menu } from "@/components/layouts/AdminLayouts/menu";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import UserDetails from "./container/userDetails";
import Courses from "./container/courses";
import DisableModal from "./Modals/disableModal";
import AssignCourseModal from "./Modals/assignCourseModal";
import { Instructor } from "@/shared/types/instructor";
import { CourseDetail, Course } from "@/shared/types/course";
import { Programme } from "@/shared/types/programme";
import { extractErrorMessage } from "@/shared/utils/helper";
import instructorService from "@/services/api/instructors";
import courseService from "@/services/api/courses";
import { GetDefaultProgramme } from "@/services/api/programme";
import { toast } from "react-toastify";
import { formatDate } from "@/shared/utils/dateUtils";
import Spinner from "../../../../../utilComponents/Spinner/index";
import { fetchAllCourses } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"userDetails" | "courses">("userDetails");

  const [isModalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const dispatch = useDispatch();

  const { allCourses, status, error } = useSelector((state: RootState) => state.courses);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openAssignModal = () => setAssignModalOpen(true);
  const closeAssignModal = () => setAssignModalOpen(false);

  const [instructor, setInstructor] = useState<Instructor | any>();
  const [loadingInstructor, setLoadingInstructor] = useState(false);
  const [instructorCourses, setInstructorCourses] = useState<CourseDetail | any>();
  const [loadingInstructorCourses, setLoadingInstructorCourses] = useState(false);
  const [loadingDisabledInstructor, setLoadingDisabledInstructor] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [assignLoadingCourses, setAssignLoadingCourses] = useState(false);

  const [defaultProgramme, setDefaultProgramme] = useState<Programme>();

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  const courses = allCourses;
  console.log(courses);

  const handleTabChange = (tab: "userDetails" | "courses") => {
    setActiveTab(tab);
  };

  const customMessageStyle = {
    marginTop: "2px",
    marginLeft: "2px",
    fontSize: "14px",
  };

  const populateInstructor = async (id: number) => {
    try {
      setLoadingInstructor(true);
      let fetchInstructor = await instructorService.GetInstructorsById(id);
      setInstructor(fetchInstructor);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingInstructor(false);
    }
  };

  const populateInstructorCourses = async (id: number) => {
    try {
      setLoadingInstructorCourses(true);
      let fetchInstructorCourses = await instructorService.GetInstructorCourses(id);
      setInstructorCourses(fetchInstructorCourses);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingInstructorCourses(false);
    }
  };

  const disabledInstructorClick = async () => {
    try {
      const id = Number(params.id);
      const status = instructor?.disabled;
      const isEmailVerified = instructor?.isEmailVerified;
      if (isEmailVerified) {
        setLoadingDisabledInstructor(true);
        let disabledInstructor = await instructorService.disabledInstructor(id, status);
        setInstructor(disabledInstructor);
        // console.log(disabledInstructor)
        toast.success(
          <>
            <div>
              {disabledInstructor?.disabled ? "Disabled" : "Enabled"}
              <div style={customMessageStyle}>The instructor has been ${disabledInstructor?.disabled ? "disabled" : "enabled"}</div>
            </div>
          </>
        );
      } else {
        toast.error("Instructor account not yet verified");
      }
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingDisabledInstructor(false);
      closeModal();
    }
  };

  const assignCourseToInstructor = async (courseId: number, action?: string) => {
    try {
      const id = Number(params.id);
      setAssignLoadingCourses(true);
      let coursesAssigned = await courseService.assignCourseToInstructor(id, courseId, action);
      populateInstructorCourses(id);
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
      setAssignLoadingCourses(false);
      closeAssignModal();
    }
  };

  useEffect(() => {
    const instructorId = Number(id);
    populateInstructor(instructorId);
    populateInstructorCourses(instructorId);
    // getAllCourses()
    dispatch(fetchAllCourses());
  }, [id, dispatch]);

  return instructor ? (
    <section className="h-screen overflow-hidden font-montserrat flex bg-white py-5 px-5 gap-10">
      <div className="flex-shrink-0 relative w-[350px]" style={{ transition: ".2s" }}>
        <SideMenu logoUrl={logoUrl} secondaryColor={secondaryColor} menu={menu} />
      </div>
      <main className="overflow-auto w-full space-y-8 h-full">
        <h1 style={{ color: secondaryColor }} className="flex gap-2 font-base items-center font-semibold">
          <span className="cursor-pointer" onClick={() => router.push("/admin/instructor")}>
            Instructor
          </span>
          <ChevronRight />
          <span className="cursor-pointer" onClick={() => router.push(`/admin/instructor/${params.id}`)}>
            View Instructor
          </span>
        </h1>

        <div className="flex items-center justify-start gap-4">
          {/*<img src={instructor?.profile.avatar || "/images/instructor-profile.svg"} alt="profile image" />*/}
          <img className="w-[100px] h-[100px]" src={instructor?.profile.avatar || "/images/default-avatar.png"} alt="profile image" />
          <div className="flex flex-col gap-4">
            <h1 style={{ color: secondaryColor }} className="text-3xl font-normal">
              {instructor?.profile?.firstName || "_ _ _"} {instructor?.profile?.lastName || "_ _ _"}
            </h1>
            <div className="flex items-center justify-start gap-2">
              {instructor?.isEmailVerified && !instructor?.disabled ? (
                <span className="bg-[#388e3c] rounded bg-opacity-[0.3] text-center text-sm text-[#388E3C] font-medium px-1">Active</span>
              ) : (
                <span className="bg-[#7A7A7A] bg-opacity-30 font-medium text-[#7A7A7A] text-center text-sm px-1 rounded">Pending</span>
              )}
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/date.svg" alt="date-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">{formatDate(instructor?.createdAt)} .</h2>
              </div>
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/instructor.svg" alt="instructor-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Instructor</h2>
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
                  activeTab === "userDetails" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("userDetails")}
              >
                User details
              </span>
              <span
                className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                  activeTab === "courses" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("courses")}
              >
                Courses
              </span>
            </div>
            {/* second button */}
            <div className="flex justify-start items-center gap-4">
              {instructor?.isEmailVerified && !instructor?.disabled ? (
                <button
                  onClick={openModal}
                  style={{ backgroundColor: secondaryColor }}
                  className="rounded-lg px-4 py-1 text-white font-semibold text-base"
                >
                  Disable
                </button>
              ) : (
                <button
                  onClick={openModal}
                  style={{ backgroundColor: secondaryColor }}
                  className="rounded-lg px-4 py-1 text-white font-semibold text-base"
                >
                  Enable
                </button>
              )}

              <button
                onClick={openAssignModal}
                style={{ backgroundColor: secondaryColor }}
                className="rounded-lg px-4 py-1 text-white font-semibold text-base"
              >
                Assign Course
              </button>
            </div>
          </div>
        </div>
        {activeTab === "userDetails" ? (
          <UserDetails secondaryColor={secondaryColor} data={instructor} />
        ) : (
          <Courses data={instructorCourses} awaitSubmit={assignCourseToInstructor} instructor={instructor} secondaryColor={secondaryColor} />
        )}
      </main>

      {/* Modal */}
      <DisableModal isOpen={isModalOpen} onClose={closeModal} awaitSubmit={disabledInstructorClick} secondaryColor={secondaryColor} />
      <AssignCourseModal
        isOpen={assignModalOpen}
        onClose={closeAssignModal}
        courses={courses}
        awaitSubmit={assignCourseToInstructor}
        secondaryColor={secondaryColor}
      />
    </section>
  ) : (
    <div className="flex justify-center items-center my-[30px]">
      <Spinner />
    </div>
  );
}

export default Page;
