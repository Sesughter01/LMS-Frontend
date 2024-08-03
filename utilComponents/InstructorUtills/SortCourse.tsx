import React from "react";
import { BiSort } from "react-icons/bi";

const SortCourse = () => {
  return (
    <div
      style={{
        background: "rgba(250, 250, 250, 0.93)",
        borderWidth: "0.5px",
      }}
      className="flex items-center gap-1 py-1 px-2 border border-[#A6A6A6] bg-[#FAFAFA] rounded-md cursor-pointer"
    >
      <div>
        <BiSort className="text-[#7A7A7A]" />
      </div>
      <div>
        <p className="text-[#7A7A7A] text-[10px] font-medium">Sort</p>
      </div>
    </div>
  );
};

export default SortCourse;
