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
import { createAssessment } from "@/store/slices/assessmentSlice";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    assessmentDuration: Yup.string().required(
      errorMessages.required("An assessment duration is required")
    ),
    assessmentDeadline: Yup.string().required(
      errorMessages.required("An assessment deadline is required")
    ),
    assessmentDeadlineTime: Yup.string().required(
      errorMessages.required("An assessment deadline time is required")
    ),
    assessmentPassingScore: Yup.string()
      .required(
        errorMessages.required("An assessment passing score is required")
      )
    });
  };

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const AssessmentSettingsForm = ({ onNext, awaitSubmit, onPrev }) => { 
  const dispatch = useDispatch();
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

  const options = [
    { value: 1, label: "1" },
    // Add more options as needed
  ];

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [isDeadlineEnabled, setIsDeadlineEnabled] = useState(false);
  const [isSendingDetails, setIsSendingDetails] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsDeadlineEnabled(e.target.checked);
  };

  const onSubmit = async (data) => {
    console.log("data:", data);

    if (Object.keys(errors).length > 0) {
      toast.error("Please select a course before saving or continuing.")
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    // Reset the error message
    setErrorMessage("");

    // Save data to sessionStorage
    sessionStorage.setItem("assessmentDuration", data.assessmentDuration);
    sessionStorage.setItem("assessmentDeadline", data.assessmentDeadline);
    sessionStorage.setItem("assessmentDeadlineTime", data.assessmentDeadlineTime);
    sessionStorage.setItem(
      "assessmentPassingScore",
      data.assessmentPassingScore
    );

    if (isEditMode) {
      const allowedfields = pick(data, [
        "assessmentDuration",
        "assessmentDeadline",
        "assessmentDeadlineTime",
        "assessmentPassingScore",
      ]);
      const payload = objectToFormData(allowedfields);
    }


    setIsSubmitted(true);

    reset({
      assessmentDuration: data.assessmentDuration || "",
      assessmentDeadline: data.assessmentDeadline || "",
      assessmentDeadlineTime: data.assessmentDeadlineTime || "",
      assessmentPassingScore: data.assessmentPassingScore || "",
    });
    // setIsEditMode(false);

    // awaitSubmit?.(data);

    const assessmentFor = sessionStorage.getItem("assessmentFor");
    const isPreAssesment =
      assessmentFor === "cohortPreAssessment" ||
      assessmentFor === "coursePreAssessment" ||
      assessmentFor === "course";
    console.log(isPreAssesment, "pre-assesment");

    // Determine the courseId and cohortId to send to the API
    const selectedCourseId = parseInt(
      sessionStorage.getItem("selectedCourseId")
    );
    const selectedCohortId = parseInt(
      sessionStorage.getItem("selectedCohortId")
    );

    const courseIdToSend = selectedCourseId || undefined;
    const cohortIdToSend = selectedCohortId || undefined;

    // Get the stored data from sessionStorage
    const storedData = {
      assessmentTitle: sessionStorage.getItem("assessmentName"),
      assessmentDescription: sessionStorage.getItem("assessmentDescription"),
      durationInMinutes: parseInt(sessionStorage.getItem("assessmentDuration")),
      passingScore: parseInt(sessionStorage.getItem("assessmentPassingScore")),
      deadline: sessionStorage.getItem("assessmentDeadline"),
      deadline_time: sessionStorage.getItem("assessmentDeadlineTime"),
      assessmentFor: assessmentFor,
      courseId: courseIdToSend,
      cohortId: cohortIdToSend,
      isPreAssesment: isPreAssesment,
      modules: [parseInt(sessionStorage.getItem("selectedModuleId"))],
    };

    console.log("storedData:", storedData);
    setIsSendingDetails(true)

    try {
       const res = await dispatch(createAssessment(storedData))
       if(!res?.type?.includes('rejected')){
         toast.success("Assessment Created");
         handleTab("questions", router, pathname, searchParams)
       }
       // .then(() => {
          // setIsSendingDetails(false);

        //   onNext()
       // });
        // handleTab("questions", router, pathname, searchParams)
         // toast.success("Assessment Created");

      // toast.success(
      //   <>
      //     <div>
      //       Assessment Created
      //       <div style={customMessageStyle}>
      //         Your assessment has been created successfully.
      //       </div>
      //     </div>
      //   </>
      // );

      // handleTab("questions", router, pathname, searchParams)
      // onNext();
    } catch (error) {
      // console.error("Error creating assessment:", error);
      toast.error("Failed to create assessment. Please try again.");
    } finally {
      setIsSendingDetails(false)
    }
  };


  const handlePrevClick = () => {
    // handleTab("questions", router, pathname, searchParams)
    const savedAssessmentType = sessionStorage.getItem("selectedAssessmentType");
    // if(savedAssessmentType !== "coursePreAssessment"){
    //   handleTab("modules", router, pathname, searchParams)
    // }else if(savedAssessmentType === "coursePreAssessment"){
    //   handleTab("courses", router, pathname, searchParams)
    // }else{
    //   handleTab("assessment", router, pathname, searchParams)
    // }

    if(!savedAssessmentType){
      handleTab("assessment", router, pathname, searchParams)
    }

    if(savedAssessmentType === "coursePreAssessment"){
      handleTab("courses", router, pathname, searchParams)
    }else if(savedAssessmentType === "cohortPreAssessment"){
       handleTab("cohort", router, pathname, searchParams)
    }else{
      handleTab("modules", router, pathname, searchParams)
    }
    // onPrev();
  };

  const handleNextClick = (data) => {
    console.log(data);

    if (Object.keys(errors).length > 0) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    // Reset the error message
    setErrorMessage("");

    if (isEditMode) {
      const allowedfields = pick(data, [
        "assessmentDuration",
        "assessmentDeadline",
        "assessmentDeadlineTime",
        "assessmentPassingScore",
      ]);
      const payload = objectToFormData(allowedfields);
    }

    // if (data && !isSubmitted) {
    //   toast.success(
    //     <>
    //       <div>
    //         Change Saved
    //         <div style={customMessageStyle}>
    //           Your changes have been saved as a draft
    //         </div>
    //       </div>
    //     </>
    //   );
    //   onNext();
    // }

    // onNext();
    setIsSubmitted(true);

    reset({
      assessmentDuration: data.assessmentDuration || "",
      assessmentDeadline: data.assessmentDeadline || "",
      assessmentDeadlineTime: data.assessmentDeadlineTime || "",
      assessmentPassingScore: data.assessmentPassingScore || "",
    });
    setIsEditMode(false);

    awaitSubmit?.(data);
  };

   useEffect(() => {
    const assessmentDeadline = sessionStorage.getItem(
      "assessmentDeadline"
    );
     const assessmentDeadlineTime = sessionStorage.getItem(
      "assessmentDeadlineTime"
    );

    const assessmentDuration = sessionStorage.getItem("assessmentDuration");
    const assessmentPassingScore = sessionStorage.getItem("assessmentPassingScore");
    if (assessmentDeadline) {
      setValue("assessmentDeadline", assessmentDeadline);
    }

    if(assessmentDeadlineTime){
       setValue("assessmentDeadlineTime", assessmentDeadlineTime);
    }

    if(assessmentDuration){
       setValue("assessmentDuration", assessmentDuration);
    }

    if(assessmentPassingScore){
       setValue("assessmentPassingScore", assessmentPassingScore);
    }

  }, []);

   const handleTimeInputChange = (e) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9:]/g, ''); // Remove non-integer and non-colon characters

    if (sanitizedInput.length <= 5) { // Limit to 5 characters (hh:mm)
      let formattedInput = sanitizedInput;

      // Auto-append ':' after 2 characters
      if (sanitizedInput.length === 2 && !sanitizedInput.includes(':')) {
        formattedInput = sanitizedInput + ':';
      }

      // setInputValue(formattedInput);
      setValue("assessmentDeadlineTime", formattedInput);
      // onChange(formattedInput);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err, form.getValues(), "error");
      })}
    >
      <div className="mt-9">
        <div className="my-10">
          <div className="grid grid-cols-1 gap-x-6">
            <h2 className="text-indigo-800 font-semibold text-2xl mb-1">
              Settings
            </h2>
            <p className="text-gray-400 font-medium text-xs mb-6">
              Add some settings to the assessment
            </p>
            <InputField
              label="Duration (in minutes)"
              type="number"
              placeholder="e.g 30"
              min="1"
              {...register("assessmentDuration")}
              {...getErrorProps("assessmentDuration")}
              isDisabled={!isEditMode}
            />
           {/* <div class="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={isDeadlineEnabled}
                onChange={handleCheckboxChange}  
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Is there a deadline?
              </label>
            </div>*/}
            <InputField
              label="Deadline"
              placeholder="Add a date for the deadline"
              {...register("assessmentDeadline")}
              {...getErrorProps("assessmentDeadline")}
              type="date"
              options={options}
              isDisabled={!isEditMode}
            />
             <InputField
              label="DeadlineTime"
              placeholder="Add a time for the deadline (24hr format)"
              {...register("assessmentDeadlineTime")}
              {...getErrorProps("assessmentDeadlineTime")}
              onChange={handleTimeInputChange}
              type="text"
              options={options}
              isDisabled={!isEditMode}
              maxLength={5}
            />
            <InputField
              label="Minimum Passing Score"
              placeholder="Enter the minimum passing score in percentage"
              {...register("assessmentPassingScore")}
              {...getErrorProps("assessmentPassingScore")}
              type="number"
              isDisabled={!isEditMode}
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}

          <div className="mt-20">
            <hr className="w-full h-0.5 bg-gray-400" />

            <div className="flex justify-between mt-4 gap-6 cursor-pointer items-center">
              <div
                className="flex items-center justify-start"
              >
                <Back handleBack={handlePrevClick}/>
              </div>

              <div className="flex items-center gap-6 justify-end">
                <Save
                  btnClassName="bg-[red]"
                  btnStyle={{backgroundColor: sessionStorage.getItem("secondaryColor") || "", pointerEvents: isSendingDetails? "none": "auto",  color: "#ffffff"}}
                  spanStyle={{color: "#ffffff"}}
                  showIcon={false}
                  disabled={isSendingDetails || Object.keys(errors).length > 0 || !isEditMode}
                  onSave={() => {
                    if(!isSendingDetails){
                      handleSubmit(onSubmit)()
                    }}
                  }
                  formReset={reset}
                  errors={form.formState.errors}
                  title={isSendingDetails? "Creating....": "Create Assessment"}
                />
                {/*<Continue
                  onClick={handleNextClick}
                  disabled={Object.keys(errors).length > 0 || !isEditMode}
                />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AssessmentSettingsForm;
