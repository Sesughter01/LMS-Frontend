import React from "react";
import SearchSmall from "../../../../utilComponents/SearchSmall/SearchSmall";
import FilterSmall from "../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

interface CohortNavProps {
  count: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  secondaryColor: any;
}

const CohortNav: React.FC<CohortNavProps> = ({ count, setSearchQuery, setSortOption, secondaryColor }) => {
  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-2">
        <p style={{ color: secondaryColor }} className="font-semibold text-2xl">
          {count}
        </p>
        <p className="font-medium text-[#A6A6A6] text-2xl">Cohort{count > 1 && "s"} in total</p>
      </div>

      <div className="flex items-center gap-5">
        <SearchSmall setSearchQuery={setSearchQuery} />
        <FilterSmall />
        <SortSmall setSortOption={setSortOption} />

        <Link href="/admin/cohort/new">
          <button style={{ backgroundColor: secondaryColor }} className="flex items-center gap-2 py-2 px-4 text-white rounded-lg cursor-pointer">
            <AiOutlinePlus />
            <p>Create New Cohort</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CohortNav;
