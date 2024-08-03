import React, { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import Link from "next/link";
import { extractMonthYearDay } from "@/shared/utils/dateUtils";
import DeleteModal from "../CourseModal/DeleteModal";
import courseService from "@/services/api/courses";
import { extractErrorMessage } from "@/shared/utils/helper";
import { toast } from "react-toastify";
import { sortByDate } from "../../../../utilComponents/SortSmall/sortDate";

type CourseFullProps = {
  courseData: Array<any>;
  awaitUpdate: () => void;
  searchQuery: string;
  sortOption: string;
  secondaryColor: any;
};

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const CourseFull: React.FC<CourseFullProps> = ({ courseData, awaitUpdate, searchQuery, sortOption, secondaryColor }) => {
  // console.log(courseData)
  const [isModalOpen, setModalOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const filteredAndSortedCourses = courseData
    .filter((course) => course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((courseA, courseB) => {
      switch (sortOption) {
        case "date newest":
          return sortByDate(courseB.createdAt, courseA.createdAt);
        case "date oldest":
          return sortByDate(courseA.createdAt, courseB.createdAt);
        default:
          return 0; // No sorting
      }
    });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, courseIndex: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const tableRect = event.currentTarget.closest("table")?.getBoundingClientRect();

    setCourseId(courseIndex);
    openModal();
  };

  const deleteCourse = async (id: number) => {
    try {
      await courseService.DeleteSingleCourse(id);
      toast.success(
        <>
          <div>
            Course Deleted
            <div style={customMessageStyle}>The course was successfully deleted</div>
          </div>
        </>
      );
      awaitUpdate();
      closeModal();
    } catch (error: any) {
      const errMsg = extractErrorMessage(error) || error?.message;
      toast(errMsg, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6  pb-10 pr-5">
        {filteredAndSortedCourses &&
          filteredAndSortedCourses.map((item: any, index: any) => (
            <div key={index} className="bg-white shadow-4xl w-[447px] h-[141px] rounded-lg flex items-center gap-4 px-4 py-2">
              <div className="w-[134px] h-[101px] rounded-lg">
                <img src={item.courseImage || "/images/cohort-image.svg"} alt="Cohort" className="w-full h-full" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  {item?.status === "published" ? (
                    <div style={{ backgroundColor: "#AADEA0" }} className="flex items-center gap-2 px-2 py-1 rounded-lg">
                      <TfiWorld style={{ color: "#67975E" }} className="w-[10px] h-[10px]" />
                      <p style={{ color: "#67975E" }} className="text-[8px]">
                        Published
                      </p>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: "rgba(122, 122, 122, 0.30)" }} className="flex items-center gap-2 px-2 py-1 rounded-lg">
                      <FiEdit style={{ color: "#7A7A7A" }} className="w-[10px] h-[10px]" />
                      <p style={{ color: "#7A7A7A" }} className="text-[8px]">
                        Draft
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <BiCalendar style={{ color: "#616660" }} className="w-[7px] h-[9px]" />
                    <p style={{ color: "#616660" }} className="text-[8px]">
                      Created: {extractMonthYearDay(item.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <p style={{ color: secondaryColor }} className="text-[13px] font-semibold mt-2">
                    {item?.courseTitle}
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-[2px] mt-2"></div>

                <div className="flex items-center gap-2 mt-2">
                  <img src="/icons/instructor-red.svg" alt="instructor icon" className="w-[10px] h-[10px]" />
                  <p style={{ color: secondaryColor }} className="text-[10px] font-normal">
                    {item.instuctors} Instructors
                  </p>
                </div>

                <div className="flex gap-2" style={{ marginTop: "8px" }}>
                  <Link href={`/admin/course/${item.id}/?courseName=${item.courseTitle}`} passHref>
                    <button
                      style={{ backgroundColor: secondaryColor, border: secondaryColor }}
                      className={`border py-2 px-1 rounded-lg text-white text-[10px] font-medium`}
                    >
                      View Details
                    </button>
                  </Link>

                {/*  <Link href={`/admin/course/${item.id}/edit/?courseName=${item.courseTitle}`} passHref>
                    <button
                      style={{ color: secondaryColor, border: secondaryColor }}
                      className={`border bg-white py-2 px-1 rounded-lg text-[10px] font-medium`}
                    >
                      Edit Course
                    </button>
                  </Link>*/}
                  <button
                    className={`border border-[#FF0000] bg-white py-2 px-1 rounded-lg text-[#FF0000] text-[10px] font-medium`}
                    onClick={(e) => handleButtonClick(e, item.id)}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          ))}

        <DeleteModal secondaryColor={secondaryColor} isOpen={isModalOpen} onClose={closeModal} awaitSubmit={() => deleteCourse(Number(courseId))} />
      </div>
    </>
  );
};

export default CourseFull;
