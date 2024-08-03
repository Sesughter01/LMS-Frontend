"use client";

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";
import { formatDate } from "@/shared/utils/dateUtils";
import { Student } from "@/shared/types/student";
import DisableModal from "../StudentModal/disableModal";
import studentService from "@/services/api/students";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import InstructorDropdownContent from "./InstructorDropdownContent";
import { sortByDate } from "../../../../utilComponents/SortSmall/sortDate";

interface StudentTableProps {
  students: any;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
}

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const InstructorStudentTable: React.FC<StudentTableProps> = ({ students, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [studentProfile, setStudentProfile] = useState("");

  const [studentList, setStudentList] = useState<Student>();
  const [loadingDisabledStudent, setLoadingDisabledStudent] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, studentIndex: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const tableRect = event.currentTarget.closest("table")?.getBoundingClientRect();

    setDropdownPosition({
      top: buttonRect.bottom - (tableRect?.top || 0) + window.scrollY,
      left: buttonRect.left - (tableRect?.left || 0) + window.scrollX,
    });

    setDropdownVisible(!dropdownVisible);
    setStudentProfile(studentIndex);
  };

  const handleDropdownOptionClick = (id: any, option: string) => {
    console.log("Navigate to instructor profile page");
    setStudentProfile(id);
    setDropdownVisible(false);
    if (option == "modal") {
      openModal();
      // awaitUpdate()
    }
  };

  // Pagination settings
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate pagination
  const indexOfLastStudent = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStudent = currentPage * itemsPerPage;

  const displayedStudents = students?.slice(indexOfFirstStudent, indexOfLastStudent);

  const filteredAndSortedStudents = displayedStudents
    .filter((students: any) => students.profile?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((assessmentA: any, assessmentB: any) => {
      switch (sortOption) {
        case "date newest":
          return sortByDate(assessmentB.createdAt, assessmentA.createdAt);
        case "date oldest":
          return sortByDate(assessmentA.createdAt, assessmentB.createdAt);
        default:
          return 0; // No sorting
      }
    });

  // Determine if there are more pages
  const hasMorePages = indexOfLastStudent < (students?.length || 0);

  // Handle pagination change
  const handlePageClick = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const getStudentData = (data: any) => {
    const student = students?.find((i: any) => i.id === data);
    setStudentList(student);
  };

  const disabledStudentClick = async (id: number) => {
    try {
      const student = students?.find((i: Student) => i.id === id);
      if (student) {
        const status = student.disabled;
        const isEmailVerified = student.isEmailVerified;
        if (isEmailVerified) {
          setLoadingDisabledStudent(true);
          let disabledStudent = await studentService.disabledStudent(id, status);
          toast.success(
            <>
              <div>
                {disabledStudent?.disabled ? "Disabled" : "Enabled"}
                <div style={customMessageStyle}>The student has been {disabledStudent?.disabled ? "disabled" : "enabled"}</div>
              </div>
            </>
          );
          awaitUpdate();
        } else {
          toast.error("Student account not yet verified");
        }
      } else {
        // Handle the case when no matching instructor is found
        toast.error("Student not found");
      }
    } catch (err: any) {
      const errMsg = extractErrorMessage(err) || err?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoadingDisabledStudent(false);
      closeModal();
    }
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
                Name
              </th>
              <th scope="col" className="px-2 py-6">
                Contacts
              </th>
              <th scope="col" className="px-2 py-6">
                Courses
              </th>
              <th scope="col" className="px-2 py-6">
                Date Added
              </th>
              <th scope="col" className="px-2 py-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAndSortedStudents?.map((student: any, index: any) => (
              <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-[#F2F6FF]"}>
                <td className="px-3 py-4">{indexOfFirstStudent + index + 1}</td>
                <td className="px-3 py-4">
                  <div className="flex flex-row gap-6 items-center">
                    <img src={student?.profile?.avatar || "/images/table-img.svg"} alt="image" />
                    <div className="self-start flex flex-col gap-3 w-[112px] items-start">
                      <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e] ml-0">
                        {student?.profile?.firstName} {student?.profile?.lastName}
                      </span>
                      <div className="flex flex-row gap-1 w-24 items-start">
                        {student?.isEmailVerified && !student?.disabled ? (
                          <div className="overflow-hidden bg-[rgba(56,_142,_60,_0.3)] flex flex-col shrink-0 items-center px-1 py-px rounded">
                            <span className="text-xs font-['Montserrat'] font-medium text-[#388e3c]">Active</span>
                          </div>
                        ) : (
                          <div className="overflow-hidden bg-red-500 bg-opacity-30 flex flex-col shrink-0 items-center px-1 py-px rounded">
                            <span className="text-xs font-['Montserrat'] font-medium text-red-500">Inactive</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-col mr-0 gap-3 items-start">
                    <div className="flex flex-row gap-1  items-center">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e]">{student?.email || "NIL"}</span>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-['Montserrat'] font-medium text-[#1a183e] mt-px">{student?.profile?.phoneNumber || "NIL"}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className="text-xs font-['Montserrat'] w-32 font-medium mt-4">Active Courses: {/* {student.courses.length} */}</span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-row gap-16 items-start">
                    <span className="text-xs font-['Montserrat'] font-medium mt-1">{formatDate(student.createdAt)}</span>
                  </div>
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
          <InstructorDropdownContent
            position={dropdownPosition}
            onOptionClick={handleDropdownOptionClick}
            data={studentProfile}
            student={studentList}
            onSelection={getStudentData}
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

      <DisableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        awaitSubmit={() => disabledStudentClick(Number(studentProfile))}
        secondaryColor={secondaryColor}
      />
    </section>
  );
};

export default InstructorStudentTable;
