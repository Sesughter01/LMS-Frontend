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
import uploadService from "@/services/api/upload";

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    /* syllabus: Yup.string().required(
      errorMessages.required("A syllabus")
    ), */
    coursePrice: Yup.number().required(
        errorMessages.required("A course price")
    ),
    courseDiscount: Yup.number()
    .max(100, "The course discount exceeds the maximum limit."),
    syllabus: Yup.mixed()
      .nullable()
      .notRequired()
      .test({
        name: "fileType",
        test: (value) => {
          const f = value[0]
          if (!f) {
            return true;
          }
          return ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(f.type);
        },
        message: "Please upload a valid file (jpeg, png, jpg, pdf).",
      })
      .test({
        name: "fileSize",
        test: (value) => {
          const f = value[0]
          if (!f) {
            return true;
          }
          return f.size <= 2 * 1024 * 1024;
        },
        message: "The file is larger than 2MB. Upload a smaller sized File",
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
              readOnly={isDisabled}
              initialValue={initialValue}
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

const BasicInfoForm = ({ onNext, onUpdate }) => {
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
    setError,
  } = form;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);
  const [previewedContent, setPreviewedContent] = useState(false);

  const [learnInput, setLearnInput] = useState('');
  const [learnValues, setLearnValues] = useState([]);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [syllabusUrl, setSyllabusUrl] = useState("")
  const [isUploadingFile, setIsUploadingFile] = useState(false)

  // Handler to add "learn" input to the array
  const addLearnValue = (e) => {
    e.preventDefault()
    if (learnInput.trim()) {

      if (!learnValues.includes(learnInput.trim())) {
        // setLearnValues([...learnValues, learnInput.trim()]);
        setError('learn', {
          type: 'manual',
          message: '',
        });
        learnValues.push(learnInput.trim())
        setLearnInput(''); // Clear the input field
        reset({
          learn: getValues('learn') || "",
        });
        console.log(learnValues)
      } else {
        setError('learn', {
          type: 'manual',
          message: 'This value already exists in the "Learn" list',
        });
      }
    }
  };

  const removeLearnValue = (e, index) => {
    e.preventDefault()
    // Create a new array with the item at the specified index removed
    const updatedLearnValues = learnValues.filter((_, i) => i !== index);
    
    // Update the state with the new array
    setLearnValues(updatedLearnValues);
  };

  const handleSyllabusChange = (acceptedFiles) => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/jpg"];
    // console.log("Acccccc", acceptedFiles)

    if (!acceptedFiles || !acceptedFiles?.length) return;

    const file = acceptedFiles[0];
    // console.log("Received file:", file);

    if (!file) {
      return;
    }


    if (!acceptedTypes.includes(file.type)) {
      return;
    }
    setSyllabusFile(file);
  }

  const onSubmit = async(data) => {

    if (learnValues.length === 0) {
      setError('learn', {
        type: 'manual',
        message: 'This field is required.',
      });
      return; // Stop the submission if there's an error
    }

    if (isEditMode) {
      const allowedfields = pick(data, [
        "syllabus",
        "about",
        "coursePrice",
        "courseDiscount",
        "learn",
      ]);
      const payload = objectToFormData(allowedfields);
    }

      //  console.log('data.syllabus', data.syllabus)

    try {
      setIsSubmitted(false);
      setIsUploadingFile(true)
      let url = ""
      if(syllabusFile){
        const formData = new FormData();
        // if (!selectedImage) {
        //   return;
        // }

        formData.append("file", syllabusFile);
        const imageUrl = await uploadService.UploadFiletoS3(formData);
        url = imageUrl
          // localStorage.setItem("courseImage", imageUrl);
        setSyllabusUrl(imageUrl)
      //  console.log("Image uploaded to S3:", imageUrl);

      }

      // console.log("dataxxxx", data, isSubmitted, url)

      if (data && !isSubmitted) {
        localStorage.setItem('overview', JSON.stringify({ 
          about: data.about,
          learn: learnValues,
          // syllabus: data.syllabus
          syllabus: url || JSON.parse(localStorage.getItem("overview"))?.syllabus || ""
        }));
        localStorage.setItem('courseDiscount', data.courseDiscount)
        localStorage.setItem('coursePrice', data.coursePrice)
        // console.log(localStorage.getItem('overview'))
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
        // setIsSubmitted(true);
        onNext();
      }

       reset({
          syllabus: data.syllabus || "",
          coursePrice: data.coursePrice || "",
          courseDiscount: data.courseDiscount || "",
          learn: data.learn || "",
          croppedImage: data.croppedImage || null,
          about: data.about || "",
        });
        setIsEditMode(false);
        setPreviewedContent(data);
  
     
      // onChange(selectedImage);
    } catch (error) {
      if (error?.response?.status === 413) {
        toast.error("File is too Large. Cannot be uploaded!");
      }
      // console.error("Error uploading image to S3:", error);
    } finally{
      setIsSubmitted(false);
      setIsUploadingFile(true)
    }
    
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("croppedImage", undefined);
    setIsEditMode(true);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Move to the next tab
    onNext();
  };

   useEffect(() => {
    const courseDiscount = localStorage.getItem("courseDiscount");
    const coursePrice = localStorage.getItem("coursePrice");
    const courseImage = localStorage.getItem("courseImage");
    const learnVals = JSON.parse(localStorage.getItem("overview"))?.learn

    if (coursePrice) {
      setValue("coursePrice", coursePrice);
    }
    if(courseDiscount){
       setValue("courseDiscount", courseDiscount);
    }

    if(courseImage){
      // console.log(convertBlobToFile(courseImage), "fillllll")
      // setValue("courseImage", courseImage);
    }

    if(learnVals){
      setLearnValues(learnVals)
    }
  }, []);

 const handleRemoveSyllabus = () => {
   const overviewString = localStorage.getItem("overview");
    let overview = {};

    if (overviewString) {
      overview = JSON.parse(overviewString);
    }

    overview.syllabus = "";

    localStorage.setItem("overview", JSON.stringify(overview));
 }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        // console.log(err, form.getValues(), "error");
      })}
    >
      <div>
        <div className="my-10">
          <div className="grid grid-cols-3 gap-x-6">
            <div className="flex flex-col w-full">
              <InputField
                label="Syllabus"
                placeholder="Upload the course syllabus here in Pdf, jpg , or png files only."
                {...register("syllabus")}
                {...getErrorProps("syllabus")}
                infoicon={<BsInfoCircleFill />}
                isDisabled={!isEditMode}
                type="file"
                onChange={(e) => handleSyllabusChange(e.target.files)}
                // onChange={(e) => onUpdate('overview', {syllabus: e.target.value})}
                tooltiptext="Upload a course syllabus that students will be able to download and learn what they will learn during the course"
              />
              {JSON.parse(localStorage.getItem("overview"))?.syllabus && (
                <div className="flex flex-col gap-2 w-full mt-[-2rem] mb-2" style={{margin: "-2rem 0px 8px 0px"}}>
                  <span className="font-normal text-blue-500 block">Uploaded Syllabus </span>

                   <div className="flex flex-row gap-3 items-start">
                      <span title="Delete Syllabus" className="text-red-500 text-lg font-medium cursor-ponter" onClick={handleRemoveSyllabus}>x</span>
                      <a style={{wordBreak : "break-all"}} className="hover:underline w-full break-all " href={JSON.parse(localStorage.getItem("overview"))?.syllabus} target="_blank" rel="noopener noreferrer">
                        {JSON.parse(localStorage.getItem("overview"))?.syllabus}
                      </a>
                  </div>
                 </div>
              )}            
             </div>
            <InputField
              label="Course price"
              placeholder="Amount"
              {...register("coursePrice")}
              {...getErrorProps("coursePrice")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              // onChange={(e) => onUpdate('coursePrice', e.target.value)}
              tooltiptext="Select the currency you want to price your course with. The available currency on the platform are USD, NGN, and"
            />
            <InputField
              label="Discount"
              placeholder="Amount"
              {...register("courseDiscount")}
              {...getErrorProps("courseDiscount")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              // onChange={(e) => onUpdate('courseDiscount', e.target.value)}
              tooltiptext="Add a discount price to this course."
            />
          </div>

          <div className="grid grid-cols-1 gap-x-6">
            <InputField
              label="What student will learn"
              placeholder="Input and press 'Enter'"
              {...register("learn")}
              {...getErrorProps("learn")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              // onChange={(e) => onUpdate('overview', {learn: e.target.value})}
              onChange={(e) => setLearnInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addLearnValue(e);
                }
              }}
              value={learnInput}
              tooltiptext="Kindly input the primary teaching overviews. These will be featured on the course card displayed on the course page. Each overview should consist of no more than 5 words, and you are limited to a maximum of 6 goals. After typing each overview, please press the 'Enter' key to submit it."
              showSubText="Kindly input the primary teaching overviews. These will be featured on the course card displayed on the course page. Each overview should consist of no more than 5 words, and you are limited to a maximum of 6 goals. After typing each overview, please press the 'Enter' key to submit it."
            />
          </div>
          
          {/* Display the "learn" values from the array */}
          {learnValues.length > 0 && (
            <div className="grid grid-cols-2 gap-1 mb-3" style={{marginTop: "-20px"}}>
              {learnValues.map((value, index) => (
                <div key={index} className="rounded-md justify-center items-center space-x-4 px-2" style={{ background: "rgba(122, 122, 122, 0.30)"}}>
                  <div className="flex justify-between items-center">
                    <span className="text-[#1A183E] text-base font-medium">{value}</span>
                    <svg onClick={(e) => removeLearnValue(e, index)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                      <g clipPath="url(#clip0_4413_32121)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.0001 8.32483L10.3 11.6248C10.41 11.731 10.5574 11.7898 10.7103 11.7885C10.8633 11.7871 11.0096 11.7258 11.1177 11.6176C11.2259 11.5095 11.2872 11.3632 11.2886 11.2102C11.2899 11.0573 11.2311 10.9099 11.1248 10.7999L7.82493 7.5L11.1248 4.20008C11.2311 4.09007 11.2899 3.94271 11.2886 3.78977C11.2872 3.63682 11.2259 3.49051 11.1177 3.38236C11.0096 3.2742 10.8633 3.21285 10.7103 3.21152C10.5574 3.2102 10.41 3.26899 10.3 3.37525L7.0001 6.67517L3.70018 3.37525C3.58967 3.27162 3.44317 3.21505 3.29169 3.21751C3.14021 3.21997 2.99563 3.28126 2.88854 3.38843C2.78145 3.4956 2.72025 3.64022 2.7179 3.7917C2.71555 3.94319 2.77222 4.08964 2.87593 4.20008L6.17527 7.5L2.87535 10.7999C2.81964 10.8537 2.7752 10.9181 2.74462 10.9893C2.71405 11.0604 2.69796 11.137 2.69729 11.2144C2.69661 11.2919 2.71137 11.3687 2.7407 11.4404C2.77003 11.5121 2.81335 11.5772 2.86812 11.632C2.92289 11.6868 2.98802 11.7301 3.05971 11.7594C3.1314 11.7887 3.20821 11.8035 3.28567 11.8028C3.36312 11.8021 3.43967 11.786 3.51084 11.7555C3.58201 11.7249 3.64637 11.6805 3.70018 11.6248L7.0001 8.32483Z" fill="#1A183E"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_4413_32121">
                        <rect width="14" height="14" fill="white" transform="translate(0 0.5)"/>
                      </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          <RichTextInputField
            name="about"
            label="About course description"
            placeholder="Add a description"
            error={errors.about?.message}
            isDisabled={!isEditMode}
            control={control}
           initialValue={JSON.parse(localStorage.getItem("overview"))?.about || ""} 
          />
         
          <div className="flex mt-20 gap-6 cursor-pointer items-center justify-end">
          {/*  <Preview
              isSubmitted={isSubmitted}
              previewContent={previewedContent}
            />*/}
            {isEditMode ? (
              <Save
                onSave={handleSubmit(onSubmit)}
                formReset={reset}
                errors={form.formState.errors}
                // title={isUploadingFile? "Uploading...": "Persist to Draft"}
                isDisabled={isUploadingFile}
                title={"Save and Continue"}
              />
            ) : (
              <Edit isDisabled={isUploadingFile} onClick={handleEdit} />
            )}
            {/*<Continue isDisabled={isUploadingFile} onClick={handleContinue} />*/}
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicInfoForm;
