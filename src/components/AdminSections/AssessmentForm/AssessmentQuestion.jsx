"use client";

import React, { useState, useEffect } from "react";
import AddAssessmentQuestion from "./AddAssessmentQuestion";
import AssessmentSidebar from "./AssessmentSidebar";
import { RxFilePlus } from "react-icons/rx";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { handleTab } from '@/lib/utils'

const AssessmentQuestion = ({ onNext, onPrev }) => {
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // [{time, option, questiontype}, {time: ""}]


  const handlePrevClick = () => {
    // if (currentStep > 4) {
    //   setCurrentStep(currentStep - 1);
    // } else {
    //   onPrev();
    // }
    const savedAssessmentType = sessionStorage.getItem("selectedAssessmentType");
    if(savedAssessmentType !== "coursePreAssessment"){
      handleTab("modules", router, pathname, searchParams)
    }else if(savedAssessmentType === "coursePreAssessment"){
      handleTab("course", router, pathname, searchParams)
    }else{
      handleTab("assessment", router, pathname, searchParams)
    }
  };

  const handleNextClick = () => {
    // if (currentStep < 4) {
    //   setCurrentStep(currentStep + 1);
    // } else {
    //   onNext();
    // }
    handleTab("settings", router, pathname, searchParams)
  };

  const updateAllQuestions = (arr) => {
    setAllQuestions(arr);
  };

  const addQuestion = () => {
    setIsCreatingQuestion(true); 
    const newQuestion = {
      time: new Date(),
    };
    
    // allQuestions.push(newQuestion);
    

    const updatedQuestions = [...allQuestions];
    updatedQuestions.push(newQuestion);
    setAllQuestions(updatedQuestions);
    setSelectedQuestionIdx(allQuestions.length);

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

    // setCurrentStep(2);
  };

  // useEffect(() => {
  //   console.log("Who is Current **********************", selectedQuestionIdx);
  //   addQuestion()
  // }, []);

  const handleQuestionClick = (index) => {
    setSelectedQuestionIdx(index);
  };

  useEffect(() => {
    // Load questions from sessionStorage when the component mounts
    addQuestion()

    const storedQuestions =
      JSON.parse(sessionStorage.getItem("assessmentQuestions")) || [];

    // console.log("storedd------------------", storedQuestions)

    if (storedQuestions.length) {
      setAllQuestions(storedQuestions);
      setSelectedQuestionIdx(0);
    }

  }, []);

  // [2,3, 4]   3 - 1
  //       ^
  const deleteQuestion = (index) => {
    setSelectedQuestionIdx(index === 0 ? 0 : index - 1); //Repoint to the closest question after a deletion

    const questionsClone = [...allQuestions];
    questionsClone.splice(index, 1);
    setAllQuestions(questionsClone);

    sessionStorage.setItem(
      "assessmentQuestions",
      JSON.stringify(questionsClone)
    );
  };

  //  useEffect(() => {
  //   const assessmentDeadline = sessionStorage.getItem(
  //     "assessmentDeadline"
  //   );
  //   const assessmentDuration = sessionStorage.getItem("assessmentDuration");
  //   const assessmentPassingScore = sessionStorage.getItem("assessmentPassingScore");
  //   if (assessmentDeadline) {
  //     setValue("assessmentDeadline", assessmentDeadline);
  //   }

  //   if(assessmentDuration){
  //      setValue("assessmentDuration", assessmentDuration);
  //   }


  //   if(assessmentPassingScore){
  //      setValue("assessmentPassingScore", assessmentPassingScore);
  //   }

  // }, []);

  return (
    <div className="mt-9">
      <div className="my-10">
        <div className="flex">
         {/* <p className="text-lg text-red-600">{selectedQuestionIdx}</p> */}
          <AssessmentSidebar
            onAddQuestionClick={addQuestion}
            onDeleteQuestionClick={deleteQuestion}
            isCreatingQuestion={isCreatingQuestion}
            onQuestionClick={handleQuestionClick}
            selectedQuestion={selectedQuestionIdx}
            allQuestions={allQuestions}
          />

          {/* Main Content */}
          <div className="flex-1 p-4">
            {currentStep === 1 ? (
              <div className="flex flex-col items-center gap-8  text-[#7A7A7A]">
                {isCreatingQuestion ? (
                  <AddAssessmentQuestion
                    onPrev={handlePrevClick}
                    onNext={handleNextClick}
                    selectedQuestion={selectedQuestionIdx}
                    allQuestions={allQuestions}
                    updateAllQuestions={updateAllQuestions}
                    onAddQuestionClick={addQuestion}
                    onQuestionClick={handleQuestionClick}
                    router={router}
                  />
                ) : (
                  <>
                    <div>
                      <RxFilePlus className="w-[199px] h-[199px]" />
                    </div>
                    <div className="flex items-center">
                      <p className="flex font-medium text-lg">
                        Please click on the “
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 22.5C6.21 22.5 1.5 17.79 1.5 12C1.5 6.21 6.21 1.5 12 1.5C17.79 1.5 22.5 6.21 22.5 12C22.5 17.79 17.79 22.5 12 22.5ZM12 3C7.035 3 3 7.035 3 12C3 16.965 7.035 21 12 21C16.965 21 21 16.965 21 12C21 7.035 16.965 3 12 3Z"
                            fill="#7A7A7A"
                          />
                          <path
                            d="M12 17.25C11.58 17.25 11.25 16.92 11.25 16.5V7.5C11.25 7.08 11.58 6.75 12 6.75C12.42 6.75 12.75 7.08 12.75 7.5V16.5C12.75 16.92 12.42 17.25 12 17.25Z"
                            fill="#7A7A7A"
                          />
                          <path
                            d="M16.5 12.75H7.5C7.08 12.75 6.75 12.42 6.75 12C6.75 11.58 7.08 11.25 7.5 11.25H16.5C16.92 11.25 17.25 11.58 17.25 12C17.25 12.42 16.92 12.75 16.5 12.75Z"
                            fill="#7A7A7A"
                          />
                        </svg>
                        ” to create a question
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestion;
