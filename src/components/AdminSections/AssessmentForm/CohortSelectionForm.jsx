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
import { fetchAllCohorts } from "@/store/slices/cohortFormData";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    cohortSelect: Yup.string().required(errorMessages.required("Cohort")),
  });
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const CohortSelectionForm = ({ onNext, awaitSubmit, onPrev }) => {
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

  const [searchQuery, setSearchQuery] = useState(null)

  const onSubmit = (data) => {
    console.log(data);

    if (!data.cohortSelect) {
      setErrorMessage("Please select a cohort before saving or continuing.");
      toast.error("Please select a course before saving or continuing.")
      return;
    }

    if (isEditMode) {
      const allowedfields = pick(data, [
        handleCohortSelection(sessionStorage.getItem("selectedCohortId")),
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
      const assessmentFor = sessionStorage.getItem("selectedAssessmentType")

      if(assessmentFor == "cohortPreAssessment"){
         handleTab("settings", router, pathname, searchParams)
      }else if(assessmentFor !== "cohortPreAssessment"){
         handleTab("course", router, pathname, searchParams)
      }else{
        handleTab("assessment", router, pathname, searchParams)
      }
     
      // onNext();
    }

    setErrorMessage("");

    setIsSubmitted(true);

    reset({
      cohortSelect: data.cohortSelect || "",
      courseSelection: data.courseSelection || "", 
    });
    setIsEditMode(false);

    // awaitSubmit?.(data);
  };

  const handlePrevClick = () => {

    handleTab("assessment", router, pathname, searchParams)
    // onPrev();
  };

  const handleNextClick = (data) => {
    console.log(data);

    if (!data.courseSelection) {
      setErrorMessage("Please select a course before saving or continuing.");
      return;
    }

    if (isEditMode) {
      const allowedfields = pick(data, [
        handleCohortSelection(sessionStorage.getItem("selectedCohortId")),
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
  const { allCohorts, status, error } = useSelector((state) => state.form);

  // console.log("Alllcohorst****************", allCohorts)

  useEffect(() => {
    dispatch(fetchAllCohorts());
  }, [dispatch]);

  const handleCohortSelection = (cohortId) => {
    // console.log("coeeeeeeeeeeee", cohortId)
    sessionStorage.setItem("selectedCohortId", cohortId);
  };

  const handleSearchQuery = (value) => {
    const filteredState = allCohorts.filter(item => item.cohortName.toLowerCase() === value.toLowerCase())
    setSearchQuery(filteredState)
    // console.log("filteredState", filteredState)
  }

  return (
    <div className="mt-9">
      <div className="my-10">
        <div className="grid grid-cols-1 gap-x-6 mb-4">
          <h2 className="text-indigo-800 font-semibold text-2xl mb-1">
            Select a Cohort
          </h2>
          <p className="text-gray-400 font-medium text-xs mb-6">
            Select a Cohort to make an assessment for a course in that cohort
          </p>
          <SearchSmall setSearchQuery={handleSearchQuery} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log(err, form.getValues(), "error");
          })}
        >
          <div className="grid grid-cols-2 gap-x-6">
            {allCohorts.map((cohort, index) => (
              <div
                key={index}
                className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 h-[135px] w-[447px] mb-4"
              >
                <label
                  htmlFor={`cohort-radio-${index}`}
                  onClick={() => handleCohortSelection(cohort.id)}
                  className="h-[135px] w-[447px] py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <div className="max-w-sm w-full lg:max-w-full lg:flex">
                    <div
                      className="h-[112px] w-[134px] lg:h-auto lg:w-32 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                      title="Woman holding a mug"
                    >
                      <Image
                        src={CohortBanner1}
                        alt="cohort image"
                        className="rounded-md"
                        layout="responsive"
                        width={1920}
                        height={1080}
                      />
                    </div>
                    <div className="lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col">
                      <div className="text-gray-900 font-bold text-sm mb-2">
                        <p className="font-semibold">
                          {cohort.cohortName} - {cohort.startDate}
                        </p>
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
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_4357_50584)">
                              <path
                                d="M1.25 3.75V8.75H8.75V1.875H7.5V2.1875C7.5 2.27038 7.46708 2.34987 7.40847 2.40847C7.34987 2.46708 7.27038 2.5 7.1875 2.5C7.10462 2.5 7.02513 2.46708 6.96653 2.40847C6.90792 2.34987 6.875 2.27038 6.875 2.1875V1.875H3.125V2.1875C3.125 2.27038 3.09208 2.34987 3.03347 2.40847C2.97487 2.46708 2.89538 2.5 2.8125 2.5C2.72962 2.5 2.65013 2.46708 2.59153 2.40847C2.53292 2.34987 2.5 2.27038 2.5 2.1875V1.875H1.25V3.125H8.75V3.75H1.25ZM3.125 1.25H6.875V0.9375C6.875 0.85462 6.90792 0.775134 6.96653 0.716529C7.02513 0.657924 7.10462 0.625 7.1875 0.625C7.27038 0.625 7.34987 0.657924 7.40847 0.716529C7.46708 0.775134 7.5 0.85462 7.5 0.9375V1.25H9.0625C9.14538 1.25 9.22487 1.28292 9.28347 1.34153C9.34208 1.40013 9.375 1.47962 9.375 1.5625V9.0625C9.375 9.14538 9.34208 9.22487 9.28347 9.28347C9.22487 9.34208 9.14538 9.375 9.0625 9.375H0.9375C0.85462 9.375 0.775134 9.34208 0.716529 9.28347C0.657924 9.22487 0.625 9.14538 0.625 9.0625V1.5625C0.625 1.47962 0.657924 1.40013 0.716529 1.34153C0.775134 1.28292 0.85462 1.25 0.9375 1.25H2.5V0.9375C2.5 0.85462 2.53292 0.775134 2.59153 0.716529C2.65013 0.657924 2.72962 0.625 2.8125 0.625C2.89538 0.625 2.97487 0.657924 3.03347 0.716529C3.09208 0.775134 3.125 0.85462 3.125 0.9375V1.25ZM2.8125 5H3.4375C3.52038 5 3.59987 5.03292 3.65847 5.09153C3.71708 5.15013 3.75 5.22962 3.75 5.3125C3.75 5.39538 3.71708 5.47487 3.65847 5.53347C3.59987 5.59208 3.52038 5.625 3.4375 5.625H2.8125C2.72962 5.625 2.65013 5.59208 2.59153 5.53347C2.53292 5.47487 2.5 5.39538 2.5 5.3125C2.5 5.22962 2.53292 5.15013 2.59153 5.09153C2.65013 5.03292 2.72962 5 2.8125 5ZM2.8125 6.875H3.4375C3.52038 6.875 3.59987 6.90792 3.65847 6.96653C3.71708 7.02513 3.75 7.10462 3.75 7.1875C3.75 7.27038 3.71708 7.34987 3.65847 7.40847C3.59987 7.46708 3.52038 7.5 3.4375 7.5H2.8125C2.72962 7.5 2.65013 7.46708 2.59153 7.40847C2.53292 7.34987 2.5 7.27038 2.5 7.1875C2.5 7.10462 2.53292 7.02513 2.59153 6.96653C2.65013 6.90792 2.72962 6.875 2.8125 6.875ZM4.6875 5H5.3125C5.39538 5 5.47487 5.03292 5.53347 5.09153C5.59208 5.15013 5.625 5.22962 5.625 5.3125C5.625 5.39538 5.59208 5.47487 5.53347 5.53347C5.47487 5.59208 5.39538 5.625 5.3125 5.625H4.6875C4.60462 5.625 4.52513 5.59208 4.46653 5.53347C4.40792 5.47487 4.375 5.39538 4.375 5.3125C4.375 5.22962 4.40792 5.15013 4.46653 5.09153C4.52513 5.03292 4.60462 5 4.6875 5ZM4.6875 6.875H5.3125C5.39538 6.875 5.47487 6.90792 5.53347 6.96653C5.59208 7.02513 5.625 7.10462 5.625 7.1875C5.625 7.27038 5.59208 7.34987 5.53347 7.40847C5.47487 7.46708 5.39538 7.5 5.3125 7.5H4.6875C4.60462 7.5 4.52513 7.46708 4.46653 7.40847C4.40792 7.34987 4.375 7.27038 4.375 7.1875C4.375 7.10462 4.40792 7.02513 4.46653 6.96653C4.52513 6.90792 4.60462 6.875 4.6875 6.875ZM6.5625 5H7.1875C7.27038 5 7.34987 5.03292 7.40847 5.09153C7.46708 5.15013 7.5 5.22962 7.5 5.3125C7.5 5.39538 7.46708 5.47487 7.40847 5.53347C7.34987 5.59208 7.27038 5.625 7.1875 5.625H6.5625C6.47962 5.625 6.40013 5.59208 6.34153 5.53347C6.28292 5.47487 6.25 5.39538 6.25 5.3125C6.25 5.22962 6.28292 5.15013 6.34153 5.09153C6.40013 5.03292 6.47962 5 6.5625 5ZM6.5625 6.875H7.1875C7.27038 6.875 7.34987 6.90792 7.40847 6.96653C7.46708 7.02513 7.5 7.10462 7.5 7.1875C7.5 7.27038 7.46708 7.34987 7.40847 7.40847C7.34987 7.46708 7.27038 7.5 7.1875 7.5H6.5625C6.47962 7.5 6.40013 7.46708 6.34153 7.40847C6.28292 7.34987 6.25 7.27038 6.25 7.1875C6.25 7.10462 6.28292 7.02513 6.34153 6.96653C6.40013 6.90792 6.47962 6.875 6.5625 6.875Z"
                                fill="#FF00F8"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4357_50584">
                                <rect width="10" height="10" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <small>
                            {cohort.startDate} - {cohort.endDate}
                          </small>
                        </li>
                        <li className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M7.5 8.98454H2.5C2.33429 8.98438 2.17542 8.92122 2.05824 8.80893C1.94107 8.69664 1.87517 8.54438 1.875 8.38558V1.19808C1.87517 1.03927 1.94107 0.887019 2.05824 0.774727C2.17542 0.662435 2.33429 0.59928 2.5 0.599121H7.5C7.66571 0.59928 7.82458 0.662435 7.94176 0.774727C8.05893 0.887019 8.12483 1.03927 8.125 1.19808V6.17482L6.5625 5.42613L5 6.17482V1.19808H2.5V8.38558H7.5V7.18766H8.125V8.38558C8.12475 8.54436 8.05882 8.69657 7.94167 8.80884C7.82451 8.92112 7.66568 8.9843 7.5 8.98454ZM6.5625 4.75649L7.5 5.20571V1.19808H5.625V5.20571L6.5625 4.75649Z"
                              fill="#FF00F8"
                            />
                          </svg>
                          <small>{cohort.cohortCourses}</small>
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
                          <small>{cohort.students}</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </label>
                <input
                  id={`cohort-radio-${index}`}
                  checked={cohort.id == sessionStorage.getItem("selectedCohortId")}
                  type="radio"
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 form-radio"
                  {...register("cohortSelect")}
                  {...getErrorProps("cohortSelect")}
                  onChange={() => handleCohortSelection(cohort.id)}
                />
              </div>
            ))}
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
                <Back  handleBack={handlePrevClick}/>
              </div>

              <div className="flex items-center gap-6 justify-end">
                <Save
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                  disabled={!getValues("cohortSelect")}
                  title={"Save and Continue"}
                />
                {/*<Continue
                  onClick={handleNextClick}
                  disabled={!getValues("cohortSelect")}
                />*/}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CohortSelectionForm;
