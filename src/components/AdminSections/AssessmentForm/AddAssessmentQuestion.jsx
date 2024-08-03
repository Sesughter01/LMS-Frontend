"use client";

import React, { useEffect, useState } from "react";
import InputField from "../../../../utilComponents/InputField/InputField";
import { BsSend } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import RichTextEditor from "../../Description/RichTextEditor";
import { Label } from "../../../../utilComponents/Label/Label";
import Save from "../../../../utilComponents/Buttons/SaveButton/Save";
import Back from "../../../../utilComponents/Buttons/BackButton/Back";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import pick from "lodash/pick";
import { errorPropsGetter } from "../../../../utilComponents/formValidation";
import { objectToFormData } from "../../../../utilComponents/objectToFormData";
import { toast } from "react-toastify";
import OptionField from "./SelectOption/OptionField";
import QuestionOption from "./SelectOption/QuestionOption";
import { createQuestion } from "@/store/slices/questionSlice";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    questiontype: Yup.string().required(
      errorMessages.required("A Question type")
    ),
    questionPoint: Yup.string().required(
      errorMessages.required("The Question point")
    ),
    assessmentQuestion: Yup.string()
      .required(errorMessages.required("An Assessment Question"))
      .max(200, "Word limit exceeded! Please shorten your text.")
      .min(5, "Question is too short"),
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

const AddAssessmentQuestion = ({
  allQuestions,
  updateAllQuestions,
  onAddQuestionClick,
  selectedQuestion,
  onNext,
  awaitSubmit,
  onPrev,
  router
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
    watch,
  } = form;

  const questionTypes = [
    { value: "SINGLE_ANSWER_SELECT", label: "Objective" },
    { value: "MULTI_ANSWER_SELECT", label: "Multi Select" },
    // { value: "FREE_TEXT", label: "FREE_TEXT" },
    // { value: "FILE_ANSWER", label: "FILE_ANSWER" },
    // { value: " LINK_ANSWER", label: " LINK_ANSWER" },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSendingDetails, setIsSendingDetails] = useState(false);
  const [sending, setSending] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);


  const onSubmit = (data) => {
    // Check if any option is empty or no answer is marked
    const isOptionsEmpty = Array.from({ length: 4 }).some((_, index) => {
      const optionContent = sessionStorage.getItem(
        `optionContent_${index + 1}`
      );
      const isCorrect =
        sessionStorage.getItem(`isCorrect_${index + 1}`) === "true";

      return !optionContent || (isCorrect && optionContent.trim() === "");
    });

    if (isOptionsEmpty) {
      toast.error(
        "Please ensure that no option is empty and there is a marked correct answer."
      );
      return;
    }

    // Check if at least one option is marked as correct
    const isAnyOptionMarked = Array.from({ length: 4 }).some((_, index) => {
      return sessionStorage.getItem(`isCorrect_${index + 1}`) === "true";
    });

    if (!isAnyOptionMarked) {
      toast.error("One option must be marked as correct.");
      return;
    }

    const newQuestion = allQuestions.pop();

    newQuestion.questiontype = data.questiontype;
    newQuestion.questionPoint = data.questionPoint;
    newQuestion.assessmentQuestion = data.assessmentQuestion;
    newQuestion.selectedOption = data.selectedOption;
    newQuestion.options = [];

    // Include option fields in the new question
    for (let optionNumber = 1; optionNumber <= 4; optionNumber++) {
      const optionContent = sessionStorage.getItem(
        `optionContent_${optionNumber}`
      );
      const isCorrect =
        sessionStorage.getItem(`isCorrect_${optionNumber}`) === "true";

      // Push each option as an object to the options array
      newQuestion.options.push({
        content: optionContent,
        isCorrect: isCorrect,
      });
    }


    // Combine the new question with the existing questions array
    const updatedQuestions = [...allQuestions, newQuestion];

    updateAllQuestions(updatedQuestions);

    // Save all questions to sessionStorage
    sessionStorage.setItem(
      "assessmentQuestions",
      JSON.stringify(updatedQuestions)
    );

    // Set the state to trigger a re-render if needed
    selectedQuestion = updatedQuestions;

    if (isEditMode) {
      const allowedfields = pick(data, [
        "questiontype",
        "questionPoint",
        "assessmentQuestion",
      ]);

      // Map over the option fields and add them to the allowed fields
      for (let optionNumber = 1; optionNumber <= 4; optionNumber++) {
        const optionContent = sessionStorage.getItem(
          `optionContent_${optionNumber}`
        );
        const isCorrect =
          sessionStorage.getItem(`isCorrect_${optionNumber}`) === "true";

        allowedfields[`option${optionNumber}`] = {
          content: optionContent,
          isCorrect: isCorrect,
        };
      }

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
    //   // onNext();
    // }

    setIsSubmitted(true);

    reset({
      questiontype: "",
      questionPoint: "",
      assessmentQuestion: "",
    });
    setIsEditMode(false);

    awaitSubmit?.(data);
  };

  const handlePrevClick = () => {
    onPrev();
  };

  

  const PublishQuestion = async () => {


    
    // Create an array to store all questions data
    // console.log("jkenjkenjkklnklalll", allQuestions, setIsSendingDetails, isSendingDetails)


    setSending(true)
    // setIsSendingDetails(true)
    try {
       const questionsData = allQuestions.map((question, currentQuestionIndex) => {
        // Create an array to store answers data for each question
        if(question.options.length){

        }
        const answers = question.options.map((option, index) => {
          return {
            // optionSequenceIndex: index + 1,
            optionContent: option.content || "",
            isCorrectOne: option.isCorrect || false,
          };
        });


        // Return data for each question
        return {
          questionSequenceIndex: currentQuestionIndex + 1,
          questionContent: question.assessmentQuestion || "",
          questionType: question.questiontype || "",
          points: parseInt(question.questionPoint) || 0,
          answers: answers,
        }; 
      });

      // Create an object containing all questions data
      const questionData = {
        questions: questionsData,
      };
      // handleTab("settings", router, pathname, searchParams)
      // toast.info("Questions have been persisted to draft.");
      await dispatch(createQuestion(questionData));
      const currentPath = router;
      sessionStorage.removeItem("questionPoint");
      sessionStorage.removeItem("optionContent_1");
      sessionStorage.removeItem("optionContent_2");
      sessionStorage.removeItem("optionContent_3");
      sessionStorage.removeItem("optionContent_4");
      sessionStorage.removeItem("questiontype");
      sessionStorage.removeItem("isCorrect_1");
      sessionStorage.removeItem("isCorrect_2");
      sessionStorage.removeItem("isCorrect_3");
      sessionStorage.removeItem("isCorrect_4");
      sessionStorage.removeItem("assessmentQuestions");
        if(location.pathname.includes("instructor")){
          router.push("/instructor/assessment")
        }else if(location.pathname.includes("admin")){
          router.push("/admin/assessment")
        }
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("Cannot proceed with assessment creation. Ensure all created questions and options are valid.");
    } finally {
      setSending(false)

    }
  };   

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const selectedQuestionType = watch("questiontype", "");
    console.log("selectedQuestionType", selectedQuestionType)

    const handleMarkAsCorrect = (optionNumber, isCorrect) => {
      // const selectedQuestionType = getValues("questiontype");
       const selectedQuestionType = watch("questiontype", "");

      if (selectedQuestionType === "SINGLE_ANSWER_SELECT") {
        // For single-answer questions, only one option can be marked as correct
        setSelectedOption(isCorrect ? optionNumber : null);
      } else if (selectedQuestionType === "MULTI_ANSWER_SELECT") {
        // For multi-answer questions, toggle the selected options
        const updatedSelectedOptions = new Set(selectedOptions);

        if (isCorrect) {
          // Add or remove the option based on the current state
          if (updatedSelectedOptions.has(optionNumber)) {
            updatedSelectedOptions.delete(optionNumber);
          } else {
            updatedSelectedOptions.add(optionNumber);
          }
        }

        setSelectedOptions(updatedSelectedOptions);
      }

      return false;
    };

  // useEffect(() => {
  //    console.log('allQuestions', allQuestions, selectedQuestion)
  //   }, [allQuestions]);

  useEffect(() => {
    if (selectedQuestionType === "SINGLE_ANSWER_SELECT") {
      // For single-answer questions, only one option can be marked as correct
      setSelectedOption(Array.from(selectedOptions)[0] || null);
    } else {
      // For other question types, set selectedOption to null
      setSelectedOption(null);
    }
  }, [selectedQuestionType, selectedOptions]);

  // useEffect(() => {    
  //   // Load questions from sessionStorage when the component mounts
  //   sessionStorage.removeItem("questionPoint");
  //   sessionStorage.removeItem("optionContent_1");
  //   sessionStorage.removeItem("optionContent_2");
  //   sessionStorage.removeItem("optionContent_3");
  //   sessionStorage.removeItem("optionContent_4");
  //   sessionStorage.removeItem("questiontype");
  //   sessionStorage.removeItem("isCorrect_1");
  //   sessionStorage.removeItem("isCorrect_2");
  //   sessionStorage.removeItem("isCorrect_3");
  //   sessionStorage.removeItem("isCorrect_4");
  // }, []);
  

  {
    /** Preview questions */
  }

  if (allQuestions[selectedQuestion]?.assessmentQuestion) {
    return (
      <div>
        <section className="flex-1 space-y-6">
          <div className="flex items-center justify-start text-start gap-20">
            <div className="flex flex-col gap-2">
              <span className="text-[#7A7A7A] text-base font-medium">
                Question Type
              </span>
              <span className="text-sm font-medium text-[#1A183E]">
                {allQuestions[selectedQuestion].questiontype}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[#7A7A7A] text-base font-medium">
                Points
              </span>
              <span className="text-sm font-medium text-[#1A183E]">
                {allQuestions[selectedQuestion].questionPoint} points
              </span>
            </div>
          </div>

          <div className="flex flex-col text-start gap-2">
            <span className="text-[#7A7A7A] text-base font-medium">
              Question
            </span>
            <span className="text-sm font-medium text-[#1A183E]">
              {allQuestions[selectedQuestion].assessmentQuestion}
            </span>
          </div>

          <div className="space-y-6">
            <span className="text-[#7A7A7A] text-base font-medium">
              Answer Options
            </span>

            <div className="grid grid-cols-1 space-y-8">
              {allQuestions[selectedQuestion].options.map((option, index) => (
                <QuestionOption key={index} option={option} index={index} />
              ))}
            </div>
          </div>
        </section>
        <div className="flex justify-between mt-12 gap-6 cursor-pointer items-center">
          {/*<div
            onClick={handlePrevClick}
            className="flex items-center justify-start"
          >
            <Back />
          </div>*/}
          <div className={`ml-auto flex items-center gap-2 border py-2 px-4 rounded-lg`} onClick={() => onAddQuestionClick()}>
            <span className="text-base text-black bg-transparent font-medium">
              Add another
            </span>
          </div>
          <button
            type="submit"
            onClick={PublishQuestion}
            disabled={sending}
            style={{pointerEvents: sending? "none": "auto"}}
            className={`flex items-center gap-2 border border-menu bg-[#1A183E] py-2 px-4 rounded-lg`}
          >
            <span style={{ color: "white" }}>
              <BsSend />
            </span>
            <span className="text-white text-base font-medium">{sending? "Publishing...": "Publish"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err, form.getValues(), "error");
      })}
    >
      <div className="mt-9">
        <div className="my-10">
          <div className="grid grid-cols-2 gap-x-6">
            <InputField
              label="Question Type"
              placeholder="Select the type of question"
              {...register("questiontype")}
              {...getErrorProps("questiontype")}
              // isDisabled={!isEditMode}
              type="select"
              options={questionTypes}
            />
            <InputField
              label="Points"
              placeholder="Enter a value"
              {...register("questionPoint")}
              {...getErrorProps("questionPoint")}
              type="number"
              // isDisabled={!isEditMode}
            />
          </div>

          <RichTextInputField
            name="assessmentQuestion"
            label="Question"
            placeholder="Add a question"
            // {...register("assessmentQuestion")}
            // {...getErrorProps("assessmentQuestion")}
            error={errors.assessmentQuestion?.message}
            // isDisabled={!isEditMode}
            control={control}
          />

          <div className="grid grid-cols-1 space-y-8 mt-20">
            {[1, 2, 3, 4].map((optionNumber) => (
              <OptionField
                key={optionNumber}
                optionNumber={optionNumber}
                onMarkAsCorrect={(isCorrect) =>
                  handleMarkAsCorrect(optionNumber, isCorrect)
                }
                isSelected={selectedOption === optionNumber}
                selectedQuestionType={selectedQuestionType} 
              />
            ))}
          </div>

          <div className="mt-20">
            <hr className="w-full h-0.5 bg-gray-400" />

            <div className="flex justify-end mt-4 gap-6 cursor-pointer items-center">
             {/* <div
                onClick={handlePrevClick}
                className="flex items-center justify-start"
              >
                <Back />
              </div>*/}

              <div className="flex items-center gap-6 justify-end">
                <Save
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                />
                {/* <Continue onClick={handleNextClick} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAssessmentQuestion;
