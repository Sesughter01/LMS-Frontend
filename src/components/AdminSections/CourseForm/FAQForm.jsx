"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../../../utilComponents/InputField/InputField";
import { BsInfoCircleFill } from "react-icons/bs";
import { Controller, useForm, useWatch } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const errorMessages = {
  required(field = "Field") {
    return field + " in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    faq: Yup.array().of(
      Yup.object().shape({
        question: Yup.string()
          .required("The question is required for the FAQ"),
        answer: Yup.string().when('question', {
          is: (question) => question && question !== "",
          then: Yup.string().required("The answer is required for the FAQ"),
        }),
      })
    ),
  });
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const FAQForm = ({ onNext, onUpdate }) => {
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

  const [faqList, setFAQList] = useState([]);
  const [error, setError] = useState({
    question: "",
    answer: ""
  });

  const onSubmit = (data) => {
    console.log(data);

    setIsSubmitted(true);
    reset({
      question: data.question || "",
      answer: data.answer || "",
    });
    setIsEditMode(false);
    setPreviewedContent(data);

    if (faqList && !isSubmitted) {
      const existingOverview = JSON.parse(localStorage.getItem('overview')) || {};

      // Update the 'FAQ' property
      existingOverview.FAQ = faqList;

      // Set the updated 'overview' object back in localStorage
      localStorage.setItem('overview', JSON.stringify(existingOverview));
      // localStorage.setItem('overview', JSON.stringify({ FAQ: faqList }));
      
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

  const handleAdd = (e) => {
    e.preventDefault();
    const { question, answer } = getValues();

    const newErrors = {
      question: question ? '' : 'The question is required for the FAQ',
      answer: answer ? '' : 'The answer is required for the FAQ',
    };
    setError(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      if (question && answer) {
        // Both question and answer are not empty, add them to the list
        setFAQList([...faqList, { question, answer }]);
  
        // Clear the question and answer fields after adding
        reset({
          question: "",
          answer: "",
        });
      }
    }

    // Validate the newData
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
    const faqs = JSON.parse(localStorage.getItem("overview"))?.FAQ

    if (faqs) {
      setFAQList(faqs);
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
              label="Question"
              placeholder="Enter your question here"
              {...register("question")}
              {...getErrorProps("question")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              mb="mb-3"
              bgerror={`${error.question ? 'border-[#F00]' : 'border-[#BABABA]'}`}
              tooltiptext="Kindly input the question for the FAQ page. You are limited to a maximum of 6 questions and answers."
            />
            {getValues('question') === '' && error.question && 
              <div className="flex text-red-500 text-xs items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <g clipPath="url(#clip0_4842_93978)">
                    <path d="M7.5 0.9375C6.20206 0.9375 4.93327 1.32238 3.85407 2.04348C2.77488 2.76458 1.93374 3.7895 1.43704 4.98864C0.940343 6.18778 0.810384 7.50728 1.0636 8.78028C1.31682 10.0533 1.94183 11.2226 2.85961 12.1404C3.7774 13.0582 4.94672 13.6832 6.21972 13.9364C7.49272 14.1896 8.81222 14.0597 10.0114 13.563C11.2105 13.0663 12.2354 12.2251 12.9565 11.1459C13.6776 10.0667 14.0625 8.79794 14.0625 7.5C14.0625 5.75952 13.3711 4.09032 12.1404 2.85961C10.9097 1.6289 9.24049 0.9375 7.5 0.9375ZM7.5 3.75C7.63907 3.75 7.77501 3.79124 7.89064 3.8685C8.00627 3.94576 8.09639 4.05557 8.14961 4.18405C8.20282 4.31253 8.21675 4.45391 8.18962 4.5903C8.16249 4.72669 8.09552 4.85198 7.99719 4.95031C7.89885 5.04864 7.77357 5.11561 7.63718 5.14274C7.50078 5.16987 7.35941 5.15595 7.23093 5.10273C7.10245 5.04951 6.99264 4.95939 6.91538 4.84376C6.83812 4.72813 6.79688 4.59219 6.79688 4.45312C6.79688 4.26664 6.87096 4.0878 7.00282 3.95594C7.13468 3.82408 7.31352 3.75 7.5 3.75ZM9.375 11.3086H5.625V10.2539H6.97266V7.55859H6.09375V6.50391H8.02735V10.2539H9.375V11.3086Z" fill="#FF0000"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_4842_93978">
                    <rect width="15" height="15" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                {error.question}
              </div>
            }
            <InputField
              label="Answer"
              placeholder="Enter the answer to the question you created here"
              {...register("answer")}
              {...getErrorProps("answer")}
              infoicon={<BsInfoCircleFill />}
              isDisabled={!isEditMode}
              mb="mb-3"
              tooltiptext="Kindly input the answer to the question you created. Once you’ve given an answer, click on the ‘add’ button to add the question and answer to FAQ list below."
            />
            {getValues('answer') === '' && error.answer && 
              <div className="flex text-red-500 text-xs items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <g clipPath="url(#clip0_4842_93978)">
                    <path d="M7.5 0.9375C6.20206 0.9375 4.93327 1.32238 3.85407 2.04348C2.77488 2.76458 1.93374 3.7895 1.43704 4.98864C0.940343 6.18778 0.810384 7.50728 1.0636 8.78028C1.31682 10.0533 1.94183 11.2226 2.85961 12.1404C3.7774 13.0582 4.94672 13.6832 6.21972 13.9364C7.49272 14.1896 8.81222 14.0597 10.0114 13.563C11.2105 13.0663 12.2354 12.2251 12.9565 11.1459C13.6776 10.0667 14.0625 8.79794 14.0625 7.5C14.0625 5.75952 13.3711 4.09032 12.1404 2.85961C10.9097 1.6289 9.24049 0.9375 7.5 0.9375ZM7.5 3.75C7.63907 3.75 7.77501 3.79124 7.89064 3.8685C8.00627 3.94576 8.09639 4.05557 8.14961 4.18405C8.20282 4.31253 8.21675 4.45391 8.18962 4.5903C8.16249 4.72669 8.09552 4.85198 7.99719 4.95031C7.89885 5.04864 7.77357 5.11561 7.63718 5.14274C7.50078 5.16987 7.35941 5.15595 7.23093 5.10273C7.10245 5.04951 6.99264 4.95939 6.91538 4.84376C6.83812 4.72813 6.79688 4.59219 6.79688 4.45312C6.79688 4.26664 6.87096 4.0878 7.00282 3.95594C7.13468 3.82408 7.31352 3.75 7.5 3.75ZM9.375 11.3086H5.625V10.2539H6.97266V7.55859H6.09375V6.50391H8.02735V10.2539H9.375V11.3086Z" fill="#FF0000"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_4842_93978">
                    <rect width="15" height="15" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                {error.answer}
              </div>
            }

            <div className="flex mb-20 gap-6 justify-end">
              <button className="flex gap-2 cursor-pointer items-center justify-end border border-black rounded px-2" onClick={handleAdd}>
                Add 
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M9.74935 6.20689H6.20768V9.74855C6.20768 9.93642 6.13305 10.1166 6.00022 10.2494C5.86738 10.3823 5.68721 10.4569 5.49935 10.4569C5.31149 10.4569 5.13132 10.3823 4.99848 10.2494C4.86564 10.1166 4.79102 9.93642 4.79102 9.74855V6.20689H1.24935C1.06149 6.20689 0.88132 6.13226 0.748482 5.99942C0.615644 5.86658 0.541016 5.68642 0.541016 5.49856C0.541016 5.31069 0.615644 5.13053 0.748482 4.99769C0.88132 4.86485 1.06149 4.79022 1.24935 4.79022H4.79102V1.24856C4.79102 1.06069 4.86564 0.880526 4.99848 0.747688C5.13132 0.61485 5.31149 0.540222 5.49935 0.540222C5.68721 0.540222 5.86738 0.61485 6.00022 0.747688C6.13305 0.880526 6.20768 1.06069 6.20768 1.24856V4.79022H9.74935C9.93721 4.79022 10.1174 4.86485 10.2502 4.99769C10.3831 5.13053 10.4577 5.31069 10.4577 5.49856C10.4577 5.68642 10.3831 5.86658 10.2502 5.99942C10.1174 6.13226 9.93721 6.20689 9.74935 6.20689Z" fill="#1A183E"/>
                </svg>
              </button>
            </div>
            
          </div>

          <div className="grid grid-cols-1 gap-x-6 rounded-md border border-gray-300 p-4">
            <Accordion type="single" collapsible className="w-full gap-4 space-y-4">
              {
                  faqList.map((QnA, index) =>
                      <AccordionItem key={index} value={QnA.question} className='rounded bg-white shadow-md border-b-0'>
                          <AccordionTrigger className='hover:no-underline bg-white px-6'>{QnA.question}</AccordionTrigger>
                          <AccordionContent className='px-8 bg-white'>
                              {/* {QnA.answer} */}
                              <div dangerouslySetInnerHTML={{ __html: QnA.answer }} />
                          </AccordionContent>
                      </AccordionItem>)
              }
            </Accordion>
          </div>
          
          <div className="flex mt-20 gap-6 cursor-pointer items-center justify-end">
           {/* <Preview
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

export default FAQForm;
