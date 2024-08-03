import React from "react";

interface DropdownContentProps {
  position: { top: number; left: number };
  onOptionClick: (option: string) => void;
}

const DropdownCourse: React.FC<DropdownContentProps> = ({
  position,
  onOptionClick,
}) => {
  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: `${position.top}px`,
    left: `${position.left}px`,
    transform: "translateX(-70%)",
    zIndex: 1000,
  };

  return (
    <div
      style={dropdownStyle}
      className="bg-white shadow-md rounded-md py-4 px-3"
    >
      <button
        onClick={() => onOptionClick("Feedback")}
        className="block px-2 py-1 text-black text-base font-normal hover:bg-gray-200 whitespace-nowrap"
      >
        Give Feedback
      </button>
    </div>
  );
};

export default DropdownCourse;
