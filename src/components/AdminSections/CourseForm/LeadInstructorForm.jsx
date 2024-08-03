"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../../../utilComponents/InputField/InputField";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Label } from "../../../../utilComponents/Label/Label";
import Button from "@mui/material/Button";
import Preview from "./PreviewButton/Preview";
import Save from "../../../../utilComponents/Buttons/SaveButton/Save";
import Continue from "../../../../utilComponents/Buttons/ContinueButton/Continue";
import Edit from "../../../../utilComponents/Buttons/EditButton/Edit";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import pick from "lodash/pick";
import { errorPropsGetter } from "../../../../utilComponents/formValidation";
import { objectToFormData } from "../../../../utilComponents/objectToFormData";
import { toast } from "react-toastify";

const errorMessages = {
  required(field = "Field") {
    return field + " in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    instructor0: Yup.string().required(
      errorMessages.required("Assigning an instructor is required")
    ),
  });
};


const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const LeadInstructorForm = ({ onNext, onUpdate, data }) => {
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

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);
  const [previewedContent, setPreviewedContent] = useState(false);
  const [numInstructors, setNumInstructors] = useState(1);
  const [hasAssistantInstructor, setHasAssistantInstructor] = useState(false);
  const [selectedInstructors, setSelectedInstructors] = useState([null]);

  const onSubmit = (data) => {

    const instructorValues = Object.keys(data)
    .filter((key) => key.startsWith("instructor"))
    .map((key) => parseInt(data[key], 10))
    .filter((value) => !isNaN(value));

    if (isEditMode) {
      const allowedfields = pick(data, [
        "instructor0",
        "instructor1",
      ]);
      const payload = objectToFormData(allowedfields);
    }

    reset({
      instructor0: data.instructor0 || "",
      instructor1: data.instructor1 || "",
    });
    setIsEditMode(false);
    setPreviewedContent(data);
    
    if (data && !isSubmitted) {
      localStorage.setItem('instructors', JSON.stringify(instructorValues));
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
      setIsSubmitted(true);
      onNext();
    }
    
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("croppedImage", undefined);
    setIsEditMode(true);
  };

  const handleAddInstructor = () => {
    if (!hasAssistantInstructor) {
      setHasAssistantInstructor(true);
    }
    setNumInstructors((prevNum) => prevNum + 1);

    // When adding an instructor, add an empty string to the selectedInstructors array
    setSelectedInstructors((prevInstructors) => [...prevInstructors, ""]);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Move to the next tab
    onNext();
  };

  const options = data.map(item => ({
    value: item.id,
    label: `${item.profile?.firstName} ${item.profile?.lastName}`
  }));

 useEffect(() => {
  const storedInstructors = JSON.parse(localStorage.getItem('instructors'));
  if (storedInstructors) {
    setSelectedInstructors(storedInstructors);
    setNumInstructors(storedInstructors.length);
    setHasAssistantInstructor(storedInstructors.length > 1);
    setValue('instructor0', storedInstructors[0]);
    if (storedInstructors.length > 1) {
      setValue('instructor1', storedInstructors[1]);
    }
  }
}, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err, form.getValues(), "error");
      })}
    >
      <div>
        <div className="my-10">

          <div className="grid grid-cols-2 gap-x-6">
            {Array.from({ length: numInstructors }).map((_, index) => (
              <InputField
                key={index}
                type="select"
                label={
                  index === 0
                    ? "Lead Instructor"
                    : "Assistant Instructor"
                }
                placeholder={`Select instructor`}
                {...register(`instructor${index}`)}
                {...getErrorProps(`instructor${index}`)}
                isDisabled={!isEditMode}
                options={options}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSelectedInstructors((prevInstructors) => {
                    const newInstructors = [...prevInstructors];
                    newInstructors[index] = newValue;
                    return newInstructors;
                  });
                }}

              />
            ))}
          </div>

          <Button
              onClick={handleAddInstructor}
              disabled={hasAssistantInstructor}
              className={`text-#1A183E border-0.7 border-solid border-black min-w-0 ${
                hasAssistantInstructor ? 'bg-gray-300 border-gray-300 text-gray-300' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.9993 10.8317H10.8327V14.9984C10.8327 15.2194 10.7449 15.4313 10.5886 15.5876C10.4323 15.7439 10.2204 15.8317 9.99935 15.8317C9.77834 15.8317 9.56637 15.7439 9.41009 15.5876C9.25381 15.4313 9.16602 15.2194 9.16602 14.9984V10.8317H4.99935C4.77834 10.8317 4.56637 10.7439 4.41009 10.5876C4.25381 10.4313 4.16602 10.2194 4.16602 9.99837C4.16602 9.77736 4.25381 9.5654 4.41009 9.40912C4.56637 9.25284 4.77834 9.16504 4.99935 9.16504H9.16602V4.99837C9.16602 4.77736 9.25381 4.5654 9.41009 4.40912C9.56637 4.25284 9.77834 4.16504 9.99935 4.16504C10.2204 4.16504 10.4323 4.25284 10.5886 4.40912C10.7449 4.5654 10.8327 4.77736 10.8327 4.99837V9.16504H14.9993C15.2204 9.16504 15.4323 9.25284 15.5886 9.40912C15.7449 9.5654 15.8327 9.77736 15.8327 9.99837C15.8327 10.2194 15.7449 10.4313 15.5886 10.5876C15.4323 10.7439 15.2204 10.8317 14.9993 10.8317Z" fill="#1A183E"/>
              </svg>
              Add another instructor
          </Button>
          
          <div className="flex mt-20 gap-6 cursor-pointer items-center justify-end">
            {/*<Preview
              isSubmitted={isSubmitted}
              previewContent={previewedContent}
            />*/}
            {isEditMode ? (
              <Save
                onSave={handleSubmit(onSubmit)}
                formReset={reset}
                errors={form.formState.errors}
               title="Save and Continue"
              />
            ) : (
              <Edit onClick={handleEdit} />
              
            )}
            {/*<Continue onClick={handleContinue} />*/}
          </div>
        </div>
      </div>
    </form>
  );
};

export default LeadInstructorForm;
