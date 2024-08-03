import React, { useEffect, useState } from "react";

const AssessmentSidebar = ({
  onAddQuestionClick,
  onDeleteQuestionClick,
  isCreatingQuestion,
  allQuestions,
  onQuestionClick,
  selectedQuestion,
}) => {
  const [questionHistory, setQuestionHistory] = useState([]);
  const [lastClickedDate, setLastClickedDate] = useState(null);

  const removeSelectType = (index) => {
    // sessionStorage.removeItem("questionPoint");
    // sessionStorage.removeItem("optionContent_1");
    // sessionStorage.removeItem("optionContent_2");
    // sessionStorage.removeItem("optionContent_3");
    // sessionStorage.removeItem("optionContent_4");
    // sessionStorage.removeItem("questiontype");
    // sessionStorage.removeItem("isCorrect_1");
    // sessionStorage.removeItem("isCorrect_2");
    // sessionStorage.removeItem("isCorrect_3");
    // sessionStorage.removeItem("isCorrect_4");
    // sessionStorage.removeItem("assessmentQuestion");

    onAddQuestionClick();
    // onQuestionClick()
    // setActiveQuestion(index);

    const newQuestionNumber = questionHistory.length + 1;
    console.log("new:", newQuestionNumber)
    const newQuestion = {
      number: newQuestionNumber,
      timestamp: new Date(),
    };

    setQuestionHistory((prevHistory) => [...prevHistory, newQuestion]);
    setLastClickedDate(newQuestion.timestamp);
  };

  return (
    <div className="w-1/5 h-screen space-y-4 overflow-y-auto border-r border-gray-300 p-4 ">
      
        <div className="flex items-center border-b-2 border-gray-300 justify-between px-2">
          <span className="pb-2">Questions</span>
         {/*<svg
            onClick={removeSelectType}
            className="ml-2 pb-2 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22.5C6.21 22.5 1.5 17.79 1.5 12C1.5 6.21 6.21 1.5 12 1.5C17.79 1.5 22.5 6.21 22.5 12C22.5 17.79 17.79 22.5 12 22.5ZM12 3C7.035 3 3 7.035 3 12C3 16.965 7.035 21 12 21C16.965 21 21 16.965 21 12C21 7.035 16.965 3 12 3Z"
              fill="black"
            />
            <path
              d="M12 17.25C11.58 17.25 11.25 16.92 11.25 16.5V7.5C11.25 7.08 11.58 6.75 12 6.75C12.42 6.75 12.75 7.08 12.75 7.5V16.5C12.75 16.92 12.42 17.25 12 17.25Z"
              fill="black"
            />
            <path
              d="M16.5 12.75H7.5C7.08 12.75 6.75 12.42 6.75 12C6.75 11.58 7.08 11.25 7.5 11.25H16.5C16.92 11.25 17.25 11.58 17.25 12C17.25 12.42 16.92 12.75 16.5 12.75Z"
              fill="black"
            />
          </svg>*/}
        </div>
     

      {/** content under the question svg */}
      {isCreatingQuestion && (
        <div className="flex flex-col gap-3 ">
          {allQuestions?.map((question, index) => (
            <div
              key={index}
              className={`flex gap-2 justify-between border-l-4 px-2 py-2 rounded-sm cursor-pointer ${
                selectedQuestion === index ? "bg-gray-200" : "bg-[#E9E9E9]"
              }`}
            >
              <div onClick={() => onQuestionClick(index)}>
                <h2 className="text-black font-medium text-xs ">
                  Question - {index + 1}
                  {/* {index === selectedQuestion} */}
                </h2>
                <p className="text-[#737373] font-medium text-xs ">
                  Updated: {question.time.toLocaleString()}{" "}
                  {/* {selectedQuestion} */}
                </p>
              </div>
              {/** delete icon */}
              {allQuestions.length > 1 && <img
                src="/icons/delete-icon.svg"
                alt="delete icon"
                onClick={() => onDeleteQuestionClick(index)}
                className="p-2"
              />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssessmentSidebar;
