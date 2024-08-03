import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import SearchInt from "../../../../../../utilComponents/InstructorNav/SearchInt";
import FilterInt from "../../../../../../utilComponents/InstructorNav/FilterInt";
import SortInt from "../../../../../../utilComponents/InstructorNav/SortInt";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { extractMonthYearDay } from '@/shared/utils/dateUtils'
import { generateCode } from '@/shared/utils/helper'

interface StudentsTableProps {
    students: any;
  }

const StudentStatistics: React.FC<StudentsTableProps> = ({students}) => {
    console.log(students)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [previewAssessment, setPreviewAssessment] = useState("");

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        itemIndex: any
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
        setPreviewAssessment(itemIndex);
    };

    // Pagination settings
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);

    // Calculate pagination
    const indexOfLastStudent = (currentPage + 1) * itemsPerPage;
    const indexOfFirstStudent = currentPage * itemsPerPage;

    // Use the dummyData in your component
    const displayedStudents = students?.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );

    // Determine if there are more pages
    const hasMorePages = indexOfLastStudent < (students?.length || 0);

    // Handle pagination change
    const handlePageClick = (selected: { selected: number }) => {
        setCurrentPage(selected.selected);
    };

    return (
        <div>
        <div className="flex justify-between items-center px-5">
            <div className="flex items-center gap-2">
            <p className="text-[#1A183E] font-semibold text-2xl">{students?.length}</p>
            <p className="font-medium text-[#A6A6A6] text-2xl">
                Students in total
            </p>
            </div>

            <div className="flex items-center gap-4">
            <SearchInt />
            <FilterInt />
            <SortInt />
            </div>
        </div>

        <div className="mt-12 relative overflow-x-auto px-3 pb-12">
            <table className="w-full text-sm  shadow-lg text-gray-500">
            <thead className="text-base text-[#1A183E] font-semibold bg-[#D8E4FF]">
                <tr>
                <th scope="col" className="px-2 py-6">
                    S/N
                </th>
                <th scope="col" className="px-2 py-6">
                    ID
                </th>
                <th scope="col" className="px-2 py-6">
                    Name
                </th>
                <th scope="col" className="px-2 py-6">
                    Email
                </th>
                <th scope="col" className="px-2 py-6">
                    Number
                </th>
                <th scope="col" className="px-2 py-6">
                    Enrollment Date
                </th>
                <th scope="col" className="px-2 py-6">
                    Action
                </th>
                </tr>
            </thead>

            <tbody>
                {students?.map((student: any, index: number) => (
                <tr
                    key={index}
                    className={
                    index % 2 === 0
                        ? "bg-white text-center"
                        : "bg-[#F2F6FF] text-center"
                    }
                >
                    <td className="px-3 py-4">{index + 1}</td>
                    <td className="px-3 py-4">
                    <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">
                        {generateCode(student.id)}
                    </span>
                    </td>
                    <td className="px-3 py-4">
                    <div className="flex flex-row gap-6 items-center">
                        <img src={"/images/table-img.svg"} alt="image" />
                        <div className="flex flex-col gap-2 items-start">
                            <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm ml-0">
                                {student?.profile?.firstName} {student?.profile?.lastName}
                            </span>
                            {student?.isEmailVerified && !student?.disabled ? (
                                <span style={{ background: "rgba(56, 142, 60, 0.30)"}} className="text-[#388E3C] rounded-md w-[50px]">Active</span>
                            ) : (
                                <span className="text-red-500 bg-red-500 bg-opacity-30 rounded-md w-[50px]">Inactive</span>
                            )}
                            
                        </div>
                    </div>
                    </td>
                    <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                            <img src="/icons/mail.svg" alt="mail-icon" />
                            <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">
                                {student.email}
                            </span>
                        </div>
                    </td>
                    <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                            <img src="/icons/phone.svg" alt="phone-icon" />
                            <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">
                                {student?.profile?.phoneNumber}
                            </span>
                        </div>
                    </td>
                    <td className="px-3 py-4">
                    <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">
                        {extractMonthYearDay(student?.createdAt)}
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

            {/* {dropdownVisible && (
            <AssessDropdown
                position={dropdownPosition}
                onOptionClick={handleDropdownOptionClick}
                data={previewAssessment}
                // assessment={assessmentList}
                onSelection={getAssessmentData}
            />
            )} */}

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
                pageCount={Math.ceil((students?.length || 0) / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="flex gap-2 items-center justify-center mt-8 mb-4"
                activeClassName="bg-[#d8e4ff]"
                pageClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
            />
            </div>
        </div>
        </div>
    );
}

export default StudentStatistics;