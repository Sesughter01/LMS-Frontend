import React, { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import Link from "next/link";
import { extractMonthYearDay } from "@/shared/utils/dateUtils";
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
  const [courseId, setCourseId] = useState("");

  const filteredCourses = courseData.filter((course) => course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()));

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
  };

  return (
    <>
      <p style={{ color: secondaryColor }} className="font-Montserrat text-[18px] font-medium">
        Here is a list of your assigned courses. Get started by adding the modules to the course.
      </p>
      <div className="grid grid-cols-2 gap-6 pt-12 pb-10 pr-5">
        {filteredAndSortedCourses &&
          filteredAndSortedCourses.map((item: any, index: any) => (
            <div key={index} className="bg-white shadow-4xl w-[447px] h-[199px] rounded-lg flex gap-4 px-4 py-2">
              <div className="w-[134px] h-[179px] rounded-lg">
                <img src={item.courseImage || "/images/cohort-image.svg"} alt="Cohort" className="w-full h-full" />
              </div>
              <div className="flex flex-col flex-1">
                <div>
                  <p style={{ color: secondaryColor }} className="text-[15px] font-semibold mt-2">
                    {item?.courseTitle}
                  </p>
                </div>
                <div className="w-full bg-gray-200 h-[2px] mt-2"></div>
                {item?.courseOverview.learn && item?.courseOverview.learn.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <img src="/icons/rectangle.svg" alt="rectangle icon" />
                    <ul className="text-[10px] text-gray-500 font-normal">
                      {item?.courseOverview.learn.map((learning: string, learningIndex: number) => (
                        <li key={learningIndex}>{learning}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* <div className="flex items-center gap-2 mt-2">
                    <img src="/icons/student.svg" alt="student icon" className="h-[5px] w-[5px]" />
                    <p className="text-[10px] text-gray-500 font-normal">
                        {item.students} Students
                    </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                    <img src="/icons/instructor-red.svg" alt="instructor icon" className="h-[5px] w-[5px]" />
                    <p className="text-[10px] text-gray-500 font-normal">
                        {item.instuctors} Instructors
                    </p>
                    </div> */}

                <div className="flex gap-2 mt-12">
                  <Link href={`/instructor/course/${item.id}/?courseName=${item.courseTitle}`} passHref>
                    <button
                      style={{ backgroundColor: secondaryColor, borderColor: secondaryColor }}
                      className={`border py-1 px-1 rounded-lg text-white text-[10px] font-medium`}
                    >
                      View Details
                    </button>
                  </Link>

                  {/* <Link
                        href={`/instructor/course/${item.id}/edit/?courseName=${item.courseTitle}`}
                        passHref
                    >
                    <button
                        className={`border border-menu bg-white py-2 px-4 rounded-lg text-menu text-sm font-medium`}
                    >
                        Edit Course
                    </button>
                    </Link> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CourseFull;
