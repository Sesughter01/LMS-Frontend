"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";
import DropdownCourse from "./dropdownCourse";
import { StudentAssessment } from "@/shared/types/student";
import { formatDate } from '@/shared/utils/dateUtils'

interface CourseTableProp {
  data: StudentAssessment[]
}

const CourseTable: React.FC<CourseTableProp> = ({ data }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [studentProfile, setStudentProfile] = useState("");

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    studentIndex: any
  ) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const tableRect = event.currentTarget
      .closest("table")
      ?.getBoundingClientRect();

    setDropdownPosition({
      top: buttonRect.bottom - (tableRect?.top || 0) + window.scrollY,
      left: buttonRect.left - (tableRect?.left || 0) + window.scrollX,
    });

    setDropdownVisible(!dropdownVisible);
    setStudentProfile(studentIndex);
  };

  const handleDropdownOptionClick = (option: any) => {
    console.log("Navigate to student profile page");
    setStudentProfile(option);

    setDropdownVisible(false);
  };

  // Pagination settings
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate pagination
  const indexOfLastStudent = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStudent = currentPage * itemsPerPage;
  const displayedStudentAssessment = data.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Determine if there are more pages
  const hasMorePages = indexOfLastStudent < data.length;

  // Handle pagination change
  const handlePageClick = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  return (
    <section>
      <div className="relative overflow-x-auto px-3 pb-12">
        <table className="w-full text-sm text-center shadow-lg text-gray-500">
          <thead className="text-base text-[#1A183E] font-semibold bg-[#D8E4FF]">
            <tr>
              <th scope="col" className="px-2 py-6">
                S/N
              </th>
              <th scope="col" className="px-2 py-6">
                Assessment
              </th>
              <th scope="col" className="px-2 py-6">
                Date started
              </th>
              <th scope="col" className="px-2 py-6">
                Completion Status
              </th>
              <th scope="col" className="px-2 py-6">
                Score
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
            {displayedStudentAssessment.map((student, index) => (
              <tr
                key={student.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F2F6FF]"}
              >
                <td className="px-3 py-4">{index + 1}</td>
                <td className="px-3 py-4">
                  <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e] ml-0">
                    {student.assessmentTitle}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e]">
                    {formatDate(student.createdAt)}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <span className="text-xs font-['Montserrat'] w-32 font-medium mt-4">
                    {student.completionStatus}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <span className={`text-xs font-['Montserrat'] font-medium mt-1 ${student.status == 'passed' ? 'text-green-700' : 'text-[#f00]' }`}>
                    {student.score}%
                  </span>
                </td>
                <td className="px-3 py-4">
                  <span 
                    style={{ backgroundColor: student.status === 'passed' ? 'rgba(56, 142, 60, 0.30)' : 'rgba(255, 0, 0, 0.20)' }} 
                    className={`text-xs font-['Montserrat'] font-medium mt-1 ${student.status == 'passed' ? 'text-green-700' : 'text-[#f00]' } p-1 rounded`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <button onClick={(e) => handleButtonClick(e, student.id)}>
                    <img src="/icons/action.svg" alt="action" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dropdownVisible && (
          <DropdownCourse
            position={dropdownPosition}
            onOptionClick={handleDropdownOptionClick}
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
                onClick={() =>
                  currentPage > 0 &&
                  handlePageClick({ selected: currentPage - 1 })
                }
              >
                <ChevronLeft />
              </span>
            }
            nextLabel={
              <span
                className={`border-solid border-[#7a7a7a] ${
                  !hasMorePages ? "cursor-not-allowed opacity-50" : ""
                } bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-2 border rounded`}
                onClick={() =>
                  hasMorePages && handlePageClick({ selected: currentPage + 1 })
                }
              >
                <ChevronRight />
              </span>
            }
            breakLabel={"..."}
            // breakClassName={"break-me"}
            pageCount={Math.ceil(data.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 items-center justify-center mt-8 mb-4"
            activeClassName="bg-[#d8e4ff]"
            pageClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseTable;
