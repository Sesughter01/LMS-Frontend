"use client";

import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import InputField from "../../../../utilComponents/InputField/InputField";
import { BsInfoCircleFill } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import RichTextEditor from "../../Description/RichTextEditor";
import { Label } from "../../../../utilComponents/Label/Label";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Preview from "./PreviewButton/Preview";
import Save from "../../../../utilComponents/Buttons/SaveButton/Save";
import Continue from "../../../../utilComponents/Buttons/ContinueButton/Continue";
import { UploadMe } from "./UploadMe";
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
    courseTitle: Yup.string().required(
      errorMessages.required("A course title is required")
    ),
    courseOverview: Yup.string().required(
        errorMessages.required("An course overview is required")
    ),
    courseDescription: Yup.string()
      .max(200, "The number of words have exceeded the maximum limit. Reduce the number of words you have"),
    courseImage: Yup.mixed()
      .test({
        name: "fileType",
        exclusive: true,
        test: (value) => {
          if (!value) {
            // Image is required
            // return false;
            return true;
          }
          // Check file type (accepts jpeg, png, jpg)
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        },
        message: "Please upload a valid image file (jpeg, png, jpg).",
      })
      .test({
        name: "fileSize",
        exclusive: true,
        test: (value) => {
          if (!value) {
            // return false;
            return true;
          }
          // Check file size (max size is 15MB)
          return value.size <= 2 * 1024 * 1024;
        },
        message: "The image is larger than 2MB. Upload a smaller sized imag",
      }),
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
  wordLimit,
  initialValue,
  ...inputProps
}) => {
  return (
    <div className="relative">
      <div className="flex items-center">
        <Label>{label}</Label>
        <div style={{ marginTop: "-7px" }}>
          <Tooltip title={tooltipText} arrow>
            <Button
              style={{
                color: "#7A7A7A",
                backgroundColor: "transparent",
                minWidth: "0",
              }}
              disableRipple
            >
            </Button>
          </Tooltip>
        </div>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <RichTextEditor
              {...field}
              placeholder={placeholder}
              initialValue={initialValue}
              readOnly={isDisabled}
              error={error}
              wordLimit={200}
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

const CourseForm = ({ onNext, onUpdate }) => {
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

  const onSubmit = (data) => {
    
    if (isEditMode) {
      const allowedfields = pick(data, [
        "courseTitle",
        "courseDescription",
        "courseOverview",
        "courseImage",
      ]);
      const payload = objectToFormData(allowedfields);
    }
    reset({
      courseTitle: data.courseTitle || "",
      courseOverview: data.courseOverview || "",
      courseImage: data.courseImage || null,
      courseDescription: data.courseDescription || "",
    });
    setIsEditMode(false);
    setPreviewedContent(data);

    if (data && !isSubmitted) {
      // console.log("data.courseImage", data.courseImage)
      localStorage.setItem('courseTitle', data.courseTitle)
      localStorage.setItem('courseDescription', data.courseDescription)
      localStorage.setItem("courseOverview", data.courseOverview);
      //  const formData = new FormData();
      // formData.append('file', data.courseImage);
      //  localStorage.setItem("stringify", JSON.stringify(formData));
      //  console.log("Saved to storage")
      //  const reader = new FileReader();
      // reader.onload = function (event) {
      //   const fileData = event.target.result; // Get the file data
      //   localStorage.setItem("courseImage", fileData); // Store the file data in local storage
      // };
    // reader.readAsDataURL(data.courseImage); 
     // sessionStorage.setItem('courseImage', data.courseImage)
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
    // form.setValue("courseImage", undefined);
    setIsEditMode(true);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Move to the next tab
    onNext();
  };

   useEffect(() => {
    const courseTitle = localStorage.getItem("courseTitle");
    const courseOverview = localStorage.getItem("courseOverview");
    const courseImage = localStorage.getItem("courseImage");
    if (courseTitle) {
      setValue("courseTitle", courseTitle);
    }
    if(courseOverview){
       setValue("courseOverview", courseOverview);
    }

    if(courseImage){
      // console.log(courseImage, "fillllll")
      // setValue("courseImage", courseImage);
    }

   
     // if(courseImage){
     //       setValue("courseImage", courseImage);
     //  }


  }, []);


 function convertBlobToFile(base64String){
  // const byteCharacters = atob(decodeURIComponent(base64String));
  // // const byteNumbers = new Array(byteCharacters.length);
  // // for (let i = 0; i < byteCharacters.length; i++) {
  // //   byteNumbers[i] = byteCharacters.charCodeAt(i);
  // // }
  //  const byteNumbers = new Uint8Array(binary.length);
  // for (let i = 0; i < byteNumbers.length; i++) {
  //   bytes[i] = binary.charCodeAt(i);
  // }
  // const byteArray = new Uint8Array(byteNumbers);
  // const blob = new Blob([byteArray],  { type: mimeType });

  // // Create a new File object from the Blob
  // const fileName = 'example.txt'; // Provide the file name
  // const file = new File([blob], fileName);

  // return file
   let base64Parts = base64String.split(",");
   let fileFormat = base64Parts[0].split(";")[1];
   let fileContent = base64Parts[1];
   let file = new File([fileContent], "file name here", {type: fileFormat});
   return file;
 }

   console.log()

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err, form.getValues(), "error");
      })}
    >
      <div>
        <div className="mt-8 mb-14">
          {/* <UploadMe /> */}
          <Controller
            name="courseImage"
            control={control}
            render={({ field }) => {
              return (
                <UploadMe
                  file={field.value}
                  onChange={(file) => field.onChange(file)}
                  error={errors?.courseImage?.message}
                  isDisabled={!isEditMode}
                />
              );
            }}
          />
        </div>
        <div className="my-10">
          <div className="grid grid-cols-1 gap-x-6">
            <InputField
              label="Course title"
              placeholder="Add a course title"
              {...register("courseTitle")}
              {...getErrorProps("courseTitle")}
              isDisabled={!isEditMode}
            />
            <InputField
              label="Course overview"
              placeholder="Add a teaching overview"
              {...register("courseOverview")}
              {...getErrorProps("courseOverview")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              tooltiptext="Kindly input the primary teaching overviews. These will be featured on the course card displayed on the course page. Each overview should consist of no more than 5 words, and you are limited to a maximum of 6 goals. After typing each overview, please press the 'Enter' key to submit it."
            />
          </div>
          <RichTextInputField
            name="courseDescription"
            label="About course description"
            placeholder="Add a description"
            error={errors.courseDescription?.message}
            isDisabled={!isEditMode}
            control={control}
            initialValue={localStorage.getItem("courseDescription") || ""} 
          />
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

export default CourseForm;
