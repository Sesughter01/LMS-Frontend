import React, { useEffect, useState } from "react";
import ContentOption from "./contentOption";
import Spinner from "../../../../../../utilComponents/Spinner";

interface Option {
  id: number;
  optionContent: string;
  isCorrectOne?: string;
}

interface AssessmentQuestion {
  id: number;
  assessmentId: number;
  questionContent: string;
  questionType: string;
  questionSequenceIndex: number;
  points: number;
  isDeleted: boolean;
  deletedBy: any;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

interface ContentTabProps {
  data: AssessmentQuestion[];
  loading: boolean;
  secondaryColor: any;
}

const ContentTab: React.FC<ContentTabProps> = ({ data = [], loading, secondaryColor }) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      setActiveQuestion(data[0].id);
    }
  }, [data]);

  const handleQuestionClick = (questionId: number) => {
    setActiveQuestion(questionId);
  };

  return (
    <div>
      {loading && (
        <div className="flex items-center mt-40 justify-center">
          {" "}
          <Spinner />
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="flex mt-40 items-center justify-center">
          <span className="text-xl font-bold text-gray-500">No Question Found</span>
        </div>
      )}
      {!loading && data.length > 0 && (
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[25%] mr-4  border-r bg-white space-y-4 border-gray-300 overflow-y-auto h-screen">
            {data.map((question) => (
              <div
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                style={{
                  borderLeft: activeQuestion === question.id ? `4px solid ${secondaryColor}` : "",
                }}
                className={`cursor-pointer p-2  ${activeQuestion === question.id ? `bg-gray-200 mr-2  rounded` : ""}`}
              >
                <div className="text-black font-medium text-sm pb-3">Question - {question.questionSequenceIndex}</div>
                <div className="text-[#737373] font-medium text-xs">Updated: {question.updatedAt}</div>
              </div>
            ))}
          </div>

          {/* Question Content */}
          <div>
            {data.map((question) => (
              <div key={question.id}>
                {activeQuestion === question.id && (
                  <section className="flex-1 space-y-6">
                    <div className="flex items-center justify-start gap-20">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#7A7A7A] text-base font-medium">Question Type</span>
                        <span style={{ color: secondaryColor }} className="text-sm font-medium">
                          {question.questionType}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-[#7A7A7A] text-base font-medium">Points</span>
                        <span style={{ color: secondaryColor }} className="text-sm font-medium">
                          {question.points} points
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[#7A7A7A] text-base font-medium">Question Type</span>
                      <span style={{ color: secondaryColor }} className="text-sm font-medium">
                        {question.questionContent}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <span className="text-[#7A7A7A] text-base font-medium">Answer Options</span>

                      <div className="grid grid-cols-1 space-y-8">
                        {question.options.map((option, optionIndex) => (
                          <ContentOption
                            key={option.id}
                            option={{
                              content: option.optionContent,
                              isCorrectOne: option.isCorrectOne,
                            }}
                            index={optionIndex}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTab;
