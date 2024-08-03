import { Check } from "lucide-react";
import { useState, useEffect } from "react";

const OptionField = ({ optionNumber, onMarkAsCorrect, isSelected, selectedQuestionType }) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Set the inputValue when the component mounts
    setInputValue(
      sessionStorage.getItem(`optionContent_${optionNumber}`) || ""
    );
  }, [optionNumber]);

  const handleMarkAsCorrect = (e) => {
    e.preventDefault();
    setIsCorrect(!isCorrect);

     // Unmark other options first
     for (let i = 1; i <= 4; i++) {
      if (i !== optionNumber) {
        sessionStorage.setItem(`isCorrect_${i}`, false);
      }
    }

    // const currentIsCorrect = sessionStorage.getItem(`isCorrect_${optionNumber}`) === "true";

    // // If it's a single-answer question, unmark other options first
    // if (selectedQuestionType === "SINGLE_ANSWER_SELECT") {
    //   for (let i = 1; i <= 4; i++) {
    //     if (i !== optionNumber) {
    //       sessionStorage.setItem(`isCorrect_${i}`, false);
    //     }
    //   }
    // }

    // Toggle the current option
    const newIsCorrect = !isSelected;
    // const newIsCorrect = !currentIsCorrect;
    sessionStorage.setItem(`isCorrect_${optionNumber}`, newIsCorrect);

    // sessionStorage.setItem(`isCorrect_${optionNumber}`, !isCorrect);

    // Callback to parent component
    onMarkAsCorrect(optionNumber, !isCorrect);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    // Save option content to sessionStorage as you type
    sessionStorage.setItem(`optionContent_${optionNumber}`, newValue);

    setInputValue(newValue);
  };

  return (
    <div
      className={`flex items-center justify-between bg-white gap-6 border border-[#BEBEBE] rounded`}
    >
      <span className="text-[#1A183E] px-2 font-medium text-sm">
        {`Option ${optionNumber}.`}
      </span>
      <input
        type="text"
        name={`option${optionNumber}`}
        id={`option${optionNumber}`}
        className="py-1 px-4 rounded-lg bg-white focus:outline-none placeholder-gray-200::placeholder placeholder-opacity-75 flex-1 border border-[#BEBEBE]"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className={`flex border border-[#BEBEBE] bg-opacity-0 bg-[#9e9e9e] px-2 py-4 items-center gap-1 ${
          isSelected ? "bg-green-500" : ""
        }`}
        onClick={handleMarkAsCorrect}
      >
        <Check
          className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#7A7A7A]"}`}
        />
        <p
          className={`font-medium text-xs ${
            isSelected ? "text-white" : "text-[#7A7A7A]"
          }`}
        >
          Mark as correct
        </p>
      </button>
    </div>
  );
};

export default OptionField;
