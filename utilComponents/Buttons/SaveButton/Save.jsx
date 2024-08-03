import React from "react";
import { AiOutlineSave } from "react-icons/ai";

const Save = ({ onClick, title, isDisabled, showIcon=true, btnClassName, btnStyle, spanStyle }) => {
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  function handleClick(){
  	onClick? onclick() : null
  }

  return (
    <button disabled={isDisabled} data-action="save" type="submit" style={{ borderColor: secondaryColor, ...btnStyle }} className={`flex items-center gap-2 border py-2 px-4 rounded-lg ${btnClassName}`} onClick={handleClick}>
      {showIcon && <AiOutlineSave />}
      <span style={{ color: secondaryColor, ...spanStyle }} className="text-base font-medium">
        {title || 'Save'}
      </span>
    </button>
  );
};

export default Save;
