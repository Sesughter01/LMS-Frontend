import React from "react";

const Continue = ({ onClick, isDisabled }) => {
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  return (
    <button
      type="submit"
      disabbled={isDisabled}
      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
      className="flex items-center gap-2 border py-2 px-4 rounded-lg"
      onClick={onClick}
    >
      <span className="text-white text-base font-medium">Continue</span>
    </button>
  );
};

export default Continue;
