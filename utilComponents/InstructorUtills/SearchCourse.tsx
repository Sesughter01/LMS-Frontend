import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchCourse = ({ setSearchQuery }: { setSearchQuery?: (val: string) => void }) => {
  return (
    <div className="relative">
      <span className="absolute left-2 pt-[3px] right-2 w-4 h-5 bottom-0  inline-grid place-items-center">
        <IoSearchOutline className="text-[#7A7A7A]" />
      </span>
      <input
        type="text"
        placeholder="Search"
        style={{
          background: "#FAFAFA",
          borderWidth: "0.5px",
        }}
        className="py-1 w-[150px] border border-[#A6A6A6] rounded-md px-8 pl-10 outline-none text-[10px]"
        onChange={(e) => setSearchQuery(e.target.value)}
        // value={query}
      />
    </div>
  );
};

export default SearchCourse;
