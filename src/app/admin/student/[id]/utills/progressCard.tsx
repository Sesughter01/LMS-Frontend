import React, { ReactNode } from "react";

export interface ProgressCardProps {
  icon: ReactNode;
  text: string;
  score: any;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ icon, text, score }) => {
  return (
    <div className="bg-white h-[95px] w-[200px] rounded-lg border  border-[#1A183E80]">
      <div className="p-4 flex justify-between gap-3">
        <span>{icon}</span>
        <div className="flex flex-col text-center items-center gap-1">
          <span className="text-[#1A183E80]  text-xs font-semibold">
            {text}
          </span>
          <span className="text-[#1A183E80] font-semibold text-2xl">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
