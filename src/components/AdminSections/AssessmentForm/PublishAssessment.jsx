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
import Publish from "../../../../utilComponents/Buttons/PublishButton/Publish";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import pick from "lodash/pick";
import { errorPropsGetter } from "../../../../utilComponents/formValidation";
import { objectToFormData } from "../../../../utilComponents/objectToFormData";
import { toast } from "react-toastify";
import { createQuestion } from "@/store/slices/questionSlice";
import { useDispatch } from "react-redux";

const errorMessages = {
  required(field = "Field") {
    return field + " is required in order to publish or save";
  },
};

let buildSchema = (data) => {
  return Yup.object().shape({
    questiontype: Yup.string().required(
      errorMessages.required("An assessment duration is required")
    ),
    questionPoint: Yup.string().required(
      errorMessages.required("An assessment deadline is required")
    ),
    assessmentQuestion: Yup.string().required(
      errorMessages.required("An assessment attempts is required")
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

const PublishAssessment = ({ onNext, awaitSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: yupResolver(buildSchema()),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = form;

  useEffect(() => {
    // Fetch the latest saved questionType, questionPoint, and assessmentQuestion from assessmentQuestions
    const assessmentQuestions =
      JSON.parse(sessionStorage.getItem("assessmentQuestions")) || [];

    if (assessmentQuestions.length > 0) {
      const latestQuestion =
        assessmentQuestions[assessmentQuestions.length - 1];

      setValue("questiontype", latestQuestion.questiontype || "");
      setValue("questionPoint", latestQuestion.questionPoint || "");
      setValue("assessmentQuestion", latestQuestion.assessmentQuestion || "");
    }
  }, [setValue]);

  const questionTypes = [
    { value: "SINGLE_ANSWER_SELECT", label: "SINGLE_ANSWER_SELECT" },
    { value: "MULTI_ANSWER_SELECT", label: "MULTI_ANSWER_SELECT" },
    { value: "FREE_TEXT", label: "FREE_TEXT" },
    { value: "FILE_ANSWER", label: "FILE_ANSWER" },
    { value: " LINK_ANSWER", label: " LINK_ANSWER" },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getErrorProps = errorPropsGetter(errors);

  const [isEditMode, setIsEditMode] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(1);

  const onSubmit = async () => {
    // Increment the question index for the next question
    setQuestionIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // Retrieve the assessment questions from sessionStorage
      const assessmentQuestions =
        JSON.parse(sessionStorage.getItem("assessmentQuestions")) || [];

      // Populate questions array based on options for each question
      const questions = assessmentQuestions.map((question, index) => {
        const currentQuestionIndex = newIndex + index - 1;

        // Retrieve the options for the current question
        const options = question.options || [];

        // Populate answers array based on options
        const answers = options.map((option) => ({
          optionContent: option.content || "",
          isCorrectOne: option.isCorrect || false,
        }));

        return {
          questionSequenceIndex: currentQuestionIndex,
          questionContent: question.assessmentQuestion || "",
          questionType: question.questiontype || "",
          points: parseInt(question.questionPoint) || 0,
          answers: answers,
        };
      });

      const questionData = {
        questions: questions,
      };

      console.log("questionData:", questionData);

      // Dispatch the action to create assessments for all questions
      dispatch(createQuestion(questionData));

      onNext();

      setIsSubmitted(true);

      reset({
        questiontype: "",
        questionPoint: "",
        assessmentQuestion: "",
      });
      setIsEditMode(false);

      awaitSubmit?.();

      return newIndex + assessmentQuestions.length - 1;
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // form.setValue("croppedImage", undefined);
    setIsEditMode(true);
  };

  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = (data) => {
    console.log(data);
    if (isEditMode) {
      const allowedfields = pick(data, [
        "questiontype",
        "questionPoint",
        "assessmentQuestion",
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
      onNext();
    }

    setIsSubmitted(true);

    reset({
      questiontype: data.questiontype || "",
      questionPoint: data.questionPoint || "",
      assessmentQuestion: data.assessmentQuestion || "",
    });
    setIsEditMode(false);

    awaitSubmit?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err, form.getValues(), "error");
      })}
    >
      <div className="mt-9">
        <div className="my-10">
          <h2 className="text-indigo-800 font-semibold text-2xl mb-1">
            Publish Information
          </h2>
          <p className="text-gray-400 font-medium text-xs mb-6">
            Give the assessment basic information such as assessment name, type
            of assessment, and description
          </p>
          <div className="grid grid-cols-2 gap-x-6">
            <InputField
              label="Question Type"
              placeholder="Select the type of question"
              {...register("questiontype")}
              {...getErrorProps("questiontype")}
              isDisabled={!isEditMode}
              type="select"
              options={questionTypes}
            />
            <InputField
              label="Points"
              placeholder="Enter a value"
              {...register("questionPoint")}
              {...getErrorProps("questionPoint")}
              isDisabled={!isEditMode}
            />
          </div>

          <RichTextInputField
            name="assessmentQuestion"
            label="Question"
            placeholder="Add a question"
            control={control}
            defaultValue={(
              sessionStorage.getItem("assessmentQuestion") || ""
            ).trim()}
            error={errors.assessmentQuestion?.message}
            isDisabled={!isEditMode}
            onChange={(content) => {
              sessionStorage.setItem("assessmentQuestion", content);
            }}
          />

          <div className="mt-20">
            <hr className="w-full h-0.5 bg-gray-400" />

            <div className="flex justify-between mt-4 gap-6 cursor-pointer items-center">
              <div
                onClick={handlePrevClick}
                className="flex items-center justify-start"
              >
                <Back />
              </div>

              <div className="flex items-center gap-6 justify-end">
                <Save
                  onSave={handleSubmit(onSubmit)}
                  formReset={reset}
                  errors={form.formState.errors}
                />
                <Publish onClick={handleNextClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PublishAssessment;
