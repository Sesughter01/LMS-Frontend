"use client";

import React, { useState } from "react";

const SortModal = ({
  isOpen,
  onClose,
  onApply,
  selectedOption,
  onOptionChange,
}: any) => {
  const [radioOption, setRadioOption] = useState(selectedOption);

  const handleOptionChange = (value: any) => {
    onOptionChange(value);
    setRadioOption(value);
  };

  const handleResetAll = () => {
    onOptionChange("");
    setRadioOption("");
  };

  const handleApplyFilter = () => {
    const filterData = {
      radioOption,
    };

    console.log(filterData);

    // sendFilterDataToBackend(filterData);
    handleResetAll();
    onClose();
  };

  return (
    <div
      style={{
        display: isOpen ? "block" : "none",
        position: "absolute",
        top: "16%",
        left: "80%",
        width: "365px",
        transform: "translate(-50%, -50%)",
        background: "#FFFFFF",
        maxHeight: "300px",
        padding: "20px",
        boxShadow: "0 4px 15px 0px rgba(0, 0, 0, 0.1)",
        zIndex: 999,
        overflowY: "auto",
      }}
    >
      <div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date newest"
              className="mr-2"
              checked={radioOption === "date newest"}
              onChange={() => handleOptionChange("date newest")}
            />
            Date Created (Newest)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date oldest"
              className="mr-2"
              checked={radioOption === "date oldest"}
              onChange={() => handleOptionChange("date oldest")}
            />
            Date Created (Oldest)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date modifiedNewest"
              className="mr-2"
              checked={radioOption === "date modifiedNewest"}
              onChange={() => handleOptionChange("date modifiedNewest")}
            />
            Date Modified (Newest)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date modifiedOldest"
              className="mr-2"
              checked={radioOption === "date modifiedOldest"}
              onChange={() => handleOptionChange("date modifiedOldest")}
            />
            Date Modified (Oldest)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date publishedNewest"
              className="mr-2"
              checked={radioOption === "date publishedNewest"}
              onChange={() => handleOptionChange("date publishedNewest")}
            />
            Date Published (Newest)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date publishedOldest"
              className="mr-2"
              checked={radioOption === "date publishedOldest"}
              onChange={() => handleOptionChange("date publishedOldest")}
            />
            Date Published (Oldest)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="title (a-z)"
              className="mr-2"
              checked={radioOption === "title (a-z)"}
              onChange={() => handleOptionChange("title (a-z)")}
            />
            Title (A-Z)
          </label>
        </div>
        <div className="mb-2">
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="title (z-a)"
              className="mr-2"
              checked={radioOption === "title (z-a)"}
              onChange={() => handleOptionChange("title (z-a)")}
            />
            Title (Z-A)
          </label>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div>
          <button
            onClick={handleResetAll}
            className="border border-menu py-1 px-3 rounded-lg"
          >
            Reset all
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="border border-menu py-1 px-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilter}
            className="bg-menu text-white py-1 px-3 rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
