import React from "react";
import SearchSmall from "../../../../utilComponents/SearchSmall/SearchSmall";
import FilterSmall from "../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

interface CourseNavProps {
  count: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  secondaryColor: any;
}

const CourseNav: React.FC<CourseNavProps> = ({ count, setSearchQuery, setSortOption, secondaryColor }) => {
  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-2">
        <p style={{ color: secondaryColor }} className="font-semibold text-2xl">
          {count.count}
        </p>
        <p className="font-medium text-[#A6A6A6] text-2xl">Assigned course in total</p>
      </div>

      <div className="flex items-center gap-5">
        <SearchSmall setSearchQuery={setSearchQuery} />
        <FilterSmall />
        <SortSmall setSortOption={setSortOption} />
      </div>
    </div>
  );
};

export default CourseNav;
