import React from "react";
import { FaRegEdit } from "react-icons/fa";

const Edit = ({ onClick, isDisabled }) => {
  const secondaryColor = sessionStorage.getItem("secondaryColor") || "";

  return (
    <div style={{ borderColor: secondaryColor }} className="flex items-center gap-2 border py-2 px-4 rounded-lg">
      <FaRegEdit />
      <button disabled={isDisabled} style={{ color: secondaryColor }} className="text-base font-medium" onClick={onClick}>
        Edit
      </button>
    </div>
  );
};

export default Edit;
