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
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    physicalClassAddress: Yup.string().required(
      errorMessages.required("The physical class address is required")
    ),
    physicalClassAddressLink: Yup.string().required(
        errorMessages.required("The physical class location link is required")
    ),
    virtualAddressLink: Yup.string().required(
      errorMessages.required("The virtual class link is required")
    ),
    description: Yup.string()
      .max(200, "The number of words have exceeded the maximum limit. Reduce the number of words you have"),
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
              readOnly={isDisabled}
              error={error}
              initialValue={initialValue}
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

const LocationForm = ({ onNext, onUpdate }) => {
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
    console.log(data);
    
    if (isEditMode) {
      const allowedfields = pick(data, [
        "physicalClassAddress",
        "physicalClassAddressLink",
        "description",
        "virtualAddressLink",
      ]);
      const payload = objectToFormData(allowedfields);
    }

    setIsSubmitted(true);
    reset({
      physicalClassAddress: data.physicalClassAddress || "",
      virtualAddressLink: data.virtualAddressLink || "",
      physicalClassAddressLink: data.physicalClassAddressLink || null,
      description: data.description || "",
    });
    setIsEditMode(false);
    setPreviewedContent(data);

    if (data && !isSubmitted) {
      localStorage.setItem('location', JSON.stringify(data));
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
    
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("croppedImage", undefined);
    setIsEditMode(true);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    onNext();
  };

  useEffect(() => {
    
    const physicalClassAddressLink = JSON.parse(localStorage.getItem("location"))?.physicalClassAddressLink
    const physicalClassAddress = JSON.parse(localStorage.getItem("location"))?.physicalClassAddress
    const virtualAddressLink = JSON.parse(localStorage.getItem("location"))?.virtualAddressLink
    if (physicalClassAddressLink) {
      setValue('physicalClassAddressLink', physicalClassAddressLink);
    }
    if (physicalClassAddress) {
      setValue('physicalClassAddress', physicalClassAddress);
    }
    if (virtualAddressLink) {
      setValue('virtualAddressLink', virtualAddressLink);
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
          <div className="grid grid-cols-1 gap-x-6">
            <InputField
              label="Physical Class Address"
              placeholder="Enter the location address of the physical classes"
              {...register("physicalClassAddress")}
              {...getErrorProps("physicalClassAddress")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              tooltiptext="Enter the location address of the physical class."
            />
            <InputField
              label="Physical Class Location Link"
              placeholder="Paste the google map link to the physical class"
              {...register("physicalClassAddressLink")}
              {...getErrorProps("physicalClassAddressLink")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              tooltiptext="Paste the Google map link for the physical class location."
            />
            <InputField
              label="Virtual Class Link"
              placeholder="Paste the link to the virtual class"
              {...register("virtualAddressLink")}
              {...getErrorProps("virtualAddressLink")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              tooltiptext="Enter the URL where students can access the virtual class. Make sure the link is accurate and accessible to all enrolled students."
            />
          </div>
          <RichTextInputField
            name="description"
            label="Description"
            placeholder="Add a description"
            // {...register("description")}
            // {...getErrorProps("description")}
            error={errors.description?.message}
            isDisabled={!isEditMode}
            control={control}
            initialValue={JSON.parse(localStorage.getItem("location"))?.description || ""} 
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
                title="Persist to Draft"
              />
            ) : (
              <Edit onClick={handleEdit} />
            )}
            <Continue onClick={handleContinue} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default LocationForm;
