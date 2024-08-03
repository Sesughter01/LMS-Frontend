"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Assessment } from "@/shared/types/assessment";
import InstructorAssessDropdown from "./InstructorAssessDropdown";
import { ApiRequestClient } from "@/shared/utils/api-client";
import { sortByDate } from "../../../../utilComponents/SortSmall/sortDate";
import axios from "axios";
import { baseURL } from "@/shared/utils/axios.instance";

interface AssessmentTableProps {
  assessments: Assessment[];
  searchQuery: string;
  sortOption: string;
}

const InstructorAssessmentTable: React.FC<AssessmentTableProps> = ({ assessments, searchQuery, sortOption }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [previewAssessment, setPreviewAssessment] = useState("");

  const [assessmentPage, setAssessmentPage] = useState<Assessment[]>(assessments);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  console.log("All assessments:", assessments);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, itemIndex: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const tableRect = event.currentTarget.closest("table")?.getBoundingClientRect();

    setDropdownPosition({
      top: buttonRect.bottom - (tableRect?.top || 0) + window.scrollY,
      left: buttonRect.left - (tableRect?.left || 0) + window.scrollX,
    });

    setDropdownVisible(!dropdownVisible);
    setPreviewAssessment(itemIndex);
  };

  const handleDropdownOptionClick = (id: any, option: string) => {
    console.log("Option clicked: ", option);
    setDropdownVisible(false);
    if (option === "modal") {
      openModal();
      // awaitUpdate()
    }
  };

  // Pagination settings
  // const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate pagination
  const indexOfLastItem = currentPage + 1;
  // const indexOfFirstItem = currentPage * itemsPerPage;
  // const displayedItems = Array.isArray(assessments)
  //   ? assessments.slice(indexOfFirstItem, indexOfLastItem)
  //   : [];
  // const displayedItems = assessmentPage.slice(indexOfFirstItem, indexOfLastItem);

  const displayedItems = assessmentPage.length > 0 ? assessmentPage : [];

  // Determine if there are more pages
  const hasMorePages = indexOfLastItem < (assessments?.total_count || 0);

  const filteredAssessment = displayedItems.filter((assessmentData) =>
    assessmentData.assessmentTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAndSortedCourses = displayedItems
    .filter((assessmentData) => assessmentData.assessmentTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((assessmentA, assessmentB) => {
      switch (sortOption) {
        case "date newest":
          return sortByDate(assessmentB.createdAt, assessmentA.createdAt);
        case "date oldest":
          return sortByDate(assessmentA.createdAt, assessmentB.createdAt);
        default:
          return 0; // No sorting
      }
    });

  const fetchDataForPage = async (pageNumber: number) => {
    try {
      const response = await ApiRequestClient.get(`/api/v1/assessments?page=${pageNumber}&query_with=instructor`);
      console.log("pageData:", response);
      // const data = await response.data;

      // Append the new data to the existing assessments
      setAssessmentPage(response.data.assessments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchDataForPage(currentPage + 1);
  }, [currentPage, assessments]);

  // Handle pagination change
  const handlePageClick = async (selected: { selected: number }) => {
    setCurrentPage(selected.selected);

    // // Fetch data for the new page from the backend
    await fetchDataForPage(selected.selected + 1);
  };

  return (
    <section>
      <div className="relative overflow-x-auto px-3 pb-12">
        <table className="w-full text-sm  shadow-lg text-gray-500">
          <thead className="text-base text-[#1A183E] font-semibold bg-[#D8E4FF]">
            <tr>
              <th scope="col" className="px-2 py-6">
                S/N
              </th>
              <th scope="col" className="px-2 py-6">
                Program
              </th>
              <th scope="col" className="px-2 py-6">
                Course
              </th>
              <th scope="col" className="px-2 py-6">
                Cohort
              </th>
              <th scope="col" className="px-2 py-6">
                Questions
              </th>
              <th scope="col" className="px-2 py-6">
                Duration
              </th>
              <th scope="col" className="px-2 py-6">
                Status
              </th>
              <th scope="col" className="px-2 py-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAndSortedCourses.map((item: Assessment, index: number) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white text-center" : "bg-[#F2F6FF] text-center"}>
                <td className="px-3 py-4">{index + 1}</td>
                <td className="px-3 py-4">
                  <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{item.assessmentTitle}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-[#1a183e] w-12 font-['Montserrat'] font-normal text-sm">{item.courseName || "N/A"}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{item.cohortName || "N/A"}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{item.numberOfQuestions}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{item.durationInMinutes}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-[#388E3C] bg-[#b6fcba4d] rounded p-1 text-center font-['Montserrat'] font-medium text-sm">{item.status}</span>
                </td>
                <td className="px-3 py-4">
                  <button onClick={(e) => handleButtonClick(e, item.id)}>
                    <img src="/icons/action.svg" alt="action" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dropdownVisible && (
          <InstructorAssessDropdown
            position={dropdownPosition}
            onOptionClick={handleDropdownOptionClick}
            data={previewAssessment}
            // assessment={assessmentList}
            // onSelection={getAssessmentData}
          />
        )}

        {/* Pagination */}
        <div className="flex flex-row gap-2 justify-end w-full items-start mt-12">
          <ReactPaginate
            previousLabel={
              <span
                className={`border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-2 border rounded ${
                  currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => currentPage > 0 && handlePageClick({ selected: currentPage - 1 })}
              >
                <ChevronLeft />
              </span>
            }
            nextLabel={
              <span
                className={`border-solid border-[#7a7a7a] ${
                  !hasMorePages ? "cursor-not-allowed opacity-50" : ""
                } bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-2 border rounded`}
                onClick={() => hasMorePages && handlePageClick({ selected: currentPage + 1 })}
              >
                <ChevronRight />
              </span>
            }
            breakLabel={"..."}
            breakClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
            pageCount={Math.ceil(assessments?.total_pages || 0)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 items-center justify-center mt-8 mb-4"
            activeClassName="bg-blue-100 text-[#1a183e]"
            pageClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
          />
        </div>
      </div>
    </section>
  );
};

export default InstructorAssessmentTable;
