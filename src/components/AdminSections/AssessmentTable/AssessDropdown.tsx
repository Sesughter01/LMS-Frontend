"use client";

import Link from "next/link";
import React, { useEffect } from "react";

interface DropdownContentProps {
  position: { top: number; left: number };
  onOptionClick: (id: any, option: string) => void;
  data: any;
  // onSelection: (data: any) => void;
}

const AssessDropdown: React.FC<DropdownContentProps> = ({
  position,
  onOptionClick,
  data,
  // onSelection,
}) => {
  const accountType = localStorage.getItem("accountType");

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: `${position.top}px`,
    left: `${position.left}px`,
    transform: "translateX(-70%)",
    zIndex: 1000,
  };

  const openDisableModal = (option: string) => {
    onOptionClick(data, option);
  };

  // useEffect(() => {
  //   onSelection(data);
  // }, [data]);

  return (
    <div
      style={dropdownStyle}
      className="bg-white shadow-md rounded-md py-4 px-3"
    >
      <ul className="list-none font-montserrat text-center">
        <li onClick={() => onOptionClick(data, "view")}>
          <Link
            href={`/admin/assessment/${data}`}
            className="block px-2 py-1 text-black text-base font-normal hover:bg-gray-200 whitespace-nowrap"
          >
            View Assessment
          </Link>
        </li>
        <li
          onClick={() => openDisableModal("modal")}
          className="cursor-pointer"
        >
          <a className="block px-2 py-1 text-black text-base font-normal hover:bg-gray-200">
            Disable
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AssessDropdown;
