import Link from "next/link";
import React, { useEffect } from "react";
import { BsEyeSlash } from 'react-icons/bs'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'

interface DropdownContentProps {
  position: { top: number; right: number };
  onOptionClick: ( id: any, option: string) => void;
  data: any;
  cohort: any;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  position,
  onOptionClick,
  data,
  cohort,
}) => {
  console.log(data, "Admin kelechi:");
  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: `${position.top}px`,
    right: `${position.right}px`,
    transform: "translateX(-70%)",
    zIndex: 1000,
  };

  const openDisableModal = (option: string) => {
    onOptionClick(data, option)
  }

  return (
    <div
      style={dropdownStyle}
      className="bg-white shadow-md rounded-md py-4 px-3"
    >
      <ul className="list-none font-montserrat">
        <li 
            onClick={() => openDisableModal("disabled")}
            className="cursor-pointer"
        >
            <a className="flex items-center py-1 text-black text-base font-normal hover:bg-gray-200 gap-2">
                <BsEyeSlash />
                {cohort?.status == 'published' ? "Unpublish" : "Publish"}
            </a>
        </li>
        <li className="cursor-pointer">
            <Link
                href={`/admin/cohort/${cohort.id}/edit/?cohortName=${cohort.cohortName}`}
                className="flex items-center py-1 text-black text-base font-normal hover:bg-gray-200 whitespace-nowrap gap-2"
            >
                <FaRegEdit />
                Edit
          </Link>
        </li>
        <li onClick={() => openDisableModal("delete")} className="cursor-pointer">
          <a className="flex items-center py-1 text-base font-normal hover:bg-gray-200 gap-2">
            <RiDeleteBin5Line style={{ 
                color: "#F00",
            }}/>
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownContent;