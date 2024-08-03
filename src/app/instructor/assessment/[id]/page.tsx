"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContentTab from "./container/contentTab";
import StatisticsTab from "./container/statisticsTab";
import StudentTab from "./container/studentTab";
import { Question } from "@/shared/types/question";
import { useDispatch, useSelector } from "react-redux";
import { Student } from "@/shared/types/student";
import { RootState } from "@/store/store";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { GetAssessmentQuestionsById, GetAssessmentStats } from "@/services/api/assessments";

import studentService from "@/services/api/students";
import { Statistics } from "@/shared/types/statistics";
import { menu } from "@/components/layouts/InstructorLayouts/menu";
import InstructorSideMenu from "@/components/SideMenu/instructorSideMenu";
import { error } from "console";

function Page() {
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"content" | "statistics" | "students">("content");

  const dispatch = useDispatch();

  // const [assessment, setAssessment] = useState<Assessment | any>();
  const [assessmentQuestion, setAssessmentQuestion] = useState<Question | any>();
  const [student, setStudent] = useState<Student | any>();
  const [stats, setStats] = useState<Statistics | any>();
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingStudent, setLoadingStudent] = useState(false);
  const { assessments } = useSelector((state: RootState) => state.assessment);

  // const assessment = assessments.find((a) => a.id === Number(id));

  // const assessmentArray = assessments && assessments.assessments;
  // console.log("assessssss@@@@", assessments)
  const assessmentArray = assessments && assessments.assessments;

  const assessment = assessmentArray && assessmentArray.find((a) => a.id === Number(id));

  const logoUrl = sessionStorage.getItem("logoUrl") || "";
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  console.log("assess:", assessments);
  const handleTabChange = (tab: "content" | "statistics" | "students") => {
    setActiveTab(tab);
  };

  const populateStudent = async (id: number) => {
    try {
      setLoadingStudent(true);
      let fetchStudent = await studentService.GetStudentByAssessmentId(id);
      setStudent(fetchStudent);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      console.log("StudentError", errMsg);
    } finally {
      setLoadingStudent(false);
    }
  };

  const populateAssessmentQuestion = async (id: number) => {
    const assessmentId = id;
    try {
      setLoadingQuestion(true);
      let fetchAssessmentQuestion = await GetAssessmentQuestionsById(assessmentId);
      setAssessmentQuestion(fetchAssessmentQuestion);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      console.log("QuestionError:", errMsg);
    } finally {
      setLoadingQuestion(false);
    }
  };

  const populateAssessmentStats = async (id: number) => {
    try {
      setLoadingStats(true);
      let fetchAssessmentStats = await GetAssessmentStats(id);
      setStats(fetchAssessmentStats);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      console.log("StatisticError:", errMsg);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    const assessmentId = Number(id);

    populateAssessmentQuestion(assessmentId);
    populateStudent(assessmentId);
    populateAssessmentStats(assessmentId);

    // dispatch(getAssessmentById(id) as any);
  }, [id, dispatch]);

  return (
    <div>
      <section className="h-screen overflow-hidden font-montserrat flex bg-white py-5 px-5 gap-10">
        <div className="flex-shrink-0 relative w-[350px]" style={{ transition: ".2s" }}>
          <InstructorSideMenu logoUrl={logoUrl} secondaryColor={secondaryColor} menu={menu} />
        </div>

        <main className="overflow-auto w-full space-y-8 h-full">
          <h1 className="flex gap-2 font-base items-center font-semibold text-[#1A183E]">
            <span className="cursor-pointer" onClick={() => router.push("/instructor/assessment")}>
              Assessment
            </span>
            <ChevronRight />
            <span className="cursor-pointer" onClick={() => router.push(`/instructor/assessment/${params.id}`)}>
              View Assessment
            </span>
          </h1>

          <div className="flex gap-12 items-center">
            <div className="flex gap-2 items-center">
              <button onClick={() => router.push("/instructor/assessment")} className="border-r border-[#7A7A7A]">
                <ArrowLeft className="text-[#1A183E] inline-block  p-2 w-[50px] h-[50px]" />
              </button>
            </div>

            <section className="space-y-4">
              <div className="flex items-center justify-start gap-3">
                <h1 style={{ color: secondaryColor }} className="font-semibold text-[28px]">
                  {assessment?.assessmentTitle}
                </h1>

                <div className="flex items-center gap-1 p-1 rounded bg-[#b6fcba4d]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M7 1.8125C5.87512 1.8125 4.7755 2.14607 3.8402 2.77102C2.90489 3.39597 2.17591 4.28423 1.74544 5.32349C1.31496 6.36274 1.20233 7.50631 1.42179 8.60958C1.64124 9.71284 2.18292 10.7263 2.97833 11.5217C3.77374 12.3171 4.78716 12.8588 5.89043 13.0782C6.99369 13.2977 8.13726 13.185 9.17651 12.7546C10.2158 12.3241 11.104 11.5951 11.729 10.6598C12.3539 9.7245 12.6875 8.62488 12.6875 7.5C12.6859 5.99207 12.0862 4.54636 11.0199 3.48009C9.95364 2.41382 8.50793 1.81409 7 1.8125ZM5.55789 9.6875H8.44211C8.14844 10.6905 7.65625 11.5945 7 12.3065C6.34375 11.5945 5.85156 10.6905 5.55789 9.6875ZM5.35938 8.8125C5.21427 7.94352 5.21427 7.05648 5.35938 6.1875H8.64063C8.78573 7.05648 8.78573 7.94352 8.64063 8.8125H5.35938ZM2.1875 7.5C2.18712 7.05618 2.24841 6.61445 2.36961 6.1875H4.47289C4.34237 7.05763 4.34237 7.94237 4.47289 8.8125H2.36961C2.24841 8.38555 2.18712 7.94382 2.1875 7.5ZM8.44211 5.3125H5.55789C5.85156 4.30953 6.34375 3.40555 7 2.69352C7.65625 3.40555 8.14844 4.30953 8.44211 5.3125ZM9.52711 6.1875H11.6304C11.8732 7.04565 11.8732 7.95435 11.6304 8.8125H9.52711C9.65763 7.94237 9.65763 7.05763 9.52711 6.1875ZM11.2859 5.3125H9.34828C9.12501 4.43395 8.75006 3.60113 8.24031 2.85156C8.89156 3.02657 9.49897 3.33594 10.0235 3.75977C10.548 4.18361 10.978 4.71252 11.2859 5.3125ZM5.75969 2.85156C5.24994 3.60113 4.87499 4.43395 4.65172 5.3125H2.71414C3.02199 4.71252 3.452 4.18361 3.97652 3.75977C4.50103 3.33594 5.10844 3.02657 5.75969 2.85156ZM2.71414 9.6875H4.65172C4.87499 10.566 5.24994 11.3989 5.75969 12.1484C5.10844 11.9734 4.50103 11.6641 3.97652 11.2402C3.452 10.8164 3.02199 10.2875 2.71414 9.6875ZM8.24031 12.1484C8.75006 11.3989 9.12501 10.566 9.34828 9.6875H11.2859C10.978 10.2875 10.548 10.8164 10.0235 11.2402C9.49897 11.6641 8.89156 11.9734 8.24031 12.1484Z"
                      fill="#388E3C"
                    />
                  </svg>
                  <span className="text-[#7A7A7A] text-sm font-medium">{assessment?.status}</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
                    <path
                      d="M5 7.77456C4.84259 7.77456 4.71074 7.71338 4.60444 7.59102C4.49778 7.46908 4.44444 7.31783 4.44444 7.13726C4.44444 6.95669 4.49778 6.80523 4.60444 6.68287C4.71074 6.56093 4.84259 6.49996 5 6.49996C5.15741 6.49996 5.28944 6.56093 5.39611 6.68287C5.50241 6.80523 5.55556 6.95669 5.55556 7.13726C5.55556 7.31783 5.50241 7.46908 5.39611 7.59102C5.28944 7.71338 5.15741 7.77456 5 7.77456ZM2.77778 7.77456C2.62037 7.77456 2.48833 7.71338 2.38167 7.59102C2.27537 7.46908 2.22222 7.31783 2.22222 7.13726C2.22222 6.95669 2.27537 6.80523 2.38167 6.68287C2.48833 6.56093 2.62037 6.49996 2.77778 6.49996C2.93519 6.49996 3.06722 6.56093 3.17389 6.68287C3.28019 6.80523 3.33333 6.95669 3.33333 7.13726C3.33333 7.31783 3.28019 7.46908 3.17389 7.59102C3.06722 7.71338 2.93519 7.77456 2.77778 7.77456ZM7.22222 7.77456C7.06482 7.77456 6.93296 7.71338 6.82667 7.59102C6.72 7.46908 6.66667 7.31783 6.66667 7.13726C6.66667 6.95669 6.72 6.80523 6.82667 6.68287C6.93296 6.56093 7.06482 6.49996 7.22222 6.49996C7.37963 6.49996 7.51148 6.56093 7.61778 6.68287C7.72444 6.80523 7.77778 6.95669 7.77778 7.13726C7.77778 7.31783 7.72444 7.46908 7.61778 7.59102C7.51148 7.71338 7.37963 7.77456 7.22222 7.77456ZM5 10.3238C4.84259 10.3238 4.71074 10.2626 4.60444 10.1402C4.49778 10.0183 4.44444 9.86703 4.44444 9.68647C4.44444 9.5059 4.49778 9.35465 4.60444 9.23271C4.71074 9.11035 4.84259 9.04917 5 9.04917C5.15741 9.04917 5.28944 9.11035 5.39611 9.23271C5.50241 9.35465 5.55556 9.5059 5.55556 9.68647C5.55556 9.86703 5.50241 10.0183 5.39611 10.1402C5.28944 10.2626 5.15741 10.3238 5 10.3238ZM2.77778 10.3238C2.62037 10.3238 2.48833 10.2626 2.38167 10.1402C2.27537 10.0183 2.22222 9.86703 2.22222 9.68647C2.22222 9.5059 2.27537 9.35465 2.38167 9.23271C2.48833 9.11035 2.62037 9.04917 2.77778 9.04917C2.93519 9.04917 3.06722 9.11035 3.17389 9.23271C3.28019 9.35465 3.33333 9.5059 3.33333 9.68647C3.33333 9.86703 3.28019 10.0183 3.17389 10.1402C3.06722 10.2626 2.93519 10.3238 2.77778 10.3238ZM7.22222 10.3238C7.06482 10.3238 6.93296 10.2626 6.82667 10.1402C6.72 10.0183 6.66667 9.86703 6.66667 9.68647C6.66667 9.5059 6.72 9.35465 6.82667 9.23271C6.93296 9.11035 7.06482 9.04917 7.22222 9.04917C7.37963 9.04917 7.51148 9.11035 7.61778 9.23271C7.72444 9.35465 7.77778 9.5059 7.77778 9.68647C7.77778 9.86703 7.72444 10.0183 7.61778 10.1402C7.51148 10.2626 7.37963 10.3238 7.22222 10.3238ZM1.11111 12.873C0.805556 12.873 0.543889 12.7483 0.326111 12.4989C0.108704 12.2491 0 11.9489 0 11.5984V2.67616C0 2.32564 0.108704 2.02568 0.326111 1.77629C0.543889 1.52647 0.805556 1.40155 1.11111 1.40155H1.66667V0.126953H2.77778V1.40155H7.22222V0.126953H8.33333V1.40155H8.88889C9.19444 1.40155 9.45611 1.52647 9.67389 1.77629C9.8913 2.02568 10 2.32564 10 2.67616V11.5984C10 11.9489 9.8913 12.2491 9.67389 12.4989C9.45611 12.7483 9.19444 12.873 8.88889 12.873H1.11111ZM1.11111 11.5984H8.88889V5.22536H1.11111V11.5984Z"
                      fill="#7A7A7A"
                    />
                  </svg>
                  <span className="text-[#7A7A7A] text-sm font-medium">Created: {assessment?.createdAt}</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <g clip-path="url(#clip0_1168_17114)">
                      <path
                        d="M9.55146 11.1396H11.2792L9.41091 13.0483V11.2743C9.41091 11.2 9.47398 11.1396 9.55146 11.1396ZM7.46656 3.72855L7.99918 3.66252L7.66668 3.20524L7.46656 3.72855ZM12.3194 1.12059V10.4819H9.55146C9.0955 10.4819 8.72464 10.8374 8.72464 11.2743V14.2084H2.02282C1.83328 14.2084 1.67969 14.0612 1.67969 13.8796V1.12059C1.67969 0.939003 1.83328 0.791748 2.02282 0.791748H11.9762C12.1658 0.791748 12.3194 0.939003 12.3194 1.12059ZM6.57035 5.11665C6.60933 5.13033 6.64914 5.13684 6.68846 5.13684C6.82833 5.13684 6.95975 5.05424 7.0106 4.92106L7.20035 4.42477L8.44141 4.27087L8.75676 4.70455C8.82353 4.79629 8.93011 4.84542 9.03854 4.84542C9.10628 4.84542 9.1747 4.82622 9.2344 4.78636C9.38991 4.68252 9.42807 4.47758 9.31978 4.32862L7.85273 2.31105C7.85218 2.31033 7.85142 2.30974 7.85087 2.30902C7.8414 2.29612 7.83008 2.28455 7.81862 2.27304C7.81443 2.26883 7.81086 2.26377 7.80647 2.25982C7.79741 2.25167 7.78684 2.24496 7.77682 2.23772C7.7688 2.23194 7.76138 2.22529 7.75294 2.22023C7.74649 2.21635 7.73908 2.21378 7.73229 2.2103C7.71904 2.20352 7.70593 2.19655 7.69193 2.19155C7.69097 2.19122 7.69022 2.19063 7.68926 2.1903C7.68123 2.18748 7.67299 2.18656 7.66496 2.18432C7.6524 2.1809 7.63998 2.17708 7.62708 2.17505C7.61569 2.1732 7.60443 2.17307 7.59304 2.17242C7.58227 2.17176 7.57156 2.17057 7.56072 2.17084C7.54912 2.17117 7.53786 2.17307 7.5264 2.17452C7.51577 2.17584 7.50513 2.17669 7.49456 2.17899C7.48317 2.18149 7.47232 2.1855 7.46121 2.18912C7.45126 2.19234 7.44117 2.19497 7.43142 2.19918C7.41825 2.20484 7.4061 2.21214 7.39375 2.21931C7.38757 2.22292 7.38105 2.22529 7.37501 2.2293C7.37432 2.22976 7.37378 2.23042 7.37309 2.23088C7.3593 2.24022 7.34687 2.25127 7.33459 2.26252C7.3304 2.26633 7.32553 2.26955 7.32155 2.2735C7.31325 2.28192 7.30652 2.29178 7.29918 2.30106C7.29286 2.30902 7.28566 2.31645 7.28024 2.32487C7.27667 2.33032 7.27433 2.3367 7.27104 2.34243C7.26342 2.35591 7.25581 2.36932 7.25025 2.3836C7.2499 2.38445 7.24935 2.38511 7.24908 2.38596L6.36626 4.69475C6.30106 4.86528 6.3924 5.05417 6.57035 5.11665ZM7.47301 10.8108C7.47301 10.6292 7.31942 10.4819 7.12987 10.4819H3.65396C3.46441 10.4819 3.31082 10.6292 3.31082 10.8108C3.31082 10.9924 3.46441 11.1396 3.65396 11.1396H7.12994C7.31942 11.1396 7.47301 10.9924 7.47301 10.8108ZM8.93189 8.80485C8.93189 8.62327 8.77831 8.47601 8.58876 8.47601H3.65396C3.46441 8.47601 3.31082 8.62327 3.31082 8.80485C3.31082 8.98644 3.46441 9.13369 3.65396 9.13369H8.58876C8.77831 9.13369 8.93189 8.98644 8.93189 8.80485ZM10.002 6.79893C10.002 6.61734 9.84841 6.47009 9.65886 6.47009H3.65396C3.46441 6.47009 3.31082 6.61734 3.31082 6.79893C3.31082 6.98051 3.46441 7.12777 3.65396 7.12777H9.65886C9.84841 7.12777 10.002 6.98051 10.002 6.79893ZM11.3091 2.89757C11.2849 2.71757 11.1134 2.5903 10.9248 2.61365L10.4663 2.67054L10.4069 2.23115C10.3826 2.05107 10.2112 1.92381 10.0225 1.94723C9.83462 1.97051 9.70189 2.13545 9.72626 2.31553L9.78562 2.75492L9.32712 2.81181C9.13922 2.83509 9.00649 2.99997 9.03085 3.18011C9.05323 3.34591 9.20084 3.46679 9.37077 3.46679C9.38538 3.46679 9.40028 3.46587 9.41524 3.46403L9.87374 3.40714L9.9331 3.84654C9.95547 4.01234 10.1031 4.13322 10.273 4.13322C10.2876 4.13322 10.3025 4.1323 10.3174 4.13046C10.5053 4.10718 10.638 3.94223 10.6137 3.76216L10.5543 3.32276L11.0128 3.26587C11.2008 3.24259 11.3334 3.07771 11.3091 2.89757Z"
                        fill="#7A7A7A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1168_17114">
                        <rect width="14" height="13.4167" fill="white" transform="translate(0 0.791748)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[#7A7A7A] text-sm font-medium">{assessment?.assessmentDescription}</span>
                </div>
              </div>

              <div className="flex items-center justify-start gap-6">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M4.08594 10.4245L6.66019 10.4157L12.2789 4.85073C12.4994 4.63023 12.6207 4.33739 12.6207 4.02589C12.6207 3.71439 12.4994 3.42156 12.2789 3.20106L11.3537 2.27589C10.9127 1.83489 10.1433 1.83723 9.70577 2.27414L4.08594 7.84031V10.4245ZM10.5289 3.10073L11.4558 4.02414L10.5242 4.94698L9.59902 4.02239L10.5289 3.10073ZM5.2526 8.32681L8.7701 4.84256L9.69527 5.76773L6.17835 9.25081L5.2526 9.25373V8.32681Z"
                      fill="#1A183E"
                    />
                    <path
                      d="M2.91667 12.75H11.0833C11.7267 12.75 12.25 12.2267 12.25 11.5833V6.527L11.0833 7.69367V11.5833H4.75883C4.74367 11.5833 4.72792 11.5892 4.71275 11.5892C4.6935 11.5892 4.67425 11.5839 4.65442 11.5833H2.91667V3.41667H6.91075L8.07742 2.25H2.91667C2.27325 2.25 1.75 2.77325 1.75 3.41667V11.5833C1.75 12.2267 2.27325 12.75 2.91667 12.75Z"
                      fill="#1A183E"
                    />
                  </svg>
                  <span style={{ color: secondaryColor }} className="text-sm font-semibold">
                    No of Questions: {assessment?.numberOfQuestions}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
                    <path
                      d="M6 10.0297C5.81111 10.0297 5.65289 9.95625 5.52533 9.80942C5.39733 9.6631 5.33333 9.48159 5.33333 9.26491C5.33333 9.04823 5.39733 8.86647 5.52533 8.71964C5.65289 8.57331 5.81111 8.50015 6 8.50015C6.18889 8.50015 6.34733 8.57331 6.47533 8.71964C6.60289 8.86647 6.66667 9.04823 6.66667 9.26491C6.66667 9.48159 6.60289 9.6631 6.47533 9.80942C6.34733 9.95625 6.18889 10.0297 6 10.0297ZM3.33333 10.0297C3.14444 10.0297 2.986 9.95625 2.858 9.80942C2.73044 9.6631 2.66667 9.48159 2.66667 9.26491C2.66667 9.04823 2.73044 8.86647 2.858 8.71964C2.986 8.57331 3.14444 8.50015 3.33333 8.50015C3.52222 8.50015 3.68067 8.57331 3.80867 8.71964C3.93622 8.86647 4 9.04823 4 9.26491C4 9.48159 3.93622 9.6631 3.80867 9.80942C3.68067 9.95625 3.52222 10.0297 3.33333 10.0297ZM8.66667 10.0297C8.47778 10.0297 8.31956 9.95625 8.192 9.80942C8.064 9.6631 8 9.48159 8 9.26491C8 9.04823 8.064 8.86647 8.192 8.71964C8.31956 8.57331 8.47778 8.50015 8.66667 8.50015C8.85556 8.50015 9.01378 8.57331 9.14133 8.71964C9.26933 8.86647 9.33333 9.04823 9.33333 9.26491C9.33333 9.48159 9.26933 9.6631 9.14133 9.80942C9.01378 9.95625 8.85556 10.0297 8.66667 10.0297ZM6 13.0887C5.81111 13.0887 5.65289 13.0153 5.52533 12.8685C5.39733 12.7221 5.33333 12.5406 5.33333 12.324C5.33333 12.1073 5.39733 11.9258 5.52533 11.7794C5.65289 11.6326 5.81111 11.5592 6 11.5592C6.18889 11.5592 6.34733 11.6326 6.47533 11.7794C6.60289 11.9258 6.66667 12.1073 6.66667 12.324C6.66667 12.5406 6.60289 12.7221 6.47533 12.8685C6.34733 13.0153 6.18889 13.0887 6 13.0887ZM3.33333 13.0887C3.14444 13.0887 2.986 13.0153 2.858 12.8685C2.73044 12.7221 2.66667 12.5406 2.66667 12.324C2.66667 12.1073 2.73044 11.9258 2.858 11.7794C2.986 11.6326 3.14444 11.5592 3.33333 11.5592C3.52222 11.5592 3.68067 11.6326 3.80867 11.7794C3.93622 11.9258 4 12.1073 4 12.324C4 12.5406 3.93622 12.7221 3.80867 12.8685C3.68067 13.0153 3.52222 13.0887 3.33333 13.0887ZM8.66667 13.0887C8.47778 13.0887 8.31956 13.0153 8.192 12.8685C8.064 12.7221 8 12.5406 8 12.324C8 12.1073 8.064 11.9258 8.192 11.7794C8.31956 11.6326 8.47778 11.5592 8.66667 11.5592C8.85556 11.5592 9.01378 11.6326 9.14133 11.7794C9.26933 11.9258 9.33333 12.1073 9.33333 12.324C9.33333 12.5406 9.26933 12.7221 9.14133 12.8685C9.01378 13.0153 8.85556 13.0887 8.66667 13.0887ZM1.33333 16.1478C0.966667 16.1478 0.652667 15.9981 0.391333 15.6988C0.130444 15.3991 0 15.0389 0 14.6182V3.91158C0 3.49096 0.130444 3.13102 0.391333 2.83174C0.652667 2.53195 0.966667 2.38206 1.33333 2.38206H2V0.852539H3.33333V2.38206H8.66667V0.852539H10V2.38206H10.6667C11.0333 2.38206 11.3473 2.53195 11.6087 2.83174C11.8696 3.13102 12 3.49096 12 3.91158V14.6182C12 15.0389 11.8696 15.3991 11.6087 15.6988C11.3473 15.9981 11.0333 16.1478 10.6667 16.1478H1.33333ZM1.33333 14.6182H10.6667V6.97063H1.33333V14.6182Z"
                      fill="#1A183E"
                    />
                  </svg>
                  <span style={{ color: secondaryColor }} className="text-sm font-semibold">
                    Deadline: {assessment?.deadline}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M7.5 1.40625C4.13467 1.40625 1.40625 4.13467 1.40625 7.5C1.40625 10.8653 4.13467 13.5938 7.5 13.5938C10.8653 13.5938 13.5938 10.8653 13.5938 7.5C13.5938 4.13467 10.8653 1.40625 7.5 1.40625ZM10.3125 8.4375H7.5C7.37568 8.4375 7.25645 8.38811 7.16854 8.30021C7.08064 8.2123 7.03125 8.09307 7.03125 7.96875V3.75C7.03125 3.62568 7.08064 3.50645 7.16854 3.41854C7.25645 3.33064 7.37568 3.28125 7.5 3.28125C7.62432 3.28125 7.74355 3.33064 7.83146 3.41854C7.91936 3.50645 7.96875 3.62568 7.96875 3.75V7.5H10.3125C10.4368 7.5 10.556 7.54939 10.644 7.63729C10.7319 7.7252 10.7812 7.84443 10.7812 7.96875C10.7812 8.09307 10.7319 8.2123 10.644 8.30021C10.556 8.38811 10.4368 8.4375 10.3125 8.4375Z"
                      fill="#1A183E"
                    />
                  </svg>
                  <span style={{ color: secondaryColor }} className="text-sm font-semibold">
                    Duration: {assessment?.durationInMinutes} mins
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M6.625 10.375L11.0312 5.96875L10.1562 5.09375L6.625 8.625L4.84375 6.84375L3.96875 7.71875L6.625 10.375ZM7.5 13.75C6.63542 13.75 5.82292 13.5858 5.0625 13.2575C4.30208 12.9292 3.64062 12.484 3.07813 11.9219C2.51563 11.3594 2.07042 10.6979 1.7425 9.9375C1.41458 9.17708 1.25042 8.36458 1.25 7.5C1.25 6.63542 1.41417 5.82292 1.7425 5.0625C2.07083 4.30208 2.51604 3.64062 3.07813 3.07813C3.64062 2.51563 4.30208 2.07042 5.0625 1.7425C5.82292 1.41458 6.63542 1.25042 7.5 1.25C8.36458 1.25 9.17708 1.41417 9.9375 1.7425C10.6979 2.07083 11.3594 2.51604 11.9219 3.07813C12.4844 3.64062 12.9298 4.30208 13.2581 5.0625C13.5865 5.82292 13.7504 6.63542 13.75 7.5C13.75 8.36458 13.5858 9.17708 13.2575 9.9375C12.9292 10.6979 12.484 11.3594 11.9219 11.9219C11.3594 12.4844 10.6979 12.9298 9.9375 13.2581C9.17708 13.5865 8.36458 13.7504 7.5 13.75Z"
                      fill="#1A183E"
                    />
                  </svg>
                  <span style={{ color: secondaryColor }} className="text-sm font-semibold">
                    Minimum Passing Grade: {assessment?.passingScore}%
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="w-full border-b border-[#D9D9D9]">
            {/* first button */}
            <div className="flex justify-start items-center gap-40">
              <span
                className={`text-center inline-block py-2 cursor-pointer text-[18px] leading-normal font-normal ${
                  activeTab === "content" ? "border-b-2 border-[#1D63FE]" : ""
                }`}
                onClick={() => handleTabChange("content")}
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

          {activeTab === "content" && <ContentTab secondaryColor={secondaryColor} loading={loadingQuestion} data={assessmentQuestion} />}
          {activeTab === "statistics" && <StatisticsTab secondaryColor={secondaryColor} loading={loadingStats} data={stats} />}
          {activeTab === "students" && <StudentTab secondaryColor={secondaryColor} loading={loadingStudent} data={student} />}
        </main>
      </section>
    </div>
  );
}

export default Page;
