import React from "react";
import FilterIcon from "../../src/assets/filter.png";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const FilterSort = () => {
  return (
    <div
      style={{
        background: "#FAFAFA",
        borderWidth: "0.5px",
      }}
      className="flex items-center gap-1 py-1 px-2 border border-[#A6A6A6] bg-[#FAFAFA] rounded-md cursor-pointer"
    >
      <div>
        <HiOutlineAdjustmentsHorizontal className="text-[#7A7A7A]" />
      </div>
      <div>
        <p className="text-[#7A7A7A] text-[10px] font-medium">Filter</p>
      </div>
    </div>
  );
};

export default FilterSort;
