import React from "react";
import { BsSend } from "react-icons/bs";

const Published = ({ handleClick, btnStyle, title }) => {

  return (
    <button
      style={{ ...btnStyle }} 
      data-action="publish"
      type="submit"
      onClick={handleClick}
      className={`flex items-center gap-2 border border-menu bg-[#1A183E] py-2 px-4 rounded-lg`}
    >
      <span style={{ color: "white" }}>
        <BsSend />
      </span>
      <span className="text-white text-base font-medium">{title || 'Publish'}</span>
    </button>
  );
};

export default Published;
