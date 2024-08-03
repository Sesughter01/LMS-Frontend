import React from "react";
import { BiSort } from "react-icons/bi";

interface SortIntProps {
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const SortInt: React.FC<SortIntProps> = ({ setSortOption }) => {
  return (
    <div
      style={{
        background: "rgba(250, 250, 250, 0.93)",
        borderWidth: "0.5px",
      }}
      className="flex items-center gap-2 py-2 px-2 border border-[rgba(60, 60, 67, 0.63)] bg-[#FAFAFA] rounded-lg cursor-pointer"
    >
      <div>
        <BiSort className="text-[#7A7A7A]" />
      </div>
      <div>
        <p className="text-[#7A7A7A]">Sort</p>
      </div>
    </div>
  );
};

export default SortInt;
