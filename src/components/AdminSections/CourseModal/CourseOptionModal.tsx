'use client'

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

// Define props types for CourseOptionModal
interface CourseOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  awaitSubmit: (data: any) => void;
  title: any;
}

const customMessageStyle = {
  marginTop: "2px",
  marginLeft: "2px",
  fontSize: "14px",
};

const CourseOptionModal: React.FC<CourseOptionModalProps> = ({
  isOpen,
  onClose,
  awaitSubmit,
  title,
}) => {

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);
  

  const [errors, setErrors] = useState({
    lessonType: "",
  });

  const [lessonType, setLessonType] = useState("")

  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      lessonType: lessonType ? "" : "You need to select an option to proceed to the next step",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
        const selectedData = {
            lessonType: lessonType, // Include other data here
        };
        setLessonType("")
        awaitSubmit(selectedData);
    }
  };

  const closeModalAction = () => {
    setErrors({
      lessonType: ""
    })
    setLessonType("")
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Lesson Content"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 w-full max-w-lg h-[72%]" // Tailwind CSS classes for styling
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center" // Tailwind CSS classes for overlay
    >
      {/* Your modal content goes here */}
      <div className="absolute right-[-7px] top-[-7px] cursor-pointer">
        <svg onClick={closeModalAction} className="rounded-full bg-black" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M17.5781 7.42188L7.42188 17.5781M7.42188 7.42188L17.5781 17.5781" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="space-y-4 max-h-[420px] font-montserrat">
        <h2 className="text-black text-center font-montserrat text-xl font-semibold">
            Add New Lesson Content
        </h2>
        <div className="rounded-md bg-[#E8EFFF] pt-[14px] pb-[15px] pl-[22px]">
            <p className="text-[#1A183E] font-medium text-[12px]">
                Lesson: { title }
            </p>
        </div>

        <form className="flex flex-col gap-6">
            <span className="mt-[24px] text-gray-500">Select lesson type</span>
            {lessonType === "" && errors.lessonType && (
                <div className="flex text-red-500 text-xs items-center bg-[#F00] bg-opacity-20 py-[5px] rounded-md">
                    <svg
                        className="mr-2 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                    <path
                        d="M6 0.75C4.96165 0.75 3.94662 1.05791 3.08326 1.63478C2.2199 2.21166 1.54699 3.0316 1.14963 3.99091C0.752275 4.95022 0.648307 6.00582 0.85088 7.02422C1.05345 8.04262 1.55347 8.97809 2.28769 9.71231C3.02192 10.4465 3.95738 10.9466 4.97578 11.1491C5.99418 11.3517 7.04978 11.2477 8.00909 10.8504C8.9684 10.453 9.78834 9.7801 10.3652 8.91674C10.9421 8.05339 11.25 7.03835 11.25 6C11.25 4.60761 10.6969 3.27226 9.71231 2.28769C8.72775 1.30312 7.39239 0.75 6 0.75ZM6 3C6.11125 3 6.22001 3.03299 6.31251 3.0948C6.40501 3.15661 6.47711 3.24446 6.51968 3.34724C6.56226 3.45002 6.5734 3.56312 6.55169 3.67224C6.52999 3.78135 6.47642 3.88158 6.39775 3.96025C6.31908 4.03891 6.21886 4.09249 6.10974 4.11419C6.00063 4.1359 5.88753 4.12476 5.78474 4.08218C5.68196 4.03961 5.59411 3.96751 5.5323 3.87501C5.47049 3.78251 5.4375 3.67375 5.4375 3.5625C5.4375 3.41332 5.49677 3.27024 5.60226 3.16475C5.70774 3.05926 5.85082 3 6 3ZM7.5 9.04688H4.5V8.20313H5.57813V6.04688H4.875V5.20313H6.42188V8.20313H7.5V9.04688Z"
                        fill="#FF0000"
                    />
                    </svg>
                    {errors.lessonType}
                </div>
            )}
            <div className="flex items-center gap-2">
                <input onChange={() => setLessonType('LINK')} id="LINK" type="radio" value="LINK" name="lessonType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="LINK" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Video Link</label>
            </div>

            <div className="flex items-center gap-2">
                <input onChange={() => setLessonType('VIDEO')} id="VIDEO" type="radio" value="VIDEO" name="lessonType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="VIDEO" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Video File</label>
            </div>

            <div className="flex items-center mb-[81px] gap-2">
                <input onChange={() => setLessonType('DOCUMENT')}  id="DOCUMENT" type="radio" value="DOCUMENT" name="lessonType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="DOCUMENT" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document (pdf, docx, doc, ppt, pptx)</label>
            </div>

            <div className="flex pb-8 justify-end items-center gap-4 mb-[8px]">
               {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.16797 7.50008H10.8346V5.83341H9.16797M10.0013 16.6667C6.3263 16.6667 3.33464 13.6751 3.33464 10.0001C3.33464 6.32508 6.3263 3.33341 10.0013 3.33341C13.6763 3.33341 16.668 6.32508 16.668 10.0001C16.668 13.6751 13.6763 16.6667 10.0013 16.6667ZM10.0013 1.66675C8.90695 1.66675 7.82332 1.8823 6.81227 2.30109C5.80123 2.71987 4.88257 3.3337 4.10875 4.10752C2.54594 5.67033 1.66797 7.78994 1.66797 10.0001C1.66797 12.2102 2.54594 14.3298 4.10875 15.8926C4.88257 16.6665 5.80123 17.2803 6.81227 17.6991C7.82332 18.1179 8.90695 18.3334 10.0013 18.3334C12.2114 18.3334 14.3311 17.4554 15.8939 15.8926C17.4567 14.3298 18.3346 12.2102 18.3346 10.0001C18.3346 8.90573 18.1191 7.8221 17.7003 6.81105C17.2815 5.80001 16.6677 4.88135 15.8939 4.10752C15.12 3.3337 14.2014 2.71987 13.1903 2.30109C12.1793 1.8823 11.0957 1.66675 10.0013 1.66675ZM9.16797 14.1667H10.8346V9.16675H9.16797V14.1667Z" fill="#1A183E"/>
                </svg>
*/}
                <button
                    className="bg-[#1A183E] text-base font-medium text-white px-4 py-2 rounded-lg"
                    onClick={handleNextClick}
                >
                    Next
                </button>
            </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseOptionModal;
