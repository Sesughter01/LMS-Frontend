"use client";

import React, { useState, useEffect } from "react";
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
import { formatDateForInput } from '@/shared/utils/dateUtils'

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
          // return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml"];
          return allowedTypes.includes(value.type);
        },
        message: "Please upload a valid image file (jpeg, png, jpg, gif, svg).",
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
        message: "File size must be less than or equal to 2MB.",
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

const EditCohortForm = ({ awaitSubmit, submitting, cohort }) => {
  // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%",{cohort})

  const form = useForm({
    resolver: yupResolver(buildSchema()),
    defaultValues: cohort
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors},
    reset,
    getValues,
    setValue,
  } = form;

  function hasValuesChanged(data){
    return cohort.cohortName !== data.cohortName || cohort.startDate !== data.startDate || cohort.endDate !== data.endDate || cohort.description !== data.description || +cohort.cohortNumber !== +data.cohortNumber ||  cohort.image !== data.image.name
  }


  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedCohort, setUpdatedCohort] = useState(null);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);
  const [previewedContent, setPreviewedContent] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async(data) => {
//     console.log("editeddata", data);
// console.log("hasValuesChanged", hasValuesChanged(data));

  if(!hasValuesChanged(data)){
      toast.info("No value has been changed yet!")
      return
  }else{
    if (isEditMode) {
      data.status = "draft"
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

    setIsSubmitted(true);

    reset({
      cohortName: data.cohortName || "",
      cohortNumber: data.cohortNumber || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      image: data.image || null,
      description: data.description || "",
    });
    setIsEditMode(false);
    data.deletedBy = 0

    setPreviewedContent(data);

    /* if (data.image instanceof File) {
      data.image = data.image;
    }  */
    setFormData(data);
    setIsUpdating(true)
    try{
      const updatedData = await awaitSubmit?.(data);
     }catch(err){
      console.log("errr--------------", err)
    }finally{
       setIsSubmitted(false);
      setIsEditMode(true);
      setIsUpdating(false)
    }
    }

  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("image", undefined);
    setIsEditMode(true);
  };

  async function fetchImageFromS3(imageUrl) {
    try {
      const response = await fetch(imageUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch image (${response.status} - ${response.statusText})`);
      }

      const contentType = response.headers.get("content-type");
      const urlParts = imageUrl.split('.');
      let fileExtension = urlParts.pop().toLowerCase();

      if (!["jpg", "svg", "gif", "png", "jpeg"].includes(fileExtension)) {
        fileExtension = "jpg";
      }
  
      const blob = await response.blob();
      // const fileName = `${imageUrl}.${fileExtension}`;
      const fileName = `${imageUrl}`;
      return new File([blob], fileName, { type: contentType });
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    }
  }

   useEffect(() => {
    setUpdatedCohort(cohort)
  }, [cohort])

  useEffect(() => {
    /* fetchImageFromS3(cohort.image).then((file) => {
      setImageFile(file);
    }); */

    if (cohort?.image) {
      fetchImageFromS3(cohort.image)
        .then((file) => {
          setImageFile(file);
          // Set the default image value after imageFile is initialized
          setValue("image", file);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }

    if (cohort?.cohortName) {
      setValue("cohortName", cohort.cohortName);
    }

     if (cohort?.startDate) {
      setValue("startDate", cohort.startDate);
    }

     if (cohort?.endDate) {
      setValue("endDate", cohort.endDate);
    }

     if (cohort?.cohortNumber) {
      setValue("cohortNumber", cohort.cohortNumber);
    }
  
    // if (cohort?.description) {
    //   setValue("description", cohort.description);
    // }
  
    console.log("coooooo", cohort.description)
  }, [cohort, setValue]);


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
            name="image"
            control={control}
            render={({ field }) => {
              return (
                <UploadMe
                  // file={field.value}
                  // file={cohort.image}
                  // onChange={(file) => field.onChange(file)}
                  file={imageFile}
                  onChange={(file) => {
                    field.onChange(file);
                    setImageFile(file); // Update the imageFile when the file is changed.
                  }}
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
              defaultValue={updatedCohort?.cohortName || ""}
            />
            <InputField
              type="number"
              label="Enrollment Limit"
              placeholder="Add a numerical limit"
              {...register("cohortNumber")}
              {...getErrorProps("cohortNumber")}
              infoIcon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              defaultValue={cohort?.cohortNumber || ""}
              tooltipText="Please specify the maximum number of participants you intend to enroll in this cohort. The enrollment limit helps you manage the cohort's capacity and ensures a conducive learning experience for all participants."
            />
            <InputField
              label="Start Date"
              placeholder="Add start date"
              {...register("startDate")}
              {...getErrorProps("startDate")}
              isDisabled={!isEditMode}
              type="date"
              defaultValue={formatDateForInput(updatedCohort?.startDate || "")}
            />
            <InputField
              label="End Date"
              placeholder="Add end date"
              {...register("endDate")}
              {...getErrorProps("endDate")}
              isDisabled={!isEditMode}
              type="date"
              defaultValue={formatDateForInput(updatedCohort?.endDate || "")}
            />
          </div>
          <RichTextInputField
            name="description"
            label="Cohort description"
            placeholder="Add description"
            error={errors.description?.message}
            isDisabled={!isEditMode}
            infoIcon={<BsInfoCircleFill />}
            control={control}
            tooltipText="Please enter a brief description of your cohort. This description will help users understand the purpose and goals of the cohort. Include relevant information such as the cohort's focus, target audience, and any key objectives"
            initialValue={updatedCohort?.description || ""}
          />
          <div className="flex mt-20 gap-6 cursor-pointer items-center justify-end">
                {/*onSave={
                () => {
                setIsSaved(true);
                handleSubmit(onSubmit)();
              }
            }*/}

              <Save
                isDisabled={isUpdating}
                btnStyle={{pointerEvents: isUpdating? "none": "auto"}}
                title={isUpdating? "Updating...": "Update"}
                errors={form.formState.errors}
              />
           {/* <Preview
              isSubmitted={isSubmitted}
              previewContent={previewedContent}
            />*/}
           {/* {isEditMode ? (
              <Save
              onSave={() => {
                setIsSaved(true);
                handleSubmit(onSubmit)();
              }}
                title="Save and Publish"
                formReset={reset}
                errors={form.formState.errors}
              />
            ) : (
              <Edit onClick={handleEdit} />
            )}*/}
            {/*<Publish isLoading={submitting} 
              onClick={() => {
                setIsPublished(true);
                handleSubmit(onSubmit)();
              }} 
            />*/}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditCohortForm;
