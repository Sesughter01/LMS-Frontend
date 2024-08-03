"use client";

import React from "react";
import SearchSmall from "../../../../utilComponents/SearchSmall/SearchSmall";
import FilterSmall from "../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname  } from "next/navigation";
import { handleTab } from '@/lib/utils'

interface AssessmentNavProps {
  assessments: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  secondaryColor: any;
}

const AssessmentNav: React.FC<AssessmentNavProps> = ({ assessments, setSearchQuery, setSortOption, secondaryColor }) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const removeSelectType = () => {
    sessionStorage.removeItem("selectedAssessmentType");
    sessionStorage.removeItem("selectedCourseId");
    sessionStorage.removeItem("selectedCohortId");
    sessionStorage.removeItem("assessmentName");
    sessionStorage.removeItem("assessmentDescription");
    sessionStorage.removeItem("assessmentDuration");
    sessionStorage.removeItem("assessmentAttempts");
    sessionStorage.removeItem("assessmentDeadline");
    sessionStorage.removeItem("selectedModuleId");
    sessionStorage.removeItem("assessmentFor");
    sessionStorage.removeItem("assessmentId");
    sessionStorage.removeItem("assessmentPassingScore");
    sessionStorage.removeItem("assessmentQuestions");

    router.push("/admin/assessment/new?tab=assessment");
  };

  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex items-center gap-2">
        <p style={{ color: secondaryColor }} className="font-semibold text-2xl">
          {assessments?.total_count}
        </p>
        <p className="font-medium text-[#A6A6A6] text-2xl">{assessments?.total_count === 1 ? "Assessment in total" : "Assessments in total"}</p>
      </div>

      <div className="flex items-center gap-5">
        <SearchSmall setSearchQuery={setSearchQuery} />
        <FilterSmall />
        <SortSmall setSortOption={setSortOption} />

        <button
          onClick={removeSelectType}
          style={{ backgroundColor: secondaryColor }}
          className="flex items-center gap-2  py-2 px-4 text-white rounded-lg cursor-pointer"
        >
          <AiOutlinePlus />
          <p>Create New Assessment</p>
        </button>
      </div>
    </div>
  );
};

export default AssessmentNav;
