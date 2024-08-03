"use client";

import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { LuBookOpenCheck } from "react-icons/lu";
import { FaPersonChalkboard } from "react-icons/fa6";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import SearchSmall from "../../../../utilComponents/SearchSmall/SearchSmall";
import FilterSmall from "../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../utilComponents/SortSmall/SortSmall";
import { fetchAllCourses } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDate } from "@/shared/utils/dateUtils";
import { toast } from "react-toastify";

interface CohortDetailsProps {
  modalIsOpen: any;
  closeModal: any;
  modalStyle: any;
  awaitSubmit: (data: any) => void;
  cohortCourses: any;
  secondaryColor: any;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}
const SingleCohortDetails: React.FC<CohortDetailsProps> = ({
  modalIsOpen,
  closeModal,
  modalStyle,
  awaitSubmit,
  cohortCourses,
  setSearchQuery,
  setSortOption,
  secondaryColor,
}) => {
  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  const dispatch = useDispatch();

  const { allCourses, status, error } = useSelector((state: RootState) => state.courses);

  const courses = allCourses;
  console.log(courses);

  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (index: number) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(index) ? prevSelectedCourses.filter((courseIndex) => courseIndex !== index) : [...prevSelectedCourses, index]
    );
  };

  const selectedCourseValues = selectedCourses.map((courseIndex) => courses[courseIndex]);

  console.log("Selected Courses:", selectedCourseValues);

  const handleAddButtonClick = () => {
    // console.log("Selected Courses:", selectedCourseValues);
    if (selectedCourseValues.length === 0) {
      // No courses selected, do nothing
      // closeModal();
      return;
    }

    toast.info("Adding selected Course(s)...")

    // Disable the "Add" button while submitting
    setIsSubmitting(true);

    // add logic to add here
    try {
      awaitSubmit(selectedCourseValues);
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error adding course to cohort:", error);
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle}>
        <div className="custom-label flex items-center justify-between px-4">
          <span style={{ color: secondaryColor }} className="text-xl font-semibold">
            Add a Course
          </span>
          <AiOutlineClose onClick={closeModal} style={{ color: secondaryColor }} className="text-xl font-semibold" />
        </div>
        <div className="w-full bg-gray-200 h-[2px] mt-4"></div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <p style={{ color: secondaryColor }} className="text-lg font-semibold">
              {courses?.length}
            </p>
            <p className="text-lg text-gray-500 font-medium">Courses in total</p>
          </div>
          <div className="flex items-center gap-2">
            <SearchSmall setSearchQuery={setSearchQuery} />
            <FilterSmall />
            <SortSmall setSortOption={setSortOption} />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <p>{selectedCourseValues.length > 0 ? selectedCourseValues.length : 0} course selected</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-6 pb-5">
          {courses &&
            courses.map((item, index) => {
              const isCourseSelected = selectedCourses.includes(index);
              const isCourseInCohort = cohortCourses.some((cohortCourse: any) => cohortCourse.id === item.id);

              return (
                <div
                  key={index}
                  className={`bg-white shadow-4xl relative rounded-lg flex gap-2 p-4 ${isCourseInCohort ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={isCourseSelected}
                    id={`course-${item.id}`}
                    className={`absolute top-2 right-2 ${isCourseInCohort ? "cursor-not-allowed" : ""}`}
                    onChange={() => handleCheckboxChange(index)}
                    disabled={isCourseInCohort}
                  />

                  <label htmlFor={`course-${item.id}`} className={`cursor-pointer ${isCourseInCohort ? "cursor-not-allowed" : ""}`}>
                    <div className="w-[144px] h-[199px] rounded-lg">
                      <img src={item?.courseImage || "/images/cohort-image.svg"} alt="Cohort" className="w-full h-full cursor-pointer" />
                    </div>
                  </label>

                  <div className="flex flex-col flex-1">
                    <label htmlFor={`course-${item.id}`}>
                      <div className="flex items-center gap-1 mt-2">
                        <BiCalendar style={{ color: "#616660" }} />
                        <p style={{ color: "#616660" }} className="text-sm">
                          Created: {formatDate(item?.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: secondaryColor }} className="text-lg font-semibold mt-2">
                          {item?.courseTitle}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 h-[2px] mt-2"></div>
                      <div className="flex items-center gap-5 mt-4">
                        <div style={{ color: secondaryColor }} className="flex gap-2 items-center text-sm">
                          <LuBookOpenCheck style={{ color: "#FF00F8" }} />
                          <p>{item?.modules} modules</p>
                        </div>
                        <div style={{ color: secondaryColor }} className="flex gap-2 items-center text-sm ">
                          <FaPersonChalkboard style={{ color: "#FF00F8" }} />
                          <p>{item?.instructors} instructors</p>
                        </div>
                      </div>
                      <div style={{ color: secondaryColor }} className="flex items-center gap-2 text-sm mt-4">
                        <AiOutlineClockCircle style={{ color: "#FF00F8" }} />
                        <p>{item?.hours} hours</p>
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="my-4 flex justify-end items-center gap-4">
          <button onClick={closeModal} style={{ color: secondaryColor }} className="text-base font-medium">
            Cancel
          </button>
          <button
            onClick={handleAddButtonClick}
            style={{ backgroundColor: secondaryColor }}
            className="text-white text-base font-medium py-2 px-6 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding course to cohort" : "Add"}
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default SingleCohortDetails;
