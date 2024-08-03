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
import SearchSmall from "../../../../utilComponents/SearchSmall/SearchSmall";
import { useDispatch } from "react-redux";
import { fetchModule } from "@/store/slices/coursesSlice";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    moduleSelection: Yup.string().required(
      errorMessages.required("Module selection is required")
    ),
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

const AssementModule = ({ onNext, awaitSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const selectedCourseId = sessionStorage.getItem("selectedCourseId");
  const [moduleResponse, setModuleResponse] = useState([]);

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
    { value: 1, label: "My name" },
    { value: 2, label: "Your name" },
    { value: 3, label: "Their name" },
    // Add more options as needed
  ];

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    console.log(data);

    if (!data.moduleSelection) {
      // Display an error message when no module is selected
      toast.error("Please select a course before saving or continuing.")
      setErrorMessage("Please select a module before saving or continuing.");
      return;
    }

    // Reset the error message
    setErrorMessage("");

    if (isEditMode) {
      const allowedfields = pick(data, ["moduleSelection"]);
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

       handleTab("settings", router, pathname, searchParams)
      // onNext();
    }

    setIsSubmitted(true);

    reset({
      moduleSelection: data.moduleSelection || "",
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
    // const assessmentFor = sessionStorage.getItem("selectedAssessmentType")
    // if(assessmentFor == "cohortPreAssessment"){
    //    handleTab("cohort", router, pathname, searchParams)
    // }else if(assessmentFor !== "cohortPreAssessment"){
    //    handleTab("course", router, pathname, searchParams)
    // }else{
    //   handleTab("assessment", router, pathname, searchParams)
    // }
   
   handleTab("course", router, pathname, searchParams)
    // onPrev();
  };

  const handleNextClick = (data) => {
    if (!data.moduleSelection) {
      // Display an error message when no module is selected

      setErrorMessage("Please select a module before saving or continuing.");
      return;
    }

    // Reset the error message
    setErrorMessage("");

    if (isEditMode) {
      const allowedfields = pick(data, ["moduleSelection"]);
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

    setIsSubmitted(true);

    reset({
      moduleSelection: data.moduleSelection || "",
    });
    setIsEditMode(false);

    // awaitSubmit?.(data);
  };

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        if (selectedCourseId) {
          const response = await dispatch(fetchModule(selectedCourseId));
          console.log(response);
          setModuleResponse(response.payload || []);
        }
      } catch (error) {
        console.error("Error fetching module:", error);
      }
    };

    fetchModuleData();
  }, [dispatch, selectedCourseId]);

  const handleModuleSelection = (moduleId) => {
    sessionStorage.setItem("selectedModuleId", moduleId);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err, form.getValues(), "error");
      })}
    >
      <div className="mt-9">
        <div className="my-10">
          <div className="grid grid-cols-1 gap-x-6 mb-4">
            <h2 className="text-indigo-800 font-semibold text-2xl mb-1">
              Select a Module
            </h2>
            <p className="text-gray-400 font-medium text-xs mb-6">
              Select a module to make an assessment for it
            </p>
            <SearchSmall />
          </div>

          <div className="grid grid-cols-1 gap-x-6">
            {moduleResponse.length === 0 ? (
              <div className="text-gray-900 font-semibold text-sm mb-4">
                No modules found. Please select another cohort/course.
              </div>
            ) : (
              moduleResponse.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 w-[678px] mb-4"
                >
                  <label
                    htmlFor={`module-radio-${index}`}
                    className="h-[135px] w-[447px] py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    <div className="max-w-sm w-full lg:max-w-full lg:flex">
                      <div className="lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col">
                        <div className="text-gray-900 font-bold text-sm mb-2">
                          <p className="font-semibold">
                            Module {module.moduleSequencePosition} -{" "}
                            {module.moduleTitle}
                          </p>
                          <div className="grid grid-cols-1 divide-y"></div>
                        </div>
                      </div>
                    </div>
                  </label>

                  <input
                    id={`module-radio-${module.id}`}
                    type="radio"
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 form-radio"
                    {...register("moduleSelection")}
                    {...getErrorProps("moduleSelection")}
                    onChange={() => handleModuleSelection(module.id)}
                  /> 
                </div>
              ))
            )}
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
                  disabled={!getValues("moduleSelection")}
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                  title={"Save and Continue"}
                />
               {/* <Continue
                  onClick={handleNextClick}
                  disabled={!getValues("moduleSelection")}
          /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AssementModule;
