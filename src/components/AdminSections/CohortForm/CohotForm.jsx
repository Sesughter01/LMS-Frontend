"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../../../utilComponents/InputField/InputField";
import { BsInfoCircleFill } from "react-icons/bs";
import { Controller, useForm, useWatch } from "react-hook-form";
import RichTextEditor from "../../Description/RichTextEditor";
import { Label } from "../../../../utilComponents/Label/Label";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Preview from "./PreviewButton/Preview";
import Save from "../../../../utilComponents/Buttons/SaveButton/Save";
import Publish from "../../../../utilComponents/Buttons/PublishButton/Publish";
import { UploadMe } from "./UploadMe";
import Edit from "../../../../utilComponents/Buttons/EditButton/Edit";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import pick from "lodash/pick";
import { errorPropsGetter } from "../../../../utilComponents/formValidation";
import { objectToFormData } from "../../../../utilComponents/objectToFormData";
import { toast } from "react-toastify";
import { setFormData, resetForm } from "@/store/slices/cohortFormData";

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    cohortName: Yup.string().required(errorMessages.required("A cohort name")),
    description: Yup.string()
      .required(errorMessages.required("A cohort description"))
      .max(200, "Word limit exceeded! Please shorten your text.")
      .min(5, "Please provide a valid cohort description"),
    cohortNumber: Yup.string().required(
      errorMessages.required("An enrollment limit")
    ),
    startDate: Yup.string().required(errorMessages.required("A start date")),
    endDate: Yup.string().required(errorMessages.required("An end date")),
    image: Yup.mixed()
      .test({
        name: "fileType",
        exclusive: true,
        test: (value) => {
          if (!value) {
            // Image is required
            return false;
          }
          // Check file type (accepts jpeg, png, jpg)
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/gif",
            "image/svg+xml",
          ];
          return allowedTypes.includes(value.type);
          // return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        },
        message: "Please upload a valid image file (jpeg, png, jpg).",
      })
      .test({
        name: "fileSize",
        exclusive: true,
        test: (value) => {
          if (!value) {
            return false;
          }
          // Check file size (max size is 15MB)
          return value.size <= 2 * 1024 * 1024;
        },
        message: "File size must be less than or equal to 15MB.",
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
              <BsInfoCircleFill size={16} />
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

const CohotForm = ({ awaitSubmit, isLoading }) => {
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
  const [isSaved, setIsSaved] = useState(false); // Track if the user clicked "Save"
  const [isPublished, setIsPublished] = useState(false); // Track if the user clicked "Publish"
  const [cohortId, setCohortId] = useState(null);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);
  const [previewedContent, setPreviewedContent] = useState(false);

 const onSubmit = (action) => async(data) => {
  //  console.log("accccc", action)
    if (!isPublished) {
      data.status = "drafts";
    } else {
      data.status = "published";
    }

    setPreviewedContent(data);

    if (isEditMode) {
      const allowedfields = pick(data, [
        "cohortName",
        "description",
        "cohortNumber",
        "startDate",
        "endDate",
        "image",
      ]);
      const payload = objectToFormData(allowedfields);
    }

    reset({
      cohortName: data.cohortName || "",
      cohortNumber: data.cohortNumber || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      image: data.image || null,
      description: data.description || "",
    });
    // setIsEditMode(false);

    if (action == "save") {
      data.status = "drafts";
    } else {
      data.status = "published";
    }

    // setPreviewedContent(data);
    // console.log(data)
    setFormData(data);
    const savedData = await awaitSubmit?.(data, cohortId);
    console.log(savedData);
    setCohortId(savedData?.data?.id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("image", undefined);
    setIsEditMode(true);
  };
    // <form onSubmit={handleSubmit(onSubmit, (err) => {})}>

  return (

    <form
       onSubmit={(e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.getAttribute('data-action')
        // console.log("eeeeeeeeeeeeeee", action)
        handleSubmit(onSubmit(action), (err) => {
            console.log(err, form.getValues(), "error");
        })()
      }}
     >
      <div>
        <div className="mt-8 mb-14">
          {/* <UploadMe /> */}
          <Controller
            name="image"
            control={control}
            render={({ field }) => {
              return (
                <UploadMe
                  file={field.value}
                  onChange={(file) => field.onChange(file)}
                  error={errors?.image?.message}
                  isDisabled={!isEditMode}
                />
              );
            }}
          />
        </div>
        <div className="my-10">
          <div className="grid grid-cols-2 gap-x-6">
            <InputField
              label="Cohort Title"
              placeholder="Cohort Title"
              {...register("cohortName")}
              {...getErrorProps("cohortName")}
              isDisabled={!isEditMode}
            />
            <InputField
              type="number"
              label="Enrollment Limit"
              placeholder="Add a numerical limit"
              {...register("cohortNumber")}
              {...getErrorProps("cohortNumber")}
              infoIcon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              tooltipText="Please specify the maximum number of participants you intend to enroll in this cohort. The enrollment limit helps you manage the cohort's capacity and ensures a conducive learning experience for all participants."
            />
            <InputField
              label="Start Date"
              placeholder="Add start date"
              {...register("startDate")}
              {...getErrorProps("startDate")}
              isDisabled={!isEditMode}
              type="date"
            />
            <InputField
              label="End Date"
              placeholder="Add end date"
              {...register("endDate")}
              {...getErrorProps("endDate")}
              isDisabled={!isEditMode}
              type="date"
            />
          </div>
          <RichTextInputField
            name="description"
            label="Cohort description"
            placeholder="Add description"
            // {...register("description")}
            // {...getErrorProps("description")}
            error={errors.description?.message}
            isDisabled={!isEditMode}
            infoIcon={<BsInfoCircleFill />}
            control={control}
            tooltipText="Please enter a brief description of your cohort. This description will help users understand the purpose and goals of the cohort. Include relevant information such as the cohort's focus, target audience, and any key objectives"
          />
          <div className="flex mt-20 gap-6 cursor-pointer items-center justify-end">
           {/* <Preview
              isSubmitted={isSubmitted}
              previewContent={previewedContent}
            />*/}
            {isEditMode ? (
              <Save
                btnStyle={{pointerEvents: isLoading? "none": "auto" }}
                disabled={isLoading}
                onSave={() => {
                  setIsSaved(true);
                  handleSubmit(onSubmit)();
                }}
                formReset={reset}
                title={isLoading? "...": 'Save'}
                errors={form.formState.errors}
              />
            ) : (
              <Edit onClick={handleEdit} />
            )}
            <Publish
              isLoading={isLoading}
              isSubmitted={isSubmitted}
              onClick={() => {
                setIsPublished(true); // Set the "Publish" flag
                handleSubmit(onSubmit)();
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CohotForm;
