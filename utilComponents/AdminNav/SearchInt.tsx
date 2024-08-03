import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchIntProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInt: React.FC<SearchIntProps> = ({ setSearchQuery }) => {
  return (
    <div className="relative">
      <span className="absolute left-2 top-4 right-2 w-10 bottom-0 inline-grid place-items-center">
        <IoSearchOutline className="text-[#7A7A7A]" />
      </span>
      <input
        type="text"
        placeholder="Search"
        style={{
          background: "#FAFAFA",
          borderWidth: "0.5px",
        }}
        className="py-2 w-[223px] border border-[rgba(60, 60, 67, 0.63)] rounded-lg px-8 pl-10 outline-none text-14"
        onChange={(e) => setSearchQuery(e.target.value)}
        // value={query}
      />
    </div>
  );
};

export default SearchInt;
