import React from "react";
import FilterIcon from "../../src/assets/filter.png";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const FilterInt = () => {
  return (
    <div
      style={{
        background: "#FAFAFA",
        borderWidth: "0.5px",
      }}
      className="flex items-center gap-2 py-2 px-2 border border-[rgba(60, 60, 67, 0.63)] bg-[#FAFAFA] rounded-lg cursor-pointer"
    >
      <div>
        <HiOutlineAdjustmentsHorizontal className="text-[#7A7A7A]" />
      </div>
      <div>
        <p className="text-[#7A7A7A]">Filter</p>
      </div>
    </div>
  );
};

export default FilterInt;
