import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "react-phone-input-2/lib/style.css";
import SearchCourse from "../../../../../../utilComponents/InstructorUtills/SearchCourse";
import FilterSort from "../../../../../../utilComponents/InstructorUtills/FilterSort";
import SortCourse from "../../../../../../utilComponents/InstructorUtills/SortCourse";
import { formatDate, getCourseImage } from "@/shared/utils/dateUtils";
import Image from "next/image";
import javaCourseImage from "@/assets/courses/cybersecurity.png";

// Define props types for InstructorModal
interface AssignCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: any;
  awaitSubmit: (courseId: number, action?: string) => void;
  secondaryColor: any;
}

const AssignCourseModal: React.FC<AssignCourseModalProps> = ({ isOpen, onClose, courses, awaitSubmit, secondaryColor }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const conSelect = (e: any) => {
    setSelectedValue(e.target.value);
  };
  const [coursesFiltered, setCoursesFiltered] = useState<any>([]);

  const handleCoursesSearchQuery = (val: string) => {
     setCoursesFiltered(courses.filter((item) => item.courseTitle.toLowerCase().includes(val.toLowerCase())))
  }

  useEffect(() => {
   setCoursesFiltered(courses)
  }, [courses])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Assign Course Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 overflow-y-auto w-[820px] max-w-screen-lg"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div className="space-y-4  max-h-[420px] font-montserrat">
        <div className=" w-full border-b border-[#7A7A7A] ">
          <div className="py-3 flex  justify-between items center">
            <h1
              style={{ color: secondaryColor }}
              className="font-semibold text-lg"
            >
              Assign a Course
            </h1>
            <X onClick={onClose} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p
              style={{ color: secondaryColor }}
              className="font-semibold text-base"
            >
              {courses?.length}
            </p>
            <p className="font-medium text-[#A6A6A6] text-base">
              Courses in total
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SearchCourse setSearchQuery={handleCoursesSearchQuery} />
            <FilterSort />
            <SortCourse />
          </div>
        </div>

        <span className="text-[#1A183E] flex justify-end font-medium text-xs">
          1 course selected
        </span>

        <div className="grid grid-cols-2 gap-4">
          {coursesFiltered?.map((course: any) => (
            <>
              <div
                key={course.id}
                className="flex w-full font-montserrat h-full shadow-lg gap-4 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg p-4 relative" // Added 'relative' here
              >
                <label htmlFor={`course${course.id}`} className="w-full">
                  <div className="flex justify-between w-full">
                    <div className="w-[50%] shrink-0 bg-gray-100 h-full rounded-md overflow-hidden relative">
                     {/* <Image
                        src={getCourseImage(course.courseTitle)}
                        alt="course image"
                        className="object-cover"
                        fill
                      />*/}
                       <Image className="relative w-full h-min" width={100} height={100} src={course?.courseImage ?? javaCourseImage} alt="course image" />
                    </div>
                    <div className="flex flex-col w-[40%] gap-5">
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex items-center justify-start gap-2">
                          <div className="flex items-center justify-start gap-1">
                            <img
                              src="/icons/date.svg"
                              alt="date-icon"
                              className="w-[8px]"
                            />
                            <h2 className="text-[#7A7A7A] font-medium text-[8px]">
                              Created: {formatDate(course.createdAt)}
                            </h2>
                          </div>
                        </div>
                         <h2 className="inline-block w-full mt-[-5px] border-b border-[#D9D9D9] text-[#1A183E] font-semibold text-[13px] tracking-[0.65px]">
                            {course.courseTitle}
                          </h2>
                        <div className="flex flex-row gap-1 items-center mt-[-5px]">
                          {/* <div className="flex gap-2 items-center justify-start"> */}
                          <img className="w-[20px] h-[20px]" src="/icons/grad-icon.svg" alt="graduation icon" />
                          <span
                            style={{ color: secondaryColor }}
                            className="font-medium text-[10px]"
                          >
                            {course.cohortName}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-start">
                          <img src="/icons/modules.svg" alt="modules icon" />
                          <span
                            style={{ color: secondaryColor }}
                            className="font-normal text-[10px]"
                          >
                            {course.modules} Modules
                          </span>
                        </div>
                        <div className="flex gap-2 items-center justify-start">
                          {/* <img src="/icons/student.svg" alt="student icon" /> */}
                          <span
                            style={{ color: secondaryColor }}
                            className="font-normal text-[10px]"
                          >
                            {course.students} Students
                          </span>
                        </div>
                        <div className="flex gap-2 items-center justify-start">
                          <img src="/icons/clock.svg" alt="clock icon" />
                          <span
                            style={{ color: secondaryColor }}
                            className="font-normal text-[10px]"
                          >
                            {course.hours} hours
                          </span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="courseSelection"
                      id={`course${course.id}`}
                      className="absolute right-1 top-1"
                      onClick={conSelect}
                      value={course.id}
                    />
                  </div>
                </label>
              </div>
              
            </>
          ))}
        </div>

        <div className="flex justify-end pb-12 items-center gap-4">
          <button
            onClick={onClose}
            className="font-semibold text-base"
            style={{ color: secondaryColor }}
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: secondaryColor }}
            className="rounded-lg px-4 py-2 text-white font-semibold text-base"
            onClick={() => awaitSubmit(Number(selectedValue), "add")}
          >
            Assign
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignCourseModal;
