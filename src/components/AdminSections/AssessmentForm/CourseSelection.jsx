"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../../../utilComponents/InputField/InputField";
import { BsInfoCircleFill } from "react-icons/bs";
import { Controller, useForm, useWatch } from "react-hook-form";
import RichTextEditor from "../../Description/RichTextEditor";
import { Label } from "../../../../utilComponents/Label/Label";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Save from "../../../../utilComponents/Buttons/SaveButton/Save";
import Edit from "../../../../utilComponents/Buttons/EditButton/Edit";
import Back from "../../../../utilComponents/Buttons/BackButton/Back";
import Continue from "../../../../utilComponents/Buttons/ContinueButton/Continue";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import pick from "lodash/pick";
import { errorPropsGetter } from "../../../../utilComponents/formValidation";
import { objectToFormData } from "../../../../utilComponents/objectToFormData";
import { toast } from "react-toastify";
import CohortBanner1 from "@/assets/cohort-image.svg";
import CohortBanner2 from "@/assets/Rectangle 102.png";
import iconCalendar from "@/assets/calendar_i-icon.svg";
import iconCourse from "@/assets/courses_i-icon.svg";
import iconStudent from "@/assets/student-cohort_i-icon.svg";
import Image from "next/image";
import SearchSmall from "../../../../utilComponents/SearchSmall/SearchSmall";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses, fetchAllCoursesByCohort } from "@/store/slices/coursesSlice";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    courseSelection: Yup.string().required(
      errorMessages.required("A cohort is required")
    ),
  });
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const CourseSelectionionForm = ({ onNext, awaitSubmit, onPrev }) => {
  const form = useForm({
    resolver: yupResolver(buildSchema()),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = form;

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [gettingCourses, setGettingCourses] = useState(true);

  const onSubmit = (data) => {
    console.log(data);

    if (!data.courseSelection) {
      setErrorMessage("Please select a course before saving or continuing.");
      return;
    }

    if (isEditMode) {
      const allowedfields = pick(data, [
        handleCourseSelection(sessionStorage.getItem("selectedCourseId")),
      ]);
      const payload = objectToFormData(allowedfields);
    }

    if (data && !isSubmitted) {
      toast.success(
        <>
          <div>
            Change Saved
            <div style={customMessageStyle}>
              Your changes have been saved as a draft
            </div>
          </div>
        </>
      );

    const savedAssessmentType = sessionStorage.getItem("selectedAssessmentType");
    if(savedAssessmentType !== "coursePreAssessment"){
      handleTab("modules", router, pathname, searchParams)
    }else if(savedAssessmentType === "coursePreAssessment"){
      handleTab("settings", router, pathname, searchParams)
    }else{
      handleTab("assessment", router, pathname, searchParams)
    }

     // onNext();

    }

    // Reset the error message
    setErrorMessage("");

    setIsSubmitted(true);

    reset({
      courseSelection: data.courseSelection || "",
    });
    setIsEditMode(false);

    // awaitSubmit?.(data);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("croppedImage", undefined);
    setIsEditMode(true);
  };

  const handlePrevClick = () => {
    // onPrev();
    handleTab("cohort", router, pathname, searchParams)
  };

  const handleNextClick = (data) => {
    console.log(data);

    if (!data.courseSelection) {
      toast.error("Please select a course before saving or continuing.")
      setErrorMessage("Please select a course before saving or continuing.");
      return;
    }

    if (isEditMode) {
      const allowedfields = pick(data, [
        handleCourseSelection(sessionStorage.getItem("selectedCourseId")),
      ]);
      const payload = objectToFormData(allowedfields);
    }

    if (data && !isSubmitted) {
      toast.success(
        <>
          <div>
            Change Saved
            <div style={customMessageStyle}>
              Your changes have been saved as a draft
            </div>
          </div>
        </>
      );
      onNext();
    }

    // Reset the error message
    setErrorMessage("");

    setIsSubmitted(true);

    reset({
      courseSelection: data.courseSelection || "",
    });
    setIsEditMode(false);

    awaitSubmit?.(data);
  };

  const dispatch = useDispatch();
  const { allCourses, allCoursesByCohort, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    // dispatch(fetchAllCourses());
   async function fetchData() {
     const cohortId = sessionStorage.getItem("selectedCohortId")
      setGettingCourses(true)
      try{
        if(!cohortId){
          toast.error("No cohort Selected!. Go back to select a cohort")
          return
        }else{
         await dispatch(fetchAllCoursesByCohort(cohortId));
        }

      }catch(err){
        toast.error("An error ocurred while fetching courses")
      }finally{
        setGettingCourses(false)
      }
   }
  fetchData();
  
  }, [dispatch]);

  useEffect(() => {
    // dispatch(fetchAllCourses());
    // console.log("gettingCourses", gettingCourses)
 
  }, [gettingCourses]);

  // console.log("All Courses:", allCourses);

  const handleCourseSelection = (courseId) => {
    sessionStorage.setItem("selectedCourseId", courseId);
  };

  return (
    <div className="mt-9">
      <div className="my-10">
        <div className="grid grid-cols-1 gap-x-6 mb-4">
          <h2 className="text-indigo-800 font-semibold text-2xl mb-1">
            Select a Course
          </h2>
          <p className="text-gray-400 font-medium text-xs mb-6">
            Select a course to make an assessment for it
          </p>
          <SearchSmall />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log(err, form.getValues(), "error");
          })}
        >
          <div className="grid grid-cols-2 gap-x-6">
           
            {(!gettingCourses && sessionStorage.getItem("selectedCohortId") && allCoursesByCohort.length) ?
            allCoursesByCohort.map((course, index) => (
              <div
                key={index}
                className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 h-[135px] w-[447px] mb-4"
              >
                <label
                  htmlFor={`course-radio-${index}`}
                  // onClick={() => handleCourseSelection(course.id)}
                  className="h-[135px] w-[447px] py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <div className="max-w-sm w-full lg:max-w-full lg:flex">
                    <div
                      className="h-[112px] w-[134px] lg:h-auto lg:w-32 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                      title="Course Image"
                    >
                      <Image
                        src={course.courseImage || "/images/cohort-image.svg"} // Replace with the actual image source
                        alt="course image"
                        className="rounded-md"
                        layout="responsive"
                        width={1920}
                        height={1080}
                      />
                    </div>
                    <div className="lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col">
                      <div className="text-gray-900 font-bold text-sm mb-2">
                        <p className="font-semibold">{course.courseTitle}</p>
                        <div className="grid grid-cols-1 divide-y"></div>
                      </div>

                      <hr
                        className="w-full h-0 border-none mt-2"
                        style={{ borderTop: "0.5px solid #B3B3B3" }}
                      />
                      <ul className="mt-4">
                        <li className="flex items-center gap-1 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                          >
                            <path
                              d="M7.73438 6.63929C7.92773 6.73304 8.10205 6.8481 8.25732 6.98446C8.4126 7.12083 8.54443 7.27282 8.65283 7.44043C8.76123 7.60804 8.84619 7.78986 8.90771 7.98588C8.96924 8.18191 9 8.38361 9 8.591H8.4375C8.4375 8.36657 8.39355 8.15492 8.30566 7.95605C8.21777 7.75719 8.09766 7.5839 7.94531 7.43617C7.79297 7.28844 7.61279 7.17054 7.40479 7.08248C7.19678 6.99441 6.97852 6.95179 6.75 6.95463C6.51562 6.95463 6.29736 6.99725 6.09521 7.08248C5.89307 7.1677 5.71436 7.28418 5.55908 7.43191C5.40381 7.57963 5.28223 7.75435 5.19434 7.95605C5.10645 8.15776 5.0625 8.36941 5.0625 8.591H4.5C4.5 8.38361 4.5293 8.18191 4.58789 7.98588C4.64648 7.78986 4.73145 7.60804 4.84277 7.44043C4.9541 7.27282 5.0874 7.12083 5.24268 6.98446C5.39795 6.8481 5.57227 6.73304 5.76562 6.63929C5.5459 6.48588 5.37451 6.29412 5.25146 6.06401C5.12842 5.8339 5.06543 5.58532 5.0625 5.31827C5.0625 5.09384 5.10645 4.88219 5.19434 4.68333C5.28223 4.48446 5.40234 4.31117 5.55469 4.16344C5.70703 4.01571 5.88574 3.89782 6.09082 3.80975C6.2959 3.72168 6.51562 3.67907 6.75 3.68191C6.98145 3.68191 7.19971 3.72452 7.40479 3.80975C7.60986 3.89498 7.78857 4.01145 7.94092 4.15918C8.09326 4.30691 8.21484 4.48162 8.30566 4.68333C8.39648 4.88503 8.44043 5.09668 8.4375 5.31827C8.4375 5.58532 8.37598 5.8339 8.25293 6.06401C8.12988 6.29412 7.95703 6.48588 7.73438 6.63929ZM6.75 6.40918C6.90527 6.40918 7.05029 6.38077 7.18506 6.32395C7.31982 6.26713 7.43994 6.18901 7.54541 6.08958C7.65088 5.99015 7.73145 5.87509 7.78711 5.74441C7.84277 5.61373 7.87207 5.47168 7.875 5.31827C7.875 5.1677 7.8457 5.02708 7.78711 4.8964C7.72852 4.76571 7.64795 4.64924 7.54541 4.54696C7.44287 4.44469 7.32422 4.36657 7.18945 4.31259C7.05469 4.25861 6.9082 4.2302 6.75 4.22736C6.59473 4.22736 6.44971 4.25577 6.31494 4.31259C6.18018 4.36941 6.06006 4.44753 5.95459 4.54696C5.84912 4.6464 5.76855 4.76145 5.71289 4.89213C5.65723 5.02282 5.62793 5.16486 5.625 5.31827C5.625 5.46884 5.6543 5.60946 5.71289 5.74015C5.77148 5.87083 5.85205 5.9873 5.95459 6.08958C6.05713 6.19185 6.17578 6.26998 6.31055 6.32395C6.44531 6.37793 6.5918 6.40634 6.75 6.40918ZM4.5 6.75009C4.40625 6.8552 4.32129 6.96458 4.24512 7.07821C4.16895 7.19185 4.10156 7.31401 4.04297 7.44469C3.8877 7.28844 3.7002 7.1677 3.48047 7.08248C3.26074 6.99725 3.03809 6.95463 2.8125 6.95463H1.125V1.50009H0.5625V7.50009H4.021C3.97998 7.58816 3.94629 7.67765 3.91992 7.76855C3.89355 7.85946 3.87158 7.95179 3.854 8.04554H0V0.954634H1.125V0.40918H2.8125C3.07031 0.40918 3.31787 0.447532 3.55518 0.524237C3.79248 0.600941 4.01367 0.715998 4.21875 0.869407C4.4209 0.715998 4.64062 0.600941 4.87793 0.524237C5.11523 0.447532 5.36426 0.40918 5.625 0.40918H7.3125V0.954634H8.4375V3.68191C8.26758 3.51998 8.08008 3.38503 7.875 3.27708V1.50009H7.3125V3.07253C7.21875 3.04696 7.125 3.0285 7.03125 3.01713C6.9375 3.00577 6.84375 3.00009 6.75 3.00009V0.954634H5.625C5.41992 0.954634 5.2207 0.988725 5.02734 1.05691C4.83398 1.12509 4.6582 1.22594 4.5 1.35946V6.75009ZM3.9375 6.69469V1.35946C3.7793 1.22878 3.60352 1.12935 3.41016 1.06117C3.2168 0.992987 3.01758 0.957475 2.8125 0.954634H1.6875V6.40918H2.8125C3.00879 6.40918 3.20215 6.43333 3.39258 6.48162C3.58301 6.52992 3.76465 6.60094 3.9375 6.69469Z"
                              fill="#FF00F8"
                            />
                          </svg>
                          <small>{`${course.modules} Modules`}</small>
                        </li>
                        <li className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="9"
                            viewBox="0 0 8 9"
                            fill="none"
                          >
                            <path
                              d="M3.996 0.5C1.788 0.5 0 2.292 0 4.5C0 6.708 1.788 8.5 3.996 8.5C6.208 8.5 8 6.708 8 4.5C8 2.292 6.208 0.5 3.996 0.5ZM4 7.7C2.232 7.7 0.8 6.268 0.8 4.5C0.8 2.732 2.232 1.3 4 1.3C5.768 1.3 7.2 2.732 7.2 4.5C7.2 6.268 5.768 7.7 4 7.7ZM4.2 2.5H3.6V4.9L5.7 6.16L6 5.668L4.2 4.6V2.5Z"
                              fill="#FF00F8"
                            />
                          </svg>
                          <small>{`${course.hours} hours`}</small>
                        </li>
                        <li className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M7.377 5C7.86 5 8.252 5.392 8.252 5.875V8.2495C8.252 8.84637 8.01489 9.41879 7.59284 9.84084C7.17079 10.2629 6.59837 10.5 6.0015 10.5C5.40463 10.5 4.83221 10.2629 4.41016 9.84084C3.98811 9.41879 3.751 8.84637 3.751 8.2495V5.875C3.751 5.392 4.1425 5 4.626 5H7.377ZM7.377 5.75H4.626C4.59285 5.75 4.56105 5.76317 4.53761 5.78661C4.51417 5.81005 4.501 5.84185 4.501 5.875V8.2495C4.501 8.64746 4.65909 9.02912 4.94049 9.31051C5.22188 9.59191 5.60354 9.75 6.0015 9.75C6.39946 9.75 6.78112 9.59191 7.06251 9.31051C7.34391 9.02912 7.502 8.64746 7.502 8.2495V5.875C7.502 5.84185 7.48883 5.81005 7.46539 5.78661C7.44195 5.76317 7.41015 5.75 7.377 5.75ZM1.875 5H3.5655C3.3891 5.21304 3.28137 5.47452 3.2565 5.75H1.875C1.84185 5.75 1.81005 5.76317 1.78661 5.78661C1.76317 5.81005 1.75 5.84185 1.75 5.875V7.4995C1.74997 7.68844 1.79275 7.87493 1.87514 8.04497C1.95752 8.215 2.07737 8.36416 2.22567 8.48123C2.37397 8.5983 2.54687 8.68025 2.73138 8.72091C2.9159 8.76157 3.10723 8.75989 3.291 8.716C3.3335 8.968 3.411 9.2085 3.5175 9.432C3.22114 9.51128 2.91052 9.52135 2.60965 9.46141C2.30878 9.40147 2.02572 9.27314 1.78237 9.08633C1.53902 8.89953 1.34189 8.65926 1.20623 8.38411C1.07057 8.10895 1.00001 7.80628 1 7.4995V5.875C1 5.392 1.392 5 1.875 5ZM8.4375 5H10.125C10.608 5 11 5.392 11 5.875V7.5C11.0001 7.80658 10.9297 8.10908 10.7942 8.38411C10.6587 8.65914 10.4619 8.89936 10.2188 9.08618C9.9757 9.27301 9.69292 9.40146 9.3923 9.46159C9.09167 9.52173 8.78124 9.51194 8.485 9.433C8.592 9.209 8.6695 8.9685 8.7125 8.7165C8.89604 8.75988 9.08702 8.76116 9.27113 8.72025C9.45524 8.67934 9.62771 8.59731 9.77561 8.48028C9.92351 8.36326 10.043 8.21428 10.1252 8.04452C10.2073 7.87475 10.25 7.6886 10.25 7.5V5.875C10.25 5.84185 10.2368 5.81005 10.2134 5.78661C10.1899 5.76317 10.1582 5.75 10.125 5.75H8.7465C8.72163 5.47452 8.6139 5.21304 8.4375 5ZM6 1.5C6.39782 1.5 6.77936 1.65804 7.06066 1.93934C7.34196 2.22064 7.5 2.60218 7.5 3C7.5 3.39782 7.34196 3.77936 7.06066 4.06066C6.77936 4.34196 6.39782 4.5 6 4.5C5.60218 4.5 5.22064 4.34196 4.93934 4.06066C4.65804 3.77936 4.5 3.39782 4.5 3C4.5 2.60218 4.65804 2.22064 4.93934 1.93934C5.22064 1.65804 5.60218 1.5 6 1.5ZM9.25 2C9.58152 2 9.89946 2.1317 10.1339 2.36612C10.3683 2.60054 10.5 2.91848 10.5 3.25C10.5 3.58152 10.3683 3.89946 10.1339 4.13388C9.89946 4.3683 9.58152 4.5 9.25 4.5C8.91848 4.5 8.60054 4.3683 8.36612 4.13388C8.1317 3.89946 8 3.58152 8 3.25C8 2.91848 8.1317 2.60054 8.36612 2.36612C8.60054 2.1317 8.91848 2 9.25 2ZM2.75 2C3.08152 2 3.39946 2.1317 3.63388 2.36612C3.8683 2.60054 4 2.91848 4 3.25C4 3.58152 3.8683 3.89946 3.63388 4.13388C3.39946 4.3683 3.08152 4.5 2.75 4.5C2.41848 4.5 2.10054 4.3683 1.86612 4.13388C1.6317 3.89946 1.5 3.58152 1.5 3.25C1.5 2.91848 1.6317 2.60054 1.86612 2.36612C2.10054 2.1317 2.41848 2 2.75 2ZM6 2.25C5.80109 2.25 5.61032 2.32902 5.46967 2.46967C5.32902 2.61032 5.25 2.80109 5.25 3C5.25 3.19891 5.32902 3.38968 5.46967 3.53033C5.61032 3.67098 5.80109 3.75 6 3.75C6.19891 3.75 6.38968 3.67098 6.53033 3.53033C6.67098 3.38968 6.75 3.19891 6.75 3C6.75 2.80109 6.67098 2.61032 6.53033 2.46967C6.38968 2.32902 6.19891 2.25 6 2.25ZM9.25 2.75C9.11739 2.75 8.99021 2.80268 8.89645 2.89645C8.80268 2.99021 8.75 3.11739 8.75 3.25C8.75 3.38261 8.80268 3.50979 8.89645 3.60355C8.99021 3.69732 9.11739 3.75 9.25 3.75C9.38261 3.75 9.50979 3.69732 9.60355 3.60355C9.69732 3.50979 9.75 3.38261 9.75 3.25C9.75 3.11739 9.69732 2.99021 9.60355 2.89645C9.50979 2.80268 9.38261 2.75 9.25 2.75ZM2.75 2.75C2.61739 2.75 2.49021 2.80268 2.39645 2.89645C2.30268 2.99021 2.25 3.11739 2.25 3.25C2.25 3.38261 2.30268 3.50979 2.39645 3.60355C2.49021 3.69732 2.61739 3.75 2.75 3.75C2.88261 3.75 3.00979 3.69732 3.10355 3.60355C3.19732 3.50979 3.25 3.38261 3.25 3.25C3.25 3.11739 3.19732 2.99021 3.10355 2.89645C3.00979 2.80268 2.88261 2.75 2.75 2.75Z"
                              fill="#FF00F8"
                            />
                          </svg>
                          <small>{`${course.students} Students`}</small>
                        </li>
                        <li className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_4433_46353)">
                              <path
                                d="M6.66667 5.6665C6.84348 5.6665 7.01305 5.59627 7.13807 5.47124C7.2631 5.34622 7.33333 5.17665 7.33333 4.99984V1.33317C7.33333 1.15636 7.2631 0.98679 7.13807 0.861766C7.01305 0.736742 6.84348 0.666504 6.66667 0.666504H3.15333C3.27 0.869837 3.33333 1.09984 3.33333 1.33317H6.66667V4.99984H3.66667V5.6665M5 2.33317V2.99984H3V7.33317H2.33333V5.33317H1.66667V7.33317H1V4.6665H0.5V2.99984C0.5 2.82303 0.570238 2.65346 0.695262 2.52843C0.820286 2.40341 0.989856 2.33317 1.16667 2.33317H5ZM2.66667 1.33317C2.66667 1.50998 2.59643 1.67955 2.4714 1.80458C2.34638 1.9296 2.17681 1.99984 2 1.99984C1.82319 1.99984 1.65362 1.9296 1.5286 1.80458C1.40357 1.67955 1.33333 1.50998 1.33333 1.33317C1.33333 1.15636 1.40357 0.98679 1.5286 0.861766C1.65362 0.736742 1.82319 0.666504 2 0.666504C2.17681 0.666504 2.34638 0.736742 2.4714 0.861766C2.59643 0.98679 2.66667 1.15636 2.66667 1.33317Z"
                                fill="#FF00F8"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4433_46353">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <small>{course.instuctors} Instructors</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </label>

                <input
                   checked={course.id == sessionStorage.getItem("selectedCourseId")}
                  id={`course-radio-${index}`}
                  type="radio"
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 form-radio"
                  {...register("courseSelection")}
                  {...getErrorProps("courseSelection")}
                  onChange={() => handleCourseSelection(course.id)}
                />
              </div>
            )): gettingCourses? <p>Fetching courses for cohort...</p>:<p>No available course for this cohort. Add a course to this cohort and continue. </p>}
{/*
 {gettingCourses && <p>Fetching courses for cohort</p>}
            {!gettingCourses && !sessionStorage.getItem("selectedCohortId") && <p>No available course</p>}*/}
          </div>

          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}

          <div className="mt-20">
            <hr className="h-0.5 bg-gray-400" />

            <div className="flex justify-between mt-4 gap-6 cursor-pointer items-center">
              <div
               
                className="flex items-center justify-start"
              >
                <Back handleBack={handlePrevClick}/>
              </div>

              <div className="flex items-center gap-6 justify-end">
                <Save
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                  disabled={!getValues("courseSelection")}
                  title={"Save and Continue"}
                />
                {/*<Continue
                  onClick={handleNextClick}
                  disabled={!getValues("courseSelection")}
          />*/}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseSelectionionForm;
