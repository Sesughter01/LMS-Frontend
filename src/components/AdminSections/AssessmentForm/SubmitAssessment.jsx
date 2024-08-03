import React from "react";
import QuestionOption from "./SelectOption/QuestionOption";

const SubmitAssessment = () => {
  const handleMarkAsCorrect = (optionNumber, isCorrect) => {
    console.log(`Option ${optionNumber} marked as correct: ${isCorrect}`);
  };

  return (
    <section className="flex-1 space-y-6">
      <div className="flex items-center justify-start gap-20">
        <div className="flex flex-col gap-2">
          <span className="text-[#7A7A7A] text-base font-medium">
            Question Type
          </span>
          <span className="text-sm font-medium text-[#1A183E]">Objective</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#7A7A7A] text-base font-medium">Points</span>
          <span className="text-sm font-medium text-[#1A183E]">10 points</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#7A7A7A] text-base font-medium">
          Question Type
        </span>
        <span className="text-sm font-medium text-[#1A183E]">
          What is the difference between the &quot;==&quot; and
          &quot;.equals()&quot; operators in Java?
        </span>
      </div>

      <div className="space-y-6">
        <span className="text-[#7A7A7A] text-base font-medium">
          Answer Options
        </span>

        <div className="grid grid-cols-1 space-y-8">
          {[1, 2, 3, 4].map((optionNumber) => (
            <QuestionOption
              key={optionNumber}
              optionNumber={optionNumber}
              onMarkAsCorrect={handleMarkAsCorrect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubmitAssessment;
