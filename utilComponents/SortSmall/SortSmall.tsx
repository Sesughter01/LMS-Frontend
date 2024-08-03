"use client";

import React, { useState } from "react";
import { BiSort } from "react-icons/bi";
import SortModal from "./SortModal";

interface SortSmallProps {
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  sortClassName?: string
}

const SortSmall: React.FC<SortSmallProps> = ({ setSortOption, sortClassName }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleFilterClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApplyFilter = () => {
    setSortOption(selectedOption);
    // setSelectedOption("");
    handleCloseModal();
  };

  return (
    <div className={sortClassName}>
      <div
        style={{
          background: "rgba(250, 250, 250, 0.93)",
          borderWidth: "0.5px",
        }}
        onClick={handleFilterClick}
        className="flex items-center gap-2 py-2 px-2 border border-[rgba(60, 60, 67, 0.63)] bg-[#FAFAFA] rounded-lg cursor-pointer"
      >
        <div>
          <BiSort className="text-[#7A7A7A]" />
        </div>
        <div>
          <p className="text-[#7A7A7A]">Sort</p>
        </div>
      </div>
      <SortModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={handleApplyFilter}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
      />
    </div>
  );
};

export default SortSmall;
