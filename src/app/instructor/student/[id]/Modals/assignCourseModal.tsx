import { X } from "lucide-react";
import React from "react";
import Modal from "react-modal";
import "react-phone-input-2/lib/style.css";
import SearchCourse from "../../../../../../utilComponents/InstructorUtills/SearchCourse";
import FilterSort from "../../../../../../utilComponents/InstructorUtills/FilterSort";
import SortCourse from "../../../../../../utilComponents/InstructorUtills/SortCourse";

// Define props types for InstructorModal
interface AssignCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Course {
  id: number;
  image: string;
  dateIcon: string;
  createdDate: string;
  title: string;
  cohort: string;
  modules: string;
  students: string;
  hours: string;
}

const courseData: Course[] = [
  {
    id: 1,
    image: "/images/course1.png",
    dateIcon: "/icons/date.svg",
    createdDate: "September 01, 2023",
    title: "Java and Spring Boot",
    cohort: "Cohort - October 2023",
    modules: "12 Modules",
    students: "30 Students",
    hours: "264 hours",
  },
  {
    id: 2,
    image: "/images/course1.png",
    dateIcon: "/icons/date.svg",
    createdDate: "September 01, 2023",
    title: "Java and Spring Boot",
    cohort: "Cohort - October 2023",
    modules: "12 Modules",
    students: "30 Students",
    hours: "264 hours",
  },
  {
    id: 3,
    image: "/images/course1.png",
    dateIcon: "/icons/date.svg",
    createdDate: "September 01, 2023",
    title: "Java and Spring Boot",
    cohort: "Cohort - October 2023",
    modules: "12 Modules",
    students: "30 Students",
    hours: "264 hours",
  },
  // Add more course data as needed
];

const AssignCourseModal: React.FC<AssignCourseModalProps> = ({
  isOpen,
  onClose,
}) => {
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
            <h1 className="text-[#1A183E]   font-semibold text-lg">
              Assign a Course
            </h1>
            <X onClick={onClose} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-[#1A183E] font-semibold text-base">4</p>
            <p className="font-medium text-[#A6A6A6] text-base">
              Courses in total
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SearchCourse />
            <FilterSort />
            <SortCourse />
          </div>
        </div>

        <span className="text-[#1A183E] flex justify-end font-medium text-xs">
          1 course selected
        </span>

        <div className="grid grid-cols-2 gap-4">
          {courseData.map((course) => (
            <div
              key={course.id}
              className="flex w-full font-montserrat h-full shadow-lg gap-4 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="w-[30%] shrink-0 bg-gray-100 h-full rounded-md overflow-hidden relative">
                <img
                  src={course.image}
                  alt="course image"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-start gap-2">
                  <div className="flex items-center justify-start gap-1">
                    <img
                      src={course.dateIcon}
                      alt="date-icon"
                      className="w-[8px]"
                    />
                    <h2 className="text-[#7A7A7A] font-medium text-[8px]">
                      Created: {course.createdDate}
                    </h2>
                  </div>
                </div>

                <h2 className="inline-block py-2 w-[148%] border-b border-[#D9D9D9] text-[#1A183E] font-semibold text-[13px] tracking-[0.65px] ">
                  {course.title}
                </h2>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/grad-icon.svg" alt="graduation icon" />
                  <span className="text-[#1A183E] font-normal text-[10px]">
                    {course.cohort}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/modules.svg" alt="modules icon" />
                  <span className="text-[#1A183E] font-normal text-[10px]">
                    {course.modules}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/student.svg" alt="student icon" />
                  <span className="text-[#1A183E] font-normal text-[10px]">
                    {course.students}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-start">
                  <img src="/icons/clock.svg" alt="clock icon" />
                  <span className="text-[#1A183E] font-normal text-[10px]">
                    {course.hours}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pb-12 items-center gap-4">
          <button
            onClick={onClose}
            className="text-[#1A183E] font-semibold text-base"
          >
            Cancel
          </button>
          <button className="bg-[#1A183E] rounded-lg px-4 py-2 text-white font-semibold text-base">
            Assign
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignCourseModal;
