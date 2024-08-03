import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  selectedOption,
  onOptionChange,
}: any) => {
  const [showDateInputs, setShowDateInputs] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [radioOption, setRadioOption] = useState(selectedOption);
  const [selectOption, setSelectOption] = useState(
    options.find((option) => option.value === selectedOption) || null
  );

  const handleOptionChange = (value: any) => {
    onOptionChange(value);
    setShowDateInputs(value === "date created");
    setRadioOption(value);
  };

  const handleResetAll = () => {
    onOptionChange("");
    setShowDateInputs(false);
    setStartDate("");
    setEndDate("");
    setRadioOption("");
    setSelectOption(null);
  };

  const handleApplyFilter = () => {
    const filterData = {
      radioOption,
      selectOption: selectOption ? selectOption.value : null,
      startDate,
      endDate,
    };

    console.log(filterData);

    // sendFilterDataToBackend(filterData);
    handleResetAll();
    onClose();
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "8px",
      outline: "none",
      boxShadow: state.isFocused ? "0 0 0 0 rgba(0, 123, 255, 0.25)" : null,
      "&:hover": {
        borderColor: "#aaa",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ccc" : null,
      color: state.isFocused ? "#000" : null,
    }),
  };

  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "4px 8px",
    width: "80%",
  };

  return (
    <div>
      <div
        style={{
          display: isOpen ? "block" : "none",
          position: "absolute",
          top: "12%",
          left: "70%",
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
        <div className="mb-5">
          <p className="font-semibold text-sm text-menu mb-2">Status</p>
          <Select
            options={options}
            styles={customStyles}
            value={selectOption}
            onChange={(selected) => {
              setSelectOption(selected);
              handleOptionChange(selected ? selected.value : "");
            }}
          />
        </div>
        <div className="mb-2">
          <p className="font-semibold text-sm text-menu mb-2">Date Range</p>
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="any date"
              className="mr-2"
              checked={radioOption === "any date"}
              onChange={() => handleOptionChange("any date")}
            />
            Any Date
          </label>
        </div>
        <div>
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date created"
              className="mr-2"
              checked={radioOption === "date created"}
              onChange={() => handleOptionChange("date created")}
            />
            Date Created
          </label>
          {showDateInputs && (
            <div className="flex flex-col mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  placeholder="Start Date"
                  style={inputStyle}
                />
                <p className="text-sm text-menu">to</p>
              </div>
              <input
                type="date"
                className="mt-2 mb-3"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
                style={inputStyle}
              />
            </div>
          )}
        </div>
        <div>
          <label className="text-sm text-menu font-medium">
            <input
              type="radio"
              value="date modified"
              className="mr-2"
              checked={radioOption === "date modified"}
              onChange={() => handleOptionChange("date modified")}
            />
            Date Modified
          </label>
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
    </div>
  );
};

export default FilterModal;
