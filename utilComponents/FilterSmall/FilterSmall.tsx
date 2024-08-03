"use client";

import React, { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import FilterModal from "./FilterModal";

const FilterSmall = ({filterClassName}: {filterClassName?: string}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleFilterClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApplyFilter = () => {
    setSelectedOption("");
    handleCloseModal();
  };

  return (
    <div className={filterClassName}>
      <div
        style={{
          background: "#FAFAFA",
          borderWidth: "0.5px",
        }}
        onClick={handleFilterClick}
        className="flex items-center relative gap-2 py-2 px-2 border border-[rgba(60, 60, 67, 0.63)] bg-[#FAFAFA] rounded-lg cursor-pointer"
      >
        <div>
          <HiOutlineAdjustmentsHorizontal className="text-[#7A7A7A]" />
        </div>
        <div>
          <p className="text-[#7A7A7A]">Filter</p>
        </div>
      </div>
      <FilterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApplyFilter}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
      />
    </div>
  );
};

export default FilterSmall;
