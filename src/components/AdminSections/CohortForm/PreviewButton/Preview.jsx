'use client'
import React, { useState, useEffect } from "react";
import { PiEyeBold } from "react-icons/pi";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { MdOutlineSchool } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import SearchSmall from "../../../../../utilComponents/SearchSmall/SearchSmall";
import FilterSmall from "../../../../../utilComponents/FilterSmall/FilterSmall";
import SortSmall from "../../../../../utilComponents/SortSmall/SortSmall";
import { AiOutlinePlus } from "react-icons/ai";
import { extractMonthYear, extractMonthYearDay } from '@/shared/utils/dateUtils'

const Preview = ({ previewContent, isSubmitted }) => {
  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalStyle = {
    content: {
      width: "910px",
      height: "596px",
      margin: "auto",
      // top: "50%",
      // left: "50%",
      // transform: "translate(-50%, -50%)",
      background: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  // console.log({previewContent})

  return (
    <div>
      <button
        className={`flex items-center gap-2 border border-menu py-2 px-4 rounded-lg ${
          isSubmitted ? "" : "disabled-button"
        }`}
        onClick={openModal}
        disabled={!isSubmitted}
      >
        <PiEyeBold color={isSubmitted ? undefined : "#a1a1a1"} />
        <span
          className={`text-menu text-base font-medium ${
            isSubmitted ? "" : "disabled-text"
          }`}
        >
          Preview
        </span>
      </button>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <div className="custom-label flex items-center justify-between px-4">
          <span className="text-menu text-xl font-semibold">Preview</span>
          <AiOutlineClose
            onClick={closeModal}
            className="text-menu text-xl font-semibold"
          />
        </div>
        <div className="w-full bg-gray-200 h-[2px] mt-4"></div>
        <div>
          <div className="flex gap-4 items-center mt-4">
            <button onClick={closeModal}>
              <AiOutlineArrowLeft className="text-menu font-semibold text-4xl" />
            </button>
            <div
              style={{ borderLeft: "1px solid lightgray", height: "40px" }}
            ></div>
            <p className="text-menu text-lg font-semibold">
              Cohort - <span>{extractMonthYear(previewContent.startDate)}</span>
            </p>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {extractMonthYear(previewContent.startDate)} -{" "}
              {extractMonthYear(previewContent.endDate)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {previewContent?.status === 'published' ? (
                  <div
                  style={{ backgroundColor: "#AADEA0", marginLeft: "70px" }}
                  className="flex items-center gap-2 px-2 py-1 mt-2 rounded-lg"
                >
                  <TfiWorld style={{ color: "#67975E" }} />
                  <p style={{ color: "#67975E" }} className="text-sm">
                    Published
                  </p>
                </div>
                ) : (
                  <div
                    style={{ backgroundColor: "rgba(122, 122, 122, 0.30)", marginLeft: "70px" }}
                    className="flex items-center gap-2 px-2 py-1 mt-2 rounded-lg"
                  >
                    <FiEdit style={{ color: "#7A7A7A" }} />
                    <p style={{ color: "#7A7A7A" }} className="text-sm">
                      Draft
                    </p>
                  </div>
                )}

              <div className="flex items-center mt-2 text-sm">
                <BiCalendar style={{ color: "#616660" }} />
                <p style={{ color: "#616660" }}>Created: {extractMonthYearDay(previewContent?.createdAt)}</p>
                <BsDot style={{ color: "#616660" }} />
                <MdOutlineSchool
                  style={{ color: "#616660", marginRight: "2px" }}
                />
                <p style={{ color: "#616660" }} className="text-sm">
                  Cohort
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 mt-2 text-sm">
              <FiSettings />
              Menu
            </button>
          </div>
          <div className="mt-5" style={{ width: "100%" }}>
            {previewContent.croppedImage && (
              <img
                src={URL.createObjectURL(previewContent.croppedImage)}
                alt="Cropped Image"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
          <div className="mt-5 font-medium">
            <p>{previewContent.cohortDescription}</p>
          </div>
          <div className="flex items-center gap-12 mt-5">
            <div className="flex items-center flex-col gap-2">
              <p className="text-menu text-lg font-semibold">Total Students</p>
              <div className="bg-menu text-white px-4 py-2 rounded-full">
                <p>0</p>
              </div>
            </div>
            <div className="flex items-center flex-col gap-2">
              <p className="text-menu text-lg font-semibold">
                Total Instructors
              </p>
              <div className="bg-menu text-white px-4 py-2 rounded-full">
                <p>0</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              <p className="text-menu text-lg font-semibold">0</p>
              <p className="text-lg text-gray-500 font-medium">
                Courses in total
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SearchSmall />
              <FilterSmall />
              <SortSmall />

              <button className="flex items-center gap-2 bg-[#1A183E] py-2 px-4 text-white rounded-lg cursor-pointer">
                <AiOutlinePlus />
                <p>Add a course</p>
              </button>
            </div>
          </div>
        </div>
      </ReactModal>

      <style jsx>{`
        .disabled-button {
          background-color: #d9d9d9;
          border: #d9d9d9;
        }
        .disabled-text {
          color: #a1a1a1;
        }
      `}</style>
    </div>
  );
};

export default Preview;
