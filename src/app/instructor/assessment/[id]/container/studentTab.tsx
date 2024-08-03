import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SearchInt from "../../../../../../utilComponents/InstructorNav/SearchInt";
import FilterInt from "../../../../../../utilComponents/InstructorNav/FilterInt";
import SortInt from "../../../../../../utilComponents/InstructorNav/SortInt";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "../../../../../../utilComponents/Spinner";

interface StudentTabProps {
  data: any[];
  loading: boolean;
  secondaryColor: any;
}

const StudentTab: React.FC<StudentTabProps> = ({ data = [], loading, secondaryColor }) => {
  // const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [previewAssessment, setPreviewAssessment] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

  // Pagination settings
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate pagination
  const indexOfLastStudent = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStudent = currentPage * itemsPerPage;

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  // Use the dummyData in your component
  const displayedStudents = data?.slice(indexOfFirstStudent, indexOfLastStudent);

  // Determine if there are more pages
  const hasMorePages = indexOfLastStudent < (data?.length || 0);

  // Handle pagination change
  const handlePageClick = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  function formatStudentID(id: number): string {
    const idString = id.toString();
    const paddedZeros = idString.length < 2 ? "000" : idString.length < 3 ? "00" : "";
    return `INGRYD${paddedZeros}${id}`;
  }

  return (
    <div>
      <div className="flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <p className="text-[#1A183E] font-semibold text-2xl">{data?.length || "0"}</p>
          <p className="font-medium text-[#A6A6A6] text-2xl">Students in total</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInt />
          <FilterInt />
          <SortInt />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-40">
          <Spinner />
        </div>
      )}
      {!loading && data?.length === 0 && (
        <div className="flex mt-40 items-center justify-center">
          <span className="text-xl font-bold text-gray-500">No Student Found</span>
        </div>
      )}
      {!loading && data?.length > 0 && (
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
                  Date Started
                </th>
                <th scope="col" className="px-2 py-6">
                  Correct Questions
                </th>
                <th scope="col" className="px-2 py-6">
                  Wrong Questions
                </th>
                <th scope="col" className="px-2 py-6">
                  Score
                </th>
                <th scope="col" className="px-2 py-6">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {displayedStudents?.map((student: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white text-center" : "bg-[#F2F6FF] text-center"}>
                  <td className="px-3 py-4">{index + 1}</td>
                  <td className="px-3 py-4">
                    <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{formatStudentID(student.id)}</span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-row gap-2 items-center">
                      <img src={"/images/table-img.svg"} alt="image" />
                      <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{student.profile.firstName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span className="text-[#1a183e] w-12 font-['Montserrat'] font-normal text-sm">{student.createdAt}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{student.correctQuestions}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{student.incorrectQuestions}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span className="text-[#1a183e] font-['Montserrat'] font-normal text-sm">{student.score}</span>
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
              pageCount={Math.ceil((data?.length || 0) / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex gap-2 items-center justify-center mt-8 mb-4"
              activeClassName="bg-[#d8e4ff]"
              pageClassName="border-solid border-[#7a7a7a] bg-white flex flex-col w-8 h-8 text-center shrink-0 items-center py-1 gap-2 border rounded  font-bold leading-[20px] text-[#1a183e] text-sm font-montserrat"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTab;
