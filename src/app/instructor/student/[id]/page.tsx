"use client";

import SideMenu from "@/components/SideMenu";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import UserDetails from "./container/userDetails";
import Courses from "./container/courses";
import DisableModal from "./Modals/disableModal";
import studentService from "@/services/api/students";
import { extractErrorMessage } from "@/shared/utils/helper";
import { Student } from "@/shared/types/student";
import { toast } from "react-toastify";
import { formatDate } from "@/shared/utils/dateUtils";
import Spinner from "../../../../../utilComponents/Spinner/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchAStudentAssessmentDetails, FetchStudentAssessmentProgress } from "@/store/slices/studentSlice";
import { RootState } from "@/store/store";
import { menu } from "@/components/layouts/InstructorLayouts/menu";

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"userDetails" | "courses">("userDetails");

  const [isModalOpen, setModalOpen] = useState(false);

  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";
  const organizationId = sessionStorage.getItem("orgId") || "";
  const logoUrl = sessionStorage.getItem("logoUrl") || "";

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [student, setStudent] = useState<Student | any>();
  const [loadingStudent, setLoadingStudent] = useState(false);

  const [loadingDisabledStudent, setLoadingDisabledStudent] = useState(false);

  const { studentAssessmentDetails, status, error } = useSelector((state: RootState) => state.student);
  const { studentAssessmentProgress } = useSelector((state: RootState) => state.student);

  const populateStudent = async (id: number) => {
    try {
      setLoadingStudent(true);
      let fetchStudent = await studentService.GetUsersById(id);
      setStudent(fetchStudent);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingStudent(false);
    }
  };

  const disabledStudentClick = async () => {
    try {
      const id = Number(params.id);
      const status = student?.disabled;
      const isEmailVerified = student?.isEmailVerified;
      if (isEmailVerified) {
        setLoadingDisabledStudent(true);
        let disabledStudent = await studentService.disabledStudent(id, status, organizationId);
        setStudent(disabledStudent);
        // console.log(disabledStudent)
        toast.success(
          <>
            <div>
              {disabledStudent?.disabled ? "Disabled" : "Enabled"}
              <div style={customMessageStyle}>The student has been ${disabledStudent?.disabled ? "disabled" : "enabled"}</div>
            </div>
          </>
        );
      } else {
        toast.error("Student account not yet verified");
      }
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingDisabledStudent(false);
      closeModal();
    }
  };

  const handleTabChange = (tab: "userDetails" | "courses") => {
    setActiveTab(tab);
  };

  console.log(studentAssessmentDetails);
  console.log(studentAssessmentProgress);

  const studentAssessment = studentAssessmentDetails;

  useEffect(() => {
    const studentId = Number(id);
    populateStudent(studentId);
    dispatch(fetchAStudentAssessmentDetails(studentId));
    dispatch(FetchStudentAssessmentProgress(studentId));
  }, [id, dispatch]);

  return student ? (
    <section className="h-screen overflow-hidden font-montserrat flex bg-white py-5 px-5 gap-10">
      <div className="flex-shrink-0 relative w-[350px]" style={{ transition: ".2s" }}>
        <SideMenu secondaryColor={secondaryColor} logoUrl={logoUrl} menu={menu} />
      </div>
      <main className="overflow-auto w-full space-y-8 h-full">
        <h1 style={{ color: secondaryColor }} className="flex gap-2 font-base items-center font-semibold">
          <span className="cursor-pointer" onClick={() => router.push("/admin/student")}>
            Student
          </span>
        </h1>

        <div className="flex items-center  justify-start gap-4">
          <img src={student?.profile.avatar || "/images/instructor-profile.svg"} alt="profile image" />
          <div className="flex flex-col gap-4">
            <h1 style={{ color: secondaryColor }} className="text-3xl font-normal">
              {student?.profile?.firstName} {student?.profile?.lastName}
            </h1>
            <div className="flex items-center justify-start gap-2">
              {student?.isEmailVerified && !student?.disabled ? (
                <span className="bg-[#388e3c] rounded bg-opacity-[0.3] text-center text-sm text-[#388E3C] font-medium px-1">Active</span>
              ) : (
                <span className="bg-[#7A7A7A] bg-opacity-30 font-medium text-[#7A7A7A] text-center text-sm px-1 rounded">Pending</span>
              )}
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/date.svg" alt="date-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Enrolled: {formatDate(student?.createdAt)} .</h2>
              </div>
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/student-cohort.svg" alt="student-cohort-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">{student?.cohortName || "NIL"} .</h2>
              </div>
              <div className="flex items-center justify-start gap-1 ">
                <img src="/icons/student-icon.svg" alt="student-icon" />
                <h2 className="text-[#7A7A7A] font-medium text-sm">Student</h2>
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
                Course Progress
              </span>
            </div>
            {/* second button */}
            <div className="flex justify-start items-center gap-4">
              {student?.isEmailVerified && !student?.disabled ? (
                <button
                  style={{ backgroundColor: secondaryColor }}
                  onClick={openModal}
                  className="rounded-lg px-4 py-1 text-white font-semibold text-base"
                >
                  Disable
                </button>
              ) : (
                <button
                  style={{ backgroundColor: secondaryColor }}
                  onClick={openModal}
                  className="rounded-lg px-4 py-1 text-white font-semibold text-base"
                >
                  Enable
                </button>
              )}
            </div>
          </div>
        </div>
        {activeTab === "userDetails" ? (
          <UserDetails data={student} />
        ) : (
          <Courses assessment={studentAssessment} assessmentTotal={studentAssessmentProgress?.totalAssessments} />
        )}
      </main>

      {/* Modal */}
      <DisableModal secondaryColor={secondaryColor} isOpen={isModalOpen} onClose={closeModal} awaitSubmit={disabledStudentClick} />
    </section>
  ) : (
    <div className="flex justify-center items-center my-[30px]">
      <Spinner />
    </div>
  );
}

export default Page;
