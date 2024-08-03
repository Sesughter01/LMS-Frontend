"use client";

import React, { useEffect, useState, useCallback } from "react";
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
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    assessmentName: Yup.string().required(
      errorMessages.required("An assessment name is required")
    ),
    assessmentType: Yup.string().required(
      errorMessages.required("An assessment type is required")
    ),
    assessmentDescription: Yup.string()
      .required(errorMessages.required("An assessment description is required"))
      .max(200, "Word limit exceeded! Please shorten your text.")
      .min(5, "Please provide a valid cohort description"),
  });
};

const RichTextInputField = ({
  label,
  name,
  placeholder,
  tooltipText,
  isDisabled,
  control,
  error,
  initialValue,
  ...inputProps
}) => {
  return (
    <div className="relative">
      <div className="flex items-center">
        <Label>{label}</Label>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <RichTextEditor
              {...field}
              initialValue={initialValue}
              placeholder={placeholder}
              readOnly={isDisabled}
              error={error}
              onChange={(content) => field.onChange(content)}
              {...inputProps}
            />
          </>
        )}
      />
    </div>
  );
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

function AssessmentForm({ onNext, awaitSubmit, onPrev }) {
  const form = useForm({
    resolver: yupResolver(buildSchema()),
  });

  const {
    formState,
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = form;

  const options = [
    { value: "cohortPreAssessment", label: "Cohort PreAssessment" },
    { value: "coursePreAssessment", label: "Course PreAssessment" },
    { value: "course", label: "Course Assessment" },
    // Add more options as needed
  ];

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSubmitted, setIsSubmitted] = useState(false);
  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);

  const onSubmit = (data) => {
    console.log("data:", data);

    if (!sessionStorage.getItem("selectedAssessmentType")) {
      toast.success("Please select an assessment type before continuing.")
      return;
    }

    sessionStorage.setItem("assessmentName", data.assessmentName);
    sessionStorage.setItem("assessmentFor", data.assessmentType);
    sessionStorage.setItem("assessmentDescription", data.assessmentDescription);


    if (isEditMode) {
      const allowedfields = pick(data, [
        "assessmentName",
        "assessmentType",
        "assessmentDescription",
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

      handleTab("cohort", router, pathname, searchParams)
    }

    setIsSubmitted(true);

    reset({
      assessmentName: data.assessmentName || "",
      assessmentType: data.assessmentType || "",
      assessmentDescription: data.assessmentDescription || "",
    });
    setIsEditMode(false);


    // awaitSubmit?.(data);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  };

   const handleNextClick = (data) => {
    if (!formState.isValid) {
      // Form is not valid, show error messages
      form.trigger(); // Trigger validation to display error messages
      return;
    }

    if (!sessionStorage.getItem("selectedAssessmentType")) {
      // The type is not selected, show a message or prevent navigation
      // console.log("Please select an assessment type before continuing.");
      toast.success("Please select an assessment type before continuing.")
      return;
    }

    if (isEditMode) {
      const allowedfields = pick(data, [
        "assessmentName",
        "assessmentType",
        "assessmentDescription",
      ]);
      const payload = objectToFormData(allowedfields);
    }

    if (data && !isSubmitted && isDataSaved) {
      // toast.success(
      //   <>
      //     <div>
      //       Change Saved
      //       <div style={customMessageStyle}>
      //         Your changes have been saved as a draft
      //       </div>
      //     </div>
      //   </>
      // );

      onNext();
      setIsSubmitted(true);

      reset({
        assessmentName: data.assessmentName || "",
        assessmentType: data.assessmentType || "",
        assessmentDescription: data.assessmentDescription || "",
      });
      setIsEditMode(false);
    }


  };

  useEffect(() => {
    const storedAssessmentType = sessionStorage.getItem(
      "selectedAssessmentType"
    );
    const storedAssessmentName = sessionStorage.getItem("assessmentName");
    // const storedAssessmentType = sessionStorage.getItem("assessmentFor");
    if (storedAssessmentType) {
      setValue("assessmentType", storedAssessmentType);
    }

    if(storedAssessmentName){
       setValue("assessmentName", storedAssessmentName);
    }


  }, []);

  // console.log("sessionStorage.getItem", sessionStorage.getItem("assessmentDescription") )

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
              Basic Information
            </h2>
            <p className="text-gray-400 font-medium text-xs mb-6">
              Give the assessment basic information such as assessment name,
              type of assessment, and description
            </p>
            <InputField
              label="Assessment Name"
              placeholder="add an assessment name"
              {...register("assessmentName")}
              {...getErrorProps("assessmentName")}
              isDisabled={!isEditMode}
            />
            <InputField
              label="Assessment Type"
              placeholder="Select a type of assessment"
              {...register("assessmentType")}
              {...getErrorProps("assessmentType")}
              type="select"
              options={options}
              isDisabled={!isEditMode}
              onChange={(e) => {
                setValue("assessmentType", e.target.value);
                sessionStorage.setItem(
                  "selectedAssessmentType",
                  e.target.value
                );
              }}
            />
          </div>
          <RichTextInputField
            name="assessmentDescription"
            label="Description"
            placeholder="Add description"
            error={errors.assessmentDescription?.message}
            isDisabled={!isEditMode}
            control={control}
             initialValue={sessionStorage.getItem("assessmentDescription") || ""} 
          />

          <div className="mt-20">
            <hr className="w-full h-0.5 bg-gray-400" />

            <div className="flex justify-between mt-4 gap-6 cursor-pointer items-center">
              <div
                className="flex items-center justify-start"
              >
                <Back handleBack={() => router.push('/admin/assessment')}/>
              </div>

              <div className="flex items-center gap-6 justify-end">
                <Save
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                  title="Save and Continue"
                />
                {/*<Continue
                  onClick={handleNextClick}
                  disabled={
                    !sessionStorage.getItem("selectedAssessmentType") ||
                    !formState.isValid
                  }
                />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AssessmentForm;
